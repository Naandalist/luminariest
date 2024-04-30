import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Dropdown from "../atoms/Dropdown";
import IconSun from "../../assets/icons/IconSun";

const Header = () => {
  const [search, setSearch] = useState(true);

  const themeConfig = {
    type: "light",
  };

  return (
    <header className={`z-40 horizontal`}>
      <div className="shadow-sm">
        <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex lg:hidden justify-between items-center mr-2">
            <Link to="/" className="main-logo flex items-center shrink-0">
              <img
                className="w-8 -ml-1 inline"
                src="/assets/images/idea.png"
                alt="logo"
              />
              <span className="text-2xl ml-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">
                <strong>Luminariest</strong>
              </span>
            </Link>
          </div>

          <div className="sm:flex-1 sm:ml-0 ml-auto flex justify-end items-center space-x-1.5 lg:space-x-2 dark:text-[#d0d2d6]">
            <div className="sm:mr-auto">{null}</div>
            <div>
              {"light" === "light" ? (
                <button
                  className={
                    "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                  }
                  onClick={() => {}}
                >
                  <IconSun />
                </button>
              ) : null}
            </div>
            <div className="dropdown shrink-0 flex">
              <Dropdown
                offset={[0, 8]}
                placement={"bottom-end"}
                btnClassName="relative group block"
                button={
                  <img
                    className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src="https://avatars.githubusercontent.com/u/14960087"
                    alt="userProfile"
                  />
                }
              >
                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img
                        className="rounded-md w-10 h-10 object-cover"
                        src="https://avatars.githubusercontent.com/u/14960087"
                        alt="userProfile"
                      />
                      <div className="pl-4 truncate">
                        <h4 className="text-base">
                          Naandalist
                          <span className="text-xs bg-success-light rounded text-success px-1 ml-2">
                            dev
                          </span>
                        </h4>
                        <button
                          type="button"
                          className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                        >
                          naandalist.com
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
