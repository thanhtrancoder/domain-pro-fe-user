import { CheckIcon } from "../components/icons/Icon";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="from-primary to-primary-hover bg-gradient-to-r px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              Chính sách bảo mật
            </h1>
            <p className="mt-2 text-blue-100">
              Cập nhật lần cuối: 15 tháng 5, 2023
            </p>
          </div>

          <div className="px-6 py-8">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Giới thiệu
              </h2>
              <p className="leading-relaxed text-gray-600">
                Tại Công ty Đăng ký Tên miền, chúng tôi cam kết bảo vệ thông tin
                cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng
                tôi thu thập, sử dụng, và bảo vệ thông tin của bạn khi bạn sử
                dụng dịch vụ đăng ký tên miền của chúng tôi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Thông tin chúng tôi thu thập
              </h2>
              <div className="border-primary-hover mb-4 border-l-4 bg-blue-50 p-4">
                <p className="text-gray-700">
                  Chúng tôi thu thập các loại thông tin sau để cung cấp và cải
                  thiện dịch vụ của mình:
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  Thông tin cá nhân: Tên, địa chỉ email, số điện thoại, địa chỉ
                  thanh toán
                </li>
                <li>
                  Thông tin tài khoản: Tên đăng nhập, mật khẩu (được mã hóa)
                </li>
                <li>
                  Thông tin tên miền: Tên miền bạn đăng ký, thông tin DNS, thông
                  tin chuyển nhượng
                </li>
                <li>
                  Thông tin thanh toán: Thẻ tín dụng, thông tin tài khoản ngân
                  hàng (được xử lý bởi bên thứ ba an toàn)
                </li>
                <li>
                  Thông tin sử dụng: Dữ liệu về cách bạn tương tác với trang web
                  của chúng tôi
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Cách chúng tôi sử dụng thông tin của bạn
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Để cung cấp dịch vụ
                  </h3>
                  <p className="text-sm text-gray-600">
                    Đăng ký tên miền, gia hạn, chuyển nhượng và quản lý tài
                    khoản của bạn
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Để cải thiện dịch vụ
                  </h3>
                  <p className="text-sm text-gray-600">
                    Phân tích dữ liệu để hiểu nhu cầu và cải thiện trải nghiệm
                    người dùng
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Để giao tiếp
                  </h3>
                  <p className="text-sm text-gray-600">
                    Gửi thông báo quan trọng về tài khoản và dịch vụ của bạn
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Để tuân thủ pháp luật
                  </h3>
                  <p className="text-sm text-gray-600">
                    Đáp ứng các yêu cầu pháp lý và quy định của cơ quan đăng ký
                    tên miền
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Chia sẻ thông tin của bạn
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân
                của bạn cho bên thứ ba. Chúng tôi chỉ chia sẻ thông tin của bạn
                trong các trường hợp sau:
              </p>
              <div className="mb-4 border-l-4 border-yellow-500 bg-yellow-50 p-4">
                <p className="text-gray-700">
                  Thông tin liên hệ của chủ sở hữu tên miền (ngoại trừ thông tin
                  bảo mật) có thể được công khai theo yêu cầu của ICANN và các
                  cơ quan đăng ký tên miền.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  Đối với các nhà cung cấp dịch vụ thanh toán để xử lý giao dịch
                </li>
                <li>
                  Đối với các cơ quan đăng ký tên miền để quản lý tên miền của
                  bạn
                </li>
                <li>
                  Đối với các cơ quan thực thi pháp luật khi có yêu cầu hợp lệ
                </li>
                <li>Đối với các đối tác kinh doanh đã ký thỏa thuận bảo mật</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Bảo mật thông tin
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                Chúng tôi áp dụng các biện pháp bảo mật phù hợp để bảo vệ thông
                tin của bạn:
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Mã hóa dữ liệu nhạy cảm bằng SSL/TLS
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Hạn chế quyền truy cập thông tin cá nhân
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Đánh giá và cập nhật các biện pháp bảo mật định kỳ
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Sao lưu dữ liệu và kế hoạch phục hồi thảm họa
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Cookie và công nghệ theo dõi
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                Chúng tôi sử dụng cookie và các công nghệ tương tự để cải thiện
                trải nghiệm của bạn trên trang web của chúng tôi:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                      >
                        Loại Cookie
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                      >
                        Mục đích
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                      >
                        Thời gian lưu trữ
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        Cookie thiết yếu
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        Đảm bảo trang web hoạt động đúng
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        Phiên làm việc
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        Cookie hiệu suất
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        Thu thập thông tin thống kê
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        1 năm
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        Cookie chức năng
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        Ghi nhớ cài đặt của bạn
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        30 ngày
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Quyền của bạn
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                Bạn có các quyền sau đối với thông tin cá nhân của mình:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Quyền truy cập
                  </h3>
                  <p className="text-sm text-gray-600">
                    Yêu cầu bản sao thông tin cá nhân của bạn
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Quyền sửa đổi
                  </h3>
                  <p className="text-sm text-gray-600">
                    Cập nhật hoặc sửa đổi thông tin không chính xác
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Quyền xóa
                  </h3>
                  <p className="text-sm text-gray-600">
                    Yêu cầu xóa thông tin cá nhân của bạn
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Quyền hạn chế
                  </h3>
                  <p className="text-sm text-gray-600">
                    Hạn chế xử lý thông tin của bạn
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Thay đổi chính sách bảo mật
              </h2>
              <p className="leading-relaxed text-gray-600">
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian.
                Bất kỳ thay đổi nào sẽ được đăng trên trang này và, nếu có thay
                đổi đáng kể, chúng tôi sẽ thông báo cho bạn qua email hoặc thông
                báo trên trang web của chúng tôi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Liên hệ
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                Nếu bạn có câu hỏi hoặc thắc mắc về chính sách bảo mật này, vui
                lòng liên hệ với chúng tôi:
              </p>
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">support@domainpro.com</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">
                    Điện thoại
                  </p>
                  <p className="text-gray-900">(028) 1234 5678</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Địa chỉ</p>
                  <p className="text-gray-900">
                    123 Đường Công nghệ, Quận 1, TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
