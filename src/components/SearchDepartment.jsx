import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Autocomplete, Button, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
const departments = [
  "Architecture",
  "Arts and Sciences",
  "Economics",
  "Industrial Design",
  "Philosophy",
  "Statistics",
  "Academic Writing Center",
  "Accounting",
  "Aeronautics and Astronautics",
  "Aerospace Engineering",
  "Astronomy",
  "Biological Sciences",
  "Business Administration",
  "Chemical Engineering",
  "Chemical Metallurgical Engineering",
  "Chemistry",
  "City and Regional Planning",
  "Civil Engineering",
  "Computer and Informatics Engineering",
  "Computer Education and Instructional Technology",
  "Computer Engineering",
  "Basic English",
  "Modern Languages",
  "Welding Technology",
  "Educational Sciences",
  "Electrical and Electronics Engineering",
  "Electrics Program",
  "Elementary and Early Childhood Education",
  "Engineering Sciences",
  "Environmental Engineering",
  "Finance",
  "Food Engineering",
  "Foreign Language Education",
  "Geological Engineering",
  "Graduate School of Applied Mathematics",
  "Graduate School of Informatics",
  "Graduate School of Marine Sciences",
  "Graduate School of Natural and Applied Sciences",
  "Graduate School of Social Sciences",
  "Graduate Schools",
  "History",
  "Industrial Automation Program",
  "Industrial Electronics Program",
  "Industrial Engineering",
  "International Relations",
  "Management",
  "Maritime",
  "Marketing",
  "Mathematics",
  "Mathematics and Science Education",
  "Mechanical Engineering",
  "Metallurgical and Materials Engineering",
  "Mines",
  "Mining Engineering",
  "Music and Fine Arts",
  "Naval Architecture and Ocean Engineering",
  "Petroleum and Natural Gas Engineering",
  "Physical Education and Sports",
  "Physics",
  "Political Science and Public Administration",
  "Psychology",
  "Reporting to Rectorate",
  "School of Foreign Languages",
  "Science and Letters",
  "Sociology",
  "Technical Programs",
  "Technical Vocational School of Higher Education",
  "Textile Technologies and Design",
  "Turkish Language",
  "Automotive Engineering",
  "Biomedical Engineering",
  "Broadcasting and Journalism",
  "Computer Science",
  "Data Science",
  "Digital Media and Communication",
  "Environmental Science",
  "Graphic Design",
  "Health Sciences",
  "Human Resources Management",
  "Information Systems",
  "Interior Design",
  "Journalism",
  "Law",
  "Mechatronics Engineering",
  "Nuclear Engineering",
  "Optical Engineering",
  "Public Health",
  "Robotics Engineering",
  "Software Engineering",
  "Supply Chain Management",
  "Telecommunications Engineering",
  "Urban Design",
  "Visual Arts",
  "Website Development",
  "Linguistics",
  "Pharmaceutical Sciences",
  "Industrial Hygiene",
  "Renewable Resources Management",
  "Urban Planning and Design",
  "Computational Biology",
  "Human Rights Studies",
  "Advanced Materials Engineering",
  "Cultural Studies",
  "Systems Biology",
  "Forensic Science",
  "Marine Biology",
  "Behavioral Economics",
  "Environmental Policy",
  "Social Work",
  "Media Studies",
  "Music Production",
  "Neuroengineering",
  "Space Science",
  "Educational Technology",
  "Industrial Ecology",
  "Conflict Resolution and Mediation",
  "Cultural Heritage Management",
  "Public Administration and Governance",
  "Disaster Management",
  "Nanotechnology",
  "Gerontology",
  "Sports Management",
  "Wildlife Conservation",
  "Theoretical Physics",
  "Behavioral Neuroscience",
  "International Development Studies",
  "Robotics and Automation",
  "Financial Engineering",
  "Computational Chemistry",
  "Health Economics",
  "Digital Humanities",
  "Agricultural Economics",
  "Biochemistry",
  "Peace and Conflict Studies",
  "Renewable Energy Management",
  "Urban Sustainability",
  "Humanitarian Aid and Disaster Relief",
  "Quantum Computing",
  "Industrial Biotechnology",
  "Medical Physics",
  "Financial Risk Management",
  "Remote Sensing and GIS (Geographic Information Systems)",
  "Environmental Law and Policy",
  "Bioethics",
  "Space Exploration and Technology",
  "Sustainable Agriculture",
  "Computational Neuroscience",
  "Sustainable Tourism Management",
  "Human-Computer Interaction Design",
  "Advanced Manufacturing Engineering",
  "Organizational Development",
  "Ecological Economics",
  "Cyber-Physical Systems",
  "Water Resources Management",
  "Geography",
  "Geophysics",
  "Health Informatics",
  "Humanities",
  "International Business",
  "Islamic Studies",
  "Laboratory Sciences",
  "Library Sciences",
  "Linguistics",
  "Literature",
  "Materials Science",
  "Meteorology",
  "Microbiology",
  "Middle Eastern Studies",
  "Music Education",
  "Nutrition",
  "Oceanography",
  "Operations Research",
  "Paralegal Studies",
  "Pharmacology",
  "Photography",
  "Physical Therapy",
  "Physiology",
  "Political Science",
  "Project Management",
  "Public Administration",
  "Public Relations",
  "Religious Studies",
  "Risk Management",
  "Sustainability Studies",
  "Theater Arts",
  "Tourism Management",
  "Transportation Engineering",
  "Urban Studies",
  "Veterinary Medicine",
  "Web Design",
  "Wildlife Management",
  "Zoology",
  "Anthropology",
  "Archaeology",
  "Art History",
  "Bioinformatics",
  "Biophysics",
  "Cognitive Psychology",
  "Comparative Literature",
  "Computer Graphics",
  "Criminal Justice",
  "Dance",
  "Dentistry",
  "Digital Arts",
  "Early Childhood Education",
  "Ecology",
  "Econometrics",
  "Epidemiology",
  "Ethnic Studies",
  "Film Studies",
  "Food Science",
  "Game Design",
  "Gender Studies",
  "Genetics",
  "Geology",
  "Graphic Arts",
  "Health Administration",
  "Health Education",
  "Industrial Psychology",
  "Interior Architecture",
  "International Law",
  "Journalism",
  "Library Science",
  "Management Information Systems",
  "Marine Engineering",
  "Mass Communication",
  "Materials Engineering",
  "Medical Imaging",
  "Medieval Studies",
  "Military Science",
  "Molecular Biology",
  "Multimedia Design",
  "Music Therapy",
  "Neuroscience",
  "Nursing",
  "Occupational Therapy",
  "Organic Chemistry",
  "Paleontology",
  "Peace Studies",
  "Philanthropy",
  "Physical Education",
  "Physical Therapy",
  "Planetary Science",
  "Plastic Surgery",
  "Podiatry",
  "Public Policy",
  "Rehabilitation Counseling",
  "Religious Education",
  "Respiratory Therapy",
  "Retail Management",
  "Science Education",
  "Sociolinguistics",
  "Special Education",
  "Speech Pathology",
  "Sports Medicine",
  "Theology",
  "Urban Planning",
  "Veterinary Science",
  "Web Development",
  "Women's Studies",
  "Aeronautics and Astronautics",
  "Aerospace Engineering",
  "Chemical Engineering",
  "Chemical Metallurgical Engineering",
  "Civil Engineering",
  "Computer and Informatics Engineering",
  "Computer Engineering",
  "Electrical and Electronics Engineering",
  "Electrics Program",
  "Engineering Sciences",
  "Environmental Engineering",
  "Food Engineering",
  "Geological Engineering",
  "Industrial Automation Program",
  "Industrial Electronics Program",
  "Industrial Engineering",
  "Marine Engineering",
  "Materials Engineering",
  "Mechanical Engineering",
  "Metallurgical and Materials Engineering",
  "Mining Engineering",
  "Naval Architecture and Ocean Engineering",
  "Petroleum and Natural Gas Engineering",
  "Robotics Engineering",
  "Software Engineering",
  "Telecommunications Engineering",
  "Automotive Engineering",
  "Biomedical Engineering",
  "Electronics Engineering",
  "Environmental Science and Engineering",
  "Manufacturing Engineering",
  "Mechatronics Engineering",
  "Nuclear Engineering",
  "Optical Engineering",
  "Renewable Energy Engineering",
  "Systems Engineering",
  "Transportation Engineering",
  "Water Resources Engineering"
]

