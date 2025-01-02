import React from 'react'
import DisplayMessage from '../../../components/displayMessage/DisplayMessage'
import { useGetMessageQuery } from '../../../redux/feature/student/studentApi'

const Message = () => {
    const {data:messages,isLoading,isError,error} = useGetMessageQuery()
    console.log(error)
    const messageLists = Array.isArray(messages) ? messages : []
    if(isLoading) return <p className='text-center text-red-500'>loading...</p>
    if(isError) return <p className='text-center text-red-500'>Something go Wrong Please refresh the Page</p>
  return (
    <div className='w-full flex justify-center'>
      <DisplayMessage messageLists = {messageLists} />
    </div>
  )
}

export default Message
