import './windsorcensus.css';
import './bulma.css';

import React, { Component } from 'react';
import Footer from './FooterComponent';
import NavigationBar from './NavigationBarComponent';
import Map from './MapComponent';
import Menu from './MenuComponent';
import getMeasures from './measures.js'

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
  constructor(props) {
    super(props);
    this.state = {
      curr_measure: getMeasures()[0]
    }
  }

  handleMeasureChange(event){
    let measures = getMeasures();
    for(let i = 0; i < measures.length; i++){
      if(event !== undefined && measures[i].measure_name == event.target.value){
        this.setState({curr_measure: measures[i]});
      }
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
                <Map  measure={this.state.curr_measure.measure}
                      measure_name={this.state.curr_measure.measure_name}
                      measure_units={this.state.curr_measure.measure_units} />
              </div>
              <div className="column">
                <Menu title="Population Statistics"
                    selectedItem={this.state.curr_measure}
                    onChange={this.handleMeasureChange.bind(this)}
                    items={getMeasures}
                    description={this.state.curr_measure.description}
                    />
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