const SearchDepartment = ({searchText, setSearchText}) => {
  const [options, setOptions] = useState(departments); // Tüm departmanlar
  const [filteredOptions, setFilteredOptions] = useState(departments); // Filtrelenmiş departmanlar
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  // Arama yapılacak fonksiyon
  const search = (searchQuery) => {
    const filteredOptions = options.filter(cumle =>
      cumle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredOptions(filteredOptions);
  };

  // Yeni departman eklemek için dialogu aç
  const handleAddDepartment = () => {
    setOpenDialog(true);
  };

  // Dialog kapatma işlemi
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Autocomplete
        size='small'
        style={{width:"100%"}}
        disableClearable
        open={open}
        onFocus={(e)=>setOpen(true)}
        onBlur={(e)=>setOpen(false)}
        noOptionsText={<Button onClick={()=>{setOpen(false)}} fullWidth startIcon={<Add/>} variant="contained" style={{textTransform:"none"}}>Add department:{searchText}</Button>}
        options={filteredOptions} // Filtrelenmiş seçenekler buraya geçirildi
        value={searchText}
        onChange={(event, newValue) => {
          setSearchText(newValue);
          search(newValue);
        }}
        renderInput={(params) => (
          <TextField
            size='small'
            {...params}
            label="Department"
            style={{width:"100%"}}
            onChange={(e) => {
              setSearchText(e.target.value);
              search(e.target.value); // Burada arama işlemi tetikleniyor
            }}
           
          />
        )}
      />
     
    </Stack>
  );
};
export default SearchDepartment;
