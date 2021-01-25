import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { VscAccount } from "react-icons/vsc";

const Navigation = () => {
  // prettier-ignore

  const handleMenuAction = (e) => {
    const menuTargetContainerEl =
      e.target.closest(".nav__sm-container") ?? null;

    if (!menuTargetContainerEl) return;

    const menuIconList =
      menuTargetContainerEl.querySelectorAll(
        ".nav-sm-exit-icon, .nav-sm-menu-icon"
      ) ?? null;

    if (menuIconList.length < 2 || menuIconList.length === 0 || !menuIconList) {
      return;
    }
    const menuSmDrawerEl = menuTargetContainerEl.querySelector('.nav__sm-links') ?? null;
    if (!menuSmDrawerEl) return;

    menuIconList.forEach(icon => icon.classList.toggle('active'));
    menuSmDrawerEl.classList.toggle('active');
  };

  return (
    <>
      <div className="nav">
        <div className="nav__lg-container">
          <ul className="nav__lg-links">
            <li id="homeLink" className="nav__link">
              <NavLink to="/">
                <img id="homeLogo" src="/assets/favicon.svg" />
              </NavLink>
            </li>
            <li id="aboutLink" className="nav__link">
              <NavLink to="/about">About</NavLink>
            </li>
            <li id="expenseFeedLink" className="nav__link">
              <NavLink to="/expense-feed">Expense Feed</NavLink>
            </li>
            <li id="dashboardLink" className="nav__link">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li id="navLoginLink" className="nav__link">
              <div className="nav__login-link-container">
                <NavLink id="login" to="/login">
                  <VscAccount className="nav__link-icon" />
                  <span className="nav__link-inner-text">Login</span>
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
        <div onClick={handleMenuAction} className="nav__sm-container">
          <HiOutlineMenu
            className="nav-sm-menu-icon active"
            fill="#12263f"
            stroke="#12263f"
          />
          <GrClose
            fill="#12263f"
            stroke="#12263f"
            className="nav-sm-exit-icon"
          />
          <ul className="nav__sm-links">
            <li className="nav__sm-link">Logo</li>
            <li className="nav__sm-link">Dashboard</li>
            <li className="nav__sm-link">Login</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;
