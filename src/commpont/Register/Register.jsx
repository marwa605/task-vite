import React, { useContext, useState } from 'react'

import { useFormik } from 'formik'
import * as Yub from 'yup'
import axios from 'axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Register() {
  const [apierror, setapierror] = useState(null)
  const [loding, setloding] = useState(false)
  let {userdata,setuserdata}=useContext(UserContext)
  let navigate=useNavigate()

async function register(values) {   
     try{
      setloding(true)
      let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
      localStorage.setItem("usertoken", data.token)
      navigate('/')
      setuserdata(data.token)
      setloding(flase)
     }
     catch(err)
     {
     setloding(false)
      setapierror(err.response.data.message)

     }
  
}

let vaildation=Yub.object().shape({
  name:Yub.string().min(3,"min length is 3").max(10,"max length is 10").required("name is required"),
  email:Yub.string().email("invalid email").required("email is required"),
  password:Yub.string().matches(/^[A-z]\w{5,10}$/,'password invalid ex(sohaila123)').required("password is required"),
  rePassword:Yub.string().oneOf([Yub.ref('password')],'password and repassword not match').required('repassword is requird'),
  phone:Yub.string().matches(/^01[0-9]{9}$/,'phone must be egyptian number').required('phone is requird')

})

  let formik=useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema:vaildation,
    onSubmit:register
  })
  return (
    <>
    <div className=' py-10 flex items-center justify-center'>
        <div className='bg-white rounded-md p-4  md:w-1/2 shadow-2xl'>
            <h1 className='text-[#4FA74F] pb-4 text-center font-bold text-3xl '>Register Now</h1>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        {apierror&&<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{apierror}</span>
        </div>}
        <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
        </div>
        {formik.errors.name&&formik.touched.name&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{formik.errors.name}</span>
        </div>}


        <div className="relative z-0 w-full mb-5 group">
        <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
        </div>
        {formik.errors.email&&formik.touched.email&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{formik.errors.email}</span>
        </div>}



        <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        {formik.errors.password&&formik.touched.password&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{formik.errors.password}</span>
        </div>}




        <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RePassword</label>
        </div>
        {formik.errors.rePassword&&formik.touched.rePassword&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{formik.errors.rePassword}</span>
        </div>}


        <div className="relative z-0 w-full mb-5 group">
        <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Phone</label>
        </div>
        {formik.errors.phone&&formik.touched.phone&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{formik.errors.phone}</span>
        </div>}



        <div className="flex justify-center ">
         {loding?  <button type="button" className="text-white bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
         <i className='fas fa-spinner fa-spin-pulse'></i>
       </button>: <button type="submit" className="w-full md:px-20 text-white bg-[#4FA74F] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        }
       
        </div>
       </form>
       <h1 className=' mt-1 text-center font-semibold '>Already have an account? <NavLink to={'../login'} className='text-blue-900 underline'>Sign in</NavLink></h1>

        </div>
    </div>
    </>
  )
}
