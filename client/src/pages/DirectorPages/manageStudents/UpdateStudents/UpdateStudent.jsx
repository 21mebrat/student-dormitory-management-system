import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateStudentSchema } from "../../../../utils/validationSchema";
import InputField from "../../../../components/inputField/InputField";
import { useGetStudentByIdQuery, useUpdateStudentMutation } from "../../../../redux/feature/Director/directorApp";
import useSwal from "../../../../hooks/useSWal";
import Title from "../../../../components/title/Title";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { showSuccessAlert, showErrorAlert } = useSwal();
    const [updateStudent,{isLoading}] = useUpdateStudentMutation();
    const { data: student,isError,error } = useGetStudentByIdQuery(id)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: student,
        resolver: yupResolver(UpdateStudentSchema),
    });
console.log(student)
    useEffect(() => {
        if (student) {
            setValue('firstName', student.firstName);
            setValue('lastName', student.lastName);
            setValue('email', student.email);
            setValue('phoneNumber', student.phoneNumber);
            setValue('address', student.address);
            setValue('course', student.course);
            setValue('gender', student.gender);
            setValue('dateOfBirth', student.dateOfBirth);
            setValue('enrollmentDate', student.enrollmentDate);
            setValue('status', student.status);
            setValue('room', student.room);
            setValue('building',student?.building)
        }
    }, [student, setValue]);
    const onSubmit = async (data) => {
        setValue('id', id)
        try {
            const response = await updateStudent(data).unwrap();
            showSuccessAlert(response.message || "Student updated successfully!");
            navigate('/director-dashboard')
        } catch (error) {
            showErrorAlert(error.data?.message || "Failed to update student");
        }
    };

    return (
        <div className="update-student-container max-w-[50%] mx-auto">
            <Title title='Update Student' />
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
                    {isLoading ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
    );
};

export default UpdateStudent;
