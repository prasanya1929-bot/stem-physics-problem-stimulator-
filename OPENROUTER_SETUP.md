# OpenRouter Integration Guide

## Overview
The physics problem parser now uses OpenRouter AI with the Mixtral-8x7B model.

## Features
- Uses native Node.js `https` module (no external SDK required)
- Model: `mistralai/mixtral-8x7b-instruct`
- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- CommonJS syntax with `require()`
- Environment variable: `OPENROUTER_API_KEY`

## Setup Steps

### 1. Get OpenRouter API Key
1. Visit: https://openrouter.ai/keys
2. Sign up or log in
3. Create a new API key
4. Copy the key

### 2. Configure Environment
```bash
# Update .env file
OPENROUTER_API_KEY=sk-or-v1-your-key-here
PORT=3001
```

### 3. Install Dependencies
```bash
npm install
```

Note: No additional AI SDK needed - uses native Node.js `https` module.

### 4. Run Application
```bash
npm run dev
```

## Implementation Details

### API Request Structure
```javascript
POST https://openrouter.ai/api/v1/chat/completions
Headers:
  Authorization: Bearer YOUR_API_KEY
  Content-Type: application/json

Body:
{
  "model": "mistralai/mixtral-8x7b-instruct",
  "messages": [
    { "role": "system", "content": "..." },
    { "role": "user", "content": "..." }
  ]
}
```

### Response Handling
- Extracts JSON from AI response using regex
- Parses and validates physics parameters
- Applies fallback defaults for missing fields
- Returns structured object for simulation engine

### Error Handling
- API connection errors
- Invalid JSON responses
- Missing required fields
- Network timeouts

## Testing

Test with these example problems:
```
"A ball is thrown straight up with a velocity of 10 m/s"
"A rock falls from a height of 50 meters"
"A projectile is launched at 20 m/s at an angle of 45 degrees"
```

## Advantages of OpenRouter
- Access to multiple AI models through one API
- Cost-effective pricing
- No vendor lock-in
- Mixtral-8x7B offers excellent performance for structured output

## Troubleshooting

### "Failed to connect to OpenRouter"
- Check your API key is correct
- Verify internet connection
- Ensure firewall allows HTTPS requests

### "No JSON found in response"
- Model may have returned text instead of JSON
- Check OpenRouter dashboard for rate limits
- Try regenerating the request

### "OpenRouter API error"
- Check API key has sufficient credits
- Verify model name is correct
- Review OpenRouter status page
