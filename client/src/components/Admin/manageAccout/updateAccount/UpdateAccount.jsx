import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUsersMutation } from '../../../../redux/feature/auth/authApi';
import validationSchema, { updateUserValidationSchema } from '../../../../utils/validationSchema';
import Title from '../../../title/Title';
import InputField from '../../../inputField/InputField';
import Button from '../../../button/Button';
import '../createAccount/createAccount.css';
import { FaInfoCircle } from 'react-icons/fa';
import useSwal from '../../../../hooks/useSWal';

const UpdateAccount = () => {
    const { id } = useParams();
    const { showErrorAlert, showSuccessAlert } = useSwal();
    const { data: user, error: loadError, isError, isLoading, refetch } = useGetUserByIdQuery({ id });
    const [updateUsers, { error: updateError, isError: updateIs }] = useUpdateUsersMutation()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ resolver: yupResolver(updateUserValidationSchema) });
    const isSubmitable = !Object.values(errors).some(Boolean);
    useEffect(() => {
        if (user) {
            setValue('userName', user?.userName || "");
            setValue('email', user?.email || "");
            setValue('password', user?.password || "");
            setValue('status', user?.status || "");
            setValue('id', user?._id || "");
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        console.log(data.status)
        const updatedData = {
            userName: data.userName,
            email: data.email,
            status:data.status,
            password: data.password,
            id: id,
        }
        console.log(updatedData)
        try {
            await updateUsers(updatedData)
            if (updateIs) {
                return showErrorAlert(updateError?.message)
            }

            showSuccessAlert()

            refetch()
        } catch (error) {
            showErrorAlert("Update Failed! TrayAgain.")
        }
    };

    if (isLoading) return <p className='text-red-500 text-center'>Loading...</p>;
    if (isError) return <p className='text-red-500 text-center'>{loadError?.message}</p>;

    return (
        <div className='main-create-account'>
            <div className="create-account-container">
                <form className='create-account-from' onSubmit={handleSubmit(onSubmit)}>
                    <Title title='Update Account Here.' />
                    <InputField
                        name='userName'
                        type='text'
                        required={true}
                        placeholder='Enter Your Username'
                        register={register}
                    />
                    {errors.userName && <p className="error-message text-red-500 text-xs"><FaInfoCircle /> {errors?.userName?.message}</p>}

                    <InputField
                        name='email'
                        type='email'
                        required={true}
                        placeholder='Enter Your email'
                        register={register}
                    />
                    {errors.email && <p className="error-message text-red-500 text-xs"><FaInfoCircle /> {errors.email.message}</p>}

                    <InputField
                        name='password'
                        type='password'
                        required={true}
                        placeholder='Enter Your Password'
                        register={register}
                    />
                    {errors.password && <p className="error-message text-red-500 text-xs"><FaInfoCircle /> {errors.password.message}</p>}
                    <select className='w-full py-3 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-700' {...register('status')} name="status" >
                        <option className='bg-white' value="Active">Active</option>
                        <option className='bg-white' value="Blocked">Blocked</option>
                    </select>
                    <Button
                        type='submit'
                        className={`${!isSubmitable ? 'btn-primary disabled' : 'btn-primary enable'}`}
                        name='Update'
                        disabled={!isSubmitable}
                    />
                </form>
            </div>
        </div>
    );
};

export default UpdateAccount;
