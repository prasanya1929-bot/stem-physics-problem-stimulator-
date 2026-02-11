// backend/parser.js
const https = require('https');
require('dotenv').config();

async function parsePhysicsProblem(problemText) {
  const systemPrompt = `You are a physics problem parser. Extract motion_type, object_name, initial_velocity, angle, gravity, initial_height and return ONLY valid JSON.

Extract these fields:
- motion_type: "vertical_throw" | "free_fall" | "projectile"
- object_name: string (e.g., "ball", "rock")
- initial_velocity: number (m/s)
- angle: number (degrees, 0-90, default 90 for vertical)
- gravity: number (m/s², default 9.8)
- initial_height: number (meters, default 0)

Examples:
"A ball is thrown straight up with a velocity of 10 m/s" → {"motion_type":"vertical_throw","object_name":"ball","initial_velocity":10,"angle":90,"gravity":9.8,"initial_height":0}
"A rock falls from 50m height" → {"motion_type":"free_fall","object_name":"rock","initial_velocity":0,"angle":90,"gravity":9.8,"initial_height":50}
"A projectile is launched at 20 m/s at 45 degrees" → {"motion_type":"projectile","object_name":"projectile","initial_velocity":20,"angle":45,"gravity":9.8,"initial_height":0}`;

  const requestBody = JSON.stringify({
    model: 'openrouter/free',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: problemText }
    ]
  });

  const options = {
    hostname: 'openrouter.ai',
    path: '/api/v1/chat/completions',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.error) throw new Error(response.error.message || 'OpenRouter API error');

          let content = response.choices[0].message.content.trim();

          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (!jsonMatch) throw new Error('No JSON found in response');

          let jsonStr = jsonMatch[0].trim();

          // Remove extra quotes if present
          if (jsonStr.startsWith('"') && jsonStr.endsWith('"')) {
            jsonStr = jsonStr.slice(1, -1).replace(/\\"/g, '"');
          }

          const parsed = JSON.parse(jsonStr);

          // Defaults
          resolve({
            motion_type: parsed.motion_type || 'vertical_throw',
            object_name: parsed.object_name || 'object',
            initial_velocity: parseFloat(parsed.initial_velocity) || 0,
            angle: parseFloat(parsed.angle) || 90,
            gravity: parseFloat(parsed.gravity) || 9.8,
            initial_height: parseFloat(parsed.initial_height) || 0
          });
        } catch (error) {
          console.error('OpenRouter API Error:', error);
          reject(new Error('Failed to parse with AI: ' + error.message));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request Error:', error);
      reject(new Error('Failed to connect to OpenRouter: ' + error.message));
    });

    req.write(requestBody);
    req.end();
  });
}

module.exports = parsePhysicsProblem;
