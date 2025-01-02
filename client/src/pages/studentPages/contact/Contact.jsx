import React from 'react'
import './contact.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import InputField from '../../../components/inputField/InputField'
import { contactValidationSchema } from '../../../utils/validationSchema'
import { FaInfoCircle } from 'react-icons/fa'
import { usePostMessageMutation } from '../../../redux/feature/student/studentApi'
import useSwal from '../../../hooks/useSWal'
const Contact = () => {
    const { showErrorAlert, showSuccessAlert } = useSwal()
    const [postmessage, { isLoading, isError }] = usePostMessageMutation()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ resolver: yupResolver(contactValidationSchema) })

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await postmessage({
                fullName:data.fullName,
                studentId:data.studentId,
                email:data.email,
                message:data.message
            })
            console.log(response)
            if(response.error) return showErrorAlert(response?.error?.data?.message || 'Something go wrong try again.')
                showSuccessAlert(response?.data?.message)
            reset()
    
        } catch (error) {
            console.log(data)
            showErrorAlert('Something go wrong try again.')
        }

    }
    return (
        <div className='student-contact'>
            <h1>Contact Us</h1>
            <div className="student-contact-info">
                <div className="student-contact-address">
                    <h3 className='address-title'>
                        Debre Markos University Student Affairs Office
                    </h3>
                    <p className='address-pargraphs'>
                        E-mail: StudentServiceDirectorateOffice@example.com
                    </p>
                    <p className='address-pargraphs'>
                        Telephone:  + 251255530351
                    </p>
                    <p className='address-pargraphs'>
                        Fax: + 251255530312
                    </p>
                    <p className='address-pargraphs'>Call center: 0255530312
                        0255530351</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="student-contact-message">
                    <InputField
                        type="text"
                        name="fullName"
                        register={register}
                        placeholder="Enter Your Name"
                    />
                    {errors.fullName && (
                        <p className="error-message flex gap-2 justify-center items-center text-red-500 text-xs">
                            <FaInfoCircle /> <span>{errors.fullName.message}</span>
                        </p>
                    )}
                    <InputField
                        type="email"
                        name="email"
                        register={register}
                        placeholder="Enter Your Email"
                    />
                    {errors.email && (
                        <p className="error-message flex gap-2 justify-center items-center text-red-500 text-xs">
                            <FaInfoCircle /> <span>{errors.email.message}</span>
                        </p>
                    )}

                    <InputField
                        type="text"
                        register={register}
                        name="studentId"
                        placeholder="Enter Your ID"
                    />
                    {errors.studentId && (
                        <p className="error-message flex gap-2 justify-center items-center text-red-500 text-xs">
                            <FaInfoCircle /> <span>{errors.studentId.message}</span>
                        </p>
                    )}
                    <textarea name='message' {...register('message')} placeholder='Enter Your Message Here...'>

                    </textarea>
                    {errors.studentId && (
                        <p className="error-message flex gap-2 justify-center items-center text-red-500 text-xs">
                            <FaInfoCircle /> <span>{errors?.message?.message}</span>
                        </p>
                    )}
                    <button className='btn-contact'> submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact
