import React, { useState, useContext } from 'react'
import { usercontext } from '../../context/usercontext'
import { useFormik } from "formik"
import axios from 'axios'
import * as Yup from "yup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate();

    const [isloading, setisloading] = useState(false)

    let { setUserToken,setUserInformation } = useContext(usercontext)
    const login = async (values) => {

        setisloading(true)
        const result = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err)=>{
            console.log(err)
        })

        setisloading(false);
        if (result.data.message === 'success') {
            navigate('/');
            localStorage.setItem('userToken', result.data.token);
            localStorage.setItem('userInfo', JSON.stringify(result.data.user) );
            setUserToken(result.data.token);
            setUserInformation( result.data.user);
        }

    };
    const validationSchema = Yup.object({

        email: Yup.string().email("write in email formate").required('email is required..'),

        password: Yup.string().min(2, "password must at least  char and must be strong..").max(20, "password must at most 20 char and must be strong..").required('passord is required..'),

    })
    const formik = useFormik({
        initialValues: {

            email: "",
            password: ""

        }, onSubmit: login, validationSchema


    })

    return (<>
        <h2 className='my-2 text-center fs-4'>Login Now :</h2>
        <form onSubmit={formik.handleSubmit} className='container' >

            <div className="row mb-1">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email :</label>
                <div className="col-sm-11 p-0">
                    <input type="email" value={formik.values.email} name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" id="inputEmail3" />
                </div>
                {formik.errors.email && formik.touched.email ? <div className="alert p-1 mt-1 col-sm-11 alert-danger " role="alert">
                    {formik.errors.email}
                </div> : ""}


            </div>

            <div className="row mb-1">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password :</label>
                <div className="col-sm-11 p-0">
                    <input type="password" value={formik.values.password} name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" id="inputPassword3" />
                </div>
                {formik.errors.password && formik.values.password ? <div className="alert p-1 mt-1 col-sm-11 alert-danger " role="alert">
                    {formik.errors.password}

                </div> : ""}

            </div>

            <div className="w-100 mb-1 ">

                <button type='submit' onClick={function () {
                }} className='bg-main rounded-2 text-white border-0 ' disabled={!(formik.dirty && formik.isValid)} >
                    {isloading ? <FontAwesomeIcon spin icon={faSpinner} className='text-warning' /> : 'Login'} </button>

            </div>
        </form>

    </>

    )
}


