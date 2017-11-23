import './windsorcensus.css';
import './bulma.css';

import React, { Component } from 'react';
import Footer from './FooterComponent';
import NavigationBar from './NavigationBarComponent';
import Map from './MapComponent';
import Menu from './MenuComponent';

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

function getMenuItems(){
  return [
    {text:'Total Population', key: 1},
    {text:'% Male', key: 2},
    {text:'% Female', key: 3},
    {text:'% 0-14 years', key: 4},
    {text:'% 15 - 29 years', key: 5},
    {text:'% 30 - 44 years', key: 6},
    {text:'% 45 - 59 years', key: 7},
    {text:'% 60 - 75 years', key: 8},
    {text:'% Over 75 years', key: 9},
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measure: "prop_female",
      measure_name: "% Female",
      measure_units: "%"
    }
  }

  render() {
    return (
      <section className="hero is-dark is-fullheight">
        <div className="hero-head">
          <NavigationBar title="Windsor Census Overlays"
            nav_items={getNavItems}
          />
        </div>

        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-three-quarters">
                <Map  measure={this.state.measure}
                      measure_name={this.state.measure_name}
                      measure_units={this.state.measure_units} />
              </div>
              <div className="column">
                <Menu title="Population Statistics" items={getMenuItems} />
              </div>
            </div>
          </div>
        </div>


        <Footer footer_items={getFooterItems} />
      </section>
    );
  }
}

export default App;
