import { grpc, loadService } from '../shared/grpc.js';
const courses = [
  { id: 'HP001', title: 'Co so du lieu', credits: 3 },
  { id: 'HP002', title: 'Quan tri du an', credits: 3 },
  { id: 'HP003', title: 'Lap trinh nang cao', credits: 4 }
];
const enrollments = [
  { studentId: 'SV001', courseId: 'HP001' },
  { studentId: 'SV001', courseId: 'HP003' },
  { studentId: 'SV002', courseId: 'HP002' }
];
const server = new grpc.Server();
server.addService(loadService('course.proto').CourseService.service, {
  listCourses: (_call, cb) => cb(null, { courses }),
  getCourse: (call, cb) => {
    const course = courses.find(c => c.id === call.request.id);
    if (!course) return cb({ code: grpc.status.NOT_FOUND, message: 'Course not found' });
    cb(null, { course });
  },
  getEnrollmentsByStudent: (call, cb) => cb(null, {
    enrollments: enrollments.filter(e => e.studentId === call.request.id)
  })
});
const port = process.env.COURSE_PORT || '50052';
server.bindAsync(`127.0.0.1:${port}`, grpc.ServerCredentials.createInsecure(), (err) => {
  if (err) { console.error(err); process.exitCode = 1; return; }
  console.log(`Course Service gRPC: 127.0.0.1:${port}`);
});
