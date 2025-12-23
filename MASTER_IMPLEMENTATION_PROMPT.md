# 🎓 MASTER IMPLEMENTATION PROMPT: Student Management & Submission System Overhaul

## 📌 PROJECT OVERVIEW
Transform the current IELTS Listening Exam system into a comprehensive, role-based platform with complete student management, authentication, and advanced submission tracking.

---

## 🎯 CORE OBJECTIVES

### **Replace Current System:**
- Remove "quick start" guest mode
- Implement mandatory student authentication
- Add role-based access (Admin, Teacher, Student)

### **New Features to Build:**
1. Complete student management system
2. Student authentication & dashboard
3. Batch management
4. Exam session management with unique exam codes
5. Track-based submission organization
6. Teacher dashboard with grading capabilities
7. Student performance analytics with graphs
8. CSV export functionality

---

## 📊 DATABASE SCHEMA

### **1. Students Collection (`/students/{studentId}`)**
```javascript
{
  studentId: "STU2025001",           // Auto-generated: STU{YEAR}{5-digit-increment}
  password: "hashed_password",        // bcrypt hash
  name: "John Doe",
  email: "john@example.com",
  mobile: "+1234567890",
  batch: "Morning Batch A",
  batchId: "BATCH2025001",
  enrollmentDate: "2025-01-09T00:00:00Z",
  status: "active",                   // active | inactive
  createdAt: timestamp,
  updatedAt: timestamp,
  createdBy: "admin_user_id"
}
```

### **2. Batches Collection (`/batches/{batchId}`)**
```javascript
{
  batchId: "BATCH2025001",           // Auto-generated: BATCH{YEAR}{4-digit-increment}
  batchName: "Morning Batch A",
  startDate: "2025-01-15",
  endDate: "2025-06-15",
  schedule: "Mon-Fri 9AM-12PM",      // Optional description
  totalStudents: 30,
  assignedTracks: ["track-1", "track-2", "track-4"],
  status: "active",                   // active | completed | upcoming
  createdAt: timestamp,
  createdBy: "admin_user_id"
}
```

### **3. Exam Sessions Collection (`/examSessions/{examCode}`)**
```javascript
{
  examCode: "4M-20250109-001",       // Format: {TrackShortName}-{YYYYMMDD}-{3-digit-increment}
  trackId: "track-4",
  trackName: "4-M Listening",
  date: "2025-01-09",
  startTime: "10:00",
  endTime: "11:00",
  duration: 60,                       // minutes
  status: "scheduled",                // scheduled | active | completed
  allowedBatches: ["BATCH2025001", "BATCH2025002"],
  totalSubmissions: 25,
  pendingResults: 5,
  gradedResults: 15,
  publishedResults: 5,
  audioURL: "https://firebase.storage...",
  createdBy: "admin_user_id",
  createdAt: timestamp,
  startedAt: timestamp,               // When exam actually started
  completedAt: timestamp              // When exam was stopped
}
```

### **4. Submissions Collection (Enhanced) (`/submissions/{submissionId}`)**
```javascript
{
  submissionId: "auto_generated_id",
  examCode: "4M-20250109-001",
  examSessionId: "session_doc_id",
  studentId: "STU2025001",
  studentName: "John Doe",
  studentEmail: "john@example.com",
  batch: "Morning Batch A",
  batchId: "BATCH2025001",
  trackId: "track-4",
  trackName: "4-M Listening",
  answers: {
    1: "answer1",
    2: "answer2",
    // ... all 40 answers
  },
  score: 35,
  totalQuestions: 40,
  percentage: 87.5,
  submittedAt: timestamp,
  resultStatus: "pending",            // pending | graded | published
  gradedBy: "teacher_user_id",        // User ID who graded
  gradedAt: timestamp,
  publishedBy: "admin_user_id",
  publishedAt: timestamp,
  detailedResults: {
    section1: {
      correct: 8,
      incorrect: 2,
      unanswered: 0,
      answers: {1: "correct", 2: "incorrect", ...}
    },
    section2: {correct: 7, incorrect: 3, unanswered: 0},
    section3: {correct: 9, incorrect: 1, unanswered: 0},
    section4: {correct: 8, incorrect: 2, unanswered: 0}
  },
  teacherComments: "Good performance overall",
  timeSpent: "58m 32s"
}
```

### **5. Users Collection (Admin & Teachers) (`/users/{userId}`)**
```javascript
{
  userId: "auto_generated_id",
  username: "admin_user",            // Unique username for login
  password: "hashed_password",       // bcrypt hash
  role: "admin",                     // admin | teacher
  name: "Admin Name",
  email: "admin@example.com",
  status: "active",                  // active | inactive
  permissions: {
    manageStudents: true,
    manageBatches: true,
    manageTracks: true,
    manageAudio: true,
    createExamSessions: true,
    viewAllSubmissions: true,
    gradeSubmissions: true,
    publishResults: true,
    exportResults: true,
    manageUsers: true                // Only for admin
  },
  assignedTracks: [],                // For teachers: ["track-1", "track-4"]
  createdAt: timestamp,
  lastLoginAt: timestamp
}
```

**Default Admin Account:**
```javascript
{
  username: "admin",
  password: "admin123",              // Change after first login
  role: "admin",
  name: "System Administrator",
  email: "admin@system.com"
}
```

---

## 🏗️ IMPLEMENTATION PHASES

### **PHASE 1: Authentication & User Management Foundation**

#### **Task 1.1: Firebase Database Setup**
- Create all collections in Firebase Realtime Database
- Set up database rules for role-based access
- Create seed data for testing

#### **Task 1.2: Backend API for User Management**
**Create `/app/backend/auth.py` (if using Python backend) OR handle in Firebase:**
- Student registration endpoint
- Student login endpoint (validate credentials, return JWT)
- Admin/Teacher login endpoint
- Password reset functionality
- Role validation middleware

#### **Task 1.3: Admin/Teacher Login Enhancement**
**Update `/app/src/components/AdminLogin.tsx`:**
- Rename to `StaffLogin.tsx` (handles both Admin and Teacher)
- Add role detection after login
- Store user role in context/localStorage
- Redirect to appropriate dashboard based on role

#### **Task 1.4: Student Login Component**
**Create `/app/src/components/StudentLogin.tsx`:**
- Student ID input field
- Password input field
- Login button
- Error handling
- "Forgot Password?" link (future feature)
- Clean, student-friendly UI

#### **Task 1.5: Authentication Context**
**Create `/app/src/contexts/AuthContext.tsx`:**
```typescript
interface AuthContextType {
  user: User | null;
  role: 'admin' | 'teacher' | 'student' | null;
  login: (credentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

#### **Task 1.6: Protected Routes**
**Create `/app/src/components/ProtectedRoute.tsx`:**
- Check authentication status
- Verify role-based access
- Redirect unauthorized users

---

### **PHASE 2: Student Management System (Admin)**

#### **Task 2.1: Students List Page**
**Create `/app/src/pages/admin/StudentsPage.tsx`:**

**Features:**
- Display all students in a table/card grid
- Columns: Student ID, Name, Email, Mobile, Batch, Status, Actions
- Search bar (search by name, ID, email)
- Filter dropdowns (by batch, status)
- Pagination (20 students per page)
- Sort options (by name, ID, enrollment date)
- "Add New Student" button (opens modal/form)
- Bulk actions (activate/deactivate selected students)

**UI Design:**
```
+------------------------------------------------------------------+
| 👥 Students Management                          [+ Add Student]  |
+------------------------------------------------------------------+
| 🔍 Search: [____________]  Batch: [All ▼]  Status: [All ▼]      |
+------------------------------------------------------------------+
| ID         | Name       | Email         | Batch    | Status | ⚙️  |
|------------|------------|---------------|----------|--------|-----|
| STU2025001 | John Doe   | john@mail.com | Batch A  | Active | ... |
| STU2025002 | Jane Smith | jane@mail.com | Batch B  | Active | ... |
+------------------------------------------------------------------+
| Showing 1-20 of 125 students          < 1 2 3 4 5 >             |
+------------------------------------------------------------------+
```

#### **Task 2.2: Add Student Modal/Form**
**Create `/app/src/components/admin/AddStudentModal.tsx`:**

**Form Fields:**
- Name (required, text input)
- Email (required, email validation)
- Mobile (required, phone validation)
- Batch (required, dropdown from Batches collection)
- Status (active/inactive, default: active)

**Auto-generation Logic:**
- Student ID: Generate format `STU{YEAR}{INCREMENT}` (e.g., STU2025001)
  - Query last student ID from database
  - Increment by 1
  - Pad with zeros to 5 digits
- Password: Generate random 8-character alphanumeric password
  - OR allow admin to set custom password
  - Hash password before storing

**After Submission:**
- Show success modal with generated credentials:
  ```
  ✅ Student Created Successfully!
  
  Student ID: STU2025001
  Password: Abc12345
  
  ⚠️ Please save these credentials and provide them to the student.
  
  [Copy Credentials] [Print Student Card] [Close]
  ```
- Option to send credentials via email (future feature)
- Option to print student card with ID and password

#### **Task 2.3: Student Profile Page**
**Create `/app/src/pages/admin/StudentProfilePage.tsx`:**

**URL:** `/admin/students/{studentId}`

**Layout:**

**Top Section - Student Info Card:**
```
+------------------------------------------------------------------+
| 👤 Student Profile                                               |
+------------------------------------------------------------------+
| Name: John Doe                    Student ID: STU2025001         |
| Email: john@example.com           Password: ********  [👁️ Show]  |
| Mobile: +1234567890               Status: ✅ Active              |
| Batch: Morning Batch A            Enrolled: Jan 1, 2025          |
|                                                                  |
| [Edit Profile] [Reset Password] [Deactivate] [Delete]           |
+------------------------------------------------------------------+
```

**Middle Section - Submission History:**
```
+------------------------------------------------------------------+
| 📊 Submission History                                            |
+------------------------------------------------------------------+
| Exam Code       | Track          | Date       | Score  | Status  |
|-----------------|----------------|------------|--------|---------|
| 4M-20250109-001 | 4-M Listening  | Jan 9      | 35/40  | Published|
| AL-20250105-001 | Academic L.    | Jan 5      | 38/40  | Published|
+------------------------------------------------------------------+
```

**Bottom Section - Performance Graph:**
```
+------------------------------------------------------------------+
| 📈 Performance Trend                                             |
+------------------------------------------------------------------+
| [Line chart showing score progression over time]                 |
+------------------------------------------------------------------+
```

#### **Task 2.4: Edit Student Modal**
- Pre-fill form with current student data
- Allow editing: Name, Email, Mobile, Batch, Status
- Do NOT allow editing Student ID
- Update database on save

#### **Task 2.5: Delete Student Confirmation**
- Show warning modal
- Option to "Delete" or "Deactivate"
- If delete: Remove from database (or soft delete by setting deleted: true)
- If deactivate: Update status to "inactive"

---

### **PHASE 3: Batch Management System (Admin)**

#### **Task 3.1: Batches List Page**
**Create `/app/src/pages/admin/BatchesPage.tsx`:**

**Features:**
- Display all batches in card grid
- Each card shows:
  - Batch name
  - Date range (start - end)
  - Total students
  - Assigned tracks count
  - Status
- "Create New Batch" button
- Edit/Delete actions per batch

**UI Design:**
```
+------------------+  +------------------+  +------------------+
| Morning Batch A  |  | Evening Batch B  |  | Weekend Batch    |
| BATCH2025001     |  | BATCH2025002     |  | BATCH2025003     |
|                  |  |                  |  |                  |
| 👥 30 Students   |  | 👥 25 Students   |  | 👥 15 Students   |
| 📚 3 Tracks      |  | 📚 4 Tracks      |  | 📚 2 Tracks      |
| 🟢 Active        |  | 🟢 Active        |  | 🟡 Upcoming      |
| Jan 15 - Jun 15  |  | Jan 20 - Jun 20  |  | Feb 1 - Jul 1    |
|                  |  |                  |  |                  |
| [View] [Edit]    |  | [View] [Edit]    |  | [View] [Edit]    |
+------------------+  +------------------+  +------------------+
```

#### **Task 3.2: Create/Edit Batch Modal**
**Create `/app/src/components/admin/BatchModal.tsx`:**

**Form Fields:**
- Batch Name (required)
- Start Date (date picker)
- End Date (date picker)
- Schedule Description (optional, e.g., "Mon-Fri 9AM-12PM")
- Assigned Tracks (multi-select checkboxes from available tracks)
- Status (active/upcoming/completed)

**Auto-generation:**
- Batch ID: `BATCH{YEAR}{INCREMENT}` (e.g., BATCH2025001)

#### **Task 3.3: Batch Detail View**
**Create `/app/src/pages/admin/BatchDetailPage.tsx`:**

**Show:**
- Batch information
- List of students in this batch
- Assigned tracks
- Upcoming exams for this batch
- Overall batch performance statistics

---

### **PHASE 4: Exam Session Management (Admin)**

#### **Task 4.1: Enhanced Exam Control Page**
**Update `/app/src/pages/AdminDashboard.tsx` → Split into modular pages**

**Create `/app/src/pages/admin/ExamControlPage.tsx`:**

**Section 1: Create New Exam Session**

**UI Design:**
```
+------------------------------------------------------------------+
| 📝 Create New Exam Session                                       |
+------------------------------------------------------------------+
| Select Track: [4-M Listening ▼]                                  |
| Exam Code: 4M-20250110-001 (Auto-generated) [Regenerate]        |
| Date: [2025-01-10 📅]                                            |
| Start Time: [10:00 🕐]                                           |
| Duration: [60] minutes                                           |
| Allowed Batches: [✓ Batch A] [✓ Batch B] [ ] Batch C            |
| Audio File: [Current: 4m-audio.mp3] [Change Audio]              |
|                                                                  |
| [Preview Session] [Create & Schedule] [Create & Start Now]      |
+------------------------------------------------------------------+
```

**Exam Code Generation Logic:**
```javascript
// Format: {TrackShortName}-{YYYYMMDD}-{3-digit-increment}
// Example: 4M-20250110-001

