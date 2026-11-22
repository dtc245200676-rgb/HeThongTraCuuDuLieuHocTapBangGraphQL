# Lộ trình 9 tuần (đề xuất)

| Tuần | Công việc | Minh chứng commit |
|---|---|---|
| 1 | Phân tích đề, chọn công nghệ, thiết kế kiến trúc, schema, proto, demo có dữ liệu mẫu | `chore(week1): initialize graphql grpc project` |
| 2 | Thiết kế database riêng cho Student/Course; migration/seed | `feat(week2): add separate databases` |
| 3 | Hoàn thiện Student Service: CRUD, validation, kiểm thử | `feat(week3): implement student service` |
| 4 | Hoàn thiện Course Service: CRUD, enrollment | `feat(week4): implement course service` |
| 5 | Hoàn thiện gateway GraphQL, resolver lồng nhau, xử lý lỗi | `feat(week5): integrate graphql gateway` |
| 6 | Tối ưu truy vấn (DataLoader/batching), phân trang, tìm kiếm | `feat(week6): optimize nested queries` |
| 7 | Xác thực, cấu hình, logging, kiểm thử lỗi service | `feat(week7): improve reliability` |
| 8 | Integration tests, Docker Compose, tài liệu API | `test(week8): add integration tests and docker` |
| 9 | Kiểm thử cuối, demo, README hoàn chỉnh, báo cáo | `docs(week9): finalize demo and report` |

Lưu ý: Tuần 1 chỉ dùng dữ liệu mô phỏng trong bộ nhớ; chưa có database riêng. Từng tuần nên có ít nhất 1 commit có ý nghĩa, không commit mã không chạy.
