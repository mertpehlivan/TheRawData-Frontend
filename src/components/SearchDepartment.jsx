import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, Stack, createFilterOptions } from '@mui/material';

const departments = [
  {
      "value": "Architecture"
  },
  {
      "value": "Arts and Sciences"
  },
  {
      "value": "Economics"
  },
  {
      "value": "Industrial Design"
  },
  {
      "value": "Philosophy"
  },
  {
      "value": "Statistics"
  },
  {
      "value": "Academic Writing Center"
  },
  {
      "value": "Accounting"
  },
  {
      "value": "Aeronautics and Astronautics"
  },
  {
      "value": "Aerospace Engineering"
  },
  {
      "value": "Astronomy"
  },
  {
      "value": "Biological Sciences"
  },
  {
      "value": "Business Administration"
  },
  {
      "value": "Chemical Engineering"
  },
  {
      "value": "Chemical Metallurgical Engineering"
  },
  {
      "value": "Chemistry"
  },
  {
      "value": "City and Regional Planning"
  },
  {
      "value": "Civil Engineering"
  },
  {
      "value": "Computer and Informatics Engineering"
  },
  {
      "value": "Computer Education and Instructional Technology"
  },
  {
      "value": "Computer Engineering"
  },
  {
      "value": "Basic English"
  },
  {
      "value": "Modern Languages"
  },
  {
      "value": "Welding Technology"
  },
  {
      "value": "Educational Sciences"
  },
  {
      "value": "Electrical and Electronics Engineering"
  },
  {
      "value": "Electrics Program"
  },
  {
      "value": "Elementary and Early Childhood Education"
  },
  {
      "value": "Engineering Sciences"
  },
  {
      "value": "Environmental Engineering"
  },
  {
      "value": "Finance"
  },
  {
      "value": "Food Engineering"
  },
  {
      "value": "Foreign Language Education"
  },
  {
      "value": "Geological Engineering"
  },
  {
      "value": "Graduate School of Applied Mathematics"
  },
  {
      "value": "Graduate School of Informatics"
  },
  {
      "value": "Graduate School of Marine Sciences"
  },
  {
      "value": "Graduate School of Natural and Applied Sciences"
  },
  {
      "value": "Graduate School of Social Sciences"
  },
  {
      "value": "Graduate Schools"
  },
  {
      "value": "History"
  },
  {
      "value": "Industrial Automation Program"
  },
  {
      "value": "Industrial Electronics Program"
  },
  {
      "value": "Industrial Engineering"
  },
  {
      "value": "International Relations"
  },
  {
      "value": "Management"
  },
  {
      "value": "Maritime"
  },
  {
      "value": "Marketing"
  },
  {
      "value": "Mathematics"
  },
  {
      "value": "Mathematics and Science Education"
  },
  {
      "value": "Mechanical Engineering"
  },
  {
      "value": "Metallurgical and Materials Engineering"
  },
  {
      "value": "Mines"
  },
  {
      "value": "Mining Engineering"
  },
  {
      "value": "Music and Fine Arts"
  },
  {
      "value": "Naval Architecture and Ocean Engineering"
  },
  {
      "value": "Petroleum and Natural Gas Engineering"
  },
  {
      "value": "Physical Education and Sports"
  },
  {
      "value": "Physics"
  },
  {
      "value": "Political Science and Public Administration"
  },
  {
      "value": "Psychology"
  },
  {
      "value": "Reporting to Rectorate"
  },
  {
      "value": "School of Foreign Languages"
  },
  {
      "value": "Science and Letters"
  },
  {
      "value": "Sociology"
  },
  {
      "value": "Technical Programs"
  },
  {
      "value": "Technical Vocational School of Higher Education"
  },
  {
      "value": "Textile Technologies and Design"
  },
  {
      "value": "Turkish Language"
  },
  {
      "value": "Automotive Engineering"
  },
  {
      "value": "Biomedical Engineering"
  },
  {
      "value": "Broadcasting and Journalism"
  },
  {
      "value": "Computer Science"
  },
  {
      "value": "Data Science"
  },
  {
      "value": "Digital Media and Communication"
  },
  {
      "value": "Environmental Science"
  },
  {
      "value": "Graphic Design"
  },
  {
      "value": "Health Sciences"
  },
  {
      "value": "Human Resources Management"
  },
  {
      "value": "Information Systems"
  },
  {
      "value": "Interior Design"
  },
  {
      "value": "Journalism"
  },
  {
      "value": "Law"
  },
  {
      "value": "Mechatronics Engineering"
  },
  {
      "value": "Nuclear Engineering"
  },
  {
      "value": "Optical Engineering"
  },
  {
      "value": "Public Health"
  },
  {
      "value": "Robotics Engineering"
  },
  {
      "value": "Software Engineering"
  },
  {
      "value": "Supply Chain Management"
  },
  {
      "value": "Telecommunications Engineering"
  },
  {
      "value": "Urban Design"
  },
  {
      "value": "Visual Arts"
  },
  {
      "value": "Website Development"
  },
  {
      "value": "Linguistics"
  },
  {
      "value": "Pharmaceutical Sciences"
  },
  {
      "value": "Industrial Hygiene"
  },
  {
      "value": "Renewable Resources Management"
  },
  {
      "value": "Urban Planning and Design"
  },
  {
      "value": "Computational Biology"
  },
  {
      "value": "Human Rights Studies"
  },
  {
      "value": "Advanced Materials Engineering"
  },
  {
      "value": "Cultural Studies"
  },
  {
      "value": "Systems Biology"
  },
  {
      "value": "Forensic Science"
  },
  {
      "value": "Marine Biology"
  },
  {
      "value": "Behavioral Economics"
  },
  {
      "value": "Environmental Policy"
  },
  {
      "value": "Social Work"
  },
  {
      "value": "Media Studies"
  },
  {
      "value": "Music Production"
  },
  {
      "value": "Neuroengineering"
  },
  {
      "value": "Space Science"
  },
  {
      "value": "Educational Technology"
  },
  {
      "value": "Industrial Ecology"
  },
  {
      "value": "Conflict Resolution and Mediation"
  },
  {
      "value": "Cultural Heritage Management"
  },
  {
      "value": "Public Administration and Governance"
  },
  {
      "value": "Disaster Management"
  },
  {
      "value": "Nanotechnology"
  },
  {
      "value": "Gerontology"
  },
  {
      "value": "Sports Management"
  },
  {
      "value": "Wildlife Conservation"
  },
  {
      "value": "Theoretical Physics"
  },
  {
      "value": "Behavioral Neuroscience"
  },
  {
      "value": "International Development Studies"
  },
  {
      "value": "Robotics and Automation"
  },
  {
      "value": "Financial Engineering"
  },
  {
      "value": "Computational Chemistry"
  },
  {
      "value": "Health Economics"
  },
  {
      "value": "Digital Humanities"
  },
  {
      "value": "Agricultural Economics"
  },
  {
      "value": "Biochemistry"
  },
  {
      "value": "Peace and Conflict Studies"
  },
  {
      "value": "Renewable Energy Management"
  },
  {
      "value": "Urban Sustainability"
  },
  {
      "value": "Humanitarian Aid and Disaster Relief"
  },
  {
      "value": "Quantum Computing"
  },
  {
      "value": "Industrial Biotechnology"
  },
  {
      "value": "Medical Physics"
  },
  {
      "value": "Financial Risk Management"
  },
  {
      "value": "Remote Sensing and GIS (Geographic Information Systems)"
  },
  {
      "value": "Environmental Law and Policy"
  },
  {
      "value": "Bioethics"
  },
  {
      "value": "Space Exploration and Technology"
  },
  {
      "value": "Sustainable Agriculture"
  },
  {
      "value": "Computational Neuroscience"
  },
  {
      "value": "Sustainable Tourism Management"
  },
  {
      "value": "Human-Computer Interaction Design"
  },
  {
      "value": "Advanced Manufacturing Engineering"
  },
  {
      "value": "Organizational Development"
  },
  {
      "value": "Ecological Economics"
  },
  {
      "value": "Cyber-Physical Systems"
  },
  {
      "value": "Water Resources Management"
  },
  {
      "value": "Geography"
  },
  {
      "value": "Geophysics"
  },
  {
      "value": "Health Informatics"
  },
  {
      "value": "Humanities"
  },
  {
      "value": "International Business"
  },
  {
      "value": "Islamic Studies"
  },
  {
      "value": "Laboratory Sciences"
  },
  {
      "value": "Library Sciences"
  },
  {
      "value": "Literature"
  },
  {
      "value": "Materials Science"
  },
  {
      "value": "Meteorology"
  },
  {
      "value": "Microbiology"
  },
  {
      "value": "Middle Eastern Studies"
  },
  {
      "value": "Music Education"
  },
  {
      "value": "Nutrition"
  },
  {
      "value": "Oceanography"
  },
  {
      "value": "Operations Research"
  },
  {
      "value": "Paralegal Studies"
  },
  {
      "value": "Pharmacology"
  },
  {
      "value": "Photography"
  },
  {
      "value": "Physical Therapy"
  },
  {
      "value": "Physiology"
  },
  {
      "value": "Political Science"
  },
  {
      "value": "Project Management"
  },
  {
      "value": "Public Administration"
  },
  {
      "value": "Public Relations"
  },
  {
      "value": "Religious Studies"
  },
  {
      "value": "Risk Management"
  },
  {
      "value": "Sustainability Studies"
  },
  {
      "value": "Theater Arts"
  },
  {
      "value": "Tourism Management"
  },
  {
      "value": "Transportation Engineering"
  },
  {
      "value": "Urban Studies"
  },
  {
      "value": "Veterinary Medicine"
  },
  {
      "value": "Web Design"
  },
  {
      "value": "Wildlife Management"
  },
  {
      "value": "Zoology"
  },
  {
      "value": "Anthropology"
  },
  {
      "value": "Archaeology"
  },
  {
      "value": "Art History"
  },
  {
      "value": "Bioinformatics"
  },
  {
      "value": "Biophysics"
  },
  {
      "value": "Cognitive Psychology"
  },
  {
      "value": "Comparative Literature"
  },
  {
      "value": "Computer Graphics"
  },
  {
      "value": "Criminal Justice"
  },
  {
      "value": "Dance"
  },
  {
      "value": "Dentistry"
  },
  {
      "value": "Digital Arts"
  },
  {
      "value": "Early Childhood Education"
  },
  {
      "value": "Ecology"
  },
  {
      "value": "Econometrics"
  },
  {
      "value": "Epidemiology"
  },
  {
      "value": "Ethnic Studies"
  },
  {
      "value": "Film Studies"
  },
  {
      "value": "Food Science"
  },
  {
      "value": "Game Design"
  },
  {
      "value": "Gender Studies"
  },
  {
      "value": "Genetics"
  },
  {
      "value": "Geology"
  },
  {
      "value": "Graphic Arts"
  },
  {
      "value": "Health Administration"
  },
  {
      "value": "Health Education"
  },
  {
      "value": "Industrial Psychology"
  },
  {
      "value": "Interior Architecture"
  },
  {
      "value": "International Law"
  },
  {
      "value": "Library Science"
  },
  {
      "value": "Management Information Systems"
  },
  {
      "value": "Marine Engineering"
  },
  {
      "value": "Mass Communication"
  },
  {
      "value": "Materials Engineering"
  },
  {
      "value": "Medical Imaging"
  },
  {
      "value": "Medieval Studies"
  },
  {
      "value": "Military Science"
  },
  {
      "value": "Molecular Biology"
  },
  {
      "value": "Multimedia Design"
  },
  {
      "value": "Music Therapy"
  },
  {
      "value": "Neuroscience"
  },
  {
      "value": "Nursing"
  },
  {
      "value": "Occupational Therapy"
  },
  {
      "value": "Organic Chemistry"
  },
  {
      "value": "Paleontology"
  },
  {
      "value": "Peace Studies"
  },
  {
      "value": "Philanthropy"
  },
  {
      "value": "Physical Education"
  },
  {
      "value": "Planetary Science"
  },
  {
      "value": "Plastic Surgery"
  },
  {
      "value": "Podiatry"
  },
  {
      "value": "Public Policy"
  },
  {
      "value": "Rehabilitation Counseling"
  },
  {
      "value": "Religious Education"
  },
  {
      "value": "Respiratory Therapy"
  },
  {
      "value": "Retail Management"
  },
  {
      "value": "Science Education"
  },
  {
      "value": "Sociolinguistics"
  },
  {
      "value": "Special Education"
  },
  {
      "value": "Speech Pathology"
  },
  {
      "value": "Sports Medicine"
  },
  {
      "value": "Theology"
  },
  {
      "value": "Urban Planning"
  },
  {
      "value": "Veterinary Science"
  },
  {
      "value": "Web Development"
  },
  {
      "value": "Women's Studies"
  },
  {
      "value": "Electronics Engineering"
  },
  {
      "value": "Environmental Science and Engineering"
  },
  {
      "value": "Manufacturing Engineering"
  },
  {
      "value": "Renewable Energy Engineering"
  },
  {
      "value": "Systems Engineering"
  },
  {
      "value": "Water Resources Engineering"
  }
]
const uniqueDepartments = new Set(departments);

console.log(uniqueDepartments);
const typeGenerator = departments.map((department,index) => ({
  title: department.value,
  id: index
}));





const filter = createFilterOptions();

export default function SearchDepartment({ searchText, setSearchText }) {
  const [value, setValue] = React.useState(null);

  useEffect(() => {
    if (searchText) {
      console.log("girdi")
      setValue({ title: capitalizeFirstLetter(searchText) });
    }
  }, []);

  useEffect(() => {
    if (value) {
      setSearchText(value.title);
    }
  }, [value,searchText]);

  return (
    <Autocomplete
      style={{ width: '100%' }}
      size="small"
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: capitalizeFirstLetter(newValue),
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: capitalizeFirstLetter(newValue.inputValue),
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value if input doesn't exist in options
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${capitalizeFirstLetter(inputValue)}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={typeGenerator}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Department" />}
    />
  );
}
function capitalizeFirstLetter(string) {
  
  return string.replace(/\b\w/g, (char) => char.toUpperCase());

}

