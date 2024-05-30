
import React, { useState,useEffect } from 'react';
import { useCallback } from "react";
import {AddDataIcon,CO2Icon,dataManagement1,AttachmentFileIcon,dataManagement2,dataManagement3,PieChartIcon,UserIcon,searchIcon,Vector1,Vector2,Vector3,whiteVariation,Rectangle1,LeftArrow, Line} from "./../assets"


const FugitiveDataEntry= () => { 

    const [data, setData] = useState({
        facilityCodes: [],
        facilityNames: [],
        year: [],
        month: [],
      });
      // eslint-disable-next-line
      const [dataEntries, setDataEntries] = useState([]);// eslint-disable-next-line
      const [selectedFacilityCode, setSelectedFacilityCode] = useState('');
      const [selectedFacilityName, setSelectedFacilityName] = useState('');
      const [selectedYear,setSelectedYear]=useState('')
      const [selectedMonth,setSelectedMonth]=useState('')
      const [selectedFile, setSelectedFile] = useState(null);
      const [typeOfGasEmitted, setTypeOfGasEmitted] = useState('');
      const [refrigerantChargedNew, setRefrigerantChargedNew] = useState('');
    const [capacityOfEquipmentNew, setCapacityOfEquipmentNew] = useState('');
    const [refrigerantChargedExisting, setRefrigerantChargedExisting] = useState('');
    const [capacityOfEquipmentRetiring, setCapacityOfEquipmentRetiring] = useState('');
    const [refrigerantRecoveredRetiring, setRefrigerantRecoveredRetiring] = useState('');
    const [refrigerantPurchased, setRefrigerantPurchased] =useState('');
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/fugitive-data"); // Replace with your backend URL
          const fetchedData = await response.json();
          setData({
            facilityCodes: fetchedData.facilityCodes,
            facilityNames: fetchedData.facilityNames,
            year: fetchedData.year, 
            month: fetchedData.month, 
          });
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle errors gracefully, e.g., display an error message to the user
        }
      };
      const fetchDataEntries = async () => {
        try {
          const response = await fetch("http://localhost:5000/dataentries");
          const fetchedEntries = await response.json();
          setDataEntries(fetchedEntries);
        } catch (error) {
          console.error("Error fetching data entries:", error);
        }
      };
      useEffect(() => {
        fetchData();
        fetchDataEntries();
      }, []);
    

      const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    
        if (file) {
          const formData = new FormData();
          formData.append("file", file.name);
    
          try {
            const response = await fetch("http://localhost:5000/upload", {
              method: "POST",
              body: formData,
            });
    
            if (response.ok) {
              alert("File uploaded successfully!");
            } else {
              alert("File upload failed.");
            }
          } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed.");
          }
        }
      };  
  const onDataManagement1IconClick = useCallback(() => {
    // Please sync "Plugin / file cover - 17" to the project
  }, []);

  const onDataManagement4IconClick = useCallback(() => {
    // Please sync "Plugin / file cover - 21" to the project
  }, []);

  const onDataManagement2IconClick = useCallback(() => {
    // Please sync "Plugin / file cover - 20" to the project
  }, []);

  const onDataManagement3IconClick = useCallback(() => {
    // Please sync "Emission Measurement - Home Page" to the project
  }, []);

  const saveData = async () => {
    const formData = {
        facilityCode: selectedFacilityCode,
        facilityName: selectedFacilityName,
        year: selectedYear,
        month: selectedMonth,
        typeOfGasEmitted: typeOfGasEmitted,
        refrigerantChargedNew: refrigerantChargedNew,
        capacityOfEquipmentNew: capacityOfEquipmentNew,
        refrigerantChargedExisting: refrigerantChargedExisting,
        capacityOfEquipmentRetiring: capacityOfEquipmentRetiring,
        refrigerantRecoveredRetiring: refrigerantRecoveredRetiring,
        file: selectedFile.name
    };

    try {
        const response = await fetch("http://localhost:5000/fugitivedataentries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data.");
        }
    } catch (error) {
        console.error("Error saving data:", error);
        alert("Failed to save data.");
    }
};

  const handleFacilityCodeChange = (e) => {
    setSelectedFacilityCode(e.target.value);

};
const handleFacilityNameChange = (e) => {
    setSelectedFacilityName(e.target.value);
};

