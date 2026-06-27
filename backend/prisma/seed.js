const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Configuration
const CLASSROOMS = ['Playgroup A', 'Nursery A', 'Nursery B', 'Kindergarten 1', 'Kindergarten 2', 'Toddlers C'];
const SHIFTS = ['08:00 AM - 02:00 PM', '08:30 AM - 02:30 PM', '09:00 AM - 03:00 PM', '09:30 AM - 03:30 PM'];

const TEACHER_NAMES = [
  'Prithika Sharma', 'Varun Mehta', 'Raju Sen', 'Neha Gupta', 'Vikram Malhotra',
  'Priya Patel', 'Anjali Desai', 'Amit Kumar', 'Sneha Singh', 'Rohan Das'
];

const PARENT_NAMES = [
  'Aarti Sharma', 'Karan Mehta', 'Simran Sen', 'Rajiv Gupta', 'Kavita Malhotra',
  'Suresh Patel', 'Pooja Desai', 'Anil Kumar', 'Meera Singh', 'Manoj Das',
  'Riya Joshi', 'Sunil Reddy', 'Swati Verma', 'Nitin Jain', 'Kiran Rao',
  'Deepak Nair', 'Anita Bose', 'Tarun kapoor', 'Preeti Menon', 'Gaurav Bhatia'
];

const STUDENT_NAMES = [
  'Aarav Sharma', 'Kiara Mehta', 'Kabir Sen', 'Diya Gupta', 'Reyansh Malhotra',
  'Myra Patel', 'Vivaan Desai', 'Shanaya Kumar', 'Aditya Singh', 'Ananya Das',
  'Arjun Joshi', 'Risha Reddy', 'Sai Verma', 'Avni Jain', 'Dev Rao',
  'Mira Nair', 'Rudra Bose', 'Ishaan Kapoor', 'Zara Menon', 'Dhruv Bhatia',
  'Nisha Sharma', 'Rohan Mehta', 'Sia Sen', 'Krish Gupta', 'Tara Malhotra',
  'Ayaan Patel', 'Neha Desai', 'Samar Kumar', 'Piya Singh', 'Aryan Das'
];

const MOODS = ['Happy', 'Energetic', 'Curious', 'Calm', 'Fussy', 'Sleepy'];

// Helper for random items
const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pad = (num, size) => num.toString().padStart(size, '0');

