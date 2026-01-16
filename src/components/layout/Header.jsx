import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

import logo from "/logos/cryptonitelogoupdated.png";
import { blogPosts } from "../../utils/blogs";
import miningLocations from "../../utils/miningLocations";
import { COINS } from "../../config/coins.config";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("access"));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  /* ================= CART ================= */
  useEffect(() => {
    const updateCart = () => {
      setCartCount(Number(localStorage.getItem("cartCount")) || 0);
    };

    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
        <div className="container-x h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/">
            <img src={logo} className="h-9" />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-800">
            <Dropdown
              title="ASIC Miners"
              open={openDropdown === "asic"}
              setOpen={() => setOpenDropdown("asic")}
              close={() => setOpenDropdown(null)}
            >
              <DropdownItem to="/shop">All Products</DropdownItem>
            </Dropdown>

            <Dropdown
              title="Hosting"
              open={openDropdown === "hosting"}
              setOpen={() => setOpenDropdown("hosting")}
              close={() => setOpenDropdown(null)}
            >
              {miningLocations.map((loc) => (
                <DropdownItem key={loc.id} to={`/locations/${loc.id}`}>
                  {loc.name}
                </DropdownItem>
              ))}
            </Dropdown>

            <Dropdown
              title="Calculator"
              open={openDropdown === "calculator"}
              setOpen={() => setOpenDropdown("calculator")}
              close={() => setOpenDropdown(null)}
            >
              {Object.values(COINS).map((coin) => (
                <DropdownItem key={coin.symbol} to={`/calculator/${coin.symbol}`}>
                  {coin.name} Mining Calculator
                </DropdownItem>
              ))}
            </Dropdown>

            <Dropdown
              title="How it Works"
              open={openDropdown === "how"}
              setOpen={() => setOpenDropdown("how")}
              close={() => setOpenDropdown(null)}
            >
              {blogPosts.map((blog) => (
                <DropdownItem key={blog.id} to={`/blogs/${blog.id}`}>
                  {blog.title}
                </DropdownItem>
              ))}
              <div className="border-t my-1" />
              <DropdownItem to="/#faq">FAQ</DropdownItem>
            </Dropdown>

            <Dropdown
              title="Company"
              open={openDropdown === "company"}
              setOpen={() => setOpenDropdown("company")}
              close={() => setOpenDropdown(null)}
            >
              <DropdownItem to="/about">About Us</DropdownItem>
              <DropdownItem to="/contact">Contact</DropdownItem>
              <DropdownItem to="/terms">Terms & Conditions</DropdownItem>
            </Dropdown>
          </nav>

          {/* ================= ICONS ================= */}
          <div className="hidden lg:flex items-center gap-6 text-xl">
            <FiSearch className="cursor-pointer hover:text-green-500" />

            <Link to="/cart" className="relative">
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <Link to="/dashboard" className="text-2xl hover:text-green-500">
                <FiUser />
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-green-500 transition"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* ================= MOBILE ICON ================= */}
          <button className="lg:hidden text-2xl" onClick={() => setMobileOpen(true)}>
            <FiMenu />
          </button>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 ${mobileOpen ? "block" : "hidden"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-black text-white z-50 transform transition ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <img src={logo} className="h-8" />
          <FiX onClick={() => setMobileOpen(false)} />
        </div>

        <nav className="flex flex-col px-6 py-6 space-y-4">
          <Link to="/shop" onClick={() => setMobileOpen(false)}>
            ASIC Miners
          </Link>

          {/* CALCULATOR (MOBILE DROPDOWN) */}
          <MobileDropdown
            title="Calculator"
            open={mobileDropdown === "calculator"}
            toggle={() => setMobileDropdown(mobileDropdown === "calculator" ? null : "calculator")}
          >
            {Object.values(COINS).map((coin) => (
              <MobileItem key={coin.symbol} to={`/calculator/${coin.symbol}`} close={setMobileOpen}>
                {coin.name} Calculator
              </MobileItem>
            ))}
          </MobileDropdown>

          {/* HOSTING */}
          <MobileDropdown
            title="Hosting"
            open={mobileDropdown === "hosting"}
            toggle={() => setMobileDropdown(mobileDropdown === "hosting" ? null : "hosting")}
          >
            {miningLocations.map((loc) => (
              <MobileItem key={loc.id} to={`/locations/${loc.id}`} close={setMobileOpen}>
                {loc.name}
              </MobileItem>
            ))}
          </MobileDropdown>

          {/* COMPANY */}
          <MobileDropdown
            title="Company"
            open={mobileDropdown === "company"}
            toggle={() => setMobileDropdown(mobileDropdown === "company" ? null : "company")}
          >
            <MobileItem to="/about" close={setMobileOpen}>
              About Us
            </MobileItem>
            <MobileItem to="/contact" close={setMobileOpen}>
              Contact
            </MobileItem>
            <MobileItem to="/terms" close={setMobileOpen}>
              Terms & Conditions
            </MobileItem>
          </MobileDropdown>

          {/* AUTH */}
          {isLoggedIn ? (
            <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
              My Profile
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-4 text-center border border-green-500 text-green-400 py-2 rounded-full font-semibold"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;

/* ================= SUB COMPONENTS ================= */

const Dropdown = ({ title, open, setOpen, close, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [close]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          open ? close() : setOpen();
        }}
        className="flex items-center gap-1 hover:text-green-500"
      >
        {title}
        <MdKeyboardArrowDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 w-72 bg-white text-black rounded-lg shadow-lg z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ to, children }) => (
  <Link to={to} className="block px-4 py-2 text-sm hover:bg-green-500/10 hover:text-green-500">
    {children}
  </Link>
);

const MobileDropdown = ({ title, open, toggle, children }) => (
  <div>
    <button onClick={toggle} className="w-full flex justify-between items-center">
      {title}
      {open ? <FiChevronUp /> : <FiChevronDown />}
    </button>

    {open && <div className="pl-4 pt-2 space-y-2 text-sm">{children}</div>}
  </div>
);

const MobileItem = ({ to, close, children }) => (
  <Link to={to} onClick={() => close(false)} className="block">
    {children}
  </Link>
);
