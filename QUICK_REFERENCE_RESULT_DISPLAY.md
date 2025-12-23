# Quick Reference: Result Display Implementation

## For Developers

---

## 1. How to Display Band Scores for Partial Tests

### Step 1: Import the Conversion Functions
```typescript
import { convertListeningToBand, convertReadingToBand } from '../../utils/bandScoreConversion';
```

### Step 2: Get the Track Type
```typescript
const trackType = submission.trackType; // 'listening' | 'reading' | 'writing' | 'mock'
```

### Step 3: Calculate Correct Answers
```typescript
const correctAnswers = Object.values(submission.marks || {})
  .filter(m => m === 'correct').length;
```

### Step 4: Calculate Band Score
```typescript
let bandScore: number | null = null;

if (trackType === 'listening') {
  bandScore = convertListeningToBand(correctAnswers);
} else if (trackType === 'reading') {
  bandScore = convertReadingToBand(correctAnswers);
}
```

### Step 5: Display the Band Score
```typescript
{bandScore !== null && (
  <div>
    <p>IELTS Band Score</p>
    <div className="text-7xl font-bold">
      {bandScore.toFixed(1)}
    </div>
  </div>
)}
```

---

## 2. Complete Example: Partial Test Display

```typescript
// In your component
const renderPartialTestScore = () => {
  const correctAnswers = Object.values(submission.marks || {})
    .filter(m => m === 'correct').length;
  const totalQuestions = submission.totalQuestions || 40;
  const trackType = submission.trackType;
  
  // Calculate band score
  let bandScore: number | null = null;
  let testLabel = 'Test Result';
  
  if (trackType === 'listening') {
    bandScore = convertListeningToBand(correctAnswers);
    testLabel = '🎧 Listening Test Result';
  } else if (trackType === 'reading') {
    bandScore = convertReadingToBand(correctAnswers);
    testLabel = '📖 Reading Test Result';
  }
  
  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-8 text-white">
      <h2 className="text-2xl font-bold mb-4">{testLabel}</h2>
      
      {/* Raw Score */}
      <div className="mb-6">
        <p className="text-sm mb-2 uppercase">Raw Score</p>
        <div className="text-6xl font-bold">
          {correctAnswers}<span className="text-3xl">/{totalQuestions}</span>
        </div>
      </div>
      
      {/* Band Score */}
      {bandScore !== null && (
        <div className="border-t-2 border-blue-400 pt-6">
          <p className="text-sm mb-2 uppercase">IELTS Band Score</p>
          <div className="text-7xl font-bold">
            {bandScore.toFixed(1)}
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## 3. Print Preview Implementation

### Add Print Styles
```typescript
<style>{`
  @media print {
    @page {
      size: A4;
      margin: 15mm;
    }
    .print\\:hidden {
      display: none !important;
    }
  }
`}</style>
```

### Print Button
```typescript
<button onClick={() => window.print()}>
  🖨️ Print Result
</button>
```

---

## 4. Track Type Reference

### ExamSubmission Interface
```typescript
interface ExamSubmission {
  trackType?: 'listening' | 'reading' | 'writing' | 'mock';
  testType?: 'partial' | 'mock';
  marks?: Record<number | string, 'correct' | 'incorrect' | null>;
  // ... other fields
}
```

### Track Type Values
- `'listening'` - Listening test (shows band score)
- `'reading'` - Reading test (shows band score)
- `'writing'` - Writing test (shows percentage only)
- `'mock'` - Full mock test (shows overall + section bands)

---

## 5. Band Score Conversion Functions

### convertListeningToBand(correctAnswers: number): number
- **Input:** Number of correct answers (0-40)
- **Output:** IELTS band score (0-9, in 0.5 increments)
- **Example:** `convertListeningToBand(35)` → `8.0`

### convertReadingToBand(correctAnswers: number): number
- **Input:** Number of correct answers (0-40)
- **Output:** IELTS band score (0-9, in 0.5 increments)
- **Example:** `convertReadingToBand(30)` → `7.0`

### convertReadingGeneralTrainingToBand(correctAnswers: number): number
- **Input:** Number of correct answers (0-40)
- **Output:** IELTS band score (0-9, in 0.5 increments)
- **Example:** `convertReadingGeneralTrainingToBand(34)` → `7.0`

---

## 6. Common Patterns

### Pattern 1: Conditional Band Score Display
```typescript
{trackType === 'listening' || trackType === 'reading' ? (
  <div>Band Score: {bandScore?.toFixed(1)}</div>
) : (
  <div>Percentage: {percentage}%</div>
)}
```

### Pattern 2: Test Type Label
```typescript
const getTestLabel = (trackType: string) => {
  switch (trackType) {
    case 'listening': return '🎧 Listening Test Result';
    case 'reading': return '📖 Reading Test Result';
    case 'writing': return '✍️ Writing Test Result';
    case 'mock': return 'IELTS Mock Test Result';
    default: return 'Test Result';
  }
};
```

### Pattern 3: Calculate Correct Answers
```typescript
const getCorrectAnswers = (marks: Record<number | string, string>) => {
  return Object.values(marks || {}).filter(m => m === 'correct').length;
};
```

---

## 7. Styling Guidelines

### Font Sizes
- Test Label: `text-2xl` (student) / `text-lg` (print)
- Raw Score: `text-6xl`
- Band Score: `text-7xl` (student) / `text-8xl` (print)
- Labels: `text-sm uppercase tracking-wider`

### Colors
- Student Dashboard: Gradient blue background, white text
- Print Preview: White background, gray-900 text, gray-900 borders

### Spacing
- Section padding: `p-8` (student) / `p-6` (print)
- Section margin: `mb-6`
- Divider: `border-t-2` (student) / `border-t-4` (print)

---

## 8. Testing Checklist

### Before Committing
- [ ] Band score displays correctly for Listening tests
- [ ] Band score displays correctly for Reading tests
- [ ] Percentage displays for Writing tests
- [ ] Mock tests show overall + section bands
- [ ] All scores use `.toFixed(1)` formatting
- [ ] Print preview shows band scores
- [ ] A4 sizing works in print preview
- [ ] No TypeScript errors
- [ ] No console errors

---

## 9. Troubleshooting

### Issue: Band score not showing
**Check:**
- Is `trackType` set correctly?
- Are `marks` populated?
- Is `convertListeningToBand` or `convertReadingToBand` imported?

### Issue: Print layout broken
**Check:**
- Is `@page { size: A4; margin: 15mm; }` in print styles?
- Are non-printable elements using `print:hidden`?
- Is content width appropriate for A4?

### Issue: Wrong band score
**Check:**
- Are you using the correct conversion function?
- Is `correctAnswers` calculated correctly?
- Are you using `.toFixed(1)` for display?

---

## 10. Related Files

- `src/utils/bandScoreConversion.ts` - Band score conversion functions
- `src/pages/student/ResultDetailPage.tsx` - Student result display
- `src/components/PrintableResult.tsx` - Print preview component
- `src/utils/storage.ts` - ExamSubmission interface

---

**Quick Tips:**
- Always use `.toFixed(1)` when displaying band scores
- Check `trackType` before calculating band scores
- Use official conversion functions from `bandScoreConversion.ts`
- Test print preview in multiple browsers
- Verify A4 sizing with actual print output

