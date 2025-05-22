'use client';
import React from 'react';
import { HIconifySvg } from '../@core/icon/hIconifySvg';
import { useIdSelectStates } from '../@core/select/useIdSelectStates';
import { Controller } from 'react-hook-form';
import { useController } from 'react-hook-form';
const HIdSelectFieldHook = ({
  list = [
    { _id: 1, name: 'select 1' },
    { _id: 2, name: 'select 2' }
  ],
  name,
  control,
  placeholder,
  label,
  idName = 'name',
  idField = '_id',
  parentClass,
  iconClass,
  listLayoutClass,
  selectClass,
  highLightClass,
  listClass,
  inputClass,
  labelClass,
  required
}) => {
  const setValue = useController({ name, control }).field.onChange;
  const value = useController({ name, control }).field.value;

  const {
    divRef,
    inputRef,
    //states
    open,
    setOpen,
    highlightedIndex,
    setHighlightedIndex,
    searchTerm,
    setSearchTerm,
    filteredList,
    inputValue,
    handleInputKeyDown
  } = useIdSelectStates({
    list,
    idName,
    idField,
    value,
    setValue
  });
  // Functions
  const handleClick = (fieldId, fieldName) => {
    setValue(fieldId);
    setSearchTerm('');
    setOpen(false);
  };
  const handleRemove = () => {
    setSearchTerm('');
    setValue('');
  };

  const Required = () => <span className=''>*</span>;

  const handleEventSearch = (event) => {
    const { value } = event.target;
    if (value !== ' ') {
      setSearchTerm(value);
      if (!open) {
        setOpen(true);
      }
    }
    if (!value) {
      setValue('');
    }
  };

  return (
    <>
      <div className='relative mb-3 '>
        <div className='group'>
          {label && (
            <label>
              <span className={`capitalize ${labelClass}`}>{label}</span>
              &nbsp;
              {required && Required()}
            </label>
          )}
          <div ref={divRef}>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange, value }, fieldState }) => (
                <>
                  <div
                    style={{ border: '1px solid' }}
                    className={`
                  ${!value && fieldState.error ? 'border-red-500' : 'border-blue-600/80'} 
                  cursor-text relative w-full border-b-2 border !border-gray-300 rounded hover:border-blue-500 ${parentClass}`}
                    onClick={() => setOpen(!open)}
                  >
                    <input
                      ref={inputRef}
                      className={`input-placeholder p-2 py-3 relative w-full uppercase border-none bg-transparent focus:outline-none ${inputClass}`}
                      type='text'
                      value={searchTerm ? searchTerm : inputValue}
                      onChange={handleEventSearch}
                      onKeyDown={handleInputKeyDown}
                      placeholder={
                        !searchTerm && !inputValue && placeholder
                          ? placeholder
                          : 'Search ...'
                      }
                    />
                    <div className={`absolute p-2 right-0 top-1/2 -translate-y-1/2 `}>
                      {searchTerm || inputValue ? (
                        <HIconifySvg
                          onClick={handleRemove}
                          fontSize='1.5rem'
                          icon='entypo:cross'
                          className={`text-gray-400 cursor-pointer  ${iconClass} hover:!text-red-400`}
                        />
                      ) : (
                        <HIconifySvg
                          fontSize='1.5rem'
                          icon='gridicons:dropdown'
                          className={`text-gray-400 ${iconClass}`}
                        />
                      )}
                    </div>
                  </div>

                  {open && (
                    <div
                      style={{ border: '1px solid rgba(0,0,0,0.2)' }}
                      className={`absolute bg-white w-full max-h-64 overflow-y-auto z-50 shadow-lg border rounded ${listLayoutClass}`}
                    >
                      {filteredList.map((item, index) => {
                        const itemName = item[idName];
                        return (
                          <div className='relative flex flex-col' key={index}>
                            <div
                              style={{
                                borderBottom: '1px solid rgba(0,0,0,0.2)',
                                width: '100%'
                              }}
                              className={`border px-4 text-sm cursor-pointer !list-none p-2 ${
                                item[idField] === value
                                  ? `bg-blue-100 ${selectClass}`
                                  : ''
                              } ${
                                index === highlightedIndex
                                  ? `bg-gray-200 ${highLightClass}`
                                  : ''
                              } hover:bg-zinc-200 text-gray-500 hover:!text-blue-500 font-bold uppercase ${listClass}`}
                              onClick={() => handleClick(item[idField], item[idName])}
                            >
                              <span>{itemName}</span>
                            </div>
                          </div>
                        );
                      })}
                      {searchTerm && filteredList.length === 0 && (
                        <div
                          style={{
                            borderBottom: '1px solid rgba(0,0,0,0.2)',
                            width: '100%'
                          }}
                          className='px-4 p-2'
                        >
                          <span>No Found</span>
                        </div>
                      )}
                    </div>
                  )}
                  {!value && fieldState.error && (
                    <span className='text-red-500 text-sm'>
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HIdSelectFieldHook;