function generateExamCode(trackId, date) {
  const track = getTrackById(trackId);
  const shortName = track.shortName; // "4M", "AL", "GL", etc.
  const dateStr = format(date, 'YYYYMMDD');
  
  // Query existing exam codes for this track and date
  const existingCodes = queryExamCodes(`${shortName}-${dateStr}-*`);
  const increment = existingCodes.length + 1;
  const incrementStr = String(increment).padStart(3, '0');
  
  return `${shortName}-${dateStr}-${incrementStr}`;
}
```

**Section 2: Active Exam Sessions**
```
+------------------------------------------------------------------+
| 🟢 Active Exam Sessions                                          |
+------------------------------------------------------------------+
| Exam Code       | Track          | Started  | Students | Time    |
|-----------------|----------------|----------|----------|---------|
| 4M-20250110-001 | 4-M Listening  | 10:00 AM | 15/30    | 45:23   |
|                 |                |          |          | [Stop]  |
+------------------------------------------------------------------+
```

**Section 3: Scheduled Exams**
```
+------------------------------------------------------------------+
| 📅 Scheduled Exams                                               |
+------------------------------------------------------------------+
| Exam Code       | Track          | Date     | Time  | Batches   |
|-----------------|----------------|----------|-------|-----------|
| 4M-20250111-001 | 4-M Listening  | Jan 11   | 10 AM | A, B      |
| AL-20250112-001 | Academic L.    | Jan 12   | 2 PM  | C         |
|                                               [Edit] [Start] [Delete]|
+------------------------------------------------------------------+
```

**Section 4: Completed Exams**
```
+------------------------------------------------------------------+
| ✅ Recently Completed Exams                                      |
+------------------------------------------------------------------+
| Exam Code       | Track          | Date     | Submissions       |
|-----------------|----------------|----------|-------------------|
| 4M-20250109-001 | 4-M Listening  | Jan 9    | 25 (20 graded)    |
| GL-20250108-001 | General L.     | Jan 8    | 18 (18 published) |
|                                               [View Submissions]  |
+------------------------------------------------------------------+
```

#### **Task 4.2: Track Short Names**
**Update track data files to include short names:**

```javascript
// In track1.ts, track2.ts, etc.
export const track1: Track = {
  id: 'track-1',
  name: 'General Listening',
  shortName: 'GL',  // ADD THIS
  // ... rest of data
};

export const track4: Track = {
  id: 'track-4',
  name: '4-M Listening',
  shortName: '4M',  // ADD THIS
  // ... rest of data
};
```

---

### **PHASE 5: Redesigned Submissions Manager (Track-Based)**

#### **Task 5.1: Submissions Landing Page - Track Cards View**
**Create `/app/src/pages/admin/SubmissionsPage.tsx`:**

**UI Design:**
```
+------------------------------------------------------------------+
| 📊 Submissions Manager                                           |
+------------------------------------------------------------------+

+------------------+  +------------------+  +------------------+
| Track 1          |  | Track 2          |  | Track 4          |
| General L.       |  | Academic L.      |  | 4-M Listening    |
|                  |  |                  |  |                  |
| 📊 125 Total     |  | 📊 98 Total      |  | 📊 156 Total     |
| ✅ 100 Graded    |  | ✅ 85 Graded     |  | ✅ 140 Graded    |
| ⏳ 25 Pending    |  | ⏳ 13 Pending    |  | ⏳ 16 Pending     |
| 🟢 Exam Active   |  | 🔴 No Active Exam|  | 🟢 Exam Active   |
|                  |  |                  |  |                  |
| [View Details]   |  | [View Details]   |  | [View Details]   |
+------------------+  +------------------+  +------------------+
```

**Card Data Logic:**
```javascript
// For each track, calculate:
- Total submissions: Count all submissions for this track
- Graded: Count submissions with resultStatus === 'graded'
- Pending: Count submissions with resultStatus === 'pending'
- Active exam status: Check if any exam session for this track has status === 'active'
```

#### **Task 5.2: Exam Sessions List (After Clicking Track)**
**Create `/app/src/pages/admin/TrackSubmissionsPage.tsx`:**

**URL:** `/admin/submissions/{trackId}`

**UI Design:**
```
+------------------------------------------------------------------+
| 📊 Submissions: 4-M Listening                      [← Back]      |
+------------------------------------------------------------------+
| Filter: [All Time ▼] [All Batches ▼] [All Status ▼]             |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| Exam Code       | Date       | Batch      | Submissions | Status|
|-----------------|------------|------------|-------------|-------|
| 4M-20250110-001 | Jan 10     | A, B       | 28/30       | Active|
|                                            [View] [Stop Exam]    |
|-----------------|------------|------------|-------------|-------|
| 4M-20250109-001 | Jan 9      | A          | 25/25       | Graded|
|                                   [View Submissions] [Export CSV]|
|-----------------|------------|------------|-------------|-------|
| 4M-20250108-001 | Jan 8      | B          | 18/20       | Pending|
|                                   [View Submissions] [Export CSV]|
|-----------------|------------|------------|-------------|-------|
| 4M-20250105-001 | Jan 5      | A          | 30/30       |Published|
|                                   [View Submissions] [Export CSV]|
+------------------------------------------------------------------+
```

#### **Task 5.3: Submissions List (After Clicking Exam Session)**
**Create `/app/src/pages/admin/SessionSubmissionsPage.tsx`:**

**URL:** `/admin/submissions/{trackId}/{examCode}`

**UI Design:**
```
+------------------------------------------------------------------+
| Exam: 4M-20250109-001 | Track: 4-M Listening | Date: Jan 9, 2025|
| Status: Completed | Students: 25/25 | Graded: 20 | Pending: 5   |
+------------------------------------------------------------------+
| [Export to CSV] [Publish All Graded Results] [← Back]           |
+------------------------------------------------------------------+
| 🔍 Search: [____________]  Status: [All ▼]  Sort: [Score ▼]     |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| Student ID  | Name       | Batch   | Score | Status  | Actions  |
|-------------|------------|---------|-------|---------|----------|
| STU2025001  | John Doe   | Batch A | 35/40 | Published| View Edit|
| STU2025002  | Jane Smith | Batch A | 38/40 | Graded  | View Publish|
| STU2025003  | Bob Wilson | Batch A | -/40  | Pending | View Grade|
| STU2025004  | Alice Brown| Batch B | 32/40 | Graded  | View Publish|
+------------------------------------------------------------------+
```

**Actions:**
- **View**: Open submission detail page (read-only if published)
- **Edit/Grade**: Open grading interface (if pending or graded)
- **Publish**: Publish individual result (if graded)
- **Publish All Graded**: Bulk publish all submissions with status "graded"

#### **Task 5.4: Submission Detail & Grading Page**
**Create `/app/src/pages/admin/SubmissionDetailPage.tsx`:**

**URL:** `/admin/submissions/{trackId}/{examCode}/{submissionId}`

**Layout:**

**Top Section - Student & Exam Info:**
```
+------------------------------------------------------------------+
| Student: John Doe (STU2025001) | Batch: Morning Batch A         |
| Email: john@example.com | Mobile: +1234567890                    |
|                                                                  |
| Exam: 4M-20250109-001 | Track: 4-M Listening | Date: Jan 9, 2025|
| Submitted: Jan 9, 2025 10:58 AM | Time Taken: 58m 32s            |
| Score: 35/40 (87.5%) | Status: Graded                            |
+------------------------------------------------------------------+
```

**Answer Sheet Section:**
```
+------------------------------------------------------------------+
| 📝 Answer Sheet                                                  |
+------------------------------------------------------------------+
| SECTION 1 (Score: 8/10)                                          |
+------------------------------------------------------------------+
| Q1: Student Answer: "January 15"    ✅ Correct                   |
| Q2: Student Answer: "12 people"     ✅ Correct                   |
| Q3: Student Answer: "50 kilometers" ❌ Incorrect (Correct: 60km) |
| ...                                                              |
+------------------------------------------------------------------+
| SECTION 2 (Score: 7/10)                                          |
| ...                                                              |
+------------------------------------------------------------------+
```

**Section-wise Breakdown:**
```
+------------------------------------------------------------------+
| 📊 Section-wise Performance                                      |
+------------------------------------------------------------------+
| Section 1: 8/10 (80%) ████████░░                                 |
| Section 2: 7/10 (70%) ███████░░░                                 |
| Section 3: 9/10 (90%) █████████░                                 |
| Section 4: 8/10 (80%) ████████░░                                 |
+------------------------------------------------------------------+
```

**Teacher Comments Section (Editable if not published):**
```
+------------------------------------------------------------------+
| 💬 Teacher Comments                                              |
+------------------------------------------------------------------+
| [Textarea: Good performance overall. Focus on Section 2.]        |
+------------------------------------------------------------------+
```

**Action Buttons:**
```
[Save Grading] [Publish Result] [Print Result] [Back to List]
```

**If result is already published:**
- Make all fields read-only
- Show "Published on: Jan 9, 2025 11:30 AM by Teacher Name"
- Only show [Print Result] and [Back to List] buttons

---

### **PHASE 6: Student Dashboard & Portal**

#### **Task 6.1: Student Dashboard Main Page**
**Create `/app/src/pages/student/StudentDashboard.tsx`:**

**Layout:**

**Top Section - Welcome & Quick Stats:**
```
+------------------------------------------------------------------+
| 👋 Welcome back, John Doe (STU2025001)                          |
| Batch: Morning Batch A                                           |
+------------------------------------------------------------------+

+------------------+  +------------------+  +------------------+
| 📚 Exams Taken   |  | 📊 Average Score |  | 🏆 Best Score    |
| 12               |  | 82.5%            |  | 95%              |
+------------------+  +------------------+  +------------------+
```

**Upcoming Exams Section:**
```
+------------------------------------------------------------------+
| 📅 Upcoming Exams                                                |
+------------------------------------------------------------------+
| Track Name      | Exam Code       | Date       | Time     | Action|
|-----------------|-----------------|------------|----------|-------|
| 4-M Listening   | 4M-20250110-001 | Jan 10     | 10:00 AM | [Start]|
| Academic L.     | AL-20250112-001 | Jan 12     | 2:00 PM  | Scheduled|
+------------------------------------------------------------------+
```

**Logic:**
- Query exam sessions where:
  - `allowedBatches` includes student's batch
  - `status === 'scheduled' OR 'active'`
  - `date >= today`
- Check if student has already submitted for this exam code
  - If yes: Don't show "Start" button, show "Completed ✓"

**My Results Section:**
```
+------------------------------------------------------------------+
| 📊 My Results                                                    |
+------------------------------------------------------------------+
| Filter: [All Tracks ▼] [Last 30 Days ▼] [All Status ▼]          |
+------------------------------------------------------------------+
| Exam Code       | Track          | Date  | Score | Status  | Action|
|-----------------|----------------|-------|-------|---------|-------|
| 4M-20250109-001 | 4-M Listening  | Jan 9 | 35/40 |Published| [View]|
| AL-20250105-001 | Academic L.    | Jan 5 | 38/40 |Published| [View]|
| GL-20250103-001 | General L.     | Jan 3 | -     | Pending | -     |
+------------------------------------------------------------------+
| Showing 1-10 of 12 results                  < 1 2 >             |
+------------------------------------------------------------------+
```

**Performance Graph Section:**
```
+------------------------------------------------------------------+
| 📈 My Performance Trend                                          |
+------------------------------------------------------------------+
| [Line chart showing score percentage over time]                  |
| - X-axis: Exam dates                                             |
| - Y-axis: Score percentage (0-100%)                              |
| - Multiple lines/colors for different tracks                     |
+------------------------------------------------------------------+
```

**Chart Library:** Use Chart.js or Recharts

**Chart Data Logic:**
```javascript
// Fetch student's published submissions
// Group by track
// Sort by date
// Plot percentage for each exam

const chartData = [
  { date: 'Jan 3', score: 75, track: 'General L.' },
  { date: 'Jan 5', score: 87.5, track: 'Academic L.' },
  { date: 'Jan 9', score: 95, track: '4-M Listening' },
  // ...
];
```

#### **Task 6.2: Student Exam Taking Flow**
**Update `/app/src/pages/ExamPage.tsx`:**

**Changes:**
1. **Before Loading Exam:**
   - Check if student is authenticated
   - Get student data from AuthContext
   - Verify exam session exists and is active
   - Check if student's batch is allowed for this exam
   - **Check if student has already submitted for this exam code**
     - If yes: Redirect to dashboard with error "You have already submitted this exam"
     - If no: Continue

2. **During Exam:**
   - Same as current experience
   - Display student info in header instead of entered name/ID

3. **On Submit:**
   - Save submission with all student details
   - Link to exam code
   - Set `resultStatus: 'pending'`
   - Redirect to dashboard with success message
   - Show "Thank you! Your submission has been recorded. Results will be published soon."

#### **Task 6.3: Student Result Detail View**
**Create `/app/src/pages/student/ResultDetailPage.tsx`:**

**URL:** `/student/results/{submissionId}`

**Layout:**
```
+------------------------------------------------------------------+
| 📄 Exam Result Details                            [← Dashboard] |
+------------------------------------------------------------------+
| Exam Code: 4M-20250109-001                                       |
| Track: 4-M Listening                                             |
| Date: January 9, 2025                                            |
| Time: 10:00 AM - 11:00 AM                                        |
| Status: Published ✅                                             |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| 🎯 Your Score                                                    |
+------------------------------------------------------------------+
|                     35 / 40                                      |
|                    87.5%                                         |
|                 [Progress Ring Chart]                            |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| 📊 Section-wise Performance                                      |
+------------------------------------------------------------------+
| Section 1: Questions 1-10     | 8/10  (80%)  ████████░░         |
| Section 2: Questions 11-20    | 7/10  (70%)  ███████░░░         |
| Section 3: Questions 21-30    | 9/10  (90%)  █████████░         |
| Section 4: Questions 31-40    | 8/10  (80%)  ████████░░         |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| 💬 Teacher's Feedback                                            |
+------------------------------------------------------------------+
| Good performance overall. Focus on improving Section 2.          |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
| 📈 Performance Radar Chart                                       |
+------------------------------------------------------------------+
| [Radar/Spider chart showing section-wise performance]            |
+------------------------------------------------------------------+

