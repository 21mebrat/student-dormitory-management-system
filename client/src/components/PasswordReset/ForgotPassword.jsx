import React, { useState } from 'react'
import ResetHeader from '../ResetHeader/ResetHeader'
import Title from '../title/Title'
import { usePostEmailMutation } from '../../redux/feature/passwordReset/reset'
import { useNavigate } from 'react-router-dom'
import useSwal from '../../hooks/useSWal'
import Swal from 'sweetalert2'

const PasswordReset = () => {
  const {showErrorAlert,showSuccessAlert} = useSwal()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [postEmail, { isLoading, isError }] = usePostEmailMutation()
  const handleClick = async () => {
    if (!email) {
      return setError('Email is Reguired')
    }
    if (!email.includes('@')) {
      return setError('Email must be Valids')
    }
    setError('')
    try {
      const response = await postEmail(email)
      const {data,error} = response 
      console.log(response,'on forgortisi')
      if(data?.status !== 'success'){
        return showErrorAlert(error.data.message || 'something go wrong try again')
      }
      Swal.fire('we sent link on your email please visit your email')
    } catch (error) {
      console.log(error)
      setError('something go wrong try again')
    }
  }
  return (
    <>
    <ResetHeader />
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col gap-6 p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
        <Title title="Password Reset" />
        <h1 className="text-gray-600 text-center text-sm leading-relaxed">
          Please enter your email address below, and we will send you a link to reset your password.
        </h1>
        {error && (
          <p className="text-red-500 text-center font-medium">Error: {error}</p>
        )}
        <div className="flex flex-col gap-4">
          <input 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter Your Email" 
            type="email" 
            name="email" 
          />
          <button 
            onClick={handleClick} 
            className="w-full py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200">
            Submit
          </button>
        </div>
      </div>
    </div>
  </>
  
  )
}

export default PasswordReset
