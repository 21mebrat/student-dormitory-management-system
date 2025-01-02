import React, { useState } from 'react';
import Title from '../../components/title/Title';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import './login.css';
import logo from '../../assets/logo.jfif';
import { loginValidationSchema } from '../../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../../redux/feature/auth/authApi';
import useSwal from '../../hooks/useSWal';
import { useAuth } from '../../context/ContextProvider';
import { useDispatch } from 'react-redux';
import { setCredential } from '../../redux/feature/auth/authSlice';
import { FadeLoader } from 'react-spinners'
const Login = () => {
    const [loginUser, { isLoading }] = useLoginUserMutation()
    const [massage, setMessage] = useState('')
    const { showSuccessAlert } = useSwal()
    const dispatch = useDispatch()
    const { setAuth } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({ resolver: yupResolver(loginValidationSchema) })
    const isSubmitable = ![errors.userName, errors.password].some(Boolean);
    const onSubmit = async (data) => {
        setMessage('')
        try {
            const response = await loginUser(data)
            console.log(response)
            setAuth({ userName: response.data.userName, role: response.data.role })
            dispatch(setCredential(
                {
                    userName: response.data.userName,
                    role: response.data.role,
                    accessToken: response.data.accessToken,
                    file: response.data.file
                }
            ))
            showSuccessAlert()
            switch (response.data.role) {
                case 'ADMIN':
                    navigate(from || '/admin-dashboard')
                    break;
                case 'DIRECTOR':
                    navigate(from ||'/director-dashboard')
                    break;
                default:
                    navigate('/')
            }
        } catch (error) {
            console.log(error)
            setMessage('Got some error Tray again')
        }
    }
    return (
        <div className='login'>
            <div className="login-container">
                <div className="login-logo-container">
                    <img className='login-logo' src={logo} alt="" />
                    <Title title='STUDNET DORMITORY MANAGEMENT SYSTEM' />
                </div>
                <div className="login-form-container">
                    <form method='POST' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <h1>Welcome Back! Please Login</h1>
                        <InputField
                            name='userName'
                            type='text'
                            required={true}
                            placeholder='Enter Your Username'
                            register={register}
                        />
                        {errors.userName && <p className="error-message text-red-500 text-xs"> <span ><FaInfoCircle /></span>{errors?.userName?.message}</p>}
                        <InputField
                            name='password'
                            type='password'
                            required={true}
                            placeholder='Enter Your Password'
                            register={register}
                        />
                        {errors.password && <p className="error-message text-red-500 text-xs"> <FaInfoCircle />{errors.password.message}</p>}
                        {massage && <p className="error-message text-red-500 text-xl flex items-center justify-center gap-2" > <FaInfoCircle /><span>{massage}</span></p>}


                        <div className="forgot-password-container">
                            <div className="rember">
                                <input type="checkbox" name="" id="remember" />
                                <label htmlFor="remember"> Remember me</label>
                            </div>
                            <Link to='/forgot-password' className='forgot-password hover:underline hover:text-blue-600'>
                                <p>Forgot your password?</p>
                            </Link>
                        </div>
                        <Button
                            type='submit'
                            className={`${!isSubmitable ? 'btn-primary disabled ' : 'btn-primary enable'}`}
                            name={isLoading ? 'login...' : 'login'}
                            disabled={!isSubmitable}
                        />


                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
