import React from 'react'
import { useForm } from 'react-hook-form';
import Title from '../../../../components/title/Title';
import InputField from '../../../../components/inputField/InputField';

const RegisterStudents = () => {
    const isLoading = false
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
    }
    return (
        <div className="update-student-container max-w-[50%] mx-auto">
            <Title title='Register Student' />
            <form onSubmit={handleSubmit(onSubmit)} className="update-student-form space-y-4">
                <InputField
                    label="First Name"
                    name="firstName"
                    register={register}
                    error={errors.firstName?.message}
                    placeholder='Enter Firest Name'
                />
                {errors.firstName &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.firstName?.message}</span></p>
                }
                <InputField
                    label="Last Name"
                    name="lastName"
                    placeholder='Enter Lasy Name'

                    register={register}
                    error={errors.lastName?.message}
                />
                {errors.lastName &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.lastName?.message}</span></p>
                }
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder='Enter Email'

                    register={register}
                    error={errors.email?.message}
                />
                {errors.email &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.email?.message}</span></p>
                }
                <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder='Enter Phone Number'

                    register={register}
                    error={errors.phoneNumber?.message}
                />
                {errors.phoneNumber &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.phoneNumber?.message}</span></p>
                }
                <InputField
                    label="Building"
                    name="building"
                    placeholder='Enter Building'
                    register={register}
                    error={errors.building?.message}
                />
                {errors.building &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.building?.message}</span></p>
                }
                <InputField
                    label="Room"
                    placeholder='Enter Room'

                    name="room"
                    register={register}
                    error={errors.room?.message}
                />
                {errors.room &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.room?.message}</span></p>
                }
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default RegisterStudents
