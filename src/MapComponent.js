import React, { Component } from 'react';
import getProtoData from './geo';
import L from 'leaflet';
import './lib/leaflet.css';


let config = {};

config.params = {
  center: [42.17, -82.80],
  zoom: 11,
  maxZoom: 19,
  minZoom: 6,
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

  style(feature) {
      return {
          fillColor: this.getColor(feature.properties[this.props.measure]),
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

      let geojson = getProtoData();
      this.setState({geojson});

      this.computeColourClasses(geojson, this.props.measure)

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
        var div = L.DomUtil.create('div', 'info legend');

        for (var i = 0; i < this.grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + this.getColor(this.grades[i].min + 1) + '">&nbsp;</i> ' +
                this.grades[i].min + '&ndash;' + this.grades[i].max + '<br/><br/>';
        }

        let max =  this.grades[this.grades.length - 1].max;
        div.innerHTML += '<i style="background:' + this.getColor(max + 1) + '">&nbsp;</i> ' +
          max + '+';

        return div;
    }.bind(this);

    legend.addTo(map);
  }

  addRollovers(map){
    let info = L.control();

    let onAddClosure = function (map, info){
      return function (map) {
          this._div = L.DomUtil.create('div', 'info');
          info.update();
          return this._div;
      };
    };

    let updateFunc = function (featureData) {
        this._div.innerHTML = (featureData ? '<h4>Average Age in Tract '+ featureData.CTUID
            + '</h4><b>' + featureData[this.props.measure] + '</b> years'
            : '<h4>Average Age in Tract</h4> Hover over a census tract');
    };

    info.update = updateFunc.bind(this);
    info.onAdd = onAddClosure(map, info).bind(this);

    info.addTo(map);
    this.setState({info})
  }

  getColor(d) {
      if(this.grades === undefined)
        return "#ffffb2";

      if(d > this.grades[4].max) return '#bd0026' ;
      else if(d >= this.grades[4].min)  return '#f03b20';
      else if(d >= this.grades[3].min)  return '#fd8d3c';
      else if(d >= this.grades[2].min)  return '#feb24c';
      else if(d >= this.grades[1].min)  return '#fed976';
      else if(d >= this.grades[0].min)  return '#ffffb2';
  }

  computeColourClasses(geojson, fieldName){
    let currentFeature = geojson.features[0];
    let min = currentFeature.properties[fieldName];
    let max = currentFeature.properties[fieldName];
    for(let i = 1; i < geojson.features.length; i++){
      currentFeature = geojson.features[i]
      if(currentFeature.properties[fieldName] < min)
        min = currentFeature.properties[fieldName];
      if(currentFeature.properties[fieldName] > max)
        max = currentFeature.properties[fieldName];
    }

    min = min - (min % 5);
    max = max - (max % 5);
    let gradeStep = (max - min) / 5;

    let grades = [];
    for(let i = min; i < max; i = i + gradeStep){
      grades.push({min: i, max: i + gradeStep});
    }

    this.grades = grades;
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.map && !this.state.geojsonLayer) {
      this.addGeoJSONLayer(this.state.geojson);
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
