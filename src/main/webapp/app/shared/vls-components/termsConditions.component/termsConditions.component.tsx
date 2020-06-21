import React from 'react';
import './termsConditions.component.scss';
import { InputSwitch } from 'primereact/inputswitch';
import * as $ from 'jquery';
import { translate } from 'react-jhipster';
const TermsConditions = props => (
  <div className={`row termsConditions ${props.class}`}>
    <div className="col-sm-12 col-md-9 col-lg-9">
      <h4>{translate('termsConditions.titel')}</h4>
      <p>
        {translate('termsConditions.iAgree')}
        <span onClick={() => $('.termsConditionsDoc').slideToggle()}>{translate('termsConditions.termsAndConditions')}</span>
        {translate("termsConditions.andCertify")}
      </p>
    </div>
    <div className="col-sm-12 col-md-3 col-lg-3">
      <InputSwitch checked={props.checked} onChange={props.onchange} />
    </div>
    <div className="col-sm-12 col-md-12 col-lg-12 termsConditionsDoc">
      <h6>{translate('termsConditions.termsDocTit_1')}</h6>
      <p>{translate('termsConditions.termsDocDet_1')}</p>
      <p>{translate('termsConditions.termsDocDet_1_2')}</p>
      <p>{translate('termsConditions.termsDocDet_1_3')}</p>
      <p>{translate('termsConditions.termsDocDet_1_4')}</p>
      <p>{translate('termsConditions.termsDocDet_1_5')}</p>
      <p>{translate('termsConditions.termsDocDet_1_6')}</p>
    </div>
  </div>
);

export default TermsConditions;
