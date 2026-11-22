import { grpc, loadService } from '../shared/grpc.js';
const students = [
  { id: 'SV001', name: 'Nguyen Van An', email: 'an@example.edu.vn' },
  { id: 'SV002', name: 'Tran Thi Binh', email: 'binh@example.edu.vn' }
];
const server = new grpc.Server();
server.addService(loadService('student.proto').StudentService.service, {
  listStudents: (_call, cb) => cb(null, { students }),
  getStudent: (call, cb) => {
    const student = students.find(s => s.id === call.request.id);
    if (!student) return cb({ code: grpc.status.NOT_FOUND, message: 'Student not found' });
    cb(null, { student });
  }
});
const port = process.env.STUDENT_PORT || '50051';
server.bindAsync(`127.0.0.1:${port}`, grpc.ServerCredentials.createInsecure(), (err) => {
  if (err) { console.error(err); process.exitCode = 1; return; }
  console.log(`Student Service gRPC: 127.0.0.1:${port}`);
});
