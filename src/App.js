import React, { Component } from 'react';
import './windsorcensus.css';
import './bulma.css';


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

function NavigationBar(props) {
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

function Footer(props){
  return(
    <div className="hero-foot">
      <nav className="tabs is-boxed is-fullwidth">
        <div className="container">
          <ul>
            <FooterButton icon="fa-female" text="Population/Age" is_active={true}/>
            <FooterButton icon="fa-dollar" text="Income" />
            <FooterButton icon="fa-heart" text="Family Structures" />
            <FooterButton icon="fa-commenting" text="Language" />
          </ul>
        </div>
      </nav>
    </div>
  )
}

function getNavItems(){
  return [
    {icon: 'fa-github', text:'Source Code', key: 1},
    {icon: 'fa-info-circle', text:'About', key: 2}
  ]
}

class App extends Component {
  render() {
    return (
      <section className="hero is-dark is-fullheight">
        <div className="hero-head">
          <NavigationBar title="Windsor Census Overlays"
            nav_items={getNavItems}
          />
        </div>

        <Footer />
      </section>
    );
  }
}

export default App;
