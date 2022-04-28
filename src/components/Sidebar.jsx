import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHome, FaUser, FaBars, FaFileAlt, FaSave } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch, BiCog } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/login",
    name: "Login",
    icon: <FaUser />,
  },
  {
    path: "/receive-order",
    name: "Receive-order",
    icon: <MdMessage />,
  },
  {
    path: "/menu-list",
    name: "Menu-list",
    icon: <BsCartCheck />,
  },
  {
    path: "/fileManager",
    name: "FileManager",
    icon: <FaFileAlt />,
  },
  {
    path: "/order",
    name: "Order",
    icon: <BiAnalyse />,
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <FaSave />,
  },
  {
    path: "/setting",
    name: "Setting",
    icon: <BiCog />,
  },
];

const Sidebar = ({ children }) => {
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
