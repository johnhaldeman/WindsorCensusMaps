var parse = require('csv-parse/lib/sync');
fs = require('fs')

function addToGeoJSON(geojson, record){
  if(record['DIM: Age (in single years) and average age (127)'] == 'Average age'){
      for(let i = 0; i < geojson.features.length; i++){
        if(geojson.features[i].properties.CTUID == record['GEO_CODE (POR)'])
          geojson.features[i].properties.average_age = record['Dim: Sex (3): Member ID: [1]: Total - Sex']
      }
  }

}

let geojson = require("./tracts.json");

fs.readFile('98-400-X2016005_English_CSV_data.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var records = parse(data, {columns: true});
  for(let i = 0; i < records.length; i++){
    addToGeoJSON(geojson, records[i]);
  }

  console.log(JSON.stringify(geojson));
});
