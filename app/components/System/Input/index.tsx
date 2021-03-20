import React, { InputHTMLAttributes } from 'react'

const Input = React.forwardRef<HTMLInputElement,InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return <input ref={ref} {...props} />
})

export default Input
