import React, { Component } from 'react';
import getProtoData from './geo';
import getToken from './token';
import L from 'leaflet';
import './lib/leaflet.css';


let config = {};

config.params = {
  center: [42.19, -82.85],
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
      map: null
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
      this.info.update(layer.feature.properties);
  }

  resetHighlight(e) {
      this.geojsonLayer.resetStyle(e.target);
      this.info.update();
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
      this.geojson = geojson;

      if(this.mapref.clientWidth < 700){
        config.params.zoom = 10;
      }

      let map = L.map(this.mapref, config.params);

      const tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: getToken()
      }).addTo(map);

      this.setState({ map, tileLayer });

  }

  addGeoJSONLayer(geojson) {
    const geojsonLayer = L.geoJson(geojson, {
      style: this.style.bind(this),
      onEachFeature: this.onEachFeature.bind(this)
    });

    if(this.geojsonLayer !== undefined)
      this.geojsonLayer.remove();

    geojsonLayer.addTo(this.state.map);
    this.geojsonLayer = geojsonLayer;
  }

  addLegend(map){
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');

        if(this.props.measure_type === 'qualitative'){
          for (var key in this.props.colours) {
              div.innerHTML += '<i style="background:' + this.props.colours[key] + '">&nbsp;</i> ' +
                  key + '<br/><br/>';
          }
        }
        else{
          for (var i = 0; i < this.grades.length; i++) {
              div.innerHTML +=
                  '<i style="background:' + this.getColor(this.grades[i].min + 0.0001) + '">&nbsp;</i> ' +
                  this.grades[i].min + '&ndash;' + this.grades[i].max + '<br/><br/>';
          }

          let max =  this.grades[this.grades.length - 1].max;
          div.innerHTML += '<i style="background:' + this.getColor(max + 1) + '">&nbsp;</i> ' +
            max + '+';
        }

        return div;
    }.bind(this);
    if(this.legend !== undefined)
      this.legend.remove();

    legend.addTo(map);
    this.legend = legend;
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
      let numData = 0;
      if(this.props.measure_type === 'qualitative' && featureData !== undefined){
        numData = featureData[this.props.measure] + ": " + featureData[this.props.measure_detail];
      }
      else if(featureData !== undefined){
        numData = featureData[this.props.measure];
      }

      this._div.innerHTML = (featureData ? '<h4>'+ this.props.measure_name + ' in Tract '+ featureData.CTUID
          + '</h4><b>' + numData + '</b>'+ this.props.measure_units
          : '<h4>' + this.props.measure_name + ' in Tract</h4> Hover over or tap a census tract');
    };

    info.update = updateFunc.bind(this);
    info.onAdd = onAddClosure(map, info).bind(this);

    if(this.info !== undefined)
      this.info.remove();

    info.addTo(map);
    this.info = info;
  }

  getColor(d) {
      if(this.props.measure_type === 'qualitative'){
        return this.props.colours[d];
      }
      else{
        if(this.grades === undefined || d === null)
          return "#aaaaaa";

        let compNum = this.getFixedFloat(d, 2);

        if(compNum >= this.grades[4].max) return '#bd0026' ;
        else if(compNum >= this.grades[4].min)  return '#f03b20';
        else if(compNum >= this.grades[3].min)  return '#fd8d3c';
        else if(compNum >= this.grades[2].min)  return '#feb24c';
        else if(compNum >= this.grades[1].min)  return '#fed976';
        else if(compNum >= this.grades[0].min)  return '#ffffb2';
      }
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

    if(max - min < 5){
      min = Math.floor(min);
      max = Math.ceil(max);
    }
    else{
      min = min - (min % 5);
      max = max - (max % 5);
    }

    let gradeStep = this.getFixedFloat((max - min) / 5, 2);

    let grades = [];
    for(let i = min; this.getFixedFloat(i, 2) < this.getFixedFloat(max, 2); i = i + gradeStep){
      grades.push({min: this.getFixedFloat(i, 2), max: this.getFixedFloat(i + gradeStep, 2)});
    }

    this.grades = grades;
  }

  getFixedFloat(num, dec){
    return parseFloat(num.toFixed(dec));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.map) {
      if(this.props.measure_type !== 'qualitative')
        this.computeColourClasses(this.geojson, this.props.measure)
      this.addGeoJSONLayer(this.geojson);
      this.addLegend(this.state.map);
      this.addRollovers(this.state.map);
    }
  }

  zoomToFeature(e) {
    if(e.target){
      this.state.map.fitBounds(e.target.getBounds());
      this.highlightFeature.bind(this)(e);
    }
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
      <div className="is-bordered" id="mapid" ref={el => this.mapref = el}> </div>
    )
  }


}
