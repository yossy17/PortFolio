import React from 'react';
import Image from 'next/image';
import * as Page from '@/components/Page/Index';

const page = () => {
  return (
    <div className='top'>
      <Page.Top />
      <Page.TopSidebar />
    </div>
  );
};

export default page;
