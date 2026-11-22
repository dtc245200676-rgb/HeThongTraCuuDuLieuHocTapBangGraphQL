export const typeDefs = `#graphql
  type Student { id: ID!, name: String!, email: String!, courses: [Course!]! }
  type Course { id: ID!, title: String!, credits: Int! }
  type Enrollment { studentId: ID!, courseId: ID! }
  type Query {
    students: [Student!]!
    student(id: ID!): Student
    courses: [Course!]!
    course(id: ID!): Course
    enrollments(studentId: ID!): [Enrollment!]!
  }
`;
