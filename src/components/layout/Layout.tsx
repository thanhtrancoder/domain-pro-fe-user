import Header from "./Header";
import Footer from "./Footer";
import GuestFooter from "./GuestFooter";
import { useLocation } from "react-router-dom";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const hideFor = [
    "/login",
    "/register",
    "/oauth2/success",
    "/momo/return",
    "/payment/success",
  ];
  const isGuest = hideFor.includes(pathname);

  return (
    <>
      {!isGuest && <Header />}
      <main>{children}</main>
      {isGuest ? <GuestFooter /> : <Footer />}
    </>
  );
};

export default Layout;
