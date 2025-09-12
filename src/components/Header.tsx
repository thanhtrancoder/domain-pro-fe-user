import DomainProIcon from "../assets/icons/icons8-domain-50.png";
import { useState, useEffect } from "react";

type menuType = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const menuList: menuType[] = [
  {
    label: "Trang chủ",
    href: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    label: "Tên miền",
    href: "/domains",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
];

const Header = () => {
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
            onClick={onToggleMobileMenu}
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
          <a className="flex items-center justify-center" href="/">
            <img src={DomainProIcon} className="h-8 w-8"></img>
            <span className="text-primary ml-1 hidden text-2xl font-bold whitespace-nowrap md:block">
              Domain Pro
            </span>
          </a>

          {/* Menu */}
          <u className="ml-6 hidden list-none no-underline md:flex md:items-center md:gap-4">
            {menuList.map((menuItem: menuType, index: number) => (
              <li key={index}>
                <a
                  href={menuItem.href}
                  className="hover:text-primary flex items-center transition-colors duration-300"
                >
                  {menuItem.icon}
                  <span className="ml-1 text-lg whitespace-nowrap">
                    {menuItem.label}
                  </span>
                </a>
              </li>
            ))}
          </u>

          {/* Button */}
          {isLogin ? (
            <div className="ml-auto flex">
              <a
                href="/cart"
                className="hover:text-primary relative flex items-center rounded-lg p-1 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                <span className="bg-fail absolute -top-1 -right-2 rounded-full px-1.5 text-sm font-medium text-white">
                  {cartCount}
                </span>
              </a>
              <a
                href="/login"
                className="hover:text-primary ml-2 flex items-center rounded-md p-1 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </a>
            </div>
          ) : (
            !isLogin && (
              <div className="flex items-center justify-end md:ml-auto">
                <a
                  href="/login"
                  className="text-primary hover:text-primary-hover hidden rounded-md px-3 py-1 font-medium whitespace-nowrap transition-colors duration-300 hover:bg-gray-200 md:block"
                >
                  Đăng ký
                </a>
                <a
                  href="/login"
                  className="bg-primary hover:bg-primary-hover ml-2 rounded-md px-3 py-1 font-medium whitespace-nowrap text-white transition-colors duration-300"
                >
                  Đăng nhập
                </a>
              </div>
            )
          )}
        </div>
      </header>
      <div className="mt-12 md:mt-16"></div>

      {/* Dropdown menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 z-49 flex h-full w-full flex-col bg-white px-6 pt-12 pb-10 md:hidden md:pt-16">
          <ul className="mt-6 flex flex-col gap-1">
            {menuList.map((menuItem: menuType, index: number) => (
              <li key={index}>
                <a
                  href={menuItem.href}
                  className="hover:text-primary flex items-center rounded-md px-4 py-2 font-medium transition-colors duration-300 hover:bg-gray-100"
                >
                  {menuItem.icon}
                  <span className="ml-2 text-lg whitespace-nowrap">
                    {menuItem.label}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-auto size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/login"
            className="bg-primary hover:bg-primary-hover mx-4 mt-auto rounded-md py-2 text-center font-medium text-white transition-colors duration-300"
          >
            Đăng ký
          </a>
        </div>
      )}
    </>
  );
};

export default Header;
