import React, { useState } from 'react'
import axios from 'axios'
import { createContext } from 'react'
export const cartcontext = createContext();

function Cartcontext({ children }) {
    const [cartId, setCartId] = useState(null)
    const [loading, setloading] = useState(false)
    const [cartProducts, setCartProducts] = useState(null)
    const [cartDetails, setCartDetails] = useState(null)
    const headers = {
        token: localStorage.getItem('userToken')
    }
    async function addToCart(productId) {
        setloading(true);
        let result = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {

            "productId": productId,

        }, {
            headers: headers

        }).catch((err) => {

            console.log(err)
        });
        setloading(false);
        localStorage.setItem('ownerId',result.data.data.cartOwner)
        console.log(result)
        // console.log(productId)
        setCartId(result.data.cartId)
        // setCartOwner(result.data.cartOwner)
        // setCartProducts(result.data.products)
        // console.log(cartId,cartOwner,cartProducts)    
    }
    async function getUserCart() {
        let result = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: {
                token: localStorage.getItem('userToken')

            }
        }).catch((err) => {
            console.log(err)
        });
        setCartDetails(result.data.data)

        setCartProducts(result.data.data.products)

    }
    async function updateProductCount(prodId, newCount) {
        const result = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`, {
            'count': newCount
        }, {
            headers: headers
        }).catch((err)=>{console.log(err)});
        console.log(result)
                setCartProducts(result.data.data.products)

    }
    async function removeCartItem(itemId) {
        const result = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
            headers: headers
        }).catch((err)=>{console.log(err)});
        console.log(result)
                setCartProducts(result.data.data.products)

    }
    async function removeCart() {
        const result = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: headers
        }).catch((err)=>{console.log(err)});
        // console.log(result)
        setCartDetails(null)
        setCartProducts(null)
                

    }


    return (<>
        <cartcontext.Provider value={{ addToCart, getUserCart, loading,cartDetails, cartId, cartProducts,updateProductCount,removeCartItem,removeCart }}>
            {children}


        </cartcontext.Provider>

    </>

    )
}

export default Cartcontext
