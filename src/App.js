import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Data from "./Data/EmployeData";
import Sort from "./Filters/Sort";
import Edit from "./Components/Edit";
import { MyContext } from "./Data/ProductContext";
import AlphabetSort from "./Filters/AlphabetSort";

function App() {
  const [data, setData] = useState(Data);
  const [editData, setEditData] = useState([]);
  const [ShowDetails, setShowDetails] = useState(null);
  const [ShowEditDetails, setShowEditDetails] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [SelectedFilter, setSelectedFilter] = useState(data)

  
  const {value} = useContext(MyContext)
  const {Select} = useContext(MyContext)
  const {gender} = useContext(MyContext)




  useEffect(() => {

    if(value !== ''){
      setSelectedFilter(data.filter((item) => item.EmployeName.toLowerCase().includes(value)))
    }
    else if(Select.length !== 0){
      setSelectedFilter(data.filter((item) =>
      Select.includes(item.EmployeName.charAt(0).toLowerCase())
    ))
    }
    else if(gender !== ''){
      setSelectedFilter(data.filter((item) => item.gender.toLowerCase() === gender))
    }
    else{
      setSelectedFilter(data)
    }

  },[value, Select, gender, data])


  const HandleShowDetails = (
    image,
    EmployeeName,
    JobTitle,
    Email,
    phone,
    gender,
    id
  ) => {
    const EditData = {
      id: id,
      EmployeName: EmployeeName,
      image: image,
      phone: phone,
      email: Email,
      gender: gender,
      JobTitle: JobTitle,
    };

    setEditData(EditData);
  };

  const HandleEditDetails = (
    image,
    EmployeeName,
    JobTitle,
    Email,
    phone,
    gender,
    id
  ) => {
    const EditData = {
      id: id,
      EmployeName: EmployeeName,
      image: image,
      phone: phone,
      email: Email,
      gender: gender,
      JobTitle: JobTitle,
    };

    setEditData(EditData);
  };
  const HandleDeleteEmploye = (id) => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const indexof = SelectedFilter.indexOf(SelectedFilter.find((item, i) => i === id));
      SelectedFilter.splice(indexof, 1);
      setSelectedFilter([...SelectedFilter]);
      setTimeout(() => {
        alert("Deleted!");
      },100)
      // Replace this with your actual delete logic
    } else {
      alert("Cancelled deletion.");
    }
  };

  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <main>
        {editData.length !== 0 && ShowEditDetails ? (
          <Edit
            editData={editData}
            ShowEditDetails={ShowEditDetails}
            setShowEditDetails={setShowEditDetails}
            Data={data}
            setData={setData}
            setSelectedFilter={setSelectedFilter}
            SelectedFilter={SelectedFilter}
          />
        ) : null}
        <Sort Data={SelectedFilter} setData={setSelectedFilter} />
        <AlphabetSort/>
        <div className="containerLayout">
          {SelectedFilter.map((item, index) => {
            return (
              <>
                <div
                  style={{
                    position: ShowDetails === index ? "fixed" : "relative",
                    transition: "0.5s all ease",
                    top: ShowDetails === index ? "50%" : "0",
                    zIndex: ShowDetails === index ? "2" : "0",
                    left: ShowDetails === index ? "50%" : "0",
                    transform:
                      ShowDetails === index ? `translate(-50%, -50%)` : "none",
                    filter: `blur(${
                      ShowDetails !== index && ShowDetails !== null
                        ? "2px"
                        : "0"
                    })`,
                    width: ShowDetails === index ? (windowWidth <= 600 ? "350px" : "500px") : "300px",
                    height: ShowDetails === index ? (windowWidth <= 600 ? "400px" : "500px") : "250px"
                    
                  }}
                  key={index}
                  className="EmployeeCard"
                >
                  <div
                    style={{
                      width: ShowDetails === index ? "150px" : "80px",
                      height: ShowDetails === index ? "150px" : "80px",
                    }}
                    className="image"
                  >
                    <img src={item.image} alt="" />
                  </div>
                  <p className="name">{item.EmployeName}</p>
                  <p className="jobTitle">{item.JobTitle}</p>
                  <p
                    style={{
                      width: ShowDetails === index ? "35%" : "99%",
                      overflow: ShowDetails === index ? "visible" : "hidden",
                      textOverflow:
                        ShowDetails === index ? "unset" : "ellipsis",
                    }}
                    className="EmailId"
                  >
                    {item.email}
                  </p>
                  <p className="phoneNumber">{item.phone}</p>
                  <p className="gender">{item.gender}</p>
                  <p
                    style={{
                      display: ShowDetails === index ? "none" : "grid",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      HandleShowDetails(
                        item.image,
                        item.EmployeName,
                        item.JobTitle,
                        item.email,
                        item.phone,
                        item.gender,
                        item.id
                      );
                      setShowDetails(index);
                    }}
                    className="ShowDetails"
                  >
                    i
                  </p>
                  <p
                    onClick={() => setShowDetails(null)}
                    style={{
                      display: ShowDetails === index ? "block" : "none",
                      cursor: "pointer", color: 'white'
                    }}
                    className="closeDetails"
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </p>
                  <p
                    onClick={() => HandleDeleteEmploye(index)}
                    className="DeleteEmployee"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </p>
                  <p
                    onClick={() => {
                      HandleEditDetails(
                        item.image,
                        item.EmployeName,
                        item.JobTitle,
                        item.email,
                        item.phone,
                        item.gender,
                        item.id
                      );
                      setShowEditDetails(true);
                    }}
                    className="EditDetails"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
