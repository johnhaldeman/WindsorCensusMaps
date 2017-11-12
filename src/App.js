import './windsorcensus.css';
import './bulma.css';

import React, { Component } from 'react';
import Footer from './FooterComponent';
import NavigationBar from './NavigationBarComponent';

function getNavItems(){
  return [
    {icon: 'fa-github', text:'Source Code', key: 1},
    {icon: 'fa-info-circle', text:'About', key: 2}
  ]
}

function getFooterItems(){
  return [
    {icon: 'fa-female', text:'Population/Age', key: 1, is_active: true},
    {icon: 'fa-dollar', text:'Income', key: 2, is_active: false},
    {icon: 'fa-heart', text:'Family Structures', key: 3, is_active: false},
    {icon: 'fa-commenting', text:'Language', key: 4, is_active: false}
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

        <Footer footer_items={getFooterItems} />
      </section>
    );
  }
}

export default App;
