import React from 'react';
import './cart.component.scss';
import { Translate } from 'react-jhipster';

const Cart = props => {
    return (
        <div className={'cart ' + (props.collect > 0 ? 'active' : null)}>
            <span className="num">{props.collect}</span>
            <Translate contentKey="selectVehicle.basket">Cart</Translate>
        </div>
    )
}

export default Cart;