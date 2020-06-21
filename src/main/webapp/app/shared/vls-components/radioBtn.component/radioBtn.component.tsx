import React from 'react';
import './radioBtn.component.scss';


const RadioComponent = props => {

    return (
        <div className={props.class ? `radioBtn ${props.class}` : `radioBtn`}>
            <input 
                type="radio" 
                id={props.id} 
                name={props.group} 
                value={props.value} 
                onChange={props.changed} 
                checked={props.checked}
            />
            <label htmlFor={props.id}>{props.lbl}</label>
        </div>
    )
}
export default RadioComponent;