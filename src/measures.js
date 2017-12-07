export default function getMeasures(){
    let measureData =  [
      {
      category: "Population/Age",
      icon: 'fa-female',
      title: 'Age and Population Statistics',
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
      title: 'Income and Tax Statistics',
      getMeasures: () =>
      [
        {
          measure: "average_total_income",
          measure_name: "Total Income - Average",
          measure_units: "$",
          description: "Average Total Income including employment, self-employment, investment, and government transfer income"
        },
        {
          measure: "median_total_income",
          measure_name: "Total Income - Median",
          measure_units: "$",
          description: "Median Total Income including employment, self-employment, investment, and government transfer income"
        },
        {
          measure: "average_employment_income",
          measure_name: "Employment Income - Average",
          measure_units: "$",
          description: "Average Employment Income including self-employment"
        },
        {
          measure: "median_employment_income",
          measure_name: "Employment Income - Median",
          measure_units: "$",
          description: "Median Employment Income including self-employment"
        },
        {
          measure: "average_investment_income",
          measure_name: "Investment Income - Average",
          measure_units: "$",
          description: "Average Investment Income (excludes private retirement income)"
        },
        {
          measure: "median_investment_income",
          measure_name: "Investment Income - Median",
          measure_units: "$",
          description: "Median Investment Income (excludes private retirement income)"
        },
        {
          measure: "average_priv_retirement_income",
          measure_name: "Private Retirement Income - Average",
          measure_units: "$",
          description: "Average Private Retirement Income"
        },
        {
          measure: "median_priv_retirement_income",
          measure_name: "Private Retirement Income - Median",
          measure_units: "$",
          description: "Median Private Retirement Income"
        },
        {
          measure: "average_gov_transfers",
          measure_name: "Government Transfers - Average",
          measure_units: "$",
          description: "Average Governement Transfers including CPP, OAS, GIS, EI, Child Benefits, and Social Assistance"
        },
        {
          measure: "median_gov_transfers",
          measure_name: "Government Transfers - Median",
          measure_units: "$",
          description: "Median Governement Transfers including CPP, OAS, GIS, EI, Child Benefits, and Social Assistance"
        },
        {
          measure: "average_after_tax_income",
          measure_name: "After Tax Income - Average",
          measure_units: "$",
          description: "Average After Tax Income"
        },
        {
          measure: "median_after_tax_income",
          measure_name: "After Tax Income - Median",
          measure_units: "$",
          description: "Median After Tax Income"
        },
        {
          measure: "average_income_taxes",
          measure_name: "Income Taxes Paid - Average",
          measure_units: "$",
          description: "Average Income Taxes Paid"
        },
        {
          measure: "median_income_taxes",
          measure_name: "Income Taxes Paid - Median",
          measure_units: "$",
          description: "Median Income Taxes Paid"
        },
        {
          measure: "median_household_total_income",
          measure_name: "Household Income - Median",
          measure_units: "$",
          description: "Median Household Income"
        },
        {
          measure: "median_household_couple_nochildren_income",
          measure_name: "Household Income - Couples w/o children - Median",
          measure_units: "$",
          description: "Median Household Income - Couples without Children"
        },
        {
          measure: "median_household_couple_children_income",
          measure_name: "Household Income - Couples with children - Median",
          measure_units: "$",
          description: "Median Household Income - Couples with Children"
        },
        {
          measure: "median_household_loneparent_income",
          measure_name: "Household Income - Single Parent - Median",
          measure_units: "$",
          description: "Median Household Income - Single Parent"
        }
      ]
    },
    {
      category: "Family Structure",
      icon: 'fa-home',
      title: 'Family Structure',
      getMeasures: () =>
      [
        {
          measure: "average_number_children",
          measure_name: "Average Number of Children",
          measure_units: "",
          description: "Average Number of Children per Family"
        },
        {
          measure: "prop_families_w_one_child",
          measure_name: "% Families with one Child",
          measure_units: "",
          description: "The proportion of families with children that have a single child"
        },
        {
          measure: "prop_families_w_two_children",
          measure_name: "% Families with two Children",
          measure_units: "",
          description: "The proportion of families with children that have two children only"
        },
        {
          measure: "prop_families_w_threeplus_children",
          measure_name: "% Families with 3+ Children",
          measure_units: "",
          description: "The proportion of families with three or more children"
        },
        {
          measure: "prop_intact_families_w_children",
          measure_name: "% Families with Children that are Intact",
          measure_units: "",
          description: "The proportion of families with children that are in-tact (not a step family or a single parent)"
        },
        {
          measure: "prop_stepfamilies_w_children",
          measure_name: "% Stepfamilies with Children",
          measure_units: "",
          description: "The proportion of families with children that are Stepfamilies"
        },
        {
          measure: "prop_single_parent_families_w_children",
          measure_name: "% Single Parent Families",
          measure_units: "",
          description: "The proportion of families with children that have a single parent"
        },
      ]
    },
    {
      category: "Language",
      icon: 'fa-comments',
      title: 'Mother Tongue',
      getMeasures: () =>
      [
        {
          measure: "prop_mother_tongue_english",
          measure_name: "% Mother Tongue English",
          measure_units: "%",
          description: "Proportion of people who's mother tongue is English. 'Mother tongue' refers to the first language learned at home in childhood and still understood by the person at the time the data was collected. If the person no longer understands the first language learned, the mother tongue is the second language learned. For a person who learned two languages at the same time in early childhood, the mother tongue is the language this person spoke most often at home before starting school. For a child who has not yet learned to speak, the mother tongue is the language spoken most often to this child at home."
        },
        {
          measure: "prop_mother_tongue_french",
          measure_name: "% Mother Tongue French",
          measure_units: "%",
          description: "Proportion of people who's mother tongue is French. 'Mother tongue' refers to the first language learned at home in childhood and still understood by the person at the time the data was collected. If the person no longer understands the first language learned, the mother tongue is the second language learned. For a person who learned two languages at the same time in early childhood, the mother tongue is the language this person spoke most often at home before starting school. For a child who has not yet learned to speak, the mother tongue is the language spoken most often to this child at home."
        },
        {
          measure: "most_mother_tongue",
          measure_type: "qualitative",
          measure_name: "Most Common Mother Tongue Except French and English",
          measure_detail: "most_mother_tongue_prop",
          measure_units: "%",
          colours: {
            'Arabic':     '#8dd3c7',
            'Italian':    '#ffffb3',
            'Mandarin':   '#bebada',
            'Spanish':    '#fb8072',
            'Vietnamese': '#80b1d3',
            'Serbian':    '#fdb462',
            'German':     '#b3de69',
            'Portuguese': '#fccde5'
          },
          description: "The most common mother tongue for a tract that is neither English nor French. Note that the people represented here may know English or French, but those languages are not their mother tongue."
        }
      ]
    }
  ]

  return measureData;
}
