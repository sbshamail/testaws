import React from 'react'

const RadioWithTextBox = ({ option, value, setvalue, bg,color,icon }) => {
    return (
        <div className={`${bg} flex flex-row items-center w-full rounded-md h-10 text-sm ${color && "text-" + color} font-semibold`}>
            <div className={`w-2/12 h-full border-r ${color ? "border-" + color : "border-gray-500"} p-2 flex items-center`}>
                <input type='radio'
                    value={option.value}
                    checked={value == option.value}
                    onChange={(event) => setvalue(event.target.value)}
                    className={`w-full h-4 border-transparent focus:outline-none ${bg} p-2 rounded-md `}
                />
            </div>
            <label className='w-full flex justify-between px-5'>
                <div>{option.text}</div>
                {icon && icon}
            </label>
        </div>
    );
}

export default RadioWithTextBox