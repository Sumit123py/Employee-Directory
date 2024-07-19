import React, { useContext, useEffect, useState }  from "react";
import AddEmployee from "../Components/AddEmployee";
import { MyContext } from "../Data/ProductContext";
 
const Sort = ({Data, setData}) => {

    const [ShowForm, setShowForm] = useState(false)

    const [checkMale, setCheckMale] = useState(false)
    const [checkFeMale, setCheckFeMale] = useState(false)
    const [checkOthers, setCheckOthers] = useState(false)

    const {setGender} = useContext(MyContext)

    const {setValue} = useContext(MyContext)




    let Time

    const HandleSearchFilter = (e) => {

        clearTimeout(Time)


        Time = setTimeout(() => {
            const value = e.target.value.toLowerCase();

            setValue(value)

        }, 500)
        
    }

    useEffect(() => {

        if(!checkMale && !checkFeMale && !checkOthers){
            setGender('')
        }

    },[setGender, checkFeMale, checkMale, checkOthers])

    return(
        <>
        <div className="FilterContainer">
            <input onInput={HandleSearchFilter} type="search" name="search" id="search" placeholder="Enter Search term"/>
            <div className="selectGender">
            <div className="male">
                    <input type="checkbox" name="checkbox"
                    id="checkbox"
                    checked={checkMale}
                    onChange={() => {
                        setCheckMale((prevMale) => !prevMale)
                        if(checkFeMale === true){
                            setCheckFeMale(false)
                        }
                        else if(checkOthers === true){
                            setCheckOthers(false)
                        }
                        setGender('male')
                    }}


                     />
                    
                    <p>male</p>
                    </div>

                    <div className="female">
                    <input type="checkbox" name="checkbox" id="checkbox"
                    checked={checkFeMale}
                    onChange={() => {
                        setCheckFeMale((prevFeMale) => !prevFeMale)
                        if(checkMale === true){
                            setCheckMale(false)
                        }
                        else if(checkOthers === true){
                            setCheckOthers(false)
                        }
                        setGender('female')
                    }}


                     />
                    <p>female</p>
                    </div>

                    <div className="others">
                    <input type="checkbox" name="checkbox" id="checkbox" 
                    checked={checkOthers}
                    onChange={() => {
                        setCheckOthers((prevOthers) => !prevOthers)

                        if(checkMale === true){
                            setCheckMale(false)
                        }
                        else if(checkFeMale === true){
                            setCheckFeMale(false)
                        }
                        setGender('others')

                        
                    }}

                    
                    required
                    />
                    <p>Others</p>
                    </div>
            </div>
            <button onClick={() => setShowForm(true)} className="addEmployee" type="button">Add Employee</button>
            
            <AddEmployee ShowForm={ShowForm} setData={setData} setShowForm={setShowForm} Data={Data}/>
        </div>
        </>
    )
}

export default Sort