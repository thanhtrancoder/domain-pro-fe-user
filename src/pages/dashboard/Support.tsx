const Support: React.FC = () => {
  return (
    <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
      {/* Title */}
      <div>
        <h3 className="text-xl font-bold">Trung tâm hỗ trợ</h3>
      </div>

      {/* Contact */}
      <div className="bg-light-primary2 text-primary-hover2 space-y-4 rounded-xl p-6 text-sm font-medium">
        <h4 className="text-base font-bold">Thông tin liên hệ</h4>
        <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
          <div>
            <p>Email hỗ trợ</p>
            <p className="text-primary-hover font-normal">
              support@domainpro.com
            </p>
          </div>
          <div>
            <p>Hotline hỗ trợ</p>
            <p className="text-primary-hover font-normal">1900 1234</p>
          </div>
          <div>
            <p>Giờ làm việc</p>
            <p className="text-primary-hover font-normal">8h00 - 22h00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
