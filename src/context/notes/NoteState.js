
import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const s1 = {
        "name":"Sourabh",
        "class":"5b"
    }
    const [state,setState] = useState(s1)

 const  update = ()=>{
        setTimeout(() => {
            setState({
                "name":"Soury",
                "class":"6b"
            })
        }, 2000);
    }
    return(
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;