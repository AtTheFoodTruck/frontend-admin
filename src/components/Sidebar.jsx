import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHome, FaUser, FaBars, FaFileAlt, FaSave } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { BsCartCheck, BsCardChecklist } from "react-icons/bs";
import { RiVipCrown2Line } from "react-icons/ri";
import {
  AiOutlineLogout,
  AiOutlineCheckCircle,
  AiFillBackward,
} from "react-icons/ai";

import { Link, NavLink } from "react-router-dom";

let isAuthorized = localStorage.getItem("Authorization");

const _routes = [
  {
    path: "/",
    name: "홈",
    icon: <FaHome />,
  },
  {
    path: "/store-register",
    name: "상점 등록",
    icon: <AiOutlineCheckCircle />,
  },
  {
    path: "/receive-order",
    name: "주문",
    icon: <BsCartCheck />,
  },
  {
    path: "/menu-list",
    name: "메뉴 관리",
    icon: <BsCardChecklist />,
  },
  {
    path: "/prev-order",
    name: "이전 주문",
    icon: <AiFillBackward />,
  },
];

const Sidebar = ({ children }) => {
  const [routes, setRoutes] = useState(_routes);
  const onClickLogout = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("userId");
    window.location.replace("/");
  };
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "40px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 11,
            },
          }}
          className="sidebar"
        >
          <div className="top_section">
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="logo"
              >
                FoodTruckAroundMe
              </motion.h1>
            )}
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  placeholder="Search..."
                />
              )}
            </AnimatePresence>
          </div>

          <section className="routes">
            {isOpen ? (
              !isAuthorized ? (
                <>
                  <NavLink to={"/"} className="link">
                    <div className="icon">
                      <FaUser />
                    </div>
                    <AnimatePresence>
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        로그인
                      </motion.div>
                    </AnimatePresence>
                  </NavLink>
                  <NavLink to={"/owner-register"} className="link">
                    <div className="icon">
                      <RiVipCrown2Line />
                    </div>
                    <AnimatePresence>
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        회원가입
                      </motion.div>
                    </AnimatePresence>
                  </NavLink>
                </>
              ) : (
                <NavLink to={"/"} className="link">
                  <div className="icon">
                    <AiOutlineLogout />
                  </div>
                  <AnimatePresence>
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      onClick={onClickLogout}
                      className="link_text"
                    >
                      로그아웃
                    </motion.div>
                  </AnimatePresence>
                </NavLink>
              )
            ) : !isAuthorized ? (
              <>
                <NavLink to={"/"} className="link">
                  <div className="icon">
                    <FaUser />
                  </div>
                </NavLink>
                <NavLink to={"/owner-register"} className="link">
                  <div className="icon">
                    <RiVipCrown2Line />
                  </div>
                </NavLink>
              </>
            ) : (
              <NavLink to={"/"} className="link">
                <div className="icon" onClick={onClickLogout}>
                  <AiOutlineLogout />
                </div>
              </NavLink>
            )}

            {routes.map((route) => (
              <NavLink to={route.path} key={route.name} className="link">
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            ))}
          </section>
        </motion.div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
