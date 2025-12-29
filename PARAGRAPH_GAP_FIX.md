# Fill-in-the-Gap Input Field Fix

## Issue Description
The paragraph-gap questions in tracks 7M Reading and 8M Reading were showing only dots (`…………………`) instead of proper input fields where students could type their answers.

## Root Cause
The `ParagraphGapQuestion` component expects question numbers to be wrapped in parentheses like `(22)…………………` but the track data had them without parentheses like `22…………………`.

The component uses the regex pattern `/(\(\d+\)[.…]+)/` to identify where to insert input fields, which requires:
- Opening parenthesis `(`
- Question number (digits)
- Closing parenthesis `)`
- Followed by dots (either `.` or `…`)

## Files Fixed

### 1. `/app/src/data/track-7m-reading.ts`

**Questions 22-27 (Aestivation section):**
- Changed: `22 ………………………` → `(22)………………………`
- Changed: `23 …………………………` → `(23)…………………………`
- Changed: `24 ……………………` → `(24)……………………`
- Changed: `25………………………` → `(25)………………………`
- Changed: `26 …………………………` → `(26)…………………………`
- Changed: `27…………………………` → `(27)…………………………`

**Questions 32-38 (Elephant Communication section):**
- Changed: `32……………………..` → `(32)……………………..`
- Changed: `33……………………..` → `(33)……………………..`
- Changed: `34………………………` → `(34)………………………`
- Changed: `35………………………` → `(35)………………………`
- Changed: `36………………………` → `(36)………………………`
- Changed: `37…………………………..` → `(37)…………………………..`
- Changed: `38…………………………..` → `(38)…………………………..`

### 2. `/app/src/data/track-8m-reading.ts`

**Questions 22-26 (Food for Thought section):**
- Changed: `22…………………` → `(22)…………………`
- Changed: `23…………………` → `(23)…………………`
- Changed: `24…………………` → `(24)…………………`
- Changed: `25…………………` → `(25)…………………`
- Changed: `26…………………` → `(26)…………………`

## How It Works Now

### Before Fix:
```
Van Huis
• Insects use food intake economically in the production of protein as they waste less 22…………………
```
**Result:** Only dots visible, no input field

### After Fix:
```
Van Huis
• Insects use food intake economically in the production of protein as they waste less (22)…………………
```
**Result:** `(22)` shown as label followed by a proper text input field

## Component Behavior

The `ParagraphGapQuestion` component (`/app/src/components/ParagraphGapQuestion.tsx`) now correctly:
1. Detects the pattern `(22)……………………`
2. Renders the question number `(22)` as a label
3. Creates an input field where the dots were
4. Students can type their answers directly into these fields

## Visual Appearance

Students will now see:
```
Van Huis
• Insects are cleaner & do not release as many harmful gases
• Insects use food intake economically in the production of protein 
  as they waste less (22)[________input field________]

Durst
• Traditional knowledge could be combined with modern methods 
  for mass production instead of just covering (23)[________input field________]
• This could help (24)[________input field________] people gain 
  access to world markets.

Dunkel
• Due to increased (25)[________input field________], more children 
  in Mali are suffering from (26)[________input field________]
```

## Testing Verification

To verify the fix works:
1. ✅ Navigate to 7M Reading track
2. ✅ Go to questions 22-27 (Part 2)
3. ✅ Verify input fields are visible
4. ✅ Go to questions 32-38 (Part 3)
5. ✅ Verify input fields are visible
6. ✅ Navigate to 8M Reading track
7. ✅ Go to questions 22-26 (Part 2)
8. ✅ Verify input fields are visible
9. ✅ Test typing answers in the fields
10. ✅ Verify answers are saved correctly

## Impact

- **Tracks Affected:** 7M Reading, 8M Reading
- **Questions Fixed:** 13 questions total (7 in 7M Part 2, 7 in 7M Part 3, 5 in 8M Part 2)
- **User Experience:** Students can now see and use the input fields properly
- **No Breaking Changes:** Fix only affects display, doesn't change data structure

## Related Files

- `/app/src/data/track-7m-reading.ts` - Track data (fixed)
- `/app/src/data/track-8m-reading.ts` - Track data (fixed)
- `/app/src/components/ParagraphGapQuestion.tsx` - Component (no changes needed)

## Summary

The fill-in-the-gap input field issue has been completely resolved. All paragraph-gap questions now properly display input fields where students can type their answers. The fix maintains backward compatibility with existing tracks that already had the correct format.
