import React, { useContext, useState } from 'react'

import { useFormik } from 'formik'
import * as Yub from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'

export default function Code() {
    const [apierr, setapierr] = useState(null)
    let navigate=useNavigate()
    const [loding, setloding] = useState(false)


    async function code(values) {   
        try{
            setloding(true)        

         let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
         console.log(data)
         navigate('/newpass')
         setloding(false)        


       
        }
        catch(err)
        {
            setloding(false)        

          console.log(err.response.data.message)
          setapierr(err.response.data.message)
   
        }
     
   }


  let formik=useFormik({
    initialValues:{
      
        resetCode:'',
      
      
    },
    onSubmit:code
  })
  return (
    <>
    <div className=' py-20 flex items-center justify-center'>
        <div className='bg-white rounded-md p-4  md:w-1/2 shadow-2xl'>
            <h1 className='text-[#4FA74F] pb-4 text-center font-bold text-3xl '>your password resetCode</h1>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        {apierr&&<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{apierr}</span>
        </div>}
        <div className="relative z-0 w-full mb-5 group">
        <input type="" name="resetCode" id="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">resetCode</label>
        </div>
    
        <div className="flex justify-center ">
        {loding?  <button type="button" className="text-white bg-slate-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
         <i className='fas fa-spinner fa-spin-pulse'></i>
       </button>: <button type="submit" className="w-full md:px-20 text-white bg-[#4FA74F] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Continuo</button>
        }     
       
        </div>
       </form>

        </div>
    </div>
    </>
  )
}


