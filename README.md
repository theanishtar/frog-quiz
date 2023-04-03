
# Xây dựng website thi trắc nghiệm trực tuyến triển khai theo hình thức SPA sử dụng công nghệ Bootstrap và AngularJS với các chức năng theo yêu cầu sau


## Các công nghệ mình đã sử dụng trong dự án
| Các công nghệ sử dụng                                             | Image                                                                                                                                     | Phiên bản                  | Nội dung                                                                         |
| -----------------------------------------------------------| -------------------------------------------------------------------------------------------------------------------------------------------------| ------------------------ | --------------------------------------------------------------------------------------- |
| [Boostrap v3.3](https://getbootstrap.com/docs/3.3/)            | <img src="https://www.drupal.org/files/styles/grid-3-2x/public/project-images/bootstrap-stack.png?itok=BdTnonBB" title="" alt="06-00-18-00-html5.gif" width="100"> | 3.3          | Định dạng nội dung website theo chuẩn Boostrap |
| [HTML, CSS3, *SCSS](https://sass-lang.com/documentation/syntax)      | <img src="https://patrick-baessler.de/wp-content/uploads/2020/02/file_type_scss_icon_130177.png" width="100">                                 | 3.5        | Định dạng website theo định nghĩa của CSS, SCSS              |
| [AngularJS](https://angularjs.org/)               | <img src="https://railsware.com/blog/wp-content/uploads/2014/09/Make-AngularJS.png" width="100">                                             | 1.2                   | Triển khai ứng dụng web đơn trang (Single Page Application)              |
| [Giscus](https://giscus.app/)             | <img src="https://raw.githubusercontent.com/github/explore/8753900cdf248290844b22340000825a102dd5a2/topics/giscus/giscus.png" width="100">                                      | 2.2.6           | Bình luận dễ dàng với tài khoản Github                                                                    |
| [Fire Base](https://firebase.google.com/)               | <img src="https://4.bp.blogspot.com/-E4jSTev5hRQ/W4ueDh_vDDI/AAAAAAABcpg/2kFnCLk0E6sUz1eigQ5G8mJJvtRn3vy3wCLcBGAs/s1600/5847f40ecef1014c0b5e488a.png" width="100">                                      | 9.17.1         | Tạo cơ sở dữ liệu với FireBase                                                                      |
| [Dot ENV](https://www.npmjs.com/package/dotenv)               | <img src="https://raw.githubusercontent.com/chihab/ngx-env/main/logo.png" width="100">                                      | 16.0.      | Mã hóa dữ liệu                                                                     |

Ngoài ra còn sử dụng các ngôn ngữ đánh dấu như HTML, Markdown, CSS, ...


### Người học vào trang danh mục môn học và chọn môn thi. Trang thi trắc nghiệm hiển thị phục vụ người học thi trắc nghiệm môn đã chọn. Trang danh mục các môn học có phân trang, mỗi trang 4 hoặc 6 môn học.
#### Trang thi phải có các yêu tố sau đây
- Mỗi lần hiển thị một câu hỏi
- Có các nút điều hướng để đến câu hỏi trước, sau, đầu và cuối
- Có đồng hồ hiển thị thời gian làm bài
- Hiển thị thông tin tổng hợp:
- Tổng số câu hỏi
- Số câu đã làm
- Tổng điểm đạt được

- Ngoài ra website cũng phải cung cấp các trang web để quản lý thành viên
  - Đăng nhập
  - Đăng ký
  - Quên mật khẩu
  - Đổi mật khẩu
  - Sửa đổi thông tin tài khoản
- Website cũng cần phải có các trang thông dụng với hình thức tùy bạn thiết kế
  - Giới thiệu
  - Liên hệ
  - Góp ý
  - Hỏi đáp

# YÊU CẦU:
 
### Y1. Sử dụng bootstrap để thiết kế một layout phù hợp chứa các liên kết đến các trang thành viên sau đây. Các trang thành viên này phải sử dụng layout chúng đã thiết kế.
- Trang chủ
- Trang giới thiệu
- Trang liên hệ
- Trang góp ý
- Trang hỏi đáp
- Trang đăng nhập
- Trang đăng ký
- Trang đổi mật khẩu
- Trang sửa đổi tài khoản
- Trang danh mục môn học
- Trang thi trắc nghiệm

### Y2. Viết mã AngularJS cho các trang thành viên (đăng nhập, đăng ký, quên mật khẩu, đổi mật khẩu, sửa đổi thông tin tài khoản) theo yêu cầu sau:
- Kiểm và thông báo lỗi cho các form
- Đăng nhập: kiểm tra xem tài khoản đăng nhập có trong Students.js hay chưa
- Đăng ký: bổ sung vào mảng lấy từ Students.js
- Đổi mật khẩu: cập nhật lại mật khẩu trong mảng của Students.js
- Quên mật khẩu: hiển thị mật khẩu nếu nhập đúng mã và email
- Sửa đổi thông tin tài khoản: hiển thị tài đầy đủ thông tin tài khoản đã đăng nhập lên form và cho phép cập nhật

### Y3. Hiển thị dữ liệu json từ tài nguyên
- Hiển thị tất cả các môn học từ Subjects.js lên trang web danh mục môn học và menu đứng trên layout.
- Hiển thị tất cả các câu hỏi của môn “Lập trình Android nâng cao” có trong danh mục lên trang thi. Hiển thị các đáp án của mỗi môn có kèm radio cho phép chọn 
- Chấm và hiển thị điểm mỗi lần chọn vào radio
- Hiển thị đồng hồ ghi nhận thời gian làm bài. Mỗi giây cập nhật một lần

### Y4. Tổ chức ứng dụng dạng SPA
- Mô đun hóa giao diện layout gồm menu ngang và menu đứng
- Sử dụng dịch vụ $routeProvider để nạp các template giao diện đồng thời tổ chức các
controller để điều khiển từng template riêng.
- Sử dụng tham số để tải danh sách câu hỏi thi theo từng môn khi chọn môn học ở danh mục.
- Phân trang cho trang danh mục môn học. Mỗi trang 4 sản phẩm

## Y5. Hoàn thiện các trang còn lại được yêu cầu như trên


![Codeing data](https://th.bing.com/th/id/R.21116158daaeb1459b4ec0758505e1ad?rik=ymQdzmyYITrBnQ&pid=ImgRaw&r=0 "a title")
