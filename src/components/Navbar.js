import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "../SidebarData";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(false); // Estado para controlar la visibilidad del menú desplegable

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <div className="navbar">
        <Link to="#" className="nav-menu-icon" onClick={showSidebar}>
          <FaIcons.FaBars />
        </Link>
      </div>
      <div
        className={sidebar ? "sidebar-container active" : "sidebar-container"}
      >
        <ul className="sidebar-items">
          <li className="sidebar-toggle">
            <Link to="#" className="nav-menu-icon" onClick={showSidebar}>
              <FaIcons.FaWindowClose />
            </Link>
          </li>
          {SidebarData.map((sidebaritem) => {
            return (
              <li
                key={sidebaritem.id}
                className={sidebaritem.cName}
                onClick={showSidebar}
              >
                <Link
                  to={sidebaritem.path}
                  onClick={() => {
                    if (sidebaritem.dropdown) {
                      showDropdown(); // Mostrar u ocultar menú desplegable al hacer clic en "Products"
                    }
                  }}
                >
                  {sidebaritem.icon}
                  <span>{sidebaritem.title}</span>
                </Link>
                {/* Renderizar opciones del menú desplegable */}
                {dropdown &&
                  sidebaritem.dropdown &&
                  sidebaritem.dropdown.map((dropdownItem) => (
                    <Link
                      to={dropdownItem.path}
                      key={dropdownItem.id}
                      className="dropdown-item"
                      onClick={showSidebar}
                    >
                      {dropdownItem.title}
                    </Link>
                  ))}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
