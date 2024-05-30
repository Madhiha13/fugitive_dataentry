const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000; // Adjust port number as needed
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/fugitive-data', async (req, res) => {
  try {
    // Replace with your database access logic
    const facilityCodes = ["01", "02", "03", "04","05","06"];
    const facilityNames = ["STATIONARY", "FUGITIVE", "MOBILE", "PROCESS","UPSTREAM","DOWNSTREAM"];
    const year = ["2024-2023","2023-2022","2022-2021","2021-2020","2020-2019","2019-2018","2018-2017","2017-2016","2016-2015","2015-2014"]; // Comma-separated string
    const month = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"]; // Comma-separated string

    const data = {
      facilityCodes,
      facilityNames,
      year,
      month,
    };
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Adjust path as needed
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    }
  });
  
  const upload = multer({ storage });
  const dataEntries=[];
  app.post('/upload', upload.single('file'), (req, res) => {
    try {
      res.status(200).send({ message: "File uploaded successfully!" });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send({ message: "File upload failed." });
    }
  });

  
  app.post('/fugitivedataentries', upload.single('file'), (req, res) => {
    try {
      const { facilityCode, facilityName, year, month, typeOfGasEmitted, refrigerantChargedNew, capacityOfEquipmentNew, refrigerantChargedExisting, capacityOfEquipmentRetiring, refrigerantRecoveredRetiring ,file} = req.body;
      
  
      const entry = {
        facilityCode,
        facilityName,
        year,
        month,
        typeOfGasEmitted,
        refrigerantChargedNew,
        capacityOfEquipmentNew,
        refrigerantChargedExisting,
        capacityOfEquipmentRetiring,
        refrigerantRecoveredRetiring,
        file: file ? file : null 
      };
  
      dataEntries.push(entry); // Save entry to the in-memory array
  
      res.status(200).send({ message: "Data and file uploaded successfully!" });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).send({ message: "Data save failed." });
    }
  });
  
  // Endpoint to fetch all data entries
  app.get('/dataentries', (req, res) => {
    try {
      res.status(200).json(dataEntries);

    } catch (error) {
      console.error("Error fetching data entries:", error);
      res.status(500).send({ message: "Failed to fetch data entries." });
    }
  });
  
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
console.log(`endpoint to fetch :http://localhost:5000/fugitive-data`);
console.log(`endpoint to get data : http://localhost:5000/dataentries`);