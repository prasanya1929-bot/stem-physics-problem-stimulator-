// Test script for OpenRouter parser
const parsePhysicsProblem = require('./parser');

const testProblems = [
  "A ball is thrown straight up with a velocity of 10 m/s",
  "A rock falls from a height of 50 meters",
  "A projectile is launched at 20 m/s at an angle of 45 degrees"
];

async function runTests() {
  console.log('Testing OpenRouter Physics Parser...\n');
  
  for (let i = 0; i < testProblems.length; i++) {
    console.log(`Test ${i + 1}: "${testProblems[i]}"`);
    
    try {
      const result = await parsePhysicsProblem(testProblems[i]);
      console.log('✅ Success:', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
    
    console.log('---\n');
  }
}

runTests();
