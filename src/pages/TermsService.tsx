const TermsService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header Section */}
        <div className="from-primary to-primary-hover bg-gradient-to-r px-8 py-10">
          <h1 className="text-center text-3xl font-bold text-white">
            Điều Khoản Dịch Vụ
          </h1>
          <p className="mt-2 text-center text-blue-100">
            Cập nhật lần cuối: 15 tháng 5, 2023
          </p>
        </div>

        {/* Content Section */}
        <div className="px-8 py-8">
          {/* Introduction */}
          <div className="mb-8">
            <p className="leading-relaxed text-gray-700">
              Chào mừng bạn đến với dịch vụ đăng ký tên miền của chúng tôi. Khi
              sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản
              và điều kiện được nêu ra dưới đây. Vui lòng đọc kỹ các điều khoản
              này trước khi sử dụng dịch vụ của chúng tôi.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                1. Chấp Nhận Điều Khoản
              </h2>
              <p className="leading-relaxed text-gray-700">
                Bằng cách sử dụng dịch vụ của chúng tôi, bạn xác nhận rằng bạn
                đã đọc, hiểu và đồng ý bị ràng buộc bởi các điều khoản dịch vụ
                này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản
                này, bạn không thể sử dụng dịch vụ của chúng tôi.
              </p>
            </div>

            {/* Section 2 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                2. Mô Tả Dịch Vụ
              </h2>
              <p className="mb-3 leading-relaxed text-gray-700">
                Dịch vụ của chúng tôi bao gồm:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
                <li>Đăng ký tên miền mới</li>
                <li>Gia hạn tên miền</li>
                <li>Chuyển đổi tên miền</li>
                <li>Quản lý DNS</li>
                <li>Bảo vệ quyền riêng tư</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                3. Trách Nhiệm Người Dùng
              </h2>
              <p className="mb-3 leading-relaxed text-gray-700">
                Là người dùng dịch vụ của chúng tôi, bạn đồng ý:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
                <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật</li>
                <li>Không sử dụng tên miền cho các hoạt động bất hợp pháp</li>
                <li>Không vi phạm quyền sở hữu trí tuệ của bên thứ ba</li>
                <li>Không gửi thư rác hoặc thực hiện các hoạt động gian lận</li>
                <li>Duy trì tính bảo mật cho thông tin tài khoản của bạn</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                4. Thanh Toán và Gia Hạn
              </h2>
              <p className="mb-3 leading-relaxed text-gray-700">
                Về thanh toán và gia hạn tên miền:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
                <li>
                  Tất cả các khoản thanh toán phải được thực hiện đầy đủ và đúng
                  hạn
                </li>
                <li>Giá cả có thể thay đổi mà không cần thông báo trước</li>
                <li>Tên miền sẽ bị hủy nếu không được gia hạn đúng hạn</li>
                <li>Chúng tôi không hoàn tiền cho các tên miền đã đăng ký</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                5. Hủy Dịch Vụ
              </h2>
              <p className="leading-relaxed text-gray-700">
                Bạn có thể hủy dịch vụ của chúng tôi bất cứ lúc nào. Tuy nhiên,
                chúng tôi không hoàn lại tiền cho các khoản thanh toán đã thực
                hiện. Khi hủy dịch vụ, bạn sẽ mất quyền truy cập vào tên miền đã
                đăng ký.
              </p>
            </div>

            {/* Section 6 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                6. Bảo Mật
              </h2>
              <p className="leading-relaxed text-gray-700">
                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo chính
                sách bảo mật của chúng tôi. Tuy nhiên, chúng tôi không chịu
                trách nhiệm cho bất kỳ sự rò rỉ thông tin nào do lỗi của bên thứ
                ba hoặc do hành động của bạn.
              </p>
            </div>

            {/* Section 7 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                7. Giới Hạn Trách Nhiệm
              </h2>
              <p className="leading-relaxed text-gray-700">
                Trong phạm vi tối đa được pháp luật cho phép, chúng tôi không
                chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, đặc biệt, ngẫu
                nhiên hoặc hậu quả nào phát sinh từ việc sử dụng hoặc không thể
                sử dụng dịch vụ của chúng tôi.
              </p>
            </div>

            {/* Section 8 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                8. Thay Đổi Điều Khoản
              </h2>
              <p className="leading-relaxed text-gray-700">
                Chúng tôi có quyền thay đổi các điều khoản dịch vụ này bất cứ
                lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng trên
                trang web của chúng tôi. Việc bạn tiếp tục sử dụng dịch vụ sau
                khi các thay đổi được đăng tải đồng nghĩa với việc bạn chấp nhận
                các điều khoản đã được cập nhật.
              </p>
            </div>

            {/* Section 9 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                9. Giải Quyết Tranh Chấp
              </h2>
              <p className="leading-relaxed text-gray-700">
                Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến các điều
                khoản dịch vụ này sẽ được giải quyết theo luật pháp của quốc gia
                nơi chúng tôi đặt trụ sở chính.
              </p>
            </div>

            {/* Section 10 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                10. Liên Hệ
              </h2>
              <p className="leading-relaxed text-gray-700">
                Nếu bạn có bất kỳ câu hỏi nào về các điều khoản dịch vụ này, vui
                lòng liên hệ với chúng tôi qua email: support@domainpro.com hoặc
                qua số điện thoại: (123) 456-7890.
              </p>
            </div>
          </div>

          {/* Agreement Section */}
          {/* <div className="mt-12 rounded-lg bg-blue-50 p-6">
            <p className="mb-6 text-center text-gray-700">
              Bằng cách nhấp vào nút "Tôi Đồng Ý" bên dưới, bạn xác nhận rằng
              bạn đã đọc, hiểu và đồng ý tuân thủ các điều khoản dịch vụ này.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="focus:ring-opacity-50 rounded-lg bg-gray-300 px-6 py-3 font-medium text-gray-700 transition duration-300 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none">
                Tôi Không Đồng Ý
              </button>
              <button className="focus:ring-opacity-50 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                Tôi Đồng Ý
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TermsService;
