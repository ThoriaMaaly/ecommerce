import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/navbar'
import UseNetWork from '../../Hooks/useNetWork';


function Layout() {

  let network = UseNetWork()

    return (<>

        <Navbar />
                  {network}

        <div className="mt-5 p-2">
            <Outlet ></Outlet>
        </div>

    </>

    )
}

export default Layout
