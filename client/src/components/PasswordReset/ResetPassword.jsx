import React, { useEffect, useState } from 'react'
import Title from '../title/Title'
import ResetHeader from '../ResetHeader/ResetHeader'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FaEye, FaEyeSlash, FaLockOpen } from 'react-icons/fa'
import { passwordValidationSchema } from '../../utils/validationSchema'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { usePostPasswordMutation } from '../../redux/feature/passwordReset/reset'
import useSwal from '../../hooks/useSWal'
import Swal from 'sweetalert2'

const ResetPassword = () => {
    const [hide, setHide] = useState(true)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token')
    const { showErrorAlert, showSuccessAlert } = useSwal()
    const [postPassword, { isLoading }] = usePostPasswordMutation()
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({ resolver: yupResolver(passwordValidationSchema) })
    useEffect(() => {
        console.log(hide, token)
    }, [hide])
    const onSubmit = async (data) => {
        try {
            const response = await postPassword({ password: data.password, token: token })
            if (response?.data?.status !== 'success') {
                return Swal.fire(`${response.error.data.message}.please make it resend.` || 'Error On reset your password')
            }
            Swal.fire(response?.data?.message || 'successfully reset your password')

            navigate('/')
        } catch (error) {
            console.log(errors)
            return showErrorAlert('Error On reset your password')

        }

    }
    return (
        <>
            <ResetHeader />
            <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
                <div className="flex flex-col gap-6 p-8 rounded-lg shadow-lg bg-white max-w-md w-full">
                    <Title title="Password Reset" />
                    <h1 className="text-gray-600 text-center text-sm leading-relaxed">
                        Please enter your new password below to reset your password.
                    </h1>
                    {errors?.password && (
                        <p className="text-red-500 text-center font-medium">{errors?.password?.message}</p>
                    )}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4">
                        <label className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
                            <input
                                className="w-full outline-none focus:outline-none"
                                type={hide ? 'password' : 'text'}
                                name="password"
                                {...register('password')}
                                placeholder="Enter Your New Password"
                            />
                            {hide ? <FaEye
                                className="cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200"
                                onClick={() => setHide(false)}
                            /> :
                                <FaEyeSlash
                                    className="cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200"
                                    onClick={() => setHide(true)}
                                />}
                        </label>
                        <button
                            type="submit"
                            className="w-full py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default ResetPassword
