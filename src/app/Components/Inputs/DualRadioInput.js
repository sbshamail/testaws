import React from 'react'

const DualRadioInput = ({ options, value, setvalue, label }) => {
    return (
        <div className='w-full flex flex-row gap-2 items-start text-sm'>
            {options.map((option, i) => (
                <div key={i} className='flex flex-col gap-2'>
                    <label>
                        {option.text}
                    </label>
                    <input
                        type="radio"
                        value={option.value}
                        checked={value == option.value}
                        onChange={(event) => setvalue(event.target.value)}
                    />
                   
                </div>
            ))}
            <div className='self-end font-semibold'>{label}</div>
        </div>
    );
}

export default DualRadioInput