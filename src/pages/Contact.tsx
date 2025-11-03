import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "../components/icons/Icon";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact us</h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Our support team is always ready to assist you with any questions
            about domain registration, management, and other services.
          </p>
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <PhoneIcon className="h-6 w-6 text-blue-600"></PhoneIcon>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Hotline
            </h3>
            <p className="mb-1 text-gray-600">(028) 1234 5678</p>
            <p className="text-sm text-gray-500">
              Monday - Friday: 8:00 - 18:00
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <EnvelopeIcon className="h-6 w-6 text-blue-600"></EnvelopeIcon>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Email</h3>
            <p className="mb-1 text-gray-600">support@domainpro.com</p>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <MapPinIcon className="h-6 w-6 text-blue-600"></MapPinIcon>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Office</h3>
            <p className="mb-1 text-gray-600">720A Dien Bien Phu, Ward 22</p>
            <p className="text-sm text-gray-500">
              Binh Thanh, Ho Chi Minh City
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <div className="relative h-64 bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* <div className="text-center">
                <MapPinIcon className="mx-auto mb-2 h-12 w-12 text-gray-400"></MapPinIcon>
                <p className="text-gray-500">Office map</p>
              </div> */}
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.211436345951!2d106.722096!3d10.7951119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c2f8f30911%3A0x36ac5073f8c91acd!2sLandmark%2081!5e0!3m2!1sen!2s!4v1761733022152!5m2!1sen!2s"
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600">
              720A Dien Bien Phu, Ward 22, Binh Thanh, Ho Chi Minh City
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