[Download Result PDF] [Print Result] [Back to Dashboard]
```

**Show this page ONLY if `resultStatus === 'published'`**

If result is pending:
```
+------------------------------------------------------------------+
| ⏳ Result Pending                                                |
+------------------------------------------------------------------+
| Your submission is being reviewed. Results will be published     |
| soon. You will be notified once results are available.           |
|                                                                  |
| [Back to Dashboard]                                              |
+------------------------------------------------------------------+
```

---

### **PHASE 7: Teacher Dashboard & Grading Interface**

#### **Task 7.1: Teacher Dashboard**
**Create `/app/src/pages/teacher/TeacherDashboard.tsx`:**

**Layout:**

**Top Section - Quick Stats:**
```
+------------------------------------------------------------------+
| 👨‍🏫 Teacher Dashboard - Welcome, Teacher Name                    |
+------------------------------------------------------------------+

+------------------+  +------------------+  +------------------+
| ⏳ Pending       |  | ✅ Graded Today  |  | 📚 Total This    |
| Submissions      |  |                  |  | Month            |
| 23               |  | 12               |  | 145              |
+------------------+  +------------------+  +------------------+
```

**Assigned Tracks Section:**
```
+------------------------------------------------------------------+
| 📚 My Assigned Tracks                                            |
+------------------------------------------------------------------+

+------------------+  +------------------+
| Track 1          |  | Track 4          |
| General L.       |  | 4-M Listening    |
|                  |  |                  |
| ⏳ 12 Pending    |  | ⏳ 11 Pending     |
| ✅ 45 Graded     |  | ✅ 60 Graded      |
|                  |  |                  |
| [View]           |  | [View]           |
+------------------+  +------------------+
```

**Recent Submissions Section:**
```
+------------------------------------------------------------------+
| 📝 Recent Submissions (Pending Grading)                          |
+------------------------------------------------------------------+
| Exam Code       | Student        | Track         | Date | Action |
|-----------------|----------------|---------------|------|--------|
| 4M-20250110-001 | John Doe       | 4-M Listening | Jan10| [Grade]|
| GL-20250110-001 | Jane Smith     | General L.    | Jan10| [Grade]|
+------------------------------------------------------------------+
```

**Actions:**
- Click track → Navigate to submissions page for that track (similar to admin, but filtered to teacher's assigned tracks)
- Click "Grade" → Navigate to grading interface

#### **Task 7.2: Teacher Access to Submissions**
- Teachers can access same submission pages as admin
- BUT filtered to only show their assigned tracks
- Can grade, add comments, publish results
- Can export CSV for their tracks

---

### **PHASE 8: Export & Additional Features**

#### **Task 8.1: CSV Export Functionality**
**Create `/app/src/utils/exportCSV.ts`:**

**Export Format:**
```csv
Student ID,Student Name,Email,Batch,Exam Code,Track,Date,Total Score,Section 1,Section 2,Section 3,Section 4,Percentage,Status,Graded By,Graded At,Published At
STU2025001,John Doe,john@mail.com,Batch A,4M-20250109-001,4-M Listening,2025-01-09,35,8,7,9,8,87.5%,Published,Teacher A,2025-01-09 11:00,2025-01-09 11:30
...
```

**Export Options:**
1. **Single Exam Session:** Export all submissions for one exam code
2. **Track-wise:** Export all submissions for a track (across all exam sessions)
3. **Batch-wise:** Export all submissions for a batch
4. **Date Range:** Export submissions within date range

**Add Export Button in:**
- Session submissions list page
- Track submissions page
- Admin dashboard (export all)

#### **Task 8.2: Print Result Feature**
**Create `/app/src/components/PrintableResult.tsx`:**

- Printable result card with school/institute branding
- Student details, exam details, score, section breakdown
- Teacher signature space
- Print button uses `window.print()`

---

### **PHASE 9: Homepage & Routing Updates**

#### **Task 9.1: New Homepage with Login Selection**
**Update `/app/src/pages/HomePage.tsx`:**

**Design:**
```
+------------------------------------------------------------------+
|                                                                  |
|                    🎓 IELTS Listening Exam                       |
|                           System                                 |
|                                                                  |
|                   Select Your Login Portal:                      |
|                                                                  |
|        +---------------------+  +---------------------+          |
|        |                     |  |                     |          |
|        |   👨‍🎓 STUDENT       |  |   👨‍💼 STAFF         |          |
|        |     LOGIN           |  |     LOGIN           |          |
|        |                     |  |                     |          |
|        | [Enter Portal]      |  | [Enter Portal]      |          |
|        |                     |  |                     |          |
|        +---------------------+  +---------------------+          |
|                                                                  |
|    For support, contact: support@school.com                      |
|                                                                  |
+------------------------------------------------------------------+
```

**Routing:**
- Click "Student Login" → Navigate to `/student/login`
- Click "Staff Login" → Navigate to `/staff/login`

#### **Task 9.2: Update App Routes**
**Update `/app/src/App.tsx`:**

```typescript
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<HomePage />} />
  <Route path="/student/login" element={<StudentLogin />} />
  <Route path="/staff/login" element={<StaffLogin />} />
  
  {/* Student Routes (Protected) */}
  <Route path="/student/dashboard" element={
    <ProtectedRoute role="student">
      <StudentDashboard />
    </ProtectedRoute>
  } />
  <Route path="/student/exam/:examCode" element={
    <ProtectedRoute role="student">
      <ExamPage />
    </ProtectedRoute>
  } />
  <Route path="/student/results/:submissionId" element={
    <ProtectedRoute role="student">
      <ResultDetailPage />
    </ProtectedRoute>
  } />
  
  {/* Admin Routes (Protected) */}
  <Route path="/admin/dashboard" element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  } />
  <Route path="/admin/students" element={
    <ProtectedRoute role="admin">
      <StudentsPage />
    </ProtectedRoute>
  } />
  <Route path="/admin/students/:studentId" element={
    <ProtectedRoute role="admin">
      <StudentProfilePage />
    </ProtectedRoute>
  } />
  <Route path="/admin/batches" element={
    <ProtectedRoute role="admin">
      <BatchesPage />
    </ProtectedRoute>
  } />
  <Route path="/admin/exam-control" element={
    <ProtectedRoute role="admin">
      <ExamControlPage />
    </ProtectedRoute>
  } />
  <Route path="/admin/submissions" element={
    <ProtectedRoute role="admin">
      <SubmissionsPage />
    </ProtectedRoute>
  } />
  <Route path="/admin/submissions/:trackId" element={
    <ProtectedRoute role="admin">
      <TrackSubmissionsPage />
    </ProtectedRoute>
  } />
  <Route path="/admin/submissions/:trackId/:examCode" element={
    <ProtectedRoute role="admin">
      <SessionSubmissionsPage />
    </ProtectedRoute>
  } />
  <Route path="/admin/submissions/:trackId/:examCode/:submissionId" element={
    <ProtectedRoute role="admin">
      <SubmissionDetailPage />
    </ProtectedRoute>
  } />
  
  {/* Teacher Routes (Protected) */}
  <Route path="/teacher/dashboard" element={
    <ProtectedRoute role="teacher">
      <TeacherDashboard />
    </ProtectedRoute>
  } />
  <Route path="/teacher/submissions" element={
    <ProtectedRoute role="teacher">
      <SubmissionsPage />
    </ProtectedRoute>
  } />
  {/* Teacher uses same submission pages as admin, just filtered */}
  
  {/* 404 */}
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

