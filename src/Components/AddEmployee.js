import React, { useState } from "react";

const AddEmployee = ({Data, ShowForm, setData, setShowForm}) => {

    const [checkMale, setCheckMale] = useState(false)
    const [checkFeMale, setCheckFeMale] = useState(false)
    const [checkOthers, setCheckOthers] = useState(false)


    const [Details, setDetails] = useState({
        id: Math.random().toString(36).substring(2),
        EmployeName: '',
        JobTitle: '',
        email: '',
        phone: '',
        gender: '',
        image: ''


    })




    const HandleSubmit = () => {

        if(!Details.email.includes('@')){
            alert('Enter a valid Email')

        }
        else if(Details.EmployeName === ''){
            alert('Enter Name')
        }
        else if(Details.JobTitle === ''){
            alert('Enter Job Title')
        }
        else if(Details.phone === ''){
            alert('Enter Number')
        }
        else if(Details.phone.length > 10 || Details.phone.length < 10){
            alert('Enter 10 digit Number')
        }
        else if(!checkMale && !checkFeMale && !checkOthers){
            alert('Please select gender')
        }

        if(Details.email.includes('@') && Details.EmployeName !== '' && Details.JobTitle !== '' && Details.phone.length === 10 && (checkMale || checkFeMale || checkOthers)){
            Data.unshift(Details)
            setData([...Data])
            setDetails({
                id: Math.random().toString(36).substring(2),
                EmployeName: "",
                JobTitle: "",
                email: "",
                phone: "",
                gender: "",
                image: ""
              });
              setShowForm(false)
              setCheckMale(false)
              setCheckFeMale(false)
              setCheckOthers(false)
        }

        
        

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
    
        // Convert the selected file to data URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setDetails({ ...Details, image: reader.result });
        };
        reader.readAsDataURL(file);
      };


    return(
        <>
        <div style={{scale: ShowForm ? '1' : '0', transition: '0.5s all ease'}} className="formContainer">
            <div className="form">
            <p onClick={() => setShowForm(false)} className="close"><i class="fa-solid fa-xmark"></i></p>

            <p>Employee Picture</p>
            <div className="image">
            <img src={Details.image} alt="" />
            </div>

            <input
            style={{boxShadow:  'none'}}
            onChange={handleFileChange}
            type="file"
            name="file"
            id="file"
          />    
               <input value={Details.EmployeName} onInput={(e) => setDetails({...Details, EmployeName: ShowForm ? e.target.value : ''})} type="text" placeholder="Enter Name" />
                <input value={Details.JobTitle} onInput={(e) => setDetails({...Details, JobTitle: ShowForm ? e.target.value : ''})} type="text" placeholder="Enter Job Title"/>
                <input value={Details.email} onInput={(e) => setDetails({...Details, email: ShowForm ? e.target.value : ''})} type="email" name="email" id="email" required placeholder="Enter Email" />
                <input value={Details.phone} onInput={(e) => setDetails({...Details, phone: ShowForm ? e.target.value : e.target.value = '' })} type="number" minLength={10} maxLength={10} name="number" id="number" placeholder="Enter Phone Number" />
                <div className="selectGender">
                    <div className="male">
                    <input type="checkbox" name="checkbox"
                    id="checkbox"
                    checked={checkMale}
                    required
                    onChange={() => {
                        setCheckMale((prevcheck) => !prevcheck)
                        if(checkFeMale === true){
                            setCheckFeMale(false)
                        }
                        else if(checkOthers === true){
                            setCheckOthers(false)
                        }
                        setDetails({...Details, gender: 'male'})


                    }

                    }

                     />
                    
                    <p>male</p>
                    </div>

                    <div className="female">
                    <input type="checkbox" name="checkbox" id="checkbox" 
                    checked={checkFeMale}
                    required
                    onChange={() => {
                        setCheckFeMale((prevcheck) => !prevcheck)
                        if(checkMale === true){
                            setCheckMale(false)
                        }
                        else if(checkOthers === true){
                            setCheckOthers(false)
                        }
                        setDetails({...Details, gender: 'female'})
                    }} />
                    <p>female</p>
                    </div>

                    <div className="others">
                    <input type="checkbox" name="checkbox" id="checkbox" 
                    checked={checkOthers}
                    required
                    onChange={() => {
                        setCheckOthers((prevcheck) => !prevcheck)
                        if(checkMale === true){
                            setCheckMale(false)
                        }
                        else if(checkFeMale === true){
                            setCheckFeMale(false)
                        }
                        setDetails({...Details, gender: 'others'})
                    }} />
                    <p>Others</p>
                    </div>
                </div>
                <button onClick={HandleSubmit}  type="button">
                    Submit
                </button>
                
            </div>
        </div>
        </>
    )
}

export default AddEmployee