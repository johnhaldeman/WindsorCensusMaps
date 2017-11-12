import React, { Component } from 'react';


function NavBarItem(props){
  return (
    <a className="navbar-item has-text-info">
      <span className="icon">
        <i className={"fa " + props.icon}></i>
      </span>
      {props.text}
    </a>
  )
}

export default function NavigationBar(props) {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item is-size-3 has-text-info">
            {props.title}
          </a>
        </div>
        <div id="navbarMenuHeroB" className="navbar-menu is-active">
          <div className="navbar-end">
            {props.nav_items().map(
               (item) => <NavBarItem key={item.key} icon={item.icon} text={item.text} />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
