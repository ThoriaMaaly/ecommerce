import React, { useContext, useEffect, useState } from 'react'
import { cartcontext } from '../../context/cartcontext'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart() {
    const { cartId, getUserCart, cartDetails, cartProducts, updateProductCount, removeCartItem, removeCart } = useContext(cartcontext);

    useEffect(() => {
        getUserCart()

    }, [])


    return (<>

        <div className="container mt-1 bg-secondary-subtle ">
            <h2 className='mt-3'>shop cart:</h2>

            {cartDetails ?
                <h4 className='maincolor'>Total Cart Price :{cartDetails.totalCartPrice} Egp</h4> : ''
            }
            <div className="row ">
                {
                    cartProducts ? cartProducts.map((product) => {
                        return <div key={product._id} className='col-sm-12 d-flex mt-2 justify-content-between  border-bottom border-secondary'>
                            <figure className='w-15  '>
                                <img className='w-100 cartimg' src={product.product.imageCover} alt={product.product.title} />
                            </figure>

                            <div className="w-50  ">
                                <h5>{product.product.title}</h5>
                                <h5 className='maincolor'>price :{product.price} EGP </h5>
                                <span> <i className="maincolor fa-solid fa-trash-can" onClick={() => {
                                    removeCartItem(product.product._id)
                                }} ></i>Remove</span>
                            </div>
                            <div className="w-25">
                                <i class="fa-solid fa-square-plus  fa-2xl maincolor" onClick={() => {
                                    updateProductCount(product.product._id, product.count + 1)
                                }}  ></i>
                                <span className='fs-4 mx-2'>{product.count}</span>
                                <i class="fa-solid fa-square-minus fa-2xl maincolor" onClick={() => {
                                    updateProductCount(product.product._id, product.count - 1)
                                }} ></i>
                            </div>

                        </div>
                    }) : ''}

                {cartDetails ? <button className='w-25 bg-danger rounded-pill text-white border-0 mt-2 m-auto ' onClick={() => {
                    removeCart()
                }} >
                    Clear Cart <i className=" fa-solid fa-trash-can"></i>
                </button> : ""}
                {cartDetails ? <div className="d-flex justify-content-around">
                    <Link className='w-25 bg-main rounded-pill text-white border-0 mt-2 m-auto text-decoration-none text-center ' to='/shippingAddress' 
                     >
                        Order now <i className=" fa-solid fa-basket-shopping"></i>
                    </Link>
                </div> : ""}
            </div>


        </div>

    </>

    )
}

export default Cart
