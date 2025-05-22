'use client';
import React from 'react';
import { useSelectStates } from '../@core/select/useSelectField';
import { useController, Controller } from 'react-hook-form';
import { HIconifySvg } from '../@core/icon/hIconifySvg';
const HSelectFieldHook = ({
  name,
  list = ['select 1', 'select 2', 'select 3', 'select 4'],
  label,
  control,
  placeholder,
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
  } = useSelectStates({ list, value, setValue });
  const handleClick = (select) => {
    setValue(select);
    setOpen(false);
  };
  const Required = () => <span className=''>*</span>;

  const handleRemove = () => {
    setSearchTerm('');
    setValue('');
  };

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
                      type={'text'}
                      value={searchTerm ? searchTerm : inputValue}
                      onChange={handleEventSearch}
                      onKeyDown={handleInputKeyDown}
                      placeholder={
                        !searchTerm && !inputValue && placeholder
                          ? placeholder
                          : 'Search ...'
                      }
                    />
                    <div className='cursor-pointer absolute p-2 border border-gray-200 right-0 top-1/2 -translate-y-1/2 '>
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
                      className={`absolute max-h-64 overflow-y-auto  bg-white w-full z-50 shadow-lg border rounded ${listLayoutClass}`}
                    >
                      {filteredList?.map((item, index) => (
                        <div className='relative flex flex-col' key={index}>
                          <div
                            style={{
                              borderBottom: '1px solid rgba(0,0,0,0.2)',
                              width: '100%'
                            }}
                            className={`border  px-4 text-sm cursor-pointer !list-none p-2 ${
                              item === value ? `bg-blue-100 ${selectClass}` : ''
                            } ${
                              index === highlightedIndex
                                ? `bg-gray-200 ${highLightClass}`
                                : ''
                            } hover:bg-zinc-200 text-gray-500 hover:!text-blue-500 font-bold uppercase ${listClass}`}
                            onClick={() => handleClick(item)}
                          >
                            <span className='font-bold   '>{item}</span>
                          </div>
                        </div>
                      ))}
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

export default HSelectFieldHook;
