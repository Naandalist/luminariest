import React from "react";
import Dropdown from "./dropdown";
import { Link, useNavigate } from "react-router-dom";
import { IconListCheck, IconSettings, IconTrashLines } from "../assets/icons";
import { clearAll, seeder } from "../helper";

const Header = () => {
  const navigate = useNavigate();

  const onSeedData = async () => {
    await seeder();
    navigate(".", { replace: true });
  };

  const onClearAllData = async () => {
    await clearAll();
    navigate(".", { replace: true });
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

            <div className="dropdown shrink-0 flex">
              <Dropdown
                offset={[0, 8]}
                placement={"bottom-end"}
                btnClassName="relative group block"
                button={
                  <IconSettings className="animate-[spin_3s_linear_infinite] w-5 h-5" />
                }
              >
                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                  <li>
                    <button
                      className="dark:hover:text-white"
                      onClick={() => onSeedData()}
                    >
                      <IconListCheck className="w-4.5 h-4.5 mr-2 shrink-0" />
                      Seed Data
                    </button>
                  </li>
                  <li>
                    <button
                      className="dark:hover:text-white"
                      onClick={() => onClearAllData()}
                    >
                      <IconTrashLines className="w-4.5 h-4.5 mr-2 shrink-0" />
                      Clear All
                    </button>
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
