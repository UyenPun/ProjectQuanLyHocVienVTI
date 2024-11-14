import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

import { isShowForUserByRole } from "../routes/Routes";

import { Badge, Collapse } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import routes from "../routes/index";
import avatar from "../assets/img/avatars/avatar.jpg";
import { selectUserInfo } from "../redux/selectors/LoginSelector";

import logo2 from "../assets/img/logo/logo-2.png";


const initOpenRoutes = (location, userRole) => {
  /* Open collapse element that matches current url */
  const pathName = location.pathname;

  let _routes = {};

  routes.filter(route => isShowForUserByRole(route.roles, userRole)).forEach((route, index) => {
    const isActive = pathName.indexOf(route.path) === 0;
    const isOpen = route.open;
    const isHome = route.containsHome && pathName === "/" ? true : false;

    _routes = Object.assign({}, _routes, { [index]: isActive || isOpen || isHome })
  });

  return _routes;
};

const SidebarCategory = withRouter(
  ({
    name,
    badgeColor,
    badgeText,
    icon: Icon,
    isOpen,
    children,
    onClick,
    location,
    to
  }) => {
    const getSidebarItemClass = path => {
      return location.pathname.indexOf(path) !== -1 ||
        (location.pathname === "/" && path === "/dashboard")
        ? "active"
        : "";
    };

    return (
      <li className={"sidebar-item " + getSidebarItemClass(to)}>
        <span
          data-toggle="collapse"
          className={"sidebar-link " + (!isOpen ? "collapsed" : "")}
          onClick={onClick}
          aria-expanded={isOpen ? "true" : "false"}
        >
          <Icon size={18} className="align-middle mr-3" />
          <span className="align-middle">{name}</span>
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </span>
        <Collapse isOpen={isOpen}>
          <ul id="item" className={"sidebar-dropdown list-unstyled"}>
            {children}
          </ul>
        </Collapse>
      </li>
    );
  }
);

const SidebarItem = withRouter(
  ({ name, badgeColor, badgeText, icon: Icon, location, to }) => {
    const getSidebarItemClass = path => {
      if (typeof path === "object") {
        // multiple path
        for (const item of path) {
          if (location.pathname === item) {
            return "active";
          }
        }
        return "";
      } else {
        // only path
        return location.pathname.includes(path) ? "active" : "";
      }
    };

    return (
      <li className={"sidebar-item " + getSidebarItemClass(to)}>
        <NavLink to={typeof to === "object" ? to[0] : to} className="sidebar-link" activeClassName="active">
          {Icon ? <Icon size={18} className="align-middle mr-3" /> : null}
          {name}
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </NavLink>
      </li>
    );
  }
);

const Sidebar = (props) => {
  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes(props.location, props.userInfo.role));

  const toggle = index => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      item => openRoutes[index] || setOpenRoutes(openRoutes => Object.assign({}, openRoutes, { [item]: false }))
    )

    // Toggle selected element
    setOpenRoutes(openRoutes => Object.assign({}, openRoutes, { [index]: !openRoutes[index] }));
  }

  return (
    <nav
      className={
        "sidebar" +
        (!props.sidebar.isOpen ? " toggled" : "") +
        (props.sidebar.isSticky ? " sidebar-sticky" : "")
      }
    >
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <img src={logo2} alt="Logo" width="64" height="auto" /> {""}
            <span className="align-middle">VTI Academy</span>
          </a>

          <ul className="sidebar-nav">
            {routes.filter(route => isShowForUserByRole(route.roles, props.userInfo.role)).map((category, index) => {
              return (
                <React.Fragment key={index}>
                  {category.header ? (
                    <li className="sidebar-header">{category.header}</li>
                  ) : null}

                  {category.children ? (
                    <SidebarCategory
                      name={category.name}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                      icon={category.icon}
                      to={category.path}
                      isOpen={openRoutes[index]}
                      onClick={() => toggle(index)}
                    >
                      {category.children.map((route, index) => (
                        <SidebarItem
                          key={index}
                          name={route.name}
                          to={route.path}
                          badgeColor={route.badgeColor}
                          badgeText={route.badgeText}
                        />
                      ))}
                    </SidebarCategory>
                  ) : (
                    <SidebarItem
                      name={category.name}
                      to={category.path}
                      icon={category.icon}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </ul>

          {!props.layout.isBoxed && !props.sidebar.isSticky ? (
            <div className="sidebar-bottom d-none d-lg-block">
              <div className="media">
                <img
                  className="rounded-circle mr-3"
                  src={avatar}
                  alt="Chris Wood"
                  width="40"
                  height="40"
                />
                <div className="media-body">
                  <h5 className="mb-1">{props.userInfo.fullName}</h5>
                  <div>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="text-success"
                    />{" "}
                    Online
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </PerfectScrollbar>
      </div>
    </nav>
  )
}

const mapGlobalStateToProps = state => {
  return {
    sidebar: state.sidebar,
    layout: state.layout,
    userInfo: selectUserInfo(state)
  };
};

export default withRouter(connect(mapGlobalStateToProps)(Sidebar));