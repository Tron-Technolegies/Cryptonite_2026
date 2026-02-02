import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";

import logo from "/logos/cryptonitelogoupdated.png";
import { blogPosts } from "../../utils/blogs";
import miningLocations from "../../utils/miningLocations";
import { COINS } from "../../config/coins.config";
import { getProducts } from "../../api/product.api";
import { getImageUrl } from "../../utils/imageUtils";
import { sendEnquiryMessage } from "../../utils/whatsApp";

const Header = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  // Search State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Search Logic
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
      setSearching(true);
      try {
        const response = await getProducts({ search: searchQuery });
        const items = response.results || response.data || response || [];
        setSearchResults(Array.isArray(items) ? items.slice(0, 5) : []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

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

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout/", {
        refresh: localStorage.getItem("refresh"),
      });
    } catch (err) {
      console.log("Logout error", err);
    }

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
        <div className="container-x h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/">
            <img src={logo} className="w-32" />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-800">
            <Dropdown
              title="ASIC Miners"
              open={openDropdown === "asic"}
              setOpen={() => setOpenDropdown("asic")}
              close={() => setOpenDropdown(null)}
            >
              <DropdownItem to="/shop" onClick={() => setOpenDropdown(null)}>
                All Products
              </DropdownItem>
            </Dropdown>

            <Dropdown
              title="Hosting"
              open={openDropdown === "hosting"}
              setOpen={() => setOpenDropdown("hosting")}
              close={() => setOpenDropdown(null)}
            >
              <DropdownItem to="/hosting" onClick={() => setOpenDropdown(null)}>
                All Hosting
              </DropdownItem>
              <div className="border-t my-1" />
              {miningLocations.map((loc) => (
                <DropdownItem
                  key={loc.id}
                  to={`/locations/${loc.id}`}
                  onClick={() => setOpenDropdown(null)}
                >
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
              <DropdownItem to="/calculator" onClick={() => setOpenDropdown(null)}>
                Common Calculator
              </DropdownItem>
              <div className="border-t my-1" />
              {Object.values(COINS).map((coin) => (
                <DropdownItem
                  key={coin.symbol}
                  to={`/calculator/${coin.symbol}`}
                  onClick={() => setOpenDropdown(null)}
                >
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
                <DropdownItem
                  key={blog.id}
                  to={`/blogs/${blog.id}`}
                  onClick={() => setOpenDropdown(null)}
                >
                  {blog.title}
                </DropdownItem>
              ))}
              <div className="border-t my-1" />
              <DropdownItem to="/#faq" onClick={() => setOpenDropdown(null)}>
                FAQ
              </DropdownItem>
            </Dropdown>

            <Dropdown
              title="Company"
              open={openDropdown === "company"}
              setOpen={() => setOpenDropdown("company")}
              close={() => setOpenDropdown(null)}
            >
              <DropdownItem to="/about" onClick={() => setOpenDropdown(null)}>
                About Us
              </DropdownItem>
              <DropdownItem
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDropdown(null);
                  sendEnquiryMessage();
                }}
              >
                Contact
              </DropdownItem>
              <DropdownItem to="/terms" onClick={() => setOpenDropdown(null)}>
                Terms & Conditions
              </DropdownItem>
            </Dropdown>
          </nav>

          {/* ================= ICONS ================= */}
          <div className="hidden lg:flex items-center gap-4 text-sm">
            {/* SEARCH INPUT */}
            <div
              className={`relative flex items-center transition-all duration-300 ${searchOpen ? "w-64" : "w-8"}`}
            >
              {searchOpen && (
                <input
                  type="text"
                  autoFocus
                  placeholder="Search miners..."
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-full pl-3 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 text-sm shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchResults.length > 0) {
                      navigate(`/products/${searchResults[0].id}`);
                      setSearchOpen(false);
                    }
                  }}
                />
              )}
              <FiSearch
                className={`cursor-pointer hover:text-green-500 z-10 text-2xl ${searchOpen ? "absolute right-2 text-gray-500" : ""}`}
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (searchOpen) setTimeout(() => setSearchQuery(""), 300);
                }}
              />

              {/* SEARCH RESULTS DROPDOWN */}
              {searchOpen && searchQuery && (
                <div className="absolute top-12 right-0 w-80 bg-white shadow-xl border border-gray-100 rounded-lg overflow-hidden z-50">
                  {searching ? (
                    <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
                        >
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.model_name}
                            className="w-12 h-12 object-contain bg-white rounded-md border border-gray-100"
                          />
                          <div>
                            <p className="font-semibold text-sm text-gray-800 line-clamp-1">
                              {product.model_name}
                            </p>
                            <p className="text-xs text-green-600 font-bold">
                              ${Number(product.price).toLocaleString()}
                            </p>
                            <p className="text-[10px] text-gray-500">{product.hashrate} TH/s</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">No products found</div>
                  )}
                </div>
              )}
            </div>

            {/* <Link to="/cart" className="relative">...
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link> */}

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="text-2xl hover:text-green-500" title="My Profile">
                  <FiUser />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xl hover:text-red-500"
                  title="Logout"
                >
                  <FiLogOut />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-green-500 transition"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* MOBILE MENU & SEARCH */}
          <div className="lg:hidden flex items-center gap-4">
            <div
              className={`relative flex items-center transition-all duration-300 ${searchOpen ? "w-48" : "w-auto"}`}
            >
              {searchOpen && (
                <input
                  type="text"
                  autoFocus
                  placeholder="Search..."
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-full pl-3 pr-8 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:border-green-500 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              )}
              <FiSearch
                className="text-2xl cursor-pointer hover:text-green-500 z-10"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (searchOpen) setTimeout(() => setSearchQuery(""), 300);
                }}
              />

              {/* MOBILE DROPDOWN RESULTS */}
              {searchOpen && searchQuery && (
                <div className="absolute top-10 right-0 w-64 bg-white shadow-xl border border-gray-100 rounded-lg overflow-hidden z-50">
                  {/* Reusing logic via duplicate rendering for simplicity or we can extract later. */}
                  {searching ? (
                    <div className="p-3 text-center text-gray-500 text-xs">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                        >
                          <img
                            src={getImageUrl(product.image)}
                            alt={product.model_name}
                            className="w-8 h-8 object-contain bg-white rounded border border-gray-100"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-xs text-gray-800 line-clamp-1">
                              {product.model_name}
                            </p>
                            <p className="text-[10px] text-green-600 font-bold">
                              ${Number(product.price).toLocaleString()}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 text-center text-gray-500 text-xs">No results</div>
                  )}
                </div>
              )}
            </div>

            <button className="text-2xl" onClick={() => setMobileOpen(true)}>
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black/60 z-40 ${mobileOpen ? "block" : "hidden"}`}
        onClick={() => setMobileOpen(false)}
      />

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
            <MobileItem to="/calculator" close={setMobileOpen}>
              Common Calculator
            </MobileItem>
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
            <MobileItem to="/hosting" close={setMobileOpen}>
              All Hosting
            </MobileItem>
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
            <button
              onClick={() => {
                setMobileOpen(false);
                sendEnquiryMessage();
              }}
              className="block w-full text-left"
            >
              <span className="block px-0 py-2 text-sm hover:bg-green-500/10 hover:text-green-500">
                Contact
              </span>
            </button>
            <MobileItem to="/terms" close={setMobileOpen}>
              Terms & Conditions
            </MobileItem>
          </MobileDropdown>

          {/* AUTH */}
          {isLoggedIn ? (
            <>
              <Link to="/profile" onClick={() => setMobileOpen(false)}>
                My Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="text-left text-red-500"
              >
                Logout
              </button>
            </>
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

const DropdownItem = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2 text-sm hover:bg-green-500/10 hover:text-green-500"
  >
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
