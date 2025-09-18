import DomainProIcon from "../../assets/icons/icons8-domain-50.png";
import { useState, useEffect } from "react";
import { NavButton } from "../ui/Button";
import { CartIcon, UserCircleIcon, AngleRightIcon } from "../icons/Icon";
import type { menuType } from "./types";
import { headerMenuList } from "./headerData";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [cartCount, setCartCount] = useState("99");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileMenuOpen]);

  const onToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white">
        <div className="mx-3 my-2 grid grid-cols-3 items-center md:mx-10 md:my-4 md:flex md:items-center lg:mx-20">
          {/* Mobile hamburger button */}
          <button
            aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isMobileMenuOpen}
            className="relative flex h-6 w-6 items-center justify-center md:hidden"
            onClick={() => onToggleMobileMenu()}
          >
            <span
              className={
                "absolute left-0 block h-0.5 w-6 transform bg-current duration-300 " +
                (isMobileMenuOpen ? "top-3 rotate-45" : "top-1")
              }
            ></span>
            <span
              className={
                "absolute left-0 block h-0.5 w-6 transform bg-current duration-300 " +
                (isMobileMenuOpen ? "top-3 opacity-0" : "top-3 opacity-100")
              }
            ></span>
            <span
              className={
                "absolute left-0 block h-0.5 w-6 transform bg-current duration-300 " +
                (isMobileMenuOpen ? "top-3 -rotate-45" : "top-5")
              }
            ></span>
          </button>

          {/* Logo */}
          <Link className="flex items-center justify-center" to="/">
            <img src={DomainProIcon} className="h-8 w-8"></img>
            <span className="text-primary ml-1 hidden text-2xl font-bold whitespace-nowrap md:block">
              Domain Pro
            </span>
          </Link>

          {/* Menu */}
          <u className="ml-6 hidden list-none no-underline md:flex md:items-center md:gap-4">
            {headerMenuList.map((menuItem: menuType, index: number) => (
              <li key={index}>
                <Link
                  to={menuItem.href}
                  className="hover:text-primary flex items-center transition-colors duration-300"
                >
                  <menuItem.icon></menuItem.icon>
                  <span className="ml-1 text-lg whitespace-nowrap">
                    {menuItem.label}
                  </span>
                </Link>
              </li>
            ))}
          </u>

          {/* Button */}
          {isLogin ? (
            <div className="ml-auto flex">
              <Link
                to="/cart"
                className="hover:text-primary relative flex items-center rounded-lg p-1 hover:bg-gray-100"
              >
                <CartIcon className="size-7"></CartIcon>
                <span className="bg-fail absolute -top-1 -right-2 rounded-full px-1.5 text-sm font-medium text-white">
                  {cartCount}
                </span>
              </Link>
              <a
                href="/login"
                className="hover:text-primary ml-2 flex items-center rounded-md p-1 hover:bg-gray-100"
              >
                <UserCircleIcon className="size-7"></UserCircleIcon>
              </a>
            </div>
          ) : (
            !isLogin && (
              <div className="flex items-center justify-end md:ml-auto md:space-x-1">
                <NavButton
                  label="Đăng Ký"
                  to="/register"
                  className="text-primary hover:text-primary-hover hidden hover:bg-gray-200 md:block"
                />
                <NavButton label="Đăng nhập" to="/login" />
              </div>
            )
          )}
        </div>
      </header>
      <div className="mt-14 md:mt-18"></div>

      {/* Dropdown menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 z-49 flex h-full w-full flex-col bg-white px-6 pt-12 pb-10 md:hidden md:pt-16">
          <ul className="mt-6 flex flex-col gap-1">
            {headerMenuList.map((menuItem: menuType, index: number) => (
              <li key={index}>
                <Link
                  to={menuItem.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-primary flex items-center rounded-md px-4 py-2 font-medium transition-colors duration-300 hover:bg-gray-100"
                >
                  <menuItem.icon></menuItem.icon>
                  <span className="ml-2 text-lg whitespace-nowrap">
                    {menuItem.label}
                  </span>
                  <AngleRightIcon className="ml-auto size-6"></AngleRightIcon>
                </Link>
              </li>
            ))}
          </ul>
          <NavButton
            label="Đăng ký"
            to="/register"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-primary hover:bg-primary-hover mx-4 mt-auto text-white"
          ></NavButton>
        </div>
      )}
    </>
  );
};

export default Header;
