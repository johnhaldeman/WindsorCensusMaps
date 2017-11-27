export default function getMeasures(){
    let measureData =  [
      {
      category: "Population/Age",
      icon: 'fa-female',
      getMeasures: () =>
      [
        {
          measure: "average_age",
          measure_name: "Average Age",
          measure_units: " years",
          description: "The average age of residents in the census tract."
        },
        {
          measure: "prop_male",
          measure_name: "% Male",
          measure_units: "%",
          description: "The proportion of male residents in the census tract."
        },
        {
          measure: "prop_female",
          measure_name: "% Female",
          measure_units: "%",
          description: "The proportion of female residents in the census tract."
        },
        {
          measure: "prop_age_group_0-9",
          measure_name: "% Age 0-9",
          measure_units: "%",
          description: "The proportion of residents between 0 and 9 years old."
        },
        {
          measure: "prop_age_group_10-19",
          measure_name: "% Age 10-19",
          measure_units: "%",
          description: "The proportion of residents between 10 and 19 years old."
        },
        {
          measure: "prop_age_group_20-29",
          measure_name: "% Age 20-29",
          measure_units: "%",
          description: "The proportion of residents between 20 and 29 years old."
        },
        {
          measure: "prop_age_group_30-39",
          measure_name: "% Age 30-39",
          measure_units: "%",
          description: "The proportion of residents between 30 and 39 years old."
        },
        {
          measure: "prop_age_group_40-49",
          measure_name: "% Age 40-49",
          measure_units: "%",
          description: "The proportion of residents between 40 and 49 years old."
        },
        {
          measure: "prop_age_group_50-59",
          measure_name: "% Age 50-59",
          measure_units: "%",
          description: "The proportion of residents between 50 and 59 years old."
        },
        {
          measure: "prop_age_group_60-69",
          measure_name: "% Age 60-69",
          measure_units: "%",
          description: "The proportion of residents between 60 and 69 years old."
        },
        {
          measure: "prop_age_group_70-79",
          measure_name: "% Age 70-79",
          measure_units: "%",
          description: "The proportion of residents between 70 and 79 years old."
        },
        {
          measure: "prop_age_group_80-89",
          measure_name: "% Age 80-89",
          measure_units: "%",
          description: "The proportion of residents between 80 and 89 years old."
        },
        {
          measure: "prop_age_group_90-99",
          measure_name: "% Age 90-99",
          measure_units: "%",
          description: "The proportion of residents between 90 and 99 years old."
        },
        {
          measure: "density",
          measure_name: "Population Density",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty in terms of people per kilometers squared."
        },
        {
          measure: "density_age_group_0-9",
          measure_name: "Density for ages 0-9",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 0 to 9 years in terms of people per kilometers squared."
        },
        {
          measure: "density_age_group_10-19",
          measure_name: "Density for ages 10-19",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 10 to 19 years in terms of people per kilometers squared."
        },
        {
          measure: "density_age_group_20-29",
          measure_name: "Density for ages 20-29",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 20 to 29 years in terms of people per kilometers squared."
        },
        {
          measure: "density_age_group_30-39",
          measure_name: "Density for ages 30-39",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 30 to 39 years in terms of people per kilometers squared."
        },
        {
          measure: "density_age_group_40-49",
          measure_name: "Density for ages 40-49",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 40 to 49 years in terms of people per kilometers squared."
        },
        {
          measure: "density_age_group_50-59",
          measure_name: "Density for ages 50-59",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 50 to 59 years in terms of people per kilometers squared."
        },
        {
          measure: "density_age_group_60-69",
          measure_name: "Density for ages 60-69",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 60 to 69 years in terms of people per kilometers squared."
        },
        {
          measure: "density_age_group_70-79",
          measure_name: "Density for ages 70-79",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 70 to 79 years in terms of people per kilometers squared."
        },
        {
          measure: "density_age_group_80-89",
          measure_name: "Density for ages 80-89",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 80 to 89 years in terms of people per kilometers squared."
        },
        {
          measure: "density_age_group_90-99",
          measure_name: "Density for ages 90-99",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 90 to 99 years in terms of people per kilometers squared."
        }
      ]
    },
    {
      category: "Income",
      icon: 'fa-dollar',
      getMeasures: () =>
      [
        {
          measure: "density_age_group_90-99",
          measure_name: "Density for ages 90-99",
          measure_units: " people/km<sup>2</sup>",
          description: "Population Denisty of people aged 90 to 99 years in terms of people per kilometers squared."
        }
      ]
    }
  ]

  return measureData;
}
