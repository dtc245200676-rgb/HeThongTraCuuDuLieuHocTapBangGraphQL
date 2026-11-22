import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSchema, validateSchema } from 'graphql';
import { typeDefs } from '../src/gateway/schema.js';
test('GraphQL schema is valid and has required entities', () => {
  const schema = buildSchema(typeDefs);
  assert.deepEqual(validateSchema(schema), []);
  for (const type of ['Student', 'Course', 'Enrollment']) {
    assert.ok(schema.getType(type));
  }
  assert.ok(schema.getQueryType().getFields().students);
  assert.ok(schema.getQueryType().getFields().courses);
});
