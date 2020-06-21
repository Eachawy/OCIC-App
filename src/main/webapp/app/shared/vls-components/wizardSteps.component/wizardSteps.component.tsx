import React, { useEffect } from 'react';
import './wizardSteps.component.scss';
import { Translate, translate } from 'react-jhipster';
import * as $ from 'jquery';

const WizardSteps = props => {
    useEffect(() => {
        function responsiveCase() {
            if (window.matchMedia("(max-width: 768px)").matches) {
                 $('.wizardSteps').find('.active').prev().show();
            }
        }

        responsiveCase();
        
        $(window).resize(function () {
            responsiveCase();
        });
    });
    return (
        <div className="row wizardSteps">
            <div className={
                props.step === 1 ? 'active' :
                    props.step > 1 ? 'success' : null
            }>
                <span className="numb">1</span>
                {!props.buyer &&
                    <div>
                        <Translate contentKey="wizardSteps.reviewYour">
                            Profile
                        </Translate>
                        <Translate contentKey="wizardSteps.personalDetails">
                            eligibility
                        </Translate>
                    </div>
                }
                {props.buyer &&
                    <div>
                        <Translate contentKey="wizardSteps.bProfile">
                            Profile
                        </Translate>
                        <Translate contentKey="wizardSteps.beligibility">
                            eligibility
                        </Translate>
                    </div>
                }
            </div>
            <div className={
                props.step === 2 ? 'active' :
                    props.step > 2 ? 'success' : null
            }>
                <span className="numb">2</span>
                {!props.buyer &&
                    <div>
                        <Translate contentKey="wizardSteps.selectVehicle">
                            Select
                    </Translate>
                        <Translate contentKey="wizardSteps.toSell">
                            to cart
                    </Translate>
                    </div>
                }
                {props.buyer &&
                    <div>
                        <Translate contentKey="wizardSteps.bViewSell">
                            Review Sell Offer and Accept Terms
                        </Translate>
                        <Translate contentKey="wizardSteps.btoCart">
                            offer
                        </Translate>
                    </div>
                }
            </div>
            <div className={
                props.step === 3 ? 'active' :
                    props.step > 3 ? 'success' : null
            }>
                <span className="numb">3</span>
                {!props.buyer &&
                    <div>
                        <Translate contentKey="wizardSteps.select">
                            Select
                    </Translate>
                        <Translate contentKey="wizardSteps.buyer">
                            buyer
                    </Translate>
                    </div>
                }
                {props.buyer &&
                    <div>
                        <Translate contentKey="wizardSteps.bSelectLicensing">
                            License The
                        </Translate>
                        <Translate contentKey="wizardSteps.bservice">
                            Vehicle
                        </Translate>
                    </div>
                }
            </div>
            <div className={
                props.step === 4 ? 'active' :
                    props.step > 4 ? 'success' : null
            }>
                <span className="numb">4</span>
                {!props.buyer &&
                    <div>
                        <Translate contentKey="wizardSteps.review">
                            Review and Sign
                    </Translate>
                        <Translate contentKey="wizardSteps.confirm">
                            Sell Offer
                    </Translate>
                    </div>
                }
                {props.buyer &&
                    <div>
                        <Translate contentKey="wizardSteps.bReviewSign">
                            Review and Sign
                        </Translate>
                        <Translate contentKey="wizardSteps.bsellContract">
                            sell contract
                        </Translate>
                    </div>
                }
            </div>
            <div className={
                props.step === 5 ? 'active' :
                    props.step > 5 ? 'success' : null
            }>
                <span className="numb">5</span>
                {!props.buyer &&
                    <div>
                        <Translate contentKey="wizardSteps.accept">
                            Buyer
                        </Translate>
                        <Translate contentKey="wizardSteps.agreement">
                            Updates
                        </Translate>
                    </div>
                }
                {props.buyer &&
                    <div>
                        <Translate contentKey="wizardSteps.bDeliveryOptions">
                            Delivery options
                        </Translate>
                        <Translate contentKey="wizardSteps.bAndPayment">
                            and payment
                        </Translate>
                    </div>
                }
            </div>
        </div>
    )
}

export default WizardSteps;