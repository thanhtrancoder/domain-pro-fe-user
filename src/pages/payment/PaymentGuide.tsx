import atmIcon from "../../assets/icons/atm.svg";
import loadIcon from "../../assets/icons/icons8-load.gif";

const PaymentGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="from-primary to-primary-hover bg-gradient-to-r px-6 py-8 sm:px-10">
            <h1 className="text-3xl font-bold text-white">
              Guide to paying with an ATM card
            </h1>
            <p className="mt-2 text-blue-100">
              Make simple and secure payments via ATM card on the Momo payment
              gateway
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-md text-lg font-bold text-white">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Select payment method
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      On the payment page, select “Pay with ATM card” and click
                      “Continue”.
                    </p>
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center justify-center">
                        <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                          <div className="flex items-center">
                            {/* <div className="h-8 w-12 rounded bg-gradient-to-r from-blue-400 to-blue-600"></div> */}
                            <img src={atmIcon} alt="ATM" className="size-8" />
                            <span className="ml-3 text-sm font-medium">
                              Thanh toán bằng thẻ ATM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-md text-lg font-bold text-white">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Enter card information
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Fill in your ATM card information in the required fields
                      and click “Payment”.
                    </p>
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <div className="grid grid-cols-3 gap-3 space-y-3">
                        <div className="col-span-2">
                          <label className="mb-1 block text-xs font-medium text-gray-700">
                            Số thẻ
                          </label>
                          <div className="rounded border border-gray-300 bg-white px-3 py-2 text-sm">
                            9704 0000 0000 0018
                          </div>
                        </div>
                        <div className="col-span-1">
                          <label className="mb-1 block text-xs font-medium text-gray-700">
                            Ngày phát hành
                          </label>
                          <div className="rounded border border-gray-300 bg-white px-3 py-2 text-sm">
                            03/07
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-700">
                            Tên chủ thẻ
                          </label>
                          <div className="rounded border border-gray-300 bg-white px-3 py-2 text-sm">
                            NGUYEN VAN A
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-md text-lg font-bold text-white">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Verify with the bank
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      You will be redirected to the bank's authentication page
                      to complete the transaction.
                    </p>
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center justify-center">
                        <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                          <div className="mb-3 flex items-center justify-center">
                            {/* <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600"></div> */}
                            <img src={loadIcon} alt="load" />
                          </div>
                          <p className="text-center text-sm font-medium">
                            Ngân hàng của bạn
                          </p>
                          <p className="mt-1 text-center text-xs text-gray-500">
                            Đang xác thực giao dịch...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-md text-lg font-bold text-white">
                      4
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Enter the OTP code
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Enter the OTP code that was sent to the phone number
                      registered with the bank and click “Continue”.
                    </p>
                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                      <div className="">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-700">
                            Mã xác thực (OTP)
                          </label>
                          <div className="rounded border border-gray-300 bg-white px-3 py-2 text-sm">
                            OTP
                          </div>
                        </div>
                      </div>
                      {/* <div className="flex justify-center space-x-2">
                        <input
                          type="text"
                          maxLength={1}
                          className="h-12 w-10 rounded-md border border-gray-300 text-center"
                        />
                        <input
                          type="text"
                          maxLength={1}
                          className="h-12 w-10 rounded-md border border-gray-300 text-center"
                        />
                        <input
                          type="text"
                          maxLength={1}
                          className="h-12 w-10 rounded-md border border-gray-300 text-center"
                        />
                        <input
                          type="text"
                          maxLength={1}
                          className="h-12 w-10 rounded-md border border-gray-300 text-center"
                        />
                        <input
                          type="text"
                          maxLength={1}
                          className="h-12 w-10 rounded-md border border-gray-300 text-center"
                        />
                        <input
                          type="text"
                          maxLength={1}
                          className="h-12 w-10 rounded-md border border-gray-300 text-center"
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-md text-lg font-bold text-white">
                      5
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Complete payment
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      After successful verification, you will be redirected to
                      the order confirmation page.
                    </p>
                    <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-green-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">
                            Payment successful!
                          </h3>
                          <div className="mt-2 text-sm text-green-700">
                            <p>
                              Your order is being processed, and you can
                              configure the domain name right now.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Information */}
            <div className="mt-12 rounded-lg bg-blue-50 p-6">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Test card information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Card number:
                  </p>
                  <p className="text-sm text-gray-600">9704 0000 0000 0018</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Release date:
                  </p>
                  <p className="text-sm text-gray-600">03/07</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Cardholder name:
                  </p>
                  <p className="text-sm text-gray-600">NGUYEN VAN A</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">OTP code:</p>
                  <p className="text-sm text-gray-600">OTP</p>
                </div>
              </div>
              <div className="mt-4 rounded-md bg-yellow-100 p-3">
                <p className="text-xs text-yellow-800">
                  <strong>Note:</strong> This is test card information for
                  development and testing purposes only. Do not use real
                  information in the test environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGuide;
