# Quick Reference: IELTS Scoring System

## Official IELTS Rounding Rules

### Overall Band Score Calculation (Full Mock Tests Only)

**Formula:**
```
Average = (Listening + Reading + Writing + Speaking) / 4
```

**Rounding Rules:**
| Decimal Range | Action | Example |
|--------------|--------|---------|
| 0.00 - 0.24 | Round DOWN to whole band | 6.125 → 6.0 |
| 0.25 - 0.74 | Round to .5 (half band) | 6.25 → 6.5, 6.50 → 6.5 |
| 0.75 - 0.99 | Round UP to next whole band | 6.75 → 7.0 |

---

## Band Conversion Tables

### Listening (40 Questions)

| Correct Answers | Band Score |
|----------------|------------|
| 39-40 | 9.0 |
| 37-38 | 8.5 |
| 35-36 | 8.0 |
| 32-34 | 7.5 |
| 30-31 | 7.0 |
| 26-29 | 6.5 |
| 23-25 | 6.0 |
| 18-22 | 5.5 |
| 16-17 | 5.0 |
| 13-15 | 4.5 |
| 10-12 | 4.0 |
| 6-9 | 3.5 |
| 4-5 | 3.0 |
| 0-3 | 2.5 |

### Academic Reading (40 Questions)

| Correct Answers | Band Score |
|----------------|------------|
| 39-40 | 9.0 |
| 37-38 | 8.5 |
| 35-36 | 8.0 |
| 33-34 | 7.5 |
| 30-32 | 7.0 |
| 27-29 | 6.5 |
| 23-26 | 6.0 |
| 19-22 | 5.5 |
| 15-18 | 5.0 |
| 13-14 | 4.5 |
| 10-12 | 4.0 |
| 8-9 | 3.5 |
| 6-7 | 3.0 |
| 0-5 | 2.5 |

### General Training Reading (40 Questions)

| Correct Answers | Band Score |
|----------------|------------|
| 40 | 9.0 |
| 39 | 8.5 |
| 37-38 | 8.0 |
| 36 | 7.5 |
| 34-35 | 7.0 |
| 32-33 | 6.5 |
| 30-31 | 6.0 |
| 27-29 | 5.5 |
| 23-26 | 5.0 |
| 19-22 | 4.5 |
| 15-18 | 4.0 |
| 12-14 | 3.5 |
| 9-11 | 3.0 |
| 0-8 | 2.5 |

---

## Usage Examples

### Example 1: Full Mock Test
```
Listening: 6.5
Reading: 6.5
Writing: 5.0
Speaking: 7.0

Average = (6.5 + 6.5 + 5.0 + 7.0) / 4 = 6.25
Decimal part: 0.25 (falls in 0.25-0.74 range)
Overall Band Score: 6.5
```

### Example 2: Partial Test (Listening Only)
```
Correct Answers: 30 out of 40
Band Score: 7.0 (from conversion table)
Overall Band: NOT CALCULATED (partial test)
```

### Example 3: Edge Case Rounding
```
Listening: 7.0
Reading: 7.0
Writing: 6.5
Speaking: 6.5

Average = (7.0 + 7.0 + 6.5 + 6.5) / 4 = 6.75
Decimal part: 0.75 (falls in 0.75-0.99 range)
Overall Band Score: 7.0 (rounded up)
```

---

## Important Rules

1. **Valid Band Scores:** Only .0 or .5 endings (e.g., 6.0, 6.5, 7.0)
2. **No Arbitrary Decimals:** Never display 6.3, 7.2, 6.8, etc.
3. **Partial Tests:** Display raw score + band score, NO overall band
4. **Full Mock Tests:** Display all 4 module scores + overall band
5. **Display Format:** Always use `.toFixed(1)` for consistency

---

## Code Reference

### Calculate Overall Band
```typescript
import { calculateOverallBand } from './utils/bandScoreConversion';

const overallBand = calculateOverallBand(
  listeningScore,
  readingScore,
  writingScore,
  speakingScore
);
```

### Convert Listening Score
```typescript
import { convertListeningToBand } from './utils/bandScoreConversion';

const bandScore = convertListeningToBand(correctAnswers); // 0-40
```

### Convert Reading Score (Academic)
```typescript
import { convertReadingToBand } from './utils/bandScoreConversion';

const bandScore = convertReadingToBand(correctAnswers); // 0-40
```

### Convert Reading Score (General Training)
```typescript
import { convertReadingGeneralTrainingToBand } from './utils/bandScoreConversion';

const bandScore = convertReadingGeneralTrainingToBand(correctAnswers); // 0-40
```

### Validate Band Score
```typescript
import { isValidBandScore } from './utils/bandScoreConversion';

if (isValidBandScore(score)) {
  // Score is valid (.0 or .5)
}
```

---

## Testing

Run the test script:
```bash
node test-scoring.js
```

Expected output:
```
Test Results: 13 passed, 0 failed out of 13 tests
🎉 All tests passed! The scoring system is working correctly.
```