async function main() {
  console.log('--- FirstCry Intellitots Seed Script ---');

  // 1. Safety Lock
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Production database detected.');
    console.error('❌ Seeding aborted. Never overwrite production information.');
    process.exit(1);
  }

  const mode = process.argv.includes('--mode') ? process.argv[process.argv.indexOf('--mode') + 1] : 'demo';
  const confirm = process.argv.includes('--confirm');

  if (mode === 'demo') {
    if (!confirm) {
      console.error('❌ Destructive action detected! You must provide the --confirm flag to proceed.');
      console.error('Example: npm run seed:demo -- --confirm');
      process.exit(1);
    }

    console.log('🔄 Mode: demo. Preparing to clear existing data...');
    
    // Backup before deleting
    console.log('⏳ Checking for pg_dump and creating backup...');
    try {
      execSync('pg_dump --version', { stdio: 'ignore' });
      const backupDir = path.join(__dirname, '../backups');
      if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(backupDir, `backup-${timestamp}.sql`);
      
      // We parse the DATABASE_URL to pass to pg_dump safely
      const dbUrl = process.env.DATABASE_URL;
      if (!dbUrl) throw new Error('DATABASE_URL is not defined in .env');

      console.log(`⏳ Executing backup to ${backupFile}...`);
      execSync(`pg_dump "${dbUrl}" > "${backupFile}"`);
      console.log(`✅ Backup successful: ${backupFile}`);
    } catch (e) {
      console.error('❌ Backup failed or pg_dump not found in PATH.');
      console.error('Please install PostgreSQL tools or fix the DATABASE_URL.');
      console.error('Error details:', e.message);
      process.exit(1);
    }

    console.log('⏳ Deleting existing records...');
    await prisma.notification.deleteMany();
    await prisma.message.deleteMany();
    await prisma.announcement.deleteMany();
    await prisma.task.deleteMany();
    await prisma.dailyRoutine.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.student.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.classroom.deleteMany();
    await prisma.parent.deleteMany();
    await prisma.user.deleteMany();
  } else if (mode === 'add-sample') {
    console.log('➕ Mode: add-sample. Appending sample data without deleting existing records.');
  } else {
    console.error(`❌ Unknown mode: ${mode}. Use 'demo' or 'add-sample'.`);
    process.exit(1);
  }

  const defaultPassword = await bcrypt.hash('Password123', 10);

  // 2. Classrooms
  const classRecords = [];
  for (let i = 0; i < CLASSROOMS.length; i++) {
    const existing = await prisma.classroom.findFirst({ where: { name: CLASSROOMS[i] }});
    if (existing) {
      classRecords.push(existing);
    } else {
      classRecords.push(await prisma.classroom.create({
        data: { name: CLASSROOMS[i], roomNumber: `Room 10${i + 1}` }
      }));
    }
  }
  console.log('✅ Classrooms ready.');

  // 3. Admin
  let admin = await prisma.user.findFirst({ where: { email: 'admin@intellitots.com' } });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: 'admin@intellitots.com',
        password: defaultPassword,
        role: 'ADMIN',
        name: 'Head Administrator',
        phone: '+91 99999 99999'
      }
    });
    console.log('✅ Admin account created.');
  }

  // 4. Teachers (10)
  const teacherRecords = [];
  for (let i = 0; i < TEACHER_NAMES.length; i++) {
    const name = TEACHER_NAMES[i];
    const email = `${name.split(' ')[0].toLowerCase()}@intellitots.com`;
    let user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email, password: defaultPassword, role: 'TEACHER', name, phone: `+91 98765 100${pad(i, 2)}` }
      });
    }

    let teacher = await prisma.teacher.findFirst({ where: { userId: user.id } });
    if (!teacher) {
      teacher = await prisma.teacher.create({
        data: {
          userId: user.id,
          avatar: name.split(' ').map(n => n[0]).join(''),
          teacherRegNo: `26EMP10${pad(i, 2)}`,
          employeeId: `26EMP00${pad(i, 2)}`,
          shiftTime: randItem(SHIFTS),
          classroomId: classRecords[i % classRecords.length].id,
          performance: randInt(85, 100),
          attendance: randInt(90, 100),
          tasksCompleted: randInt(20, 100),
          complianceScore: randInt(88, 100)
        }
      });
    }
    teacherRecords.push(teacher);
  }
  console.log('✅ 10 Professional Teachers ready.');

  // 5. Parents (20)
  const parentRecords = [];
  for (let i = 0; i < PARENT_NAMES.length; i++) {
    const name = PARENT_NAMES[i];
    const email = `parent${i+1}@example.com`;
    let user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email, password: defaultPassword, role: 'PARENT', name, phone: `+91 91234 200${pad(i, 2)}` }
      });
    }

    let parent = await prisma.parent.findFirst({ where: { userId: user.id } });
    if (!parent) {
      parent = await prisma.parent.create({
        data: { userId: user.id, parentContact: `+91 91234 200${pad(i, 2)}` }
      });
    }
    parentRecords.push({ parent, user });
  }
  console.log('✅ 20 Parent accounts ready.');

  // 6. Students (30)
  const studentRecords = [];
  for (let i = 0; i < STUDENT_NAMES.length; i++) {
    const name = STUDENT_NAMES[i];
    const admNo = `261FC100${pad(i + 1, 2)}`;
    let student = await prisma.student.findFirst({ where: { admissionNo: admNo } });
    
    if (!student) {
      const p = parentRecords[i % parentRecords.length].parent;
      const c = classRecords[i % classRecords.length];
      
      student = await prisma.student.create({
        data: {
          name,
          avatar: name.split(' ').map(n => n[0]).join(''),
          age: `${randInt(2, 5)} Years, ${randInt(1, 11)} Months`,
          studentRegNo: `FCI2600010${pad(i + 1, 2)}`,
          admissionNo: admNo,
          classroomId: c.id,
          parentId: p.id,
          mood: randItem(MOODS),
          photoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
          milestones: [
            { name: 'Language & Speech', progress: randInt(60, 100) },
            { name: 'Fine Motor Skills', progress: randInt(60, 100) },
            { name: 'Social Interaction', progress: randInt(60, 100) },
            { name: 'Cognitive Ability', progress: randInt(60, 100) }
          ],
          timeline: [
            { time: '08:00 AM', event: 'Arrival', desc: `Checked in. Mood: ${randItem(MOODS)}.` },
            { time: '10:00 AM', event: 'Activity', desc: 'Participated in group activity.' },
            { time: '12:00 PM', event: 'Lunch', desc: 'Ate well.' }
          ],
          notes: [
            { date: new Date().toISOString().split('T')[0], author: 'System', content: 'Medical Notes: N/A, Allergies: None reported.', mood: 'Calm' }
          ]
        }
      });
    }
    studentRecords.push(student);
  }
  console.log('✅ 30 Students ready.');

  // 7. Daily Routine, Attendance, Tasks, Messages, Announcements
  console.log('⏳ Generating interactions (Routines, Tasks, Announcements, etc)...');
  
  // Attendance & Routines
  for (const student of studentRecords) {
    // Generate routine for today
    await prisma.dailyRoutine.create({
      data: {
        studentId: student.id,
        date: new Date(),
        breakfast: randItem(['full', 'partial', 'none']),
        lunch: randItem(['full', 'partial', 'none']),
        snacks: randItem(['full', 'partial', 'none']),
        waterCups: randInt(2, 8),
        napTime: `${randInt(30, 90)} Mins`,
        pottyCheck: true,
        activityNotes: 'Regular day activities completed successfully.'
      }
    });

    // Generate Attendance
    await prisma.attendance.create({
      data: {
        studentId: student.id,
        date: new Date(new Date().setHours(0,0,0,0)), // normalize to midnight
        status: Math.random() > 0.1 ? 'PRESENT' : 'ABSENT'
      }
    }).catch(() => {}); // ignore unique constraint if running add-sample repeatedly on same day
  }

  // Tasks for Teachers
  const taskTitles = ['Lesson Planning', 'Parent Feedback', 'Student Observation', 'Activity Preparation', 'Weekly Assessment', 'Classroom Sanitization', 'Curriculum Planning'];
  for (const teacher of teacherRecords) {
    await prisma.task.create({
      data: {
        title: randItem(taskTitles),
        desc: 'Standard assigned task generated by ERP.',
        status: randItem(['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED']),
        priority: randItem(['high', 'medium', 'low']),
        dueDate: new Date(Date.now() + 86400000 * randInt(1, 7)).toISOString().split('T')[0], // 1-7 days from now
        assigneeId: teacher.id
      }
    });
  }

  // Announcements
  await prisma.announcement.createMany({
    data: [
      { title: 'Holiday Notice', content: 'School will remain closed for National Holiday.', priority: 'high', createdByName: 'Admin', date: new Date().toISOString().split('T')[0] },
      { title: 'Sports Day', content: 'Annual sports day is scheduled for next month.', priority: 'medium', createdByName: 'Admin', date: new Date().toISOString().split('T')[0] },
      { title: 'Health Check Camp', content: 'Routine pediatrician visit next week.', priority: 'low', createdByName: 'Admin', date: new Date().toISOString().split('T')[0] },
      { title: 'Parent Teacher Meeting', content: 'PTM scheduled for this Saturday.', priority: 'high', createdByName: 'Admin', date: new Date().toISOString().split('T')[0] }
    ]
  });

  // Teacher Attendance & Duty Roster
  console.log('⏳ Generating Teacher Attendance and Duty Roster...');
  for (const teacher of teacherRecords) {
    const isPresent = Math.random() > 0.1;
    await prisma.teacherAttendance.create({
      data: {
        teacherId: teacher.id,
        date: new Date(new Date().setHours(0,0,0,0)), // normalize to midnight
        status: isPresent ? 'PRESENT' : 'ABSENT'
      }
    }).catch(() => {}); // ignore unique constraint if running add-sample repeatedly

    if (isPresent) {
      await prisma.dutyRoster.create({
        data: {
          teacherId: teacher.id,
          date: new Date(new Date().setHours(0,0,0,0)), // normalize to midnight
          room: `Room ${randInt(101, 205)}`,
          shift: teacher.shiftTime || '09:00 AM - 03:00 PM',
          className: classRecords[randInt(0, classRecords.length - 1)].name
        }
      }).catch(() => {}); // ignore unique constraint
    }
  }

  // Messages between Teachers and Parents
  for (let i = 0; i < 15; i++) {
    const tUser = teacherRecords[randInt(0, teacherRecords.length - 1)].userId;
    const pUser = parentRecords[randInt(0, parentRecords.length - 1)].user.id;
    await prisma.message.create({ data: { content: 'Hello, how is my child doing?', senderId: pUser, receiverId: tUser }});
    await prisma.message.create({ data: { content: 'Doing great! Very active today.', senderId: tUser, receiverId: pUser }});
  }

  // Notifications
  for (let i = 0; i < 5; i++) {
    await prisma.notification.create({
      data: {
        title: 'System Update', content: 'New features added to dashboard.', type: 'info', userId: admin.id
      }
    });
  }

  console.log('✅ Interactions generated.');
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
