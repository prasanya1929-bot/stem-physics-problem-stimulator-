# Migration Guide: OpenAI → Google Gemini

## Changes Made

### 1. Dependencies Updated
- ❌ Removed: `openai` package
- ✅ Added: `@google/generative-ai` package

### 2. Environment Variables
- ❌ Old: `OPENAI_API_KEY`
- ✅ New: `GEMINI_API_KEY`

### 3. Backend Parser (`backend/parser.js`)
- Replaced OpenAI SDK with Google Generative AI SDK
- Changed model from `gpt-3.5-turbo` to `gemini-pro`
- Updated API call structure to use `generateContent()`
- Maintained same prompt logic and JSON parsing

## Setup Steps

### 1. Get Gemini API Key
Visit: https://makersuite.google.com/app/apikey

### 2. Update Environment
```bash
# Create .env file
cp .env.example .env

# Add your Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

### 3. Install Dependencies
```bash
# Remove old dependencies and install new ones
npm install
cd frontend && npm install
```

### 4. Run Application
```bash
# From root directory
npm run dev
```

## API Comparison

### OpenAI (Old)
```javascript
const response = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: problemText }
  ]
});
const content = response.choices[0].message.content;
```

### Gemini (New)
```javascript
const prompt = `${systemPrompt}\n\nProblem: ${problemText}`;
const result = await model.generateContent(prompt);
const response = await result.response;
const content = response.text();
```

## Testing

Test with example problems:
- "A ball is thrown straight up with a velocity of 10 m/s"
- "A rock falls from a height of 50 meters"
- "A projectile is launched at 20 m/s at an angle of 45 degrees"

## No Changes Required

✅ Frontend code (React components)
✅ Simulation engine
✅ UI/UX
✅ API endpoints
✅ Response format

The integration is transparent to the rest of the application.
