import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { FaBoxOpen, FaComments, FaUser } from "react-icons/fa";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import images from "../../../../constant/images";
import NavItem from "./navItem";
import NavItemCollapse from "./NavItemCollapse";

const Header = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const toggleMenuHandler = () => {
    setIsMenuActive((prev) => !prev);
  };

  useEffect(() => {
    setIsMenuActive(windowSize.width >= 1024);
  }, [windowSize.width]);

  const handleCreateNewPost = ({ token }) => {
    mutateCreatePost({ token });
  };

  return (
    <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      {/* Logo */}
      <Link to="/">
        <img src={images.Logo} alt="logo" className="w-16 lg:hidden" />
      </Link>

      {/* Burger Icon */}
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
        )}
      </div>

      {/* Sidebar Container */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />

          {/* Sidebar */}
          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
            <Link to="/">
              <img src={images.Logo} alt="logo" className="w-16" />
            </Link>

            <h4 className="mt-10 font-bold text-[#C7C7C7]">MAIN MENU</h4>

            {/* Menu Items */}
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              <NavItem
                title="Dashboard"
                link="/admin"
                icon={<AiFillDashboard className="text-xl" />}
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItem
                title="Products"
                link="/admin/products"
                icon={<FaBoxOpen className="text-xl" />}
                name="products"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />

              <NavItemCollapse
                title="Orders"
                icon={<MdDashboard className="text-xl" />}
                name="orders"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link
                  to="/admin/orders/manage"
                  className="block p-2 hover:bg-gray-100 rounded-md"
                >
                  Manage All Orders
                </Link>
              </NavItemCollapse>

              <NavItem
                title="Users"
                link="/admin/users/manage"
                icon={<FaUser className="text-xl" />}
                name="users"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
