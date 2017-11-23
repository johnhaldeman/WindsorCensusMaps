var parse = require('csv-parse/lib/sync');
fs = require('fs')

function addToGeoJSON(geojson, record, filterField, filterValue, returnValue, returnName){
  if(record[filterField] == filterValue){
      for(let i = 0; i < geojson.features.length; i++){
        if(geojson.features[i].properties.CTUID == record['GEO_CODE (POR)'])
          geojson.features[i].properties[returnName] = parseFloat(record[returnValue])
      }
  }
}

function addAgeGroupToGeoJSON(geojson, record, filterField, filterValueMin, filterValueMax, lookupField, returnName){
  if(!isNaN(record[filterField]) && record[filterField] >= filterValueMin && record[filterField] <= filterValueMax) {
    for(let i = 0; i < geojson.features.length; i++){
      if(geojson.features[i].properties.CTUID == record['GEO_CODE (POR)']) {
        if(geojson.features[i].properties[returnName + filterValueMin + "-" + filterValueMax] == undefined)
          geojson.features[i].properties[returnName + filterValueMin + "-" + filterValueMax] = 0;
        geojson.features[i].properties[returnName + filterValueMin + "-" + filterValueMax] += parseInt(record[lookupField])
      }
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
    addToGeoJSON(geojson, records[i],
      'DIM: Age (in single years) and average age (127)',
      'Average age',
      'Dim: Sex (3): Member ID: [1]: Total - Sex',
      'average_age'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Age (in single years) and average age (127)',
      'Total - Age',
      'Dim: Sex (3): Member ID: [1]: Total - Sex',
      'total_population'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Age (in single years) and average age (127)',
      'Total - Age',
      'Dim: Sex (3): Member ID: [2]: Male',
      'male_population'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Age (in single years) and average age (127)',
      'Total - Age',
      'Dim: Sex (3): Member ID: [3]: Female',
      'female_population'
    );
    for(let j = 0; j < 10; j++){
      addAgeGroupToGeoJSON(geojson, records[i],
        'DIM: Age (in single years) and average age (127)',
        (j * 10) + 0, (j * 10) + 9,
        'Dim: Sex (3): Member ID: [1]: Total - Sex',
        'age_group_'
      );
    }
    addToGeoJSON(geojson, records[i],
      'DIM: Age (in single years) and average age (127)',
      '100 years and over',
      'Dim: Sex (3): Member ID: [1]: Total - Sex',
      'age_group_100+'
    );
  }
  for(let i = 0; i < geojson.features.length; i++){
    let curr = geojson.features[i].properties;
    curr.prop_male = parseFloat((curr.male_population / curr.total_population) * 100).toFixed(1);
    curr.prop_female = ((curr.female_population / curr.total_population) * 100).toFixed(1);
    curr.prop_male = parseFloat(curr.prop_male);
    curr.prop_female = parseFloat(curr.prop_female);

    for(let j = 0; j < 10; j++){
      let range = ((j * 10) + 0) + "-" + ((j * 10) + 9);
      curr['prop_age_group_' + range] = ((curr['age_group_' + range] / curr.total_population) * 100).toFixed(1);
      curr['prop_age_group_' + range] = parseFloat(curr['prop_age_group_' + range]);
    }

  }


  console.log(JSON.stringify(geojson));
});
