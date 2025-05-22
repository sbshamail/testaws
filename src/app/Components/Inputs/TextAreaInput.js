import React from 'react'

const TextAreaInput = ({label,value,setvalue,placeholder,bgcolor,disable}) => {
  return (
     <div className={`w-full flex flex-col gap-2`}>
      {label && <label>{label}</label>}
      <textarea
        disabled={disable ? true : false}
        value={value}
        onChange={(event) => setvalue(event.target.value)}
        placeholder={placeholder}
        className={`w-full border-transparent focus:outline-none bg-${bgcolor} p-2 rounded-md`}
      />
    </div>
  )
}

export default TextAreaInput