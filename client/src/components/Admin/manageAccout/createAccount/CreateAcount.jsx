import React from 'react';
import Title from '../../../title/Title';
import InputField from '../../../inputField/InputField';
import Button from '../../../button/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './createAccount.css';
import validationSchema from '../../../../utils/validationSchema';
import { FaInfoCircle } from 'react-icons/fa';
import { useRegisterUserMutation } from '../../../../redux/feature/auth/authApi';
import useSwal from '../../../../hooks/useSWal';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const navigate = useNavigate();
    const { showSuccessAlert, showErrorAlert } = useSwal();
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('userName', data.userName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('role', data.role);
        formData.append('file', data.file[0]); // Access the uploaded file

        try {
            const response = await registerUser(formData);
            const { data: responseData, error } = response;

            if (!responseData && error) {
                return showErrorAlert(error?.data?.message || 'Operation failed. Please try again.');
            }

            showSuccessAlert('Account created successfully!');
            navigate('/admin-dashboard/manage-accounts');
        } catch (error) {
            console.error(error);
            showErrorAlert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="main-create-account">
            <div className="create-account-container">
                <form className="create-account-form" onSubmit={handleSubmit(onSubmit)}>
                    <Title title="Create Account Here." />

                    <InputField
                        name="userName"
                        type="text"
                        required={true}
                        placeholder="Enter Your Username"
                        register={register}
                    />
                    {errors.userName && (
                        <p className="error-message text-red-500 text-xs">
                            <FaInfoCircle /> {errors.userName.message}
                        </p>
                    )}

                    <InputField
                        name="email"
                        type="email"
                        required={true}
                        placeholder="Enter Your Email"
                        register={register}
                    />
                    {errors.email && (
                        <p className="error-message text-red-500 text-xs">
                            <FaInfoCircle /> {errors.email.message}
                        </p>
                    )}

                    <InputField
                        name="password"
                        type="password"
                        required={true}
                        placeholder="Enter Your Password"
                        register={register}
                    />
                    {errors.password && (
                        <p className="error-message text-red-500 text-xs">
                            <FaInfoCircle /> {errors.password.message}
                        </p>
                    )}

                    <div className="input-field">
                        <label htmlFor="file">Profile Picture</label>
                        <input
                            type="file"
                            id="file"
                            {...register('file', { required: true })}
                        />
                        {errors.file && (
                            <p className="error-message text-red-500 text-xs">
                                <FaInfoCircle /> Please upload a valid file.
                            </p>
                        )}
                    </div>

                    <select className="input-field" {...register('role')} name="role">
                        <option value="ADMIN">ADMIN</option>
                        <option value="DIRECTOR">DIRECTOR</option>
                        <option value="PROCTOR">PROCTOR</option>
                    </select>
                    {errors.role && (
                        <p className="error-message text-red-500 text-xs">
                            <FaInfoCircle /> {errors.role.message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className={`btn-primary ${isLoading ? 'disabled' : 'enabled'}`}
                        name="Add"
                        disabled={isLoading}
                    />
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;