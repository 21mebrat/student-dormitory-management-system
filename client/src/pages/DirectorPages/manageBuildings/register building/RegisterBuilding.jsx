import React from 'react'
import { useForm } from 'react-hook-form';
import Title from '../../../../components/title/Title';
import InputField from '../../../../components/inputField/InputField';

const RegisterBuilding = () => {
    const isLoading = false
    const {
handleSubmit,
register,
formState:{errors}
    } = useForm()
    const onSubmit = async(data)=>{
        console.log(data)
    }
    return (
        <div className="update-building-container max-w-[50%] mx-auto">
            <Title title="Update Building" />
            <form onSubmit={handleSubmit(onSubmit)} className="update-building-form space-y-4">
                <InputField
                    label="Building Number"
                    name="buildingNumber"
                    register={register}
                    error={errors.buildingNumber?.message}
                    placeholder="Enter Building Number"
                />
                {errors.buildingNumber &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.buildingNumber?.message}</span></p>
                }
                <InputField
                    label="Number of Floors"
                    name="floors"
                    type="number"
                    placeholder="Enter Number of Floors"
                    register={register}
                    error={errors.floors?.message}
                />
                {errors.floors &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.floors?.message}</span></p>
                }
                <InputField
                    label="Location"
                    name="location"
                    placeholder="Enter Building Location"
                    register={register}
                    error={errors.location?.message}
                />
                {errors.location &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.location?.message}</span></p>
                }
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter Description"
                    register={register}
                    error={errors.description?.message}
                />
                {errors.description &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.description?.message}</span></p>
                }
                <div>
                    <h3 className="text-xl font-semibold">Rooms</h3>
                   
 
                </div>
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

export default RegisterBuilding
