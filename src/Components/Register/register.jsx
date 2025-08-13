import React, { useState } from 'react'
import { useFormik } from "formik"
import axios from 'axios'
import * as Yup from "yup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
function Register() {
const navigate=useNavigate();
const [isloading,setisloading]=useState(false)
    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

    const register = async (values) => {
        
        setisloading(true)
        const result = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
        console.log(result.data);
        setisloading(false);
       
        navigate('/login');

    };


    const validationSchema = Yup.object({
        name: Yup.string().min(2, "name must at least 3 char..").max(20, "name must at most 20 char..").required('name is required..'),
        email: Yup.string().email("write in email formate").required('email is required..'),
        phone: Yup.string().matches(phoneRegex, "write egyptian number").required('phone is required..'),
        password: Yup.string().min(2, "password must at least  char and must be strong..").max(20, "password must at most 20 char and must be strong..").required('passord is required..'),
        rePassword: Yup.string().oneOf([Yup.ref('password')],'repassword must be the same password').required('repassword is required..'),

    })
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            rePassword: ""
        }, onSubmit:register, validationSchema


    })
    return (
        <>

        <h2 className='my-2 text-center fs-4'>Register Now :</h2>
            <form onSubmit={formik.handleSubmit } className='container' >
                <div className="row mb-1">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name :</label>
                    <div className="col-sm-11 p-0">
                        <input type="text" value={formik.values.name}  name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control p-1 " id="name" />
                    </div>
                    {formik.errors.name && formik.touched.name ?<div className="alert p-1 mt-1 col-sm-11 alert-danger " role="alert">
                        {formik.errors.name}                    
                    </div>:''}
                    
                </div>
                <div className="row mb-1">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email :</label>
                    <div className="col-sm-11 p-0">
                        <input type="email" value={formik.values.email}   name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" id="inputEmail3" />
                    </div>
                    {formik.errors.email && formik.touched.email ?    <div className="alert p-1 mt-1 col-sm-11 alert-danger " role="alert">
                        {formik.errors.email}                    
                    </div> : ""}
                 
                 
                </div>
                <div className="row mb-1">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Phone :</label>
                    <div className="col-sm-11 p-0">
                        <input type="tel" value={formik.values.phone} name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" id="phone" />
                    </div>
                    {formik.errors.phone && formik.touched.phone ?  <div className="alert p-1 mt-1 col-sm-11 alert-danger " role="alert">
{formik.errors.phone}                    </div> :""}
                   
                </div>
                <div className="row mb-1">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password :</label>
                    <div className="col-sm-11 p-0">
                        <input type="password" value={formik.values.password} name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" id="inputPassword3" />
                    </div>
                    {formik.errors.password && formik.values.password ? <div className="alert p-1 mt-1 col-sm-11 alert-danger " role="alert">
                        {formik.errors.password}                    

                    </div>:""}
                    
                </div>
                <div className="row mb-1">
                    <label htmlFor="repassword" className="col-sm-2 col-form-label">Repassword :</label>
                    <div className="col-sm-11 p-0">
                        <input type="password" value={formik.values.rePassword} name='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" id="repassword" />
                    </div>
                    {formik.errors.rePassword && formik.touched.rePassword ?<div className="alert p-1 mt-1 col-sm-11 alert-danger " role="alert">
                        {formik.errors.rePassword}                    
                    </div>:''}
                    
                </div>
                <div className="w-100 mb-1 ">
                    
                    <button type='submit' onClick={function(){
                        console.log('subb')
                    }}  className='bg-main rounded-2 text-white border-0 ' disabled={!(formik.dirty&&formik.isValid)} >  
                    {isloading? <FontAwesomeIcon spin icon={faSpinner}  className='text-warning' />:'Register'} </button>

                </div>
            </form>

        </>
    )
}

export default Register
