import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { cartcontext } from '../../context/cartcontext';

function Wishlist() {
    let { addToCart } = useContext(cartcontext)
    let [wishListProducts, setWishListProducts] = useState(null);
    async function getWishList() {
        let data = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }).catch((err) => {
            console.log(err)
        })
        setWishListProducts(data.data.data)
        console.log(data.data.data)
        localStorage.setItem('wishList', JSON.stringify(data.data.data))
    }

    useEffect(() => {
        getWishList()

    }, [])

    return (<>

        <div className="container  mt">
            <div className="row ">

                {wishListProducts ? wishListProducts.map((prod) => {

                    return <div key={prod._id} className='col-md-4 col-lg-2 col-sm-6 mt-1'>

                        <figure className='w-100'>
                            <img className='w-100' src={prod.imageCover} alt={prod.title} />
                            <h2 className='maincolor fs-5'>{prod.category.name}</h2>

                            <h2 className='fs-5'> <img src={prod.brand.image} alt={prod.brand.name} className='w-25' /></h2>

                            <h2 className='fs-5'>{prod.title.split(' ').slice(0, 2).join()}</h2>
                            <div className="w-100 d-flex justify-content-between">
                                <span>{prod.price + ' EGY'} </span>
                                <span>{prod.ratingsAverage}    <i class="fa-solid fa-star text-warning"></i>

                                </span>
                            </div>

                        </figure>

                        <button className='bg-main border-0 rounded-2 text-white' onClick={() => {
                            addToCart(prod._id)
                        }}>+ADD TO CART</button>
                    </div>


                }) : ''}
            </div>
        </div>

    </>

    )
}

export default Wishlist
