import React from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { GrClose } from "react-icons/gr";

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
    menuIconList.forEach(icon => icon.classList.toggle('active'));
  };

  return (
    <>
      <div className="nav">
        <ul className="nav__container">
          <li className="nav__link">Home</li>
          <li className="nav__link">Dashboard</li>
          <li className="nav__link">Login</li>
        </ul>
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
          <div className="nav__sm-drawer">
            <div className="nav__sm-link">Home</div>
            <div className="nav__sm-link">Dashboard</div>
            <div className="nav__sm-link">Login</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
