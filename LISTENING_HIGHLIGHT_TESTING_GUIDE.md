# Quick Testing Guide - Listening Track Highlight Feature

## 🧪 How to Test the Feature

### Prerequisites
- Application is running on http://localhost:3000
- You need access to a listening track exam

### Test Steps

#### Test 1: Basic Highlighting
1. **Login** to the application (as student/admin)
2. **Start a listening track** (e.g., Track 3-M Listening, Track 5-M Listening, etc.)
3. **Select any question text** by clicking and dragging
4. **Verify**: Text should be highlighted in yellow immediately
5. **Result**: ✅ Pass if text is highlighted, ❌ Fail if not

#### Test 2: Interactive Elements Not Affected
1. **Start a listening track**
2. **Try to select text in an input field**
3. **Type normally** in the input field
4. **Verify**: Input field should work normally, text should NOT be highlighted
5. **Result**: ✅ Pass if input works normally, ❌ Fail if highlighting interferes

#### Test 3: Multiple Highlights
1. **Start a listening track**
2. **Highlight different parts** of various questions
3. **Navigate to next section**
4. **Highlight more text**
5. **Go back to previous section**
6. **Verify**: All previous highlights should still be visible
7. **Result**: ✅ Pass if highlights persist, ❌ Fail if they disappear

#### Test 4: Reading Track Not Affected
1. **Start a reading track** (e.g., Track 1-M Reading)
2. **Verify**: Two-column layout with passage on left
3. **Highlight text in passage panel**
4. **Verify**: Passage highlighting still works as before
5. **Result**: ✅ Pass if reading track unchanged, ❌ Fail if broken

#### Test 5: Writing Track Not Affected
1. **Start a writing track** (e.g., Track 1-M Writing)
2. **Try to select text**
3. **Verify**: No highlighting should occur (writing tracks don't need it)
4. **Verify**: Text areas work normally for writing
5. **Result**: ✅ Pass if writing track unchanged, ❌ Fail if highlighting added

#### Test 6: Copy Protection
1. **Start a listening track**
2. **Highlight some text**
3. **Try to copy** (Ctrl+C or Cmd+C)
4. **Try to paste elsewhere**
5. **Verify**: Copy should be prevented
6. **Result**: ✅ Pass if copy blocked, ❌ Fail if copy works

#### Test 7: Different Question Types
Test highlighting on various question types:
- [ ] Multiple choice question text
- [ ] Sentence completion text
- [ ] Paragraph gap content
- [ ] Table content
- [ ] Instructions
- [ ] Flowchart text
- [ ] Section titles

#### Test 8: Mock Test Navigation
1. **Start a mock test** (Listening → Reading → Writing)
2. **In listening section**, highlight some text
3. **Submit listening section** and move to reading
4. **Return to viewing listening section** (if allowed)
5. **Verify**: Highlights should persist
6. **Result**: ✅ Pass if highlights persist, ❌ Fail if lost

---

## 🎯 Expected Behavior

### Should Work ✅
- Highlighting any text in listening track questions
- Highlighting instructions
- Highlighting paragraphs
- Highlighting table content
- Highlighting across multiple lines
- Multiple highlights in same section
- Highlights persisting during navigation

### Should NOT Work ❌ (By Design)
- Highlighting in input fields
- Highlighting in textareas
- Highlighting in select dropdowns
- Highlighting button text
- Copy/cut/paste operations
- Highlighting in reading track passage (uses existing system)
- Highlighting in writing tracks

---

## 🐛 Common Issues & Solutions

### Issue 1: Highlighting not working at all
**Possible Causes:**
- Not on a listening track
- JavaScript error in console
- Browser compatibility issue

**Check:**
- Open browser console (F12)
- Look for errors
- Verify track type is 'listening'

### Issue 2: Can't type in input fields
**This is WRONG - Should work normally**
- Input fields should be excluded from highlighting
- Check if the exclusion logic is working
- Test in different browsers

### Issue 3: Highlights disappear
**Expected if:**
- Page is refreshed (highlights are session-based)
- Exam is submitted
- User logs out

**NOT expected if:**
- Just navigating between sections
- Moving between questions

---

## 📊 Test Results Template

```
Test Date: ___________
Tester: ___________
Browser: ___________

| Test # | Description | Result | Notes |
|--------|-------------|--------|-------|
| 1 | Basic Highlighting | ⬜ Pass ⬜ Fail | |
| 2 | Interactive Elements | ⬜ Pass ⬜ Fail | |
| 3 | Multiple Highlights | ⬜ Pass ⬜ Fail | |
| 4 | Reading Track | ⬜ Pass ⬜ Fail | |
| 5 | Writing Track | ⬜ Pass ⬜ Fail | |
| 6 | Copy Protection | ⬜ Pass ⬜ Fail | |
| 7 | Question Types | ⬜ Pass ⬜ Fail | |
| 8 | Mock Test | ⬜ Pass ⬜ Fail | |

Overall Status: ⬜ All Pass ⬜ Some Fail

Issues Found:
_______________________________________________
_______________________________________________
_______________________________________________
```

---

## 🔍 Visual Inspection Checklist

When testing, visually verify:
- [ ] Yellow highlight color matches reading track highlights (#fef08a)
- [ ] Highlights are clearly visible
- [ ] Highlights don't break text layout
- [ ] Highlights don't overlap with interactive elements improperly
- [ ] Text remains readable after highlighting
- [ ] Multiple highlights don't create visual chaos

---

## 🚀 Quick Manual Test (1 Minute)

**Fastest way to verify it works:**

1. Open application
2. Login and start any listening track (e.g., Track 3-M Listening)
3. Select and highlight "Questions 1-10" title → Should turn yellow
4. Select and highlight any question instruction → Should turn yellow
5. Try to type in an answer input field → Should work normally
6. Try to copy the highlighted text → Should be prevented
7. Navigate to Section 2 and back → Highlights should persist

**If all above work: ✅ Feature is working correctly**

---

## 📞 Reporting Issues

When reporting issues, include:
1. Browser and version
2. Track being tested (e.g., "Track 5-M Listening")
3. Section number
4. Question type where issue occurred
5. Screenshot or video if possible
6. Console errors (F12 → Console tab)
7. Steps to reproduce

---

## ✨ Success Criteria

The feature is working correctly if:
- ✅ Text in listening tracks can be highlighted
- ✅ Highlights appear in yellow color
- ✅ Interactive elements (inputs, buttons) work normally
- ✅ Copy/paste is prevented for security
- ✅ Reading tracks still work with their existing highlighting
- ✅ Writing tracks remain unaffected
- ✅ Highlights persist during section navigation
- ✅ No JavaScript errors in console

---

Happy Testing! 🎉
