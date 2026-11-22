import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export function loadService(file) {
  const definition = protoLoader.loadSync(path.join(root, 'proto', file), {
    keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
  });
  return grpc.loadPackageDefinition(definition).study;
}
export { grpc };
