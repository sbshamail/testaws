'use client';
import React, { useState, useEffect, useRef } from 'react';
import { HIconifySvg } from '../@core/icon/hIconifySvg';
import { useSelectStates } from '../@core/select/useSelectField';

const HSelectField = ({
  name,
  list = ['select 1', 'select 2', 'select 3', 'select 4'],
  label,
  required,
  value,
  setValue,
  placeholder
}) => {
  // const [value, setValue] = useState('');
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
              <span className='capitalize'>{label}</span>
              &nbsp;
              {required && Required()}
            </label>
          )}
          <div ref={divRef}>
            <div
              style={{ border: '1px solid' }}
              className='cursor-text relative  w-full border-b-2  border !border-gray-300 rounded hover:border-blue-500'
              onClick={() => setOpen(!open)}
            >
              <input
                ref={inputRef}
                className='p-2 py-3 relative w-full   border-b border-gray-300 border-none bg-transparent focus:outline-none forced-colors:'
                type={'text'}
                value={searchTerm ? searchTerm : inputValue}
                onChange={handleEventSearch}
                onKeyDown={handleInputKeyDown}
                placeholder={
                  !searchTerm && !inputValue && placeholder ? placeholder : 'Search ...'
                }
              />
              <div className='absolute p-2 border border-gray-200 right-0 top-1/2 -translate-y-1/2 '>
                {searchTerm ? (
                  <HIconifySvg
                    onClick={() => setSearchTerm('')}
                    fontSize='1.5rem'
                    icon='entypo:cross'
                    className='text-gray-400 cursor-pointer hover:text-red-400'
                  />
                ) : (
                  <HIconifySvg
                    fontSize='1.5rem'
                    icon='gridicons:dropdown'
                    className='text-gray-400'
                  />
                )}
              </div>
            </div>

            {open && (
              <div
                style={{ border: '1px solid rgba(0,0,0,0.2)' }}
                className='absolute bg-white w-full z-50 shadow-lg border rounded'
              >
                {filteredList?.map((item, index) => (
                  <div className='relative flex flex-col' key={index}>
                    <div
                      style={{
                        borderBottom: '1px solid rgba(0,0,0,0.2)',
                        width: '100%'
                      }}
                      className={`border  px-4 text-sm cursor-pointer !list-none p-2 ${
                        item === value ? 'border-gray-200' : ''
                      } ${
                        index === highlightedIndex ? 'bg-gray-200' : ''
                      } hover:bg-zinc-200 text-gray-500 hover:!text-blue-500`}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default HSelectField;
