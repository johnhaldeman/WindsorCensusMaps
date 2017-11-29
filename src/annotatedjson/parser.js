var parse = require('csv-parse/lib/sync');
fs = require('fs')
var geojsonArea = require('@mapbox/geojson-area');

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

function populatePopulationData(geojson){
  let data = fs.readFileSync('98-400-X2016005_English_CSV_data.csv').toString();
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
}

function populateIncomeData1(geojson){
  let data = fs.readFileSync('98-400-X2016122_English_CSV_data.csv').toString();
  var records = parse(data, {columns: true});
  for(let i = 0; i < records.length; i++){
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Total income',
      'Dim: Income statistics (5A): Member ID: [4]: Average amount ($) (Note: 35)',
      'average_total_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Employment income',
      'Dim: Income statistics (5A): Member ID: [4]: Average amount ($) (Note: 35)',
      'average_employment_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Investment income',
      'Dim: Income statistics (5A): Member ID: [4]: Average amount ($) (Note: 35)',
      'average_investment_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Private retirement income',
      'Dim: Income statistics (5A): Member ID: [4]: Average amount ($) (Note: 35)',
      'average_priv_retirement_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Government transfers',
      'Dim: Income statistics (5A): Member ID: [4]: Average amount ($) (Note: 35)',
      'average_gov_transfers'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'After-tax income',
      'Dim: Income statistics (5A): Member ID: [4]: Average amount ($) (Note: 35)',
      'average_after_tax_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Income taxes',
      'Dim: Income statistics (5A): Member ID: [4]: Average amount ($) (Note: 35)',
      'average_income_taxes'
    );
  }
}

function populateIncomeData2(geojson){
  let data = fs.readFileSync('98-400-X2016121_English_CSV_data.csv').toString();
  var records = parse(data, {columns: true});
  for(let i = 0; i < records.length; i++){
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Total income',
      'Dim: Income statistics (4): Member ID: [4]: Median amount ($) (Note: 35)',
      'median_total_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Employment income',
      'Dim: Income statistics (4): Member ID: [4]: Median amount ($) (Note: 35)',
      'median_employment_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Investment income',
      'Dim: Income statistics (4): Member ID: [4]: Median amount ($) (Note: 35)',
      'median_investment_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Private retirement income',
      'Dim: Income statistics (4): Member ID: [4]: Median amount ($) (Note: 35)',
      'median_priv_retirement_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Government transfers',
      'Dim: Income statistics (4): Member ID: [4]: Median amount ($) (Note: 35)',
      'median_gov_transfers'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'After-tax income',
      'Dim: Income statistics (4): Member ID: [4]: Median amount ($) (Note: 35)',
      'median_after_tax_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Income sources and taxes (34)',
      'Income taxes',
      'Dim: Income statistics (4): Member ID: [4]: Median amount ($) (Note: 35)',
      'median_income_taxes'
    );
  }
}

function populateHouseholdIncome(geojson){
  let data = fs.readFileSync('98-400-X2016100_English_CSV_data.csv').toString();
  var records = parse(data, {columns: true});
  for(let i = 0; i < records.length; i++){
    addToGeoJSON(geojson, records[i],
      'DIM: Household type including census family structure (11)',
      'Total - Household type including census family structure',
      'Dim: Household income statistics (3): Member ID: [3]: Median after-tax income of households ($)',
      'median_household_total_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Household type including census family structure (11)',
      'One lone-parent census family without other persons in the household',
      'Dim: Household income statistics (3): Member ID: [3]: Median after-tax income of households ($)',
      'median_household_loneparent_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Household type including census family structure (11)',
      'Without children',
      'Dim: Household income statistics (3): Member ID: [3]: Median after-tax income of households ($)',
      'median_household_couple_nochildren_income'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Household type including census family structure (11)',
      'With children',
      'Dim: Household income statistics (3): Member ID: [3]: Median after-tax income of households ($)',
      'median_household_couple_children_income'
    );
  }
}

function populateFamilyStructure(geojson){
  let data = fs.readFileSync('98-400-X2016026_English_CSV_data.csv').toString();
  var records = parse(data, {columns: true});
  for(let i = 0; i < records.length; i++){
    addToGeoJSON(geojson, records[i],
      'DIM: Census family structure including stepfamily status (9)',
      'Total - Census family structure',
      'Dim: Number and age combinations of children (29): Member ID: [29]: Average number of children, all ages',
      'average_number_children'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Census family structure including stepfamily status (9)',
      'Total - Census family structure',
      'Dim: Number and age combinations of children (29): Member ID: [1]: Total - Census families with children',
      'total_families_w_children'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Census family structure including stepfamily status (9)',
      'Intact families',
      'Dim: Number and age combinations of children (29): Member ID: [1]: Total - Census families with children',
      'intact_families_w_children'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Census family structure including stepfamily status (9)',
      'Stepfamilies',
      'Dim: Number and age combinations of children (29): Member ID: [1]: Total - Census families with children',
      'total_stepfamilies_w_children'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Census family structure including stepfamily status (9)',
      'Lone-parent census families',
      'Dim: Number and age combinations of children (29): Member ID: [1]: Total - Census families with children',
      'single_parent_families_w_children'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Census family structure including stepfamily status (9)',
      'Total - Census family structure',
      'Dim: Number and age combinations of children (29): Member ID: [4]: 1 child (aged 0 to 24 years)',
      'families_w_one_child'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Census family structure including stepfamily status (9)',
      'Total - Census family structure',
      'Dim: Number and age combinations of children (29): Member ID: [9]: 2 children, of which at least one is aged 0 to 24 years',
      'families_w_two_children'
    );
    addToGeoJSON(geojson, records[i],
      'DIM: Census family structure including stepfamily status (9)',
      'Total - Census family structure',
      'Dim: Number and age combinations of children (29): Member ID: [19]: 3 or more children, of which at least one is aged 0 to 24 years',
      'families_w_threeplus_children'
    );
  }
}


function addComputedFields(geojson){
  for(let i = 0; i < geojson.features.length; i++){
    let curr = geojson.features[i].properties;
    curr.prop_male = parseFloat((curr.male_population / curr.total_population) * 100).toFixed(1);
    curr.prop_female = ((curr.female_population / curr.total_population) * 100).toFixed(1);
    curr.prop_male = parseFloat(curr.prop_male);
    curr.prop_female = parseFloat(curr.prop_female);

    curr.area = geojsonArea.geometry(geojson.features[i].geometry) / 1000000;
    curr.density = (curr.total_population/curr.area).toFixed(1);
    curr.density = parseFloat((curr.total_population/curr.area).toFixed(1));

    for(let j = 0; j < 10; j++){
      let range = ((j * 10) + 0) + "-" + ((j * 10) + 9);
      curr['prop_age_group_' + range] = ((curr['age_group_' + range] / curr.total_population) * 100).toFixed(1);
      curr['prop_age_group_' + range] = parseFloat(curr['prop_age_group_' + range]);

      curr['density_age_group_' + range] = (curr['age_group_' + range] / curr.area).toFixed(1);
      curr['density_age_group_' + range] = parseFloat(curr['density_age_group_' + range]);
    }

    curr.prop_families_w_one_child = parseFloat(((curr.families_w_one_child / curr.total_families_w_children) * 100).toFixed(1))
    curr.prop_families_w_two_children = parseFloat(((curr.families_w_two_children / curr.total_families_w_children) * 100).toFixed(1))
    curr.prop_families_w_threeplus_children = parseFloat(((curr.families_w_threeplus_children / curr.total_families_w_children) * 100).toFixed(1))
    curr.prop_intact_families_w_children = parseFloat(((curr.intact_families_w_children / curr.total_families_w_children) * 100).toFixed(1))
    curr.prop_stepfamilies_w_children = parseFloat(((curr.total_stepfamilies_w_children / curr.total_families_w_children) * 100).toFixed(1))
    curr.prop_single_parent_families_w_children = parseFloat(((curr.single_parent_families_w_children / curr.total_families_w_children) * 100).toFixed(1))

  }
}


let geojson = require("./tracts.json");

populatePopulationData(geojson);
populateIncomeData1(geojson);
populateIncomeData2(geojson);
populateHouseholdIncome(geojson);
populateFamilyStructure(geojson);

addComputedFields(geojson);


console.log(JSON.stringify(geojson));
