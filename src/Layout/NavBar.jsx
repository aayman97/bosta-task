import React, { useContext, useRef, useState } from "react";
import "./style/navbar.css";
import images from "../assets/images";
import { NavLink, useNavigate } from "react-router-dom";
import { ShipmentTrackingContext } from "../App";

const NavBar = () => {
  const context = useContext(ShipmentTrackingContext);

  const id = useRef(null);

  const [openShippment, setOpenShippment] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  function searchShipment(e) {
    e.preventDefault();
    context.setShipmentId(id.current);
    setOpenShippment(false);

    if (screen.width <= 1000) {
      openSideBarMenu();
    }
  }

  const openSideBarMenu = () => {
    let fixed = document.getElementsByClassName("page-container")[0];
    if (openSideBar === false) {
      document.getElementsByClassName("navBarContainer")[0].style.height =
        "100vh";
      setOpenSideBar(true);

      fixed.style.overflow = "hidden";
      fixed.style.height = "90vh";
    } else {
      document.getElementsByClassName("navBarContainer")[0].style.height =
        "9vh";
      setOpenSideBar(false);
      fixed.style.overflow = "visible";
    }
  };

  return (
    <div className="navBarContainer">
      <img
        onClick={openSideBarMenu}
        className="menu-icon"
        src={openSideBar ? images.closeIcon : images.menuIcon}
      />
      <a className="logo">
        <img src={images.logo} />
      </a>

      <div className="routesContainer">
        <NavLink className="routeButton">
          <h1>Home</h1>
        </NavLink>

        <NavLink className="routeButton">
          <h1>Prices</h1>
        </NavLink>

        <NavLink className="routeButton">
          <h1>Call Sales</h1>
        </NavLink>
      </div>

      <div className="routesContainer">
        <div className="track-shippment-container">
          <a
            className={`routeButton track-shippment ${
              openShippment && "opened"
            }`}
            onClick={() => {
              setOpenShippment(!openShippment);
            }}
          >
            <h1>Track Shippment</h1>
          </a>
          {openShippment && (
            <div className="search-shippment-container">
              <div className="input-container">
                <h4>Track your shippment</h4>
                <form
                  onSubmit={(e) => searchShipment(e)}
                  className="input-search"
                >
                  <input
                    onChange={(e) => (id.current = +e.target.value)}
                    placeholder="shippment number"
                  />
                  <button style={{ border: "none" }}>
                    <img src={images.searchIcon} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="seperator" />

        <NavLink className="routeButton">
          <h1>Login</h1>
        </NavLink>

        <button className="language-button">ENG</button>
      </div>
    </div>
  );
};

export default NavBar;