const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
};

const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
};

const handleTypeOfGasEmittedChange = (e) => {
    setTypeOfGasEmitted(e.target.value);
};

const handleRefrigerantChargedNewChange = (e) => {
    setRefrigerantChargedNew(e.target.value);
};

const handleCapacityOfEquipmentNewChange = (e) => {
    setCapacityOfEquipmentNew(e.target.value);
};

const handleRefrigerantChargedExistingChange = (e) => {
    setRefrigerantChargedExisting(e.target.value);
};

const handleCapacityOfEquipmentRetiringChange = (e) => {
    setCapacityOfEquipmentRetiring(e.target.value);
};

const handleRefrigerantRecoveredRetiringChange = (e) => {
    setRefrigerantRecoveredRetiring(e.target.value);
};

const handlerefrigerantPurchased = (e) =>{
    setRefrigerantPurchased(e.target.value);
}
  return (
    <div className="mobile-combustion-data-entry">
      <div className="mobile-combustion-data-entry-child" />
      <img
        className="white-variation-1"
        alt=""
        src={whiteVariation}
      />
      <div className="mobile-combustion-data-entry-item" />
      <img className="user-5-1" alt="" src={UserIcon} />
      <img
        className="data-management-1-icon"
        alt=""
        src={dataManagement1}
        onClick={onDataManagement1IconClick}
      />
      <img
        className="data-management-4-icon"
        alt=""
        src={PieChartIcon}
        onClick={onDataManagement4IconClick}
      />
      <img
        className="data-management-2-icon"
        alt=""
        src={dataManagement2}
        onClick={onDataManagement2IconClick}
      />
      <div className="co2-parent">
        <img className="co2" alt="" src={CO2Icon} />
      </div>
      <div className="dropdown-box">
        <div className="">
        <div className="menu-label1">
           <select className="header" value={selectedYear} onChange={handleYearChange}>
    <option value="">Select Year</option>
    {data.year.map((yearOption) => ( // Change 'year' to 'yearOption'
      <option key={yearOption} value={yearOption}>
        {yearOption}
      </option>
    ))}
  </select>
</div>

        </div>

      </div>
      <div className="reporting-year">Reporting Year</div>
      <img
        className="data-management-3-icon"
        alt=""
        src={dataManagement3}
        onClick={onDataManagement3IconClick}
      />
      <img
        className="left-arrow-in-circular-button-icon"
        alt=""
        src={LeftArrow}
      />
      <div className="mobile-combustion-data-entry-inner" />
      <div className="rectangle-div" />
      <div className="rectangle-div" />
      <div className="">
      <select className="rectangle-div" value={selectedMonth} onChange={handleMonthChange}>
    <option value="">Select Month</option>
    {data.month.map((monthOption) => ( // Change 'year' to 'yearOption'
      <option key={monthOption} value={monthOption}>
        {monthOption}
      </option>
    ))}
  </select></div>
      <select className="mobile-combustion-data-entry-child2" value={data.selectedFacilityCode} onChange={handleFacilityCodeChange}>
        <option value="">Select Facility Code</option>
        {data.facilityCodes.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <select className="mobile-combustion-data-entry-child3" value={selectedFacilityName} onChange={handleFacilityNameChange}>
        <option value="">Select Facility Name</option>
        {data.facilityNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <div className="facility">{`Facility `}</div>
      <div className="month">Month</div>
      <div className="div">647</div>
      <div className="mtco2">MTCO2</div>
      <b className="fugitive-emissions">FUGITIVE EMISSIONS</b>
      <div className="mobile-combustion-data-entry-child4" onClick={saveData}/>
      <b className="add-data">ADD DATA</b>
      <img className="add-6-icon" alt="" src={AddDataIcon} />
      <img className="cart-10-icon" alt="" src={Rectangle1} />
        
      <input className="mobile-combustion-data-entry-child5 " type="text" placeholder='Type of gas emitted' value={typeOfGasEmitted} onChange={handleTypeOfGasEmittedChange} />
      <input className='mobile-combustion-data-entry-child6' type="text" placeholder='Type of Gas emitted'value={refrigerantChargedNew} onChange={handleRefrigerantChargedNewChange}/>
      <div className="type-of-gas2">Type of Gas</div>
      <div className="refrigerant-charged-new-container">
        <span className="refrigerant-charged">
          <span>Refrigerant Charged</span>
          <span className="span">{` `}</span>
        </span>
        <span className="span">
          <span>(New Equipment)</span>
        </span>
      </div>
      <input className="mobile-combustion-data-entry-child7" type="text" placeholder="Type of Gas emitted" value={capacityOfEquipmentNew} onChange={handleCapacityOfEquipmentNewChange}/>
      <div className="capacity-of-equipment-container">
        <span className="refrigerant-charged">Capacity of Equipment</span>
        <span className="span"> (New Equipment)</span>
      </div>
      <input className="mobile-combustion-data-entry-child8" type="text" placeholder="Type of Gas emitted" value={capacityOfEquipmentRetiring} onChange={handleCapacityOfEquipmentRetiringChange}/>
      <div className="capacity-of-equipment-container1">
        <span className="refrigerant-charged">Capacity of Equipment</span>
        <span className="span"> (Retiring Equipment)</span>
      </div>
      <input className="mobile-combustion-data-entry-child9" type="text" placeholder="type-of-gas5" value={refrigerantChargedExisting} onChange={handleRefrigerantChargedExistingChange}/>
      <div className="refrigerant-charged-existing-container">
        <span className="refrigerant-charged">{`Refrigerant Charged `}</span>
        <span className="span">(Existing Equipment)</span>
      </div>
      <input className="mobile-combustion-data-entry-child10" type="text" placeholder='Type of Gas emitted' value={refrigerantPurchased} onChange={handlerefrigerantPurchased}/>
      <div className="refrigerant-purchased">Refrigerant Purchased</div>
      <input className="mobile-combustion-data-entry-child11" type="text" placeholder='type-of-gas7'value={refrigerantRecoveredRetiring} onChange={handleRefrigerantRecoveredRetiringChange}/>
      <div className="refrigerant-recovered-retirin-container">
        <span>
          <span className="refrigerant-charged">Refrigerant recovered</span>
          <span className="span1">{` `}</span>
        </span>
        <span className="span">(Retiring Equipment)</span>
      </div>

      <img className="line-icon" alt="" src={Line}/>
      <img className="vector-icon" alt="" src={Vector1} />
      <img
        className="mobile-combustion-data-entry-child14"
        alt=""
        src={Vector2}
      />
      <img
        className="mobile-combustion-data-entry-child15"
        alt=""
        src={Vector3}
      />
      <div className="ellipse-div" />
      <div className="mobile-combustion-data-entry-child16" />
      <div className="mobile-combustion-data-entry-child17" />
      <div className="mobile-combustion-data-entry-child18" />
      <b className="view-data">VIEW DATA</b>
      <img className="add-8-icon" alt="" src={searchIcon}/>
      <div className="attachments">Attachments</div>
      <div className="mobile-combustion-data-entry-child19">
      <img className="file-icon" alt="" src={AttachmentFileIcon} />
      <label htmlFor="file-upload" className="file-upload-input" style={{ width: '' }}>
            File Upload</label>
        <input id="file-upload" type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}  onChange={handleFileChange} />
        </div>
    </div>
  );
};

export default FugitiveDataEntry;