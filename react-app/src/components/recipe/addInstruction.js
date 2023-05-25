import React, { useState } from "react";
function AddDynamicInput(){
    const [val,setVal]=useState("");
    const handleAdd=()=>{
        const abc = val + ".."
        setVal(abc)
    }
    const handleChange=(onChangeValue,i)=>{
        const inputdata = val.split('..')
        inputdata[i] = onChangeValue.target.value;
        const abc = inputdata.join('..')

     setVal(abc)
    }
    const handleDelete=(i)=>{
        let deletVal= val.split('..')
        deletVal.splice(i, 1)
        let bcd = deletVal.join('..')
        setVal(bcd)
    }
    console.log(val,"data-")
 return(
     <>
     <button onClick={()=>handleAdd()}>Add</button>
         {val.split('..').map((data,i)=>{
             return(
                <div>
                     <input value={data} onChange={e=>handleChange(e,i)} />
                     <button onClick={()=>handleDelete(i)}>x</button>
                </div>
             )
         })}
     </>
 );
}
export default AddDynamicInput;
