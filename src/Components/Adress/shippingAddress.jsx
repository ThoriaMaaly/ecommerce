import React, { useContext, useState } from 'react'
import { Formik } from 'formik';
import { usercontext } from '../../context/usercontext'
import { useFormik } from "formik"
import axios from 'axios'
import * as Yup from "yup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { cartcontext } from '../../context/cartcontext';
function ShippingAddress() {

    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;


    const [isloading, setisloading] = useState(false)
    const [receipt, setreceipt] = useState(null)

    let { cartId } = useContext(cartcontext)
    const payCash = async (values) => {

        setisloading(true)
        const result = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, { shippingAddress: values }, {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }).catch((err) => {
            console.log(err)
        })
        console.log(result);
        // setreceipt(result.data.data)
        setisloading(false);
        window.location.href = result.data.session.url

    };
    const validationSchema = Yup.object({
        details: Yup.string().min(10, 'datails must be more than 20 char').max(30, 'details must be short than 20 char').required('detais is required..'),

        city: Yup.string().min(2, 'city name must be more than 20 char').max(20, 'city name must be short than 20 char').required('city is required..'),

        phone: Yup.string().matches(phoneRegex, "write egyptian number").required('phone is required..'),

    })
    const formik = useFormik({
        initialValues: {

            details: "",
            city: "",
            phone: ""

        }, onSubmit: payCash, validationSchema


    })

    return (
        <>
            <h2 className='my-2 text-center fs-4'> Write Your Details ! :</h2>
            <form onSubmit={formik.handleSubmit} className='container' >

                <div className="row mb-1">
                    <label htmlFor="details" className="col-sm-2 col-form-label">Details:</label>
                    <div className="col-sm-11 p-0">
                        <input type="text" value={formik.values.details} name='details' onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" id="details" />
                    </div>
                    {formik.errors.details && formik.touched.details ? <div className="alert p-1 mt-1 col-sm-11 alert-danger " role="alert">
                        {formik.errors.details}
                    </div> : ""}


                </div>

                <div className="row mb-1">
                    <label htmlFor="city" className="col-sm-2 col-form-label">City :</label>
                    <div className="col-sm-11 p-0">
                        <input type="text" value={formik.values.city} name='city' onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" id="city" />
                    </div>
                    {formik.errors.city && formik.touched.city ? <div className="alert p-1 mt-1 col-sm-11 alert-danger " role="alert">
                        {formik.errors.city}

                    </div> : ""}

                </div>

                <div className="row mb-1">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Phone :</label>
                    <div className="col-sm-11 p-0">
                        <input type="tel" value={formik.values.phone} name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" id="phone" />
                    </div>
                    {formik.errors.phone && formik.touched.phone ? <div className="alert p-1 mt-1 col-sm-11 alert-danger " role="alert">
                        {formik.errors.phone}                    </div> : ""}

                </div>

                <div className="w-100 my-1  ">

                    <button type='submit' className='bg-main rounded-2 text-white border-0 ' disabled={!(formik.dirty && formik.isValid)} >
                        {isloading ? <i class="fa-solid fa-spinner spin"></i> : 'Pay Cash'} </button>

                </div>
            </form>

            {/* {receipt ? <div className={receipt ? ` receipt  p-4 bg-main text-white rounded-3 w-75 m-auto  ` : 'd-none'}>
                <h3 className='text-center'>  Cash Receipt </h3> 
                <h5 className=' '> Date : {receipt.createdAt}</h5>
             
                    <h5> Total Order Price : {receipt.totalOrderPrice}</h5>
                    <h5> Payment Method Type : {receipt.paymentMethodType}</h5>

                
            </div> : ""} */}
        </>


    )
}

export default ShippingAddress