---

## 🎨 UI/UX GUIDELINES

### **Design System:**
- **Colors:**
  - Primary: Blue (#2563eb)
  - Success: Green (#10b981)
  - Warning: Orange (#f59e0b)
  - Danger: Red (#ef4444)
  - Pending: Yellow (#eab308)
  
- **Status Indicators:**
  - 🟢 Active (Green)
  - 🔴 Inactive (Red)
  - 🟡 Upcoming (Yellow)
  - ✅ Published/Completed (Green checkmark)
  - ⏳ Pending (Yellow hourglass)

- **Icons:**
  - Use Lucide React icons consistently
  - Student: 👤 or User icon
  - Batch: 👥 or Users icon
  - Exam: 📝 or FileText icon
  - Results: 📊 or BarChart icon
  - Settings: ⚙️ or Settings icon

### **Responsive Design:**
- Mobile-first approach
- Tables should be scrollable on mobile or convert to cards
- Use Tailwind breakpoints: sm, md, lg, xl

### **Loading States:**
- Show skeleton loaders for tables/cards
- Display loading spinner for API calls
- Disable buttons during submission

### **Error Handling:**
- Toast notifications for success/error messages
- Form validation with inline error messages
- Friendly error messages (not technical jargon)

---

## 🔒 SECURITY CONSIDERATIONS

### **Password Security:**
- Hash all passwords using bcrypt or similar
- Minimum password length: 8 characters
- Include password strength indicator (optional)

### **Authentication:**
- Use JWT tokens for session management
- Store tokens securely (httpOnly cookies or secure localStorage)
- Implement token expiration and refresh logic
- Logout on token expiration

### **Authorization:**
- Validate user role on every protected route
- Backend should verify user role before returning data
- Firebase rules should restrict access based on authentication

### **Data Privacy:**
- Teachers can only see submissions for their assigned tracks
- Students can only see their own data
- Admins have full access

---

## 🧪 TESTING CHECKLIST

### **Phase-by-Phase Testing:**

**After Phase 1:**
- [ ] Admin can login with username/password
- [ ] Teacher can login with username/password
- [ ] Student can login with Student ID/password
- [ ] Incorrect credentials show error
- [ ] Authenticated users are redirected to correct dashboard
- [ ] Logout works properly

**After Phase 2:**
- [ ] Admin can view student list
- [ ] Admin can add new student (ID and password auto-generated)
- [ ] Admin can edit student details
- [ ] Admin can deactivate/delete student
- [ ] Admin can view student profile with submission history
- [ ] Search and filter work correctly

**After Phase 3:**
- [ ] Admin can create new batch
- [ ] Admin can assign tracks to batch
- [ ] Admin can view batch details
- [ ] Batch list displays correctly

**After Phase 4:**
- [ ] Admin can create exam session with auto-generated exam code
- [ ] Exam code format is correct (TrackName-YYYYMMDD-001)
- [ ] Admin can start exam (status changes to "active")
- [ ] Admin can stop exam (status changes to "completed")
- [ ] Active exam shows in student dashboard
- [ ] Scheduled exam shows in student dashboard

**After Phase 5:**
- [ ] Track cards show correct statistics
- [ ] Clicking track shows exam sessions list
- [ ] Clicking exam session shows submissions list
- [ ] Submissions list shows correct data
- [ ] Clicking submission opens detail view
- [ ] Teacher can add comments and grade
- [ ] Publish button works (changes status to "published")
- [ ] Export CSV works and includes all data

**After Phase 6:**
- [ ] Student dashboard shows upcoming exams
- [ ] Student dashboard shows previous submissions
- [ ] Student can start exam from dashboard
- [ ] Student CANNOT start exam twice for same exam code
- [ ] Student can view published results
- [ ] Student CANNOT view pending results (shows "pending" message)
- [ ] Performance graph displays correctly

**After Phase 7:**
- [ ] Teacher dashboard shows assigned tracks only
- [ ] Teacher can view pending submissions
- [ ] Teacher can grade submissions
- [ ] Teacher can publish results
- [ ] Teacher CANNOT see tracks not assigned to them

**After Phase 8:**
- [ ] CSV export includes all columns
- [ ] Print result generates printable page
- [ ] Print result includes all details

**After Phase 9:**
- [ ] Homepage shows two login options
- [ ] Routing works correctly for all roles
- [ ] Unauthorized access redirects to login

---

## 📝 IMPLEMENTATION NOTES

### **Database Structure in Firebase:**
```
/
├── students/
│   └── {studentId}/
├── batches/
│   └── {batchId}/
├── examSessions/
│   └── {examCode}/
├── submissions/
│   └── {submissionId}/
├── users/
│   └── {userId}/
└── tracks/
    └── {trackId}/
```

### **Key Services to Create:**

1. **AuthService (`/app/src/services/authService.ts`):**
   - login(credentials)
   - logout()
   - verifyToken()
   - resetPassword()

2. **StudentService (`/app/src/services/studentService.ts`):**
   - getAllStudents()
   - getStudentById(id)
   - createStudent(data)
   - updateStudent(id, data)
   - deleteStudent(id)
   - generateStudentId()
   - generatePassword()

3. **BatchService (`/app/src/services/batchService.ts`):**
   - getAllBatches()
   - createBatch(data)
   - updateBatch(id, data)
   - deleteBatch(id)
   - assignTracktoBatch(batchId, trackId)

4. **ExamSessionService (`/app/src/services/examSessionService.ts`):**
   - createExamSession(data)
   - generateExamCode(trackId, date)
   - startExam(examCode)
   - stopExam(examCode)
   - getActiveExams()
   - getScheduledExams()
   - getCompletedExams()

5. **SubmissionService (`/app/src/services/submissionService.ts`):**
   - getSubmissionsByTrack(trackId)
   - getSubmissionsByExamCode(examCode)
   - getSubmissionsByStudent(studentId)
   - createSubmission(data)
   - updateSubmission(id, data)
   - gradeSubmission(id, score, comments)
   - publishResult(id)
   - bulkPublishResults(submissionIds)
   - exportToCSV(filters)

6. **UserService (`/app/src/services/userService.ts`):**
   - getAllUsers()
   - createUser(data)
   - updateUser(id, data)
   - deleteUser(id)

---

## 🚀 IMPLEMENTATION ORDER (Step-by-Step)

### **Start Here:**

**Step 1:** Set up Firebase collections and initial data
**Step 2:** Create AuthContext and authentication services
**Step 3:** Build StudentLogin and StaffLogin components
**Step 4:** Implement ProtectedRoute component
**Step 5:** Create basic Student Dashboard (empty for now)
**Step 6:** Create basic Admin Dashboard (empty for now)
**Step 7:** Implement Students Management (add, edit, view, delete)
**Step 8:** Implement Batch Management
**Step 9:** Enhance Exam Control with exam code generation
**Step 10:** Redesign Submissions Manager (track cards → sessions → submissions)
**Step 11:** Build Student Dashboard with upcoming exams and results
**Step 12:** Implement Student Result Detail View
**Step 13:** Build Teacher Dashboard
**Step 14:** Implement grading interface for teachers
**Step 15:** Add CSV export functionality
**Step 16:** Add print result feature
**Step 17:** Update homepage and routing
**Step 18:** Implement performance graphs (Chart.js/Recharts)
**Step 19:** Final testing and bug fixes
**Step 20:** Polish UI/UX

---

## ✅ DEFINITION OF DONE

This implementation is complete when:

1. ✅ All three login portals work (Student, Teacher, Admin)
2. ✅ Role-based access control is enforced
3. ✅ Admin can manage students, batches, and exam sessions
4. ✅ Exam codes are auto-generated in correct format
5. ✅ Submissions are organized by Track → Exam Session → Individual Submissions
6. ✅ Students can only see their own dashboard and results
7. ✅ Students cannot retake the same exam
8. ✅ Teachers can grade and publish results for assigned tracks
9. ✅ Student dashboard shows upcoming exams and performance graphs
10. ✅ CSV export works correctly
11. ✅ All data is stored in Firebase with proper structure
12. ✅ UI is responsive and user-friendly
13. ✅ No console errors
14. ✅ All features tested and working

---

## 🎯 FINAL DELIVERABLES

1. **Working Application** with all features
2. **Updated README.md** with:
   - Setup instructions
   - Default admin credentials
   - How to add first student
   - How to create exam session
3. **User Guides** (optional):
   - Admin guide
   - Teacher guide
   - Student guide
4. **Database Schema Documentation**

---

## 🆘 TROUBLESHOOTING COMMON ISSUES

**Issue: Student ID not generating sequentially**
- Check Firebase query for last student ID
- Ensure proper parsing of increment number

**Issue: Exam code duplicates**
- Check date format in query
- Ensure increment logic handles same-day sessions

**Issue: Student can take exam multiple times**
- Verify submission check before starting exam
- Query submissions by both studentId AND examCode

**Issue: Teacher sees all tracks**
- Check role validation in backend
- Filter submissions by teacher's assignedTracks

**Issue: Results not publishing**
- Verify resultStatus update in database
- Check Firebase permissions

---

## 🎉 READY TO START?

This master prompt covers the entire implementation from start to finish. Follow the phases in order, test after each phase, and refer back to this document for specifications.

**Let's build an amazing exam management system! 🚀**
