import { useState } from "react";
import { Link } from "react-router-dom";
import DomainProIcon from "../../assets/icons/icons8-domain-50.png";
import { Button, SquareNavButton } from "../ui/Button";
import { Input } from "../ui/Input";
import { EnvelopeIcon } from "../icons/Icon";
import {
  footerMenuList,
  contactList,
  socialList,
  certificateList,
} from "./footerData";
import type { menuType } from "./types";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="from-dark to-dark-hover bg-gradient-to-br">
      <div className="flex flex-col space-y-8 px-4 py-8 text-gray-300 md:grid md:grid-cols-2 md:gap-4 md:px-10 md:pt-10 md:pb-6 lg:grid lg:grid-cols-4 lg:gap-8 lg:px-14 lg:pt-14 lg:pb-10">
        <div className="flex flex-col space-y-8">
          {/* Company */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-1">
              <img src={DomainProIcon} className="h-8 w-8"></img>
              <span className="text-primary text-2xl font-bold whitespace-nowrap">
                Domain Pro
              </span>
            </div>
            <p className="text-justify">
              Dịch vụ đăng ký tên miền hàng đầu Việt Nam. Chúng tôi cung cấp
              giải pháp toàn diện cho nhu cầu tên miền của bạn.
            </p>
          </div>

          {/* Get news */}
          <div className="flex flex-col space-y-3">
            <span className="text-light-primary text-lg font-medium">
              Đăng ký nhận tin
            </span>

            <Input
              type="email"
              placeholder="Nhập email của bạn"
              icon={
                <EnvelopeIcon className="size-6 text-gray-500"></EnvelopeIcon>
              }
              value={email}
              className="border border-gray-500 bg-gray-700"
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Button
              label="Đăng ký"
              className="bg-primary-hover hover:bg-primary text-white"
            ></Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-3">
          <span className="text-light-primary text-lg font-medium">
            Điều hướng
          </span>
          <ul className="list-none space-y-3">
            {footerMenuList.map((menuItem: menuType, index: number) => (
              <li key={index}>
                <Link
                  to={menuItem.href}
                  className="hover:text-primary flex items-center space-x-2 transition-colors duration-300"
                >
                  {menuItem.icon}
                  <span className="whitespace-nowrap">{menuItem.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col space-y-2">
          <span className="text-light-primary text-lg font-medium whitespace-nowrap">
            Liên hệ
          </span>
          <ul className="list-none space-y-3">
            {contactList.map((contactItem: menuType, index: number) => (
              <li key={index}>
                <Link
                  to={contactItem.href}
                  className="hover:text-primary flex items-center space-x-2 transition-colors duration-300"
                  target="_blank"
                >
                  {contactItem.icon}
                  <p className="text-justify">{contactItem.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col space-y-2">
          <span className="text-light-primary text-lg font-medium">
            Kết nối với chúng tôi
          </span>
          <div className="flex space-x-4">
            {socialList.map((socialItem: menuType, index: number) => (
              <div key={index}>
                <SquareNavButton
                  to={socialItem.href}
                  leftIcon={socialItem.icon}
                  className="hover:bg-primary bg-gray-600"
                ></SquareNavButton>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-700"></div>

      {/* Certificate */}
      <div className="flex flex-col space-y-8 px-4 py-6 text-gray-300">
        <div className="flex items-center justify-center space-x-4">
          {certificateList.map((certificateItem: menuType, index: number) => (
            <div
              key={index}
              className="bg-dark-hover flex items-center space-x-1 rounded-lg border border-gray-600 px-3 py-2"
            >
              {certificateItem.icon}
              <span className="whitespace-nowrap">{certificateItem.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="flex flex-col items-center space-y-2 px-4 pb-8">
        <p className="text-sm text-gray-400">
          © 2025 DomainPro. Tất cả các quyền được bảo lưu.
        </p>
        <p className="text-xs text-gray-500">
          Thiết kế bởi Domain-Pro Development Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
