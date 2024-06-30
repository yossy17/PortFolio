import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  style: ['normal'],
});

const HeaderMain = () => {
  return (
    <div className='header__main'>
      <Link href='/' className='header__main__icon'>
        <h1 className={`header__main__icon__name ${poppins.className}`}>
          <span className='header__main__icon__name--normal'>Yo</span>
          <span className='header__main__icon__name--change'>s_s</span>
          <span className='header__main__icon__name--last'>y</span>
        </h1>
      </Link>
      {/* <div className='header__main__search'>
        <form>
          <input className='header__main__search__input' placeholder='Search' />
        </form>
      </div> */}
      <input type='text' placeholder='Search' className='header__main__search'></input>
    </div>
  );
};

export default HeaderMain;
