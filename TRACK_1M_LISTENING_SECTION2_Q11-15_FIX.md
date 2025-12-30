# Track 1-M Listening Section 2 Questions 11-15 Fix

## Issue
Questions 11-15 in Track 1-M Listening (track5.ts) Section 2 were displaying as plain text without any input boxes for students to type their answers.

## Root Cause
The `SentenceCompletionQuestion` component was designed to only insert input boxes when it detected dot patterns (like `......` or `………`) in the question text. However, questions 11-15 in Track 1-M Listening Section 2 are formatted as direct questions without any dots:

```typescript
{
  questionNumber: 11,
  text: 'What does the center provide first?'
},
{
  questionNumber: 12,
  text: 'What is important to control?'
},
// ... etc
```

Since these questions had no dots, the component didn't know where to place input boxes.

## Solution
Updated the `SentenceCompletionQuestion` component (`/app/src/components/SentenceCompletionQuestion.tsx`) to handle both scenarios:

1. **Questions WITH dots** (e.g., "The answer is ......"): Input box replaces the dots inline
2. **Questions WITHOUT dots** (e.g., "What is the answer?"): Input box appears after the question text

### Code Changes (lines 31, 63-73):
```typescript
const hasDots = dotPattern.test(text);

// ... existing code for inline dots ...

{/* If no dots found in text, add input box after the question */}
{!hasDots && (
  <input
    type="text"
    value={answers[questionNumber] || ''}
    onChange={(e) => onAnswerChange(questionNumber, e.target.value)}
    disabled={disabled}
    className="px-3 py-1 border-b-2 border-gray-400 focus:outline-none focus:border-purple-500 min-w-[150px] max-w-[250px] bg-transparent text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
    placeholder="Type answer"
    data-testid={`sentence-input-${questionNumber}`}
  />
)}
```

## Result
Now all questions 11-15 in Track 1-M Listening Section 2 display with working input boxes:

✅ Question 11: "What does the center provide first?" [input box]
✅ Question 12: "What is important to control?" [input box]
✅ Question 13: "What will be used to assess a member's fitness level?" [input box]
✅ Question 14: "How often is the exercise schedule reviewed?" [input box]
✅ Question 15: "How many exercise programs are available?" [input box]

## Impact
This fix also improves the component for ALL sentence-completion questions throughout the application that use direct question format instead of fill-in-the-blank format.

## Files Modified
- `/app/src/components/SentenceCompletionQuestion.tsx` - Lines 31, 63-73

## Testing
- Component automatically updated via Vite HMR (Hot Module Reload)
- No TypeScript compilation errors
- Input boxes now render for questions without dot patterns
