import React from 'react'

function Profile() {
    
   let user= JSON.parse( localStorage.getItem('userInfo')) ;
    return (<>
    <div className="w-25 m-auto">
        <img src={require("../../Assets/Images/10337609.png")} alt="profile default image" className='w-100' />
    </div>
    <h4 className='text-center'> Hello : {user.name} </h4>
    <h4 className='text-center'> email : {user.email} </h4>
    
    </>
        
    )
}

export default Profile
