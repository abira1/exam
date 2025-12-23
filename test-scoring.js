/**
 * Manual Test Script for IELTS Band Score Conversion
 * Run with: node test-scoring.js
 */

// Simulate the calculateOverallBand function
function calculateOverallBand(listening, reading, writing, speaking) {
  // Validate inputs
  if ([listening, reading, writing, speaking].some(score => score < 0 || score > 9)) {
    console.warn('Invalid band scores provided to calculateOverallBand');
    return 0;
  }
  
  // Step 1 & 2: Calculate average of 4 sections
  const average = (listening + reading + writing + speaking) / 4;
  
  // Step 3: Apply official IELTS rounding rules
  const wholePart = Math.floor(average);
  const decimalPart = average - wholePart;
  
  let rounded;
  
  if (decimalPart < 0.25) {
    // 0.00 to 0.24 → round DOWN to nearest whole band
    rounded = wholePart;
  } else if (decimalPart < 0.75) {
    // 0.25 to 0.74 → round to .5 (half band)
    rounded = wholePart + 0.5;
  } else {
    // 0.75 to 0.99 → round UP to next whole band
    rounded = wholePart + 1.0;
  }
  
  // Ensure within valid range (0-9)
  return Math.max(0, Math.min(9, rounded));
}

// Test cases
const testCases = [
  // [L, R, W, S, Expected Overall Band, Description]
  [6.5, 6.5, 5.0, 7.0, 6.5, "Average: 6.25 → 6.5 (round to .5)"],
  [6.5, 6.5, 6.5, 6.5, 6.5, "Average: 6.50 → 6.5 (already .5)"],
  [6.5, 6.5, 5.5, 7.5, 6.5, "Average: 6.50 → 6.5 (already .5)"],
  [8.0, 7.0, 6.5, 6.5, 7.0, "Average: 7.00 → 7.0 (already whole)"],
  [4.0, 5.0, 4.0, 4.0, 4.5, "Average: 4.25 → 4.5 (round to .5)"],
  [6.5, 6.5, 5.5, 6.5, 6.5, "Average: 6.25 → 6.5 (round to .5)"],
  [7.0, 7.0, 6.5, 6.5, 7.0, "Average: 6.75 → 7.0 (round up)"],
  [7.0, 7.0, 7.0, 6.5, 7.0, "Average: 6.875 → 7.0 (round up)"],
  [6.5, 6.0, 6.0, 6.0, 6.0, "Average: 6.125 → 6.0 (round down)"],
  [5.5, 5.0, 5.0, 5.0, 5.0, "Average: 5.125 → 5.0 (round down)"],
  [6.0, 6.0, 6.0, 6.0, 6.0, "Average: 6.00 → 6.0 (already whole)"],
  [9.0, 9.0, 9.0, 9.0, 9.0, "Average: 9.00 → 9.0 (perfect score)"],
  [5.0, 5.0, 5.0, 5.0, 5.0, "Average: 5.00 → 5.0 (already whole)"],
];

console.log("=".repeat(80));
console.log("IELTS Band Score Calculation Test - Official Methodology");
console.log("=".repeat(80));
console.log("");

let passed = 0;
let failed = 0;

testCases.forEach(([l, r, w, s, expected, description], index) => {
  const result = calculateOverallBand(l, r, w, s);
  const average = (l + r + w + s) / 4;
  const isPass = result === expected;
  
  if (isPass) {
    passed++;
    console.log(`✓ Test ${index + 1}: PASSED`);
  } else {
    failed++;
    console.log(`✗ Test ${index + 1}: FAILED`);
  }
  
  console.log(`  Input: L:${l}, R:${r}, W:${w}, S:${s}`);
  console.log(`  Average: ${average.toFixed(3)}`);
  console.log(`  Expected: ${expected.toFixed(1)}`);
  console.log(`  Got: ${result.toFixed(1)}`);
  console.log(`  Description: ${description}`);
  console.log("");
});

console.log("=".repeat(80));
console.log(`Test Results: ${passed} passed, ${failed} failed out of ${testCases.length} tests`);
console.log("=".repeat(80));

// Verify all results are valid band scores (.0 or .5)
console.log("\nValidating that all results are valid band scores (.0 or .5):");
const validationTests = [
  [6.0, 6.0, 6.0, 6.0],
  [6.5, 6.5, 6.5, 6.5],
  [7.0, 6.5, 6.0, 7.5],
  [8.0, 7.5, 7.0, 8.5],
  [5.0, 5.5, 5.0, 5.5],
];

validationTests.forEach(([l, r, w, s]) => {
  const result = calculateOverallBand(l, r, w, s);
  const isValid = (result * 2) % 1 === 0; // Check if it's .0 or .5
  console.log(`  L:${l}, R:${r}, W:${w}, S:${s} → ${result.toFixed(1)} ${isValid ? '✓' : '✗'}`);
});

if (failed === 0) {
  console.log("\n🎉 All tests passed! The scoring system is working correctly.");
  process.exit(0);
} else {
  console.log("\n❌ Some tests failed. Please review the implementation.");
  process.exit(1);
}

