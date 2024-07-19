import React, {useState} from "react";

const Edit = ({editData, ShowEditDetails, setShowEditDetails, Data, setData}) => {

    const [EditName, setEditName] = useState(editData.EmployeName)
    const [EditJobTitle, setEditJobTitle] = useState(editData.JobTitle)
    const [EditEmail, setEditEmail] = useState(editData.email)
    const [EditPhone, setEditPhone] = useState(editData.phone)
    const [EditGender, setEditGender] = useState(editData.gender)
    const [Editimage, setEditImage] = useState(editData.image)

    const [checkMale, setCheckMale] = useState(false)
    const [checkFeMale, setCheckFeMale] = useState(false)
    const [checkOthers, setCheckOthers] = useState(false)

    const [showEditImage, setShowEditImage] = useState(false)

    const Handlesave = () => {

        if(!EditEmail.includes('@')){
            alert('Invalid Email')
        }
        else if(EditPhone.length < 10 || EditPhone.length < 10){
            alert('Enter 10 digit number')
        }
        else{

    
            const updatedData = Data.map(item => {
                if (item.id === editData.id) {
                    return {
                        ...item,
                        EmployeName: EditName,
                        JobTitle: EditJobTitle,
                        email: EditEmail,
                        phone: EditPhone,
                        gender: EditGender,
                        image: Editimage
                    };
                }
                return item;
            });
    
            
            setData(updatedData);
            

        
            // Hide the edit details
            setShowEditDetails(false);
        }

    }


    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
    
        // Convert the selected file to data URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditImage(reader.result);
        };
        reader.readAsDataURL(file);
      };


    return(
        <>
        <div style={{scale: ShowEditDetails ? '1' : '0', transition: '0.5s all ease'}} className="EditContainer">
              <div className="EmployeeCard">
                <div className="image">
                  <img src={Editimage} alt="" />
                  <p onClick={() => setShowEditImage((prevShow) => !prevShow)} className="EditImage"><i class="fa-solid fa-pen-to-square"></i></p>
                </div>
                <input style={{display: showEditImage ? 'block' : 'none'}} type="file" name="file" id="file" 
                  onChange={handleFileChange} />
                <input style={{padding: '5px'}} type="text" onInput={(e) => setEditName(e.target.value)} value={EditName} />
                <input style={{padding: '5px'}} type="text" onInput={(e) => setEditJobTitle(e.target.value)} value={EditJobTitle} />                
                <input style={{padding: '5px'}} type="email" onInput={(e) => setEditEmail(e.target.value)} value={EditEmail} />
                <input style={{padding: '5px'}} type='number' onInput={(e) => setEditPhone(e.target.value)} value={EditPhone} />                
                <div className="selectGender">

                <div className="male">
                    <input type="checkbox" name="checkbox"
                    id="checkbox"
                    checked={EditGender === 'male' ? true : checkMale}
                    onChange={() => {
                        setCheckMale((prevMale) => !prevMale)
                        if(checkFeMale === true){
                            setCheckFeMale(false)
                        }
                        else if(checkOthers === true){
                            setCheckOthers(false)
                        }
                        setEditGender('male')
                    }}


                     />
                    
                    <p>male</p>
                    </div>

                    <div className="female">
                    <input type="checkbox" name="checkbox" id="checkbox"
                    checked={EditGender === 'female' ? true : checkFeMale}
                    onChange={() => {
                        setCheckFeMale((prevFeMale) => !prevFeMale)
                        if(checkMale === true){
                            setCheckMale(false)
                        }
                        else if(checkOthers === true){
                            setCheckOthers(false)
                        }
                        setEditGender('female')
                    }}


                     />
                    <p>female</p>
                    </div>

                    <div className="others">
                    <input type="checkbox" name="checkbox" id="checkbox" 
                    checked={EditGender === 'others' ? true : checkOthers}
                    onChange={() => {
                        setCheckOthers((prevOthers) => !prevOthers)

                        if(checkMale === true){
                            setCheckMale(false)
                        }
                        else if(checkFeMale === true){
                            setCheckFeMale(false)
                        }
                        setEditGender('others')

                        
                    }}

                    


                    
                    required
                    />
                    <p>Others</p>
                    </div>
                    
                </div>         
                <p onClick={() => setShowEditDetails(false)} className="closeDetails"><i class="fa-solid fa-xmark"></i></p>
                <button onClick={Handlesave}>save</button>
              </div>
        </div>
        
        </>
    )
}

export default Edit