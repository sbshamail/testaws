import React from 'react';
import { Controller } from 'react-hook-form';
import { capitalizeCamelSpace } from 'src/utils/helperfunction';

const HTextFieldHook = ({
  label,
  required,
  type,
  name,
  placeholder,
  disabled,
  textarea,
  control
}) => {
  let tailStyle = (fieldState) => {
    return `w-full focus:outline-none mt-2 rounded-[8px] !border-1 ${
      fieldState.error ? 'border-red-500' : '!border-gray-300'
    } pe-10 shadow-sm sm:text-sm p-2 focus:!border-blue-400  relative uppercase`;
  };
  return (
    <div className='mb-3 uppercase'>
      <label className='uppercase'>
        {label || capitalizeCamelSpace(name)} &nbsp;
        {required && <span>*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            {textarea ? (
              <textarea
                {...field}
                style={{ border: '1px solid' }}
                disabled={disabled}
                className={`input-placeholder ${tailStyle(fieldState)}`}
                placeholder={placeholder || `Enter a ${capitalizeCamelSpace(name)}`}
                rows={2}
              />
            ) : (
              <input
                {...field}
                value={type === Number ? Number(field.value) : field.value}
                type={type || 'text'}
                disabled={disabled}
                required={required}
                style={{ border: '1px solid' }}
                className={`input-placeholder ${tailStyle(fieldState)}`}
                placeholder={placeholder || `Enter a ${capitalizeCamelSpace(name)}`}
              />
            )}
            {fieldState.error && (
              <span className='text-red-500 text-sm'>
                {fieldState?.error?.message || 'required'}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default HTextFieldHook;
