import React, { createContext, useState } from 'react'
export let usercontext = createContext();


function Usercontext(props) {
    let [userToken, setUserToken] = useState(null);
    let [userInformation, setUserInformation] = useState(null);
    return (
        <>
            <usercontext.Provider value={{ userToken, setUserToken,setUserInformation,userInformation }}>
                {props.children}

            </usercontext.Provider>
        </>
    )
}

export default Usercontext
