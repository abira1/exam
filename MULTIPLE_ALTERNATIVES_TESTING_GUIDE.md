# Multiple Alternative Answers - Testing Guide

## Date: 2025-12-23

---

## 🧪 Testing Instructions

This guide will help you test the new multiple alternative answers feature for auto-grading.

---

## Test Scenario 1: Partial Test (Listening/Reading)

### Setup

1. **Login as Admin**
2. **Navigate to:** Submissions page
3. **Find or create:** A Listening or Reading test session with student submissions

### Test Steps

#### Step 1: Open Answer Key Modal

1. Click the **"Auto-Mark"** button for a Listening or Reading session
2. Verify the modal opens with title: **"Upload Answer Key & Auto-Mark"**

#### Step 2: Verify Instructions

1. Check that instructions include:
   - ✅ "**Multiple alternatives:** Use `/` to separate alternative answers (e.g., `colour/color`)"
2. Verify the instruction has:
   - ✅ Bold text for "Multiple alternatives"
   - ✅ Code-styled `/` separator
   - ✅ Code-styled example `colour/color`

#### Step 3: Enter Answer Keys with Alternatives

Enter the following test answer keys:

| Question | Answer Key | Purpose |
|----------|-----------|---------|
| Q1 | `colour/color` | Test British/American spelling |
| Q2 | `travelling/traveling` | Test spelling variations |
| Q3 | `TRUE/T/Yes` | Test multiple forms |
| Q4 | `organise/organize` | Test British/American spelling |
| Q5 | `centre/center` | Test British/American spelling |
| Q6-40 | Any single answer | Test backward compatibility |

#### Step 4: Submit and Auto-Mark

1. Click **"Start Auto-Marking"**
2. Wait for progress to complete
3. Verify success message appears

#### Step 5: Verify Results

Check student submissions and verify:

**For Q1 (colour/color):**
- Student answered "colour" → ✅ Should be marked correct
- Student answered "color" → ✅ Should be marked correct
- Student answered "COLOUR" → ✅ Should be marked correct (case-insensitive)
- Student answered "COLOR" → ✅ Should be marked correct (case-insensitive)
- Student answered "paint" → ❌ Should be marked incorrect

**For Q2 (travelling/traveling):**
- Student answered "travelling" → ✅ Should be marked correct
- Student answered "traveling" → ✅ Should be marked correct
- Student answered "TRAVELLING" → ✅ Should be marked correct
- Student answered "journey" → ❌ Should be marked incorrect

**For Q3 (TRUE/T/Yes):**
- Student answered "TRUE" → ✅ Should be marked correct
- Student answered "T" → ✅ Should be marked correct
- Student answered "Yes" → ✅ Should be marked correct
- Student answered "yes" → ✅ Should be marked correct (case-insensitive)
- Student answered "FALSE" → ❌ Should be marked incorrect

---

## Test Scenario 2: Mock Test (Listening + Reading)

### Setup

1. **Login as Admin**
2. **Navigate to:** Submissions page
3. **Find or create:** A Mock Test session with student submissions

### Test Steps

#### Step 1: Open Mock Test Answer Key Modal

1. Click the **"Auto-Mark"** button for a Mock Test session
2. Verify the modal opens with title: **"Mock Test Auto-Marking"**

#### Step 2: Verify Instructions

1. Check that instructions include:
   - ✅ "**Multiple alternatives:** Use `/` to separate alternative answers (e.g., `travelling/traveling`)"
2. Verify the instruction has proper formatting

#### Step 3: Enter Answer Keys for Both Sections

**Listening Section:**
| Question | Answer Key |
|----------|-----------|
| Q1 | `colour/color` |
| Q2 | `travelling/traveling` |
| Q3-40 | Any single answer |

**Reading Section:**
| Question | Answer Key |
|----------|-----------|
| Q1 | `organise/organize` |
| Q2 | `centre/center` |
| Q3 | `TRUE/T/Yes` |
| Q4-40 | Any single answer |

#### Step 4: Submit and Auto-Mark

1. Click **"Start Auto-Marking"**
2. Wait for progress to complete (both sections)
3. Verify success message appears

#### Step 5: Verify Results

Check both Listening and Reading sections for correct marking.

---

## Test Scenario 3: Edge Cases

### Test 3.1: Extra Whitespace

**Answer Key:** `colour / color / colours` (with spaces)

**Expected Behavior:**
- System should trim whitespace
- All three alternatives should work: `colour`, `color`, `colours`

**Test:**
1. Enter answer key with extra spaces
2. Submit auto-marking
3. Verify student answers matching any alternative are marked correct

### Test 3.2: Case Variations in Answer Key

**Answer Key:** `COLOUR/Color/colour`

**Expected Behavior:**
- All should be converted to lowercase internally
- Student answers in any case should match

**Test:**
1. Enter answer key with mixed case
2. Submit auto-marking
3. Verify student answers in any case are marked correct

### Test 3.3: Single Answer (Backward Compatibility)

**Answer Key:** `colour` (no `/`)

**Expected Behavior:**
- Should work exactly as before
- Only exact match (case-insensitive) should be correct

**Test:**
1. Enter single answer without `/`
2. Submit auto-marking
3. Verify only matching answers are marked correct

### Test 3.4: Empty Alternatives

**Answer Key:** `colour//color` (double slash)

**Expected Behavior:**
- Empty string should be filtered out
- Only `colour` and `color` should be valid

**Test:**
1. Enter answer key with double slash
2. Submit auto-marking
3. Verify system handles it gracefully

### Test 3.5: Trailing Slash

**Answer Key:** `colour/color/` (trailing slash)

**Expected Behavior:**
- Empty string at end should be filtered out
- Only `colour` and `color` should be valid

**Test:**
1. Enter answer key with trailing slash
2. Submit auto-marking
3. Verify system handles it gracefully

---

## Test Scenario 4: Real-World Examples

### Example 1: British vs American Spelling

**Questions with alternatives:**
- `colour/color`
- `honour/honor`
- `favour/favor`
- `labour/labor`
- `neighbour/neighbor`
- `behaviour/behavior`
- `flavour/flavor`
- `harbour/harbor`

### Example 2: Spelling Variations

**Questions with alternatives:**
- `travelling/traveling`
- `cancelled/canceled`
- `labelled/labeled`
- `modelling/modeling`
- `counsellor/counselor`

### Example 3: True/False Questions

**Questions with alternatives:**
- `TRUE/T/Yes/Y`
- `FALSE/F/No/N`
- `NOT GIVEN/NG/Not Given`

---

## ✅ Verification Checklist

### UI Verification
- [ ] Instructions display correctly in partial test modal
- [ ] Instructions display correctly in mock test modal
- [ ] Code-styled examples are visible
- [ ] Bold text for "Multiple alternatives" is visible

### Functionality Verification
- [ ] Single answer still works (backward compatibility)
- [ ] Multiple alternatives work with `/` separator
- [ ] Case-insensitive comparison works
- [ ] Whitespace is trimmed correctly
- [ ] Empty strings are filtered out
- [ ] Partial test auto-marking works
- [ ] Mock test Listening auto-marking works
- [ ] Mock test Reading auto-marking works

### Edge Cases Verification
- [ ] Extra whitespace handled correctly
- [ ] Case variations in answer key handled correctly
- [ ] Double slash handled correctly
- [ ] Trailing slash handled correctly
- [ ] Leading slash handled correctly

---

## 🐛 Troubleshooting

### Issue: Alternative answers not being marked correct

**Check:**
1. Verify answer key has `/` separator (not `\` or `|`)
2. Check for typos in answer key
3. Verify student answer exactly matches one alternative (after trimming and lowercasing)

### Issue: Instructions not showing

**Check:**
1. Clear browser cache
2. Refresh the page
3. Verify you're using the latest version of the code

### Issue: Auto-marking fails

**Check:**
1. Check browser console for errors
2. Verify all questions have answer keys
3. Check network tab for API errors

---

## 📊 Expected Results Summary

| Test Case | Answer Key | Student Answer | Expected Result |
|-----------|-----------|----------------|-----------------|
| Basic alternative | `colour/color` | `colour` | ✅ Correct |
| Basic alternative | `colour/color` | `color` | ✅ Correct |
| Case insensitive | `colour/color` | `COLOUR` | ✅ Correct |
| Case insensitive | `colour/color` | `COLOR` | ✅ Correct |
| No match | `colour/color` | `paint` | ❌ Incorrect |
| Multiple alternatives | `TRUE/T/Yes` | `yes` | ✅ Correct |
| Whitespace | `colour / color` | `color` | ✅ Correct |
| Single answer | `colour` | `colour` | ✅ Correct |
| Single answer | `colour` | `color` | ❌ Incorrect |

---

## 🎉 Success Criteria

The implementation is successful if:

1. ✅ All test scenarios pass
2. ✅ No TypeScript errors
3. ✅ No runtime errors
4. ✅ UI instructions are clear and visible
5. ✅ Backward compatibility maintained
6. ✅ Edge cases handled gracefully
7. ✅ Auto-marking completes successfully
8. ✅ Results are accurate

---

**Status:** Ready for testing!


