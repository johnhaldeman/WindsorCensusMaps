import React from 'react';

function getClassNameForFooterButtons(is_active){
  if(is_active)
    return "is-bordered is-active"
  else
    return ""
}

function FooterButton(props){
  return(
    <li className={getClassNameForFooterButtons(props.is_active)}>
      <a href="#" onClick={props.onClick}>
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
            {props.footer_items().map((item, i) =>
              <FooterButton onClick={props.onClick} key={i}
              icon={item.icon} text={item.category} is_active={item.category === props.selected_item.category} />)
            }
          </ul>
        </div>
      </nav>
    </div>
  )
}
