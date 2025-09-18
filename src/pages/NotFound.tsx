import NotFoundImg from "../assets/images/pexels-cookiecutter-17489163.jpg";

const NotFound: React.FC = () => {
  return (
    <div
      style={{ backgroundImage: `url(${NotFoundImg})` }}
      className="bg-cover bg-center px-4 py-10 text-white transition-discrete duration-300 text-shadow-lg md:px-24 md:py-20 lg:px-60 lg:py-40"
    >
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-4xl font-bold">Page not found</p>
    </div>
  );
};

export default NotFound;
