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


class App extends Component {
  constructor(props) {
    super(props);
    let cat = getMeasures()[0];
    this.state = {
      curr_category: cat,
      curr_measure: cat.getMeasures()[0]
    }
  }

  handleMeasureChange(event){
    let measures = this.state.curr_category.getMeasures();
    for(let i = 0; i < measures.length; i++){
      if(event !== undefined && measures[i].measure_name === event.target.value){
        this.setState({curr_measure: measures[i]});
      }
    }
  }

  handleCategoryChange(event){
    let catMeasures = getMeasures();
    for(let i = 0; i < catMeasures.length; i++){
      if(event.currentTarget.text === catMeasures[i].category){
        let curr_category = catMeasures[i];
        let curr_measure = curr_category.getMeasures()[0];
        this.setState({
          curr_category,
          curr_measure
        })
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
                <Menu title={this.state.curr_category.title}
                    selectedItem={this.state.curr_measure}
                    onChange={this.handleMeasureChange.bind(this)}
                    items={this.state.curr_category.getMeasures}
                    description={this.state.curr_measure.description}
                    />
              </div>
            </div>
          </div>
        </div>


        <Footer footer_items={getMeasures} selected_item={this.state.curr_category} onClick={this.handleCategoryChange.bind(this)} />
      </section>
    );
  }
}

export default App;
