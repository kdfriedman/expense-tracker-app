import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";

const Navigation = ({ pathname }) => {
  console.log(pathname);
  const handleMenuAction = (e) => {
    const nav = e.target.closest(".nav") ?? null;
    const navChildMenuElList = nav.querySelectorAll(
      `
        .nav__sm-menu-icon, 
        .nav__sm-drawer, 
        .nav__sm-links, 
        .nav__sm-drawer-backdrop
      `
    );
    if (!navChildMenuElList || navChildMenuElList.length < 4) return;
    navChildMenuElList.forEach((child) => child.classList.toggle("active"));
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
            <li className="nav__link margin-lf-rt">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="nav__link margin-lf-rt">
              <NavLink to="/expense-feed">Expense Feed</NavLink>
            </li>
            <li className="nav__link margin-lf-rt">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li id="navLoginLink" className="nav__link">
              <div className="nav__link-btn-container">
                <NavLink id="signInAnchor" to="/sign-in">
                  Sign in
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
        <div onClick={handleMenuAction} className="nav__sm-container">
          <HiOutlineMenu
            className="nav__sm-menu-icon active"
            fill="#12263f"
            stroke="#12263f"
          />
        </div>
        <div className="nav__sm-drawer">
          <ul className="nav__sm-links">
            <li className="nav__sm-link">
              <NavLink to="/">
                <img id="homeLogo" src="/assets/favicon.svg" />
              </NavLink>
            </li>
            <li className="nav__sm-link">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="nav__sm-link">
              <NavLink to="/expense-feed">Expense Feed</NavLink>
            </li>
            <li className="nav__sm-link">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav__sm-link">
              <div className="nav__sm-link-btn-container">
                <NavLink id="signInSmAnchor" to="/sign-in">
                  Sign in
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
        <div
          onClick={handleMenuAction}
          className="nav__sm-drawer-backdrop"
        ></div>
      </div>
    </>
  );
};

Navigation.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Navigation;
