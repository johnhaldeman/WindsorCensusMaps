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
      geojson: null,
      subwayLinesFilter: '*',
      numEntrances: null
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
          fillOpacity: 0.5
      };
  }

  highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
          weight: 3,
          color: '#AAA',
          dashArray: '',
          fillOpacity: 0.5
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
      }
      this.info.update(layer.feature.properties);
  }

  resetHighlight(e) {
      this.geojson.resetStyle(e.target);
      this.info.update();
  }

  onEachFeature(feature, layer) {
      layer.on({
          mouseover: this.highlightFeature,
          mouseout: this.resetHighlight
      });
  }

  init() {
      if (this.state.map) return;

      //let map = L.map(this.mapref).setView([42.17, -82.80], 11);

      let map = L.map(this.mapref, config.params);

      // a TileLayer is used as the "basemap"
      const tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1Ijoiam9obmhhbGRlbWFuIiwiYSI6ImNqOXFkZnYxcjV6OXkyeHFtMjJneTFmem0ifQ._pha7G_TTw937xciMqPfvw'
      }).addTo(map);

      // set our state to include the tile layer
      this.setState({ map, tileLayer });
  }

  addGeoJSONLayer(geojson) {
    const geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
      filter: this.filterFeatures
    });
    geojsonLayer.addTo(this.state.map);
    this.setState({ geojsonLayer });

    //this.zoomToFeature(geojsonLayer);
  }

  componentDidUpdate(prevProps, prevState) {
    // code to run when the component receives new props or state
    // check to see if geojson is stored, map is created, and geojson overlay needs to be added
    if (this.state.map && !this.state.geojsonLayer) {
      // add the geojson overlay
      this.addGeoJSONLayer(getProtoData());
    }
  }

  zoomToFeature(target) {
    // pad fitBounds() so features aren't hidden under the Filter UI element
    var fitBoundsParams = {
      paddingTopLeft: [200,10],
      paddingBottomRight: [10,10]
    };
    // set the map's center & zoom so that it fits the geographic extent of the layer
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }

  componentWillUnmount() {
    // code to run just before unmounting the component
    // this destroys the Leaflet map object & related event listeners
    this.state.map.remove();
  }

  componentDidMount() {
    if (!this.state.map) this.init();

    /*
    this.geojson = L.geoJson(getProtoData(), {
      style: this.style.bind(this),
      onEachFeature: this.onEachFeature
    }).addTo(map);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [30, 35, 40, 45, 50]
        //    labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + this.getColor(grades[i] + 1) + '">&nbsp;</i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br/><br/>' : '+');
        }

        return div;
    }.bind(this);

    legend.addTo(map);

    this.info = L.control();

    this.info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    this.info.update = function (props) {
        this._div.innerHTML = (props ? '<h4>Average Age in Tract '+ props.CTUID
            + '</h4><b>' + props.average_age + '</b> years'
            : '<h4>Average Age in Tract</h4> Hover over a census tract');
    };

    this.info.addTo(map);*/

  }


  render(){
    return(
      <div id="mapid" ref={el => this.mapref = el}> </div>
    )
  }


}
