import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { grpc, loadService } from '../shared/grpc.js';
import { typeDefs } from './schema.js';
const studentClient = new (loadService('student.proto').StudentService)(
  `127.0.0.1:${process.env.STUDENT_PORT || 50051}`, grpc.credentials.createInsecure()
);
const courseClient = new (loadService('course.proto').CourseService)(
  `127.0.0.1:${process.env.COURSE_PORT || 50052}`, grpc.credentials.createInsecure()
);
const call = (client, method, request) => new Promise((resolve, reject) => {
  client[method](request, { deadline: Date.now() + 3000 }, (err, response) =>
    err ? reject(new Error(`gRPC ${method}: ${err.message}`)) : resolve(response));
});
const notFoundToNull = async (promise) => {
  try { return await promise; }
  catch (e) { if (e.message.includes('5 NOT_FOUND')) return null; throw e; }
};
const resolvers = {
  Query: {
    students: async () => (await call(studentClient, 'listStudents', {})).students,
    student: async (_, { id }) => (await notFoundToNull(call(studentClient, 'getStudent', { id })))?.student ?? null,
    courses: async () => (await call(courseClient, 'listCourses', {})).courses,
    course: async (_, { id }) => (await notFoundToNull(call(courseClient, 'getCourse', { id })))?.course ?? null,
    enrollments: async (_, { studentId }) =>
      (await call(courseClient, 'getEnrollmentsByStudent', { id: studentId })).enrollments
  },
  Student: {
    courses: async (student) => {
      const { enrollments } = await call(courseClient, 'getEnrollmentsByStudent', { id: student.id });
      return Promise.all(enrollments.map(async ({ courseId }) =>
        (await call(courseClient, 'getCourse', { id: courseId })).course));
    }
  }
};
const server = new ApolloServer({ typeDefs, resolvers });
const port = Number(process.env.GRAPHQL_PORT || 4000);
const { url } = await startStandaloneServer(server, { listen: { port, host: '127.0.0.1' } });
console.log(`GraphQL API: ${url}graphql`);
