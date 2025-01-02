import React from 'react'

const InputField = ({register, ...values }) => {
    const {name,label} = values
    return (
     <div>
        <label>{label}</label>
           <input
            {...values}
            className='input-field'
        {...register(`${name}`)}
        />
     </div>
    )
}

export default InputField
