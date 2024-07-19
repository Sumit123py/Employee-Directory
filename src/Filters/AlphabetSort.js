import React, { useContext } from "react";
import { MyContext } from "../Data/ProductContext";

const AlphabetSort = () => {



    const {Select, setSelect} = useContext(MyContext)

    const alphabets = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode("A".charCodeAt(0) + index)
  );

  // Sort the array
  const sortedAlphabets = alphabets.slice().sort();

  const HandleSelect = (item, id) => {
    const indexOf = Select.indexOf(item.toLowerCase())



    if(indexOf === -1){
        setSelect([...Select, item.toLowerCase()])
    }
    else{
        Select.splice(indexOf, 1)
        setSelect([...Select])
    }

    
    


  }



  return (
    <div className="AlphabetContainer">
      <ul>
        {sortedAlphabets.map((alphabet, index) => (
          <li style={{backgroundColor: Select.includes(alphabet.toLowerCase()) ? 'white' : 'rgb(44, 138, 245)', color: Select.includes(alphabet.toLowerCase()) ? 'rgb(44, 138, 245)' : 'white'}} onClick={() => HandleSelect(alphabet, index)} key={alphabet}>{alphabet}</li>
        ))}
      </ul>
    </div>
  );
}

export default AlphabetSort