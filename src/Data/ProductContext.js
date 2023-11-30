import React, {useState, createContext } from "react";


const MyContext = createContext(null)



const MyContextProvider = ({children}) => {

    const [value, setValue] = useState('')
    const [Select, setSelect] = useState([])
    const [gender, setGender] = useState('')

    return(
        <>
        <MyContext.Provider value={{value, setValue, Select, setSelect, gender, setGender}}>
            {children}
        </MyContext.Provider>
        </>
    )
}
export {MyContext, MyContextProvider}