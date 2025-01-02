import React from 'react'
import Title from '../title/Title'
import logo from '../../assets/logo.jfif'
const ResetHeader = () => {
  return (
<header className='flex items-center justify-between bg-gray-200 max-h-24 shadow-lg'>
    <img className='w-16 h-16 ml-3 rounded-full' src={logo} alt="" />
    <Title title = 'DEBRE MARKOS UNVIERSITY DORMITORY SYSTEM' />
    <img className='w-16 h-16 mr-3 rounded-full' src={logo} alt="" />
</header>
  )
}

export default ResetHeader
