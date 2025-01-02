import React from 'react'

const Button = ({ name, ...values }) => {
    return <button {...values}>
        {name}
    </button>
}

export default Button
