
import React, { useState, useEffect } from 'react';
import { Translate, Storage, translate } from 'react-jhipster';
import { isRTL } from 'app/config/translation';
import * as $ from 'jquery';
export interface IHeaderProps {
  currentLocale: string;
  onLocaleChange: Function;
}

import './header.scss';


const Header = (props: IHeaderProps) => {

  const handleLocaleChange = () => {
    const sessionLocale = Storage.session.get('locale');
    const langKey = sessionLocale === 'en' || typeof sessionLocale === 'undefined' ? 'ar' : 'en';
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
    // Storage.session.set('locale', 'ar');
    document.querySelector('html').setAttribute('dir', isRTL(langKey) ? 'rtl' : 'ltr');
  };

  const language = (
    <div className="language-switch nav-trigger">
      <h2>
        <a onClick={handleLocaleChange}>
          <Translate contentKey="common.langage">عربي</Translate>
        </a>
      </h2>
    </div>
  );

  return (
    <header>
      <h1>{translate("common.header")}</h1>
      {language}
    </header >
  );
};

export default Header;
