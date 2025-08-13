import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { cartcontext } from '../../context/cartcontext'
import { Link } from 'react-router-dom'
export default function Products({ filtering }) {

    const { addToCart } = React.useContext(cartcontext)

    const [allproducts, setallProducts] = React.useState(null)
    const [allbrands, setallbrands] = React.useState(null)
    const [allcategories, setallcategories] = React.useState(null)
    const getProducts = async () => {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')

        setallProducts(data.data);

    }
    const getbrands = async () => {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        setallbrands(data.data);

    }
    const getcategories = async () => {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setallcategories(data.data);

    }
    async function fiterProducts(query, value) {

        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?${query}=${value}`)
        setallProducts(data.data);
    }

    React.useEffect(() => {

        getProducts();
        getbrands();
        getcategories();

    }, [])

    return (


        <>

            <div className="container mt-2">

                <div className="dropdown col-6">
                    <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-filter fa-2xl"> filter</i>
                    </button>
                    <ul className="dropdown-menu fa-ul" aria-labelledby="dropdownMenuButton1">

                        <li data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1" ><i className="fa-solid fa-check-square "></i>price</li>
                        <li data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2" ><i className="fa-solid fa-check-square"></i>brand</li>
                        <li data-bs-toggle="collapse" data-bs-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample3" ><i className="fa-solid fa-check-square"></i>categeory</li>
                        <li onClick={() => {
                            fiterProducts('keyword','new')
                        }}><i className="fa-solid fa-check-square"></i>new</li>

                    </ul>



                    <div className="collapse" id="collapseExample1">
                        <div className="card card-body">
                            <div className="d-flex flex-wrap ">
                                <span className='w-100'> price less than or equal :</span>
                                <input className='w-50' type="radio" id="500" name="price" value="500" onClick={(e) => {
                                    fiterProducts('price[lte]', e.target.value)
                                }} />
                                <label className='w-50' htmlFor="500">500</label>
                                <input className='w-50' type="radio" id="1000" name="price" value="1000" onClick={(e) => {
                                    fiterProducts('price[lte]', e.target.value)
                                }} />
                                <label className='w-50' htmlFor="1000">1000</label>
                                <input className='w-50 ' type="radio" id="2000" name="price" value="2000" onClick={(e) => {
                                    fiterProducts('price[lte]', e.target.value)
                                }} />
                                <label className='w-50 ' htmlFor="2000">2000</label>
                                <input className='w-50' type="radio" id="3000" name="price" value="3000" onClick={(e) => {
                                    fiterProducts('price[lte]', e.target.value)
                                }} />
                                <label className='w-50' htmlFor="3000">3000</label>
                                <input className='w-50' type="radio" id="4000" name="price" value="4000" onClick={(e) => {
                                    fiterProducts('price[lte]', e.target.value)
                                }} />
                                <label className='w-50' htmlFor="4000">4000</label>
                                <input className='w-50' type="radio" id="5000" name="price" value="5000" onClick={(e) => {
                                    fiterProducts('price[lte]', e.target.value)
                                }} />
                                <label className='w-50' htmlFor="5000">5000</label>
                            </div>



                        </div>
                    </div>
                    <div class="collapse" id="collapseExample2">
                        <div class="card card-body">
                            <div className="container">
                                <div className="row">
                                    {allbrands ? allbrands.map((brand) => {
                                        return <img key={brand._id} src={brand.image} alt={brand.name} className='col-md-3 col-lg-2 col-xl-2 col-sm-6 col-5' onClick={() => {
                                            fiterProducts('brand', brand._id)
                                        }} />
                                    }) : ""}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="collapse" id="collapseExample3">
                        <div class="card card-body">
                            <div className="container">
                                <div className="row">
                                    {allcategories ? allcategories.map((category) => {
                                        return <h5 key={category._id} className='col-md-5 col-lg-4 col-xl-3 col-sm-12 col-12 fs-6 ' onClick={() => {
                                            fiterProducts('category', category._id)
                                        }} >{category.name}</h5>
                                    }) : ""}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



                <div className="row ">
                    {allproducts ? allproducts.map((prod) => {
                        return <div key={prod._id} className='col-md-4 col-lg-2 col-sm-6 mt-1 '>


                            <Link to={`/productdetails/${prod._id}`} className='text-decoration-none text-dark'   >

                                <figure className=''>
                                    <img className='w-100' src={prod.imageCover} alt={prod.title} />
                                    <h2 className='maincolor fs-5'>{prod.category.name}</h2>

                                    <h2 className='fs-5'> <img src={prod.brand.image} alt={prod.brand.name} className='w-25' /></h2>

                                    <h2 className='fs-5'>{prod.title.split(' ').slice(0, 2).join()}</h2>
                                    <div className="w-100 d-flex justify-content-between">
                                        <span>{prod.price + ' EGY'} </span>
                                        <span>{prod.ratingsAverage}     <FontAwesomeIcon icon={faStar} className='text-warning' />

                                        </span>
                                    </div>

                                </figure>
                            </Link>
                            <button className='bg-main border-0 rounded-2 text-white' onClick={() => {
                                addToCart(prod._id)
                            }}>+ADD TO CART</button>
                        </div>

                    }) : ''}</div>

            </div>





        </>
    )
}

