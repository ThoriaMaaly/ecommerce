import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { cartcontext } from '../../context/cartcontext'
function Productdetails() {

    const { addToCart,loading } = useContext(cartcontext)
    let { id } = useParams();

    let [productDetails, setproductDetails] = useState(null)
    let [addedToWishList, setaddedToWishList] = useState(false)
    async function getProductDetails() {
        let data = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).catch((err)=>{console.log(err)});
        setproductDetails(data.data.data)
        console.log(data.data.data)
    }
    async function addToWish() {
        let data = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            productId: id
        }, {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }).catch((err) => { console.log(err) })
        console.log(data)
        setaddedToWishList(true)
    }
    async function removeFromWish() {
        let data = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }).catch((err)=>{console.log(err)});
        console.log(data)
        setaddedToWishList(false)
    }

    useEffect(() => {

        if (localStorage.getItem('wishList')) {

            let wishListProducts = JSON.parse(localStorage.getItem('wishList'));
            let x = wishListProducts.filter((prod) => {
                return prod._id == id
            })
            if (x.length == 0) {
                console.log(x)
                console.log('111')
                getProductDetails();
                setaddedToWishList(false);
            } else {
                console.log(x)
                console.log('222')

                setproductDetails(x[0]);
                setaddedToWishList(true)
            }
        } else {

            console.log('thoria')
            getProductDetails()
            // setaddedToWishList(true)
        }
    }, [])
    return (<>
        {productDetails ? <div className="container">

            <div className="row">
                <figure className="col-md-4 col-sm-6 rounded-3 ">

                    <div id="carouselExampleControls" className="carousel  slide h-100 " data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={productDetails.imageCover} className="d-block w-100" alt="..." />
                            </div>

                            {productDetails.images?.map((img, idx) => {
                                return <div key={idx} className="carousel-item">
                                    <img src={img} className="d-block w-100" alt="..." />
                                </div>
                            })}

                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button id='sliderBTN' className="carousel-control-next " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon " aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>


                    {/* <img src={productDetails.imageCover} alt="" className="w-100" /> */}
                </figure>
                <div className="col-md-8 col-sm-6 align-content-center">

                    <h2 className='maincolor fs-5'>{productDetails.category.name}<i className={addedToWishList ? "fa-solid  fa-heart text-danger ms-3 fa-xl" : "fa-regular  fa-heart text-danger ms-3 fa-xl"} onClick={(e) => {
                        e.target.classList.toggle("fa-solid");
                        { addedToWishList ? removeFromWish() : addToWish() }

                    }}></i> </h2>

                    <h2 className='fs-5'> <img src={productDetails.brand.image} alt={productDetails.brand.name} className='w-25' /></h2>

                    <h2 className='fs-5'>{productDetails.title.split(' ').slice(0, 2).join()}</h2>
                    <div className="w-100 d-flex justify-content-between">
                        <span>{productDetails.price + ' EGY'} </span>
                        <span>{productDetails.ratingsAverage}<FontAwesomeIcon icon={faStar} className='text-warning' />

                        </span>
                    </div>
                    <button className='bg-main border-0 rounded-2 text-white w-100' onClick={() => {

                        addToCart(id)
                    }}>{loading?<i class="fa-solid fa-spinner spin"></i>  :'+ADD TO CART'}</button>
                </div>
            </div>



        </div> : ''}

    </>

    )
}

export default Productdetails
