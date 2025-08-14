import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Allorders() {
    let ownerId = localStorage.getItem('ownerId');
    let [lastOrder, setLastOrder] = useState(null);
    async function getUserOrders() {
        let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${ownerId}`).catch((err)=>{console.log(err)});
        let lastIdx = data.data.length;
        console.log(data.data[lastIdx - 1])
        setLastOrder(data.data[lastIdx - 1]);
    }
    useEffect(() => {

        getUserOrders();
    }, [])
    return (<>

        {lastOrder ? <div className='container'>
            <h2>Hello Dear This Is The Last Order...</h2>
            <h5>Client Name:  {lastOrder.user.name}</h5>
            <h5>Client Phone:  {lastOrder.user.phone}</h5>
            <h5>Date:  {lastOrder.createdAt}</h5>
            <h5>Payment Type : card</h5>


            <table class="table">
                <thead>
                    <tr>
                        
                        <th scope="col">Item Name</th>
                        <th scope="col">Item Count </th>
                        <th scope="col">Item Price </th>
                    </tr>
                </thead>
                <tbody>
                    {lastOrder.cartItems.map((item, idx) => {
                        return <tr>
                            <th> {item.product.title}</th>
                            <td > {item.count}</td>
                            <td> {item.price} </td>
                        </tr>
                    })}

                </tbody>
            </table>

        </div> : ''}
    </>

    )
}

export default Allorders
