import React from 'react';

const CustomCheckbox = ({ checked, onChange }) => {
  const handleClick = () => {
    onChange(!checked); // Toggle the checked state on click
  };

  return (
    <div
      style={{ border: '1px solid', background: checked ? 'blue' : 'black' }}
      className={`cursor-pointer w-6 h-6 flex items-center justify-center rounded-sm 
                 
                  `}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role='checkbox'
      aria-checked={checked}
      tabIndex={0}
    >
      {checked && <span className='text-white text-sm select-none'>✓</span>}
    </div>
  );
};

export default CustomCheckbox;
