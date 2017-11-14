import React, { Component } from 'react';
import getProtoData from './protodata';
import L from 'leaflet';
import './lib/leaflet.css';


let config = {};

config.params = {
  center: [42.17, -82.80],
  zoom: 11,
  maxZoom: 19,
  minZoom: 11,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true
};

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      geojsonLayer: null,
      info: null
    };
  }

  getColor(d) {
      if(d > 55) return '#bd0026' ;
      else if(d > 50)  return '#f03b20';
      else if(d > 45)  return '#fd8d3c';
      else if(d > 40)  return '#feb24c';
      else if(d > 35)  return '#fed976';
      else if(d > 30)  return '#ffffb2';
  }

  style(feature) {
      return {
          fillColor: this.getColor(feature.properties.average_age),
          weight: 1,
          opacity: 1,
          color: 'black',
          dashArray: '3',
          fillOpacity: 0.7
      };
  }

  highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
          weight: 2,
          color: '#eee',
          dashArray: '',
          fillOpacity: 0.7
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      }
      this.state.info.update(layer.feature.properties);
  }

  resetHighlight(e) {
      this.state.geojsonLayer.resetStyle(e.target);
      this.state.info.update();
  }

  onEachFeature(feature, layer) {
      layer.on({
          mouseover: this.highlightFeature.bind(this),
          mouseout: this.resetHighlight.bind(this),
          click: this.zoomToFeature.bind(this)
      });
  }

  init() {
      if (this.state.map) return;

      let map = L.map(this.mapref, config.params);

      const tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9obmhhbGRlbWFuIiwiYSI6ImNqOXFkZnYxcjV6OXkyeHFtMjJneTFmem0ifQ._pha7G_TTw937xciMqPfvw'
      }).addTo(map);

      this.addLegend(map);
      this.addRollovers(map);

      this.setState({ map, tileLayer });
  }

  addGeoJSONLayer(geojson) {
    const geojsonLayer = L.geoJson(geojson, {
      style: this.style.bind(this),
      onEachFeature: this.onEachFeature.bind(this)
    });
    geojsonLayer.addTo(this.state.map);
    this.setState({ geojsonLayer });

    this.zoomToFeature(geojsonLayer);
  }

  addLegend(map){
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [30, 35, 40, 45, 50]

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + this.getColor(grades[i] + 1) + '">&nbsp;</i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br/><br/>' : '+');
        }

        return div;
    }.bind(this);

    legend.addTo(map);
  }

  addRollovers(map){
    let info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (featureData) {
        this._div.innerHTML = (featureData ? '<h4>Average Age in Tract '+ featureData.CTUID
            + '</h4><b>' + featureData.average_age + '</b> years'
            : '<h4>Average Age in Tract</h4> Hover over a census tract');
    };

    info.addTo(map);

    this.setState({info})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.map && !this.state.geojsonLayer) {
      this.addGeoJSONLayer(getProtoData());
    }
  }

  zoomToFeature(e) {
    if(e.target)
      this.state.map.fitBounds(e.target.getBounds());
    else
      this.state.map.fitBounds(e.getBounds());
  }

  componentWillUnmount() {
    this.state.map.remove();
  }

  componentDidMount() {
    if (!this.state.map) this.init();
  }

  render(){
    return(
      <div id="mapid" ref={el => this.mapref = el}> </div>
    )
  }


}
