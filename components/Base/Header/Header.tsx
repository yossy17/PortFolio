'use client';

import React from 'react';
import * as HeaderComponent from './Index';
import * as Ui from '@/components/Ui/Index';

const Header: React.FC = () => {
  return (
    <Ui.ScrollHandler>
      {(isVisible: boolean) => (
        <header className={`header ${isVisible ? '' : 'header--hidden'}`}>
          <HeaderComponent.HeaderMain />
          {/* <HeaderComponent.HeaderNav /> */}
        </header>
      )}
    </Ui.ScrollHandler>
  );
};

export default Header;
