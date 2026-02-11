# AI Physics Word Problem to Interactive Simulation System

Convert physics word problems into interactive visual simulations using AI.

## Features

- Natural language physics problem input
- AI-powered problem parsing (OpenRouter with Mixtral-8x7B)
- Real-time 2D physics simulation
- Interactive parameter controls
- Support for vertical throw, free fall, and projectile motion
- Visual trajectory and velocity vectors

## Tech Stack

- **Frontend**: React, Canvas API
- **Backend**: Node.js, Express
- **AI**: OpenRouter API (Mixtral-8x7B)
- **Physics**: Custom simulation engine

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm
- OpenRouter API key

### Installation

1. Clone and install dependencies:
```bash
npm run install-all
```

2. Create `.env` file in root:
```bash
cp .env.example .env
```

3. Add your OpenRouter API key to `.env`:
```
OPENROUTER_API_KEY=your_key_here
PORT=3001
```

Get your API key from: https://openrouter.ai/keys

### Running the Application

Start both frontend and backend:
```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Usage

1. Enter a physics problem (e.g., "A ball is thrown up at 10 m/s")
2. Click "Generate Simulation"
3. Watch the animated simulation
4. Adjust parameters with sliders to see changes in real-time

## Project Structure

```
├── backend/
│   ├── server.js          # Express server
│   └── parser.js          # AI problem parser
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputPanel.js       # Problem input
│   │   │   ├── ControlPanel.js     # Parameter controls
│   │   │   └── SimulationCanvas.js # Physics simulation
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json
└── .env

```

## Supported Motion Types

- **Vertical Throw**: Object thrown straight up
- **Free Fall**: Object falling from height
- **Projectile Motion**: Object launched at an angle

## Example Problems

- "A ball is thrown straight up with a velocity of 10 m/s"
- "A rock falls from a height of 50 meters"
- "A projectile is launched at 20 m/s at an angle of 45 degrees"

## API Endpoints

### POST /api/parse
Parse physics problem text into structured data.

**Request:**
```json
{
  "problem": "A ball is thrown up at 10 m/s"
}
```

**Response:**
```json
{
  "motion_type": "vertical_throw",
  "object_name": "ball",
  "initial_velocity": 10,
  "angle": 90,
  "gravity": 9.8,
  "initial_height": 0
}
```

## License

MIT
