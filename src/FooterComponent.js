import React, { Component } from 'react';

function getClassNameForFooterButtons(is_active){
  if(is_active)
    return "is-bordered is-active"
  else
    "is-bordered"
}

function FooterButton(props){
  return(
    <li className={getClassNameForFooterButtons(props.is_active)}>
      <a className="has-text-info">
        <span className="icon">
          <i className={"fa " + props.icon}></i>
        </span>
        {props.text}
      </a>
    </li>
  )
}

export default function Footer(props){
  return(
    <div className="hero-foot">
      <nav className="tabs is-boxed is-fullwidth">
        <div className="container">
          <ul>
            {props.footer_items().map(item => <FooterButton key={item.key}
              icon={item.icon} text={item.text} is_active={item.is_active}/>)
            }
          </ul>
        </div>
      </nav>
    </div>
  )
}
