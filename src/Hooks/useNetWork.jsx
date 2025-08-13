import React, { useState, useEffect } from 'react'

function UseNetWork() {
    let [isOnline, setIsOnline] = useState(true);

    function detectNetwork() {
        window.addEventListener('online', () => {
            setIsOnline(true)
        })
        window.addEventListener('offline', () => {
            setIsOnline(false)
        })

    }

    useEffect(() => {
        detectNetwork()

    }, []) 
    return (<>
        {isOnline ? '' : <div className=' fixed-bottom  start-0 end-0 net bg-black p-3 text-center z-3'>
        
                <h2 className='text-white text-center'> You Are Offline Check The Network...</h2>
                <i className="fa-solid fa-wifi fa-xl m-auto text-white"></i>
            

        </div>}

    </>

    )
}

export default UseNetWork
