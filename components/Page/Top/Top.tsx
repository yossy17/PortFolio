'use client';

import Image from 'next/image';
import React from 'react';

const Top = () => {
  return (
    <div className='loading'>
      <div id='loading__circle--wrap'>
        <span className='loading__circle'></span>
        <span className='loading__circle'></span>
        <span className='loading__circle'></span>
      </div>
      <div id='loading__shadow--wrap'>
        <span className='loading__shadow'></span>
        <span className='loading__shadow'></span>
        <span className='loading__shadow'></span>
      </div>
    </div>
  );
};

export default Top;
