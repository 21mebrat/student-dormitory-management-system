import React, { useState } from 'react'
import './searchDorm.css'
import A from '../../../assets/buildingB.jfif'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from '../../../components/inputField/InputField'
import { idValidationSchema } from '../../../utils/validationSchema';
import { FaInfoCircle, FaTimes } from 'react-icons/fa'
import useSwal from '../../../hooks/useSWal';
import { useGetDormitoryMutation } from '../../../redux/feature/student/studentApi';
const SearchDorm = () => {
  const { showErrorAlert } = useSwal()
  const [getDormitory, { data: student, isLoading, error, isError }] = useGetDormitoryMutation()
  const [isOpened, setIsOpened] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ resolver: yupResolver(idValidationSchema) })
  const isSubmitable = !Object.values(errors).some(Boolean)
  const onSubmit = async (data) => {
    try {
      const response = await getDormitory(data.studentId)
      if (response?.error) return showErrorAlert(response?.error?.data?.message || 'something go wrong tray again.')
      setIsOpened(true)
    } catch (error) {
      console.log(error)
      showErrorAlert('something go wrong tray again.')
    }
  }
  if (isLoading) return <p>loading...</p>
  if (isError) return <p>some Error Occured</p>
  return (
    <div className='student-dorm-search'>
      <div className="student-dorm-search-left">
        {isOpened ? (
          <div className='student-dorm-detail'>
            <div className="title">
            <h2>here is your dorm information.</h2>
              <FaTimes onClick={()=>setIsOpened(false)} size={20} className='cursor-pointer' />
            </div>
            <p className='text-blue-700'>Building:{student?.room?.split(',')[0]}</p>
            <p className='text-blue-700'>Floor:{student?.room?.split(',')[1]}</p>
            <p className='text-blue-700'>Room:{student?.room?.split(',')[2]}</p>
          </div>
        )
          :
          <img src={A} alt="" />
        }
      </div>
      <div className="student-dorm-search-right">
        <h1>Search Your Dorm here By Entering Your Id Number</h1>
        <div className='w-full max-w-full md:max-w-1/2md:w-1/2'>
          <InputField
            type='text'
            name='studentId'
            register={register}
            placeholder='Enter Your Id'

          />
          {
            errors.studentId &&
            <p className='text-red-600'>
              <span> <FaInfoCircle /></span>
              {errors?.studentId?.message}
            </p>
          }
          <button
            onClick={handleSubmit(onSubmit)}
            className='btn-primary'
          >
            {isLoading ? "submiting..." : "Submit"}
          </button>
        </div>

      </div>

    </div>
  )
}

export default SearchDorm
