# Đề tài 19 — Hệ thống tra cứu dữ liệu học tập bằng GraphQL

**Tuần 1/9 — phiên bản khởi tạo**. Công cụ: VS Code, Node.js 20+, Apollo Server 5, gRPC Node, GraphQL.

## Yêu cầu đề bài
- Một GraphQL API tại `POST /graphql` làm đầu vào cho client.
- `Student Service` và `Course Service` độc lập, GraphQL gọi qua gRPC.
- Có `Student`, `Course`, `Enrollment`; hỗ trợ truy vấn lồng nhau.
- Mỗi service về sau dùng database riêng (chưa triển khai ở tuần 1).

## Sơ đồ

```text
Client --HTTP GraphQL--> GraphQL API (4000)
                            | gRPC          | gRPC
                     Student Service   Course Service
                         (50051)          (50052)
                       [mock data]       [mock data]
```

## Chạy thử trong VS Code
1. Cài Node.js 20+ và Git. Mở folder dự án bằng `File > Open Folder`.
2. Mở Terminal (`Ctrl + backtick`) và chạy `npm install`.
3. Chạy `npm run dev` (cả 3 process chạy song song).
4. Truy cập `http://127.0.0.1:4000/graphql` bằng trình duyệt (Apollo Sandbox).
5. Dán truy vấn dưới đây và nhấn Run.

```graphql
query {
  students {
    id
    name
    email
    courses { id title credits }
  }
}
```

Truy vấn khác:

```graphql
query {
  student(id: "SV001") { name courses { title } }
  courses { id title credits }
  enrollments(studentId: "SV001") { studentId courseId }
}
```

Chạy test schema: `npm test`.

## Cấu trúc thư mục
- `src/gateway/` — GraphQL gateway / schema / resolvers.
- `src/services/` — Student Service và Course Service (mỗi process độc lập).
- `src/shared/` — tiện ích tải protobuf.
- `proto/` — định nghĩa hợp đồng gRPC.
- `docs/` — lộ trình 9 tuần.
- `tests/` — test.

## Giới hạn tuần 1
- Dữ liệu mẫu lưu trong array, **không phải** Student DB/Course DB thật.
- Chưa làm CRUD, authentication, deployment, resilience, integration tests tự động.
- Mặc định chỉ bind localhost; gRPC chưa có TLS (phù hợp demo local).

## GitHub — commit đầu tiên

```bash
git init
git add .
git commit -m "chore(week1): initialize graphql grpc project"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

**Chú ý:** Thay `USERNAME/REPOSITORY` bằng repo GitHub đã tạo (repo rỗng, không auto-add README). Trước khi push cần đăng nhập GitHub qua VS Code hoặc Git Credential Manager. Không push `node_modules` hay mật khẩu. Nếu repo đã có commit, cần fetch/pull đúng nhánh trước, không ép push.

## Mục tiêu nghiệm thu tuần 1
- [x] Có sơ đồ, kế hoạch 9 tuần, cấu trúc thư mục.
- [x] Có `POST /graphql`, schema `Student/Course/Enrollment`.
- [x] Có hai service gRPC chạy độc lập với mock data.
- [x] Có ví dụ nested query lấy `students -> courses`.
- [ ] Xác nhận `npm run dev`, `npm test` trên máy của bạn.
- [ ] Push thành công lên repository GitHub của bạn.
