import { loadDefaultStorage } from "@/app/cartAndWislistSlice";
import { loadLocalAuth, signOut } from "@/app/userAuthSlice";
import { navItems } from "@/utils/Data";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  IoPersonOutline,
  IoHeartOutline,
  IoCartOutline,
} from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isUserAuth, isSeller, user } = useSelector((state) => state.userAuth);
  const { cart, wishList } = useSelector((state) => state.cartWishlist);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [izMobileView, setIzMobileView] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const length = (type) => {
    let length = 0;

    if (type === "cart") {
      cart.forEach((item) => {
        length += item?.quantity;
      });
    } else {
      wishList.forEach((item) => {
        length += item?.quantity;
      });
    }

    return length;
  };

  useEffect(() => {
    window.innerWidth > 800 && setIsMenuOpen(false);
    window.innerWidth < 800 && setIzMobileView(true);
    window.addEventListener("resize", resizeHelper);

    return () => {
      window.removeEventListener("resize", resizeHelper);
      setIsMenuOpen(false);
      setIzMobileView(false);
      setProfileMenu(false);
    };

    function resizeHelper() {
      if (window.innerWidth > 800) {
        setIzMobileView(true);
      } else {
        setIzMobileView(false);
      }

      setIsMenuOpen(false);
    }
  }, []);

  const profileMenuClickHelper = (type) => {
    setProfileMenu(false);
    if (type === "ORDERS") {
      router.push("/user/orders");
    }
    if (type === "MY_LISTING") {
      router.push("/seller/listings");
    }
    if (type === "DASHBOARD") {
      router.push("/seller/dashboard");
    }
    if (type === "LOGOUT") {
      dispatch(signOut());
    }
  };

  return (
    <div className="w-full fixed top-0 right-0 left-0 z-50 bg-white">
      <nav className="relative px-4 py-4 flex justify-between items-center">
        <a className="text-3xl font-bold leading-none" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#4F46E5"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
              clipRule="evenodd"
            />
            <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
          </svg>
        </a>

        <ul
          className={`${isMenuOpen ? "block" : "hidden"} absolute ${
            !isMenuOpen
              ? "top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
              : "top-0 right-0 w-full h-screen bg-white z-10 flex items-center justify-center flex-col"
          } lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6`}
        >
          {navItems.map((navItem) => (
            <li onClick={() => setIsMenuOpen(false)}>
              <Link
                href={navItem.link}
                className={`text-3xl lg:mt-0 lg:text-lg text-gray-500 hover:text-[#FFA500] ${
                  navItem.extraBold && "font-semibold"
                } ${router.asPath === navItem.link && "text-[#FFA500]"}`}
              >
                {navItem.name}
              </Link>
            </li>
          ))}
          {isMenuOpen && (
            <li onClick={() => setIsMenuOpen(!isMenuOpen)} className="mt-10">
              <button className="navbar-burger flex items-center text-gray-600 dark:text-gray-300 p-3 text-4xl">
                <RxCross1 />
              </button>
            </li>
          )}
        </ul>
        <div className="space-x-2 flex">
          <div className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <button className="navbar-burger flex items-center text-gray-600 dark:text-gray-300 p-3">
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <button className="rounded-md px-2 py-1.5 text-2xl font-semibold leading-7 text-gray-500  relative">
            <IoPersonOutline
              className="hover:text-[#FFA500]"
              onClick={() => {
                !isUserAuth
                  ? router.push("/auth")
                  : setProfileMenu(!profileMenu);
              }}
            />
            {profileMenu && (
              <div className="bg-white absolute flex flex-col w-max text-left text-lg mx-auto -translate-x-[50%] top-[110%] p-2 px-4 rounded-md shadow-xl font-normal">
                <span
                  className="hover:text-[#FFA500] border-b mt-2 pb-1"
                  onClick={() => profileMenuClickHelper("ORDERS")}
                >
                  My Orders
                </span>

                {isSeller && (
                  <>
                    <span
                      className="hover:text-[#FFA500] border-b mt-2 pb-1"
                      onClick={() => profileMenuClickHelper("MY_LISTING")}
                    >
                      My Listed Paintings
                    </span>
                    <span
                      className="hover:text-[#FFA500] border-b mt-2 pb-1"
                      onClick={() => profileMenuClickHelper("DASHBOARD")}
                    >
                      Dashboard
                    </span>
                  </>
                )}
                {/*Seller only display */}
                <span
                  className="hover:text-[#FFA500] border-b mt-2 pb-1"
                  onClick={() => profileMenuClickHelper("LOGOUT")}
                >
                  Logout
                </span>
              </div>
            )}
          </button>
          <Link href="/wishlist">
            <button className="rounded-md px-2 py-1.5 text-2xl font-semibold leading-7 hover:text-[#FFA500] relative flex group">
              <IoHeartOutline />
              <span className="absolute text-xs rounded-full bg-[#FFA500]  px-1 top-0 -right-[1px] group-hover:text-white">
                {length("wishlist")}
              </span>
            </button>
          </Link>
          <Link href="/cart">
            <button className="rounded-md px-2 py-1.5 text-2xl font-semibold leading-7 hover:text-[#FFA500] relative flex group">
              <IoCartOutline />
              <span className="absolute text-xs rounded-full bg-[#FFA500]  px-1 top-0 -right-[1px] group-hover:text-white">
                {length("cart")}
              </span>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
