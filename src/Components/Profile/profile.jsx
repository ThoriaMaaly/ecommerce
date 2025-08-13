import React from 'react'

function Profile() {
    
   let user= JSON.parse( localStorage.getItem('userInfo')) ;
    return (<>
    <h4> Hello : {user.name} </h4>
    <h4> email : {user.email} </h4>
    
    </>
        
    )
}

export default Profile
