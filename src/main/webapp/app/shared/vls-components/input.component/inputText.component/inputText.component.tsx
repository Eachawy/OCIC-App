import React from 'react';
import InputCoverComponent from '../inputCover.component/inputCover.component';

const InputTextComponent = props => {

    return (
        <InputCoverComponent 
            class={props.class} 
            valid={props.valid}
            lbl={props.lbl}
            flag={props.flag}
            errorMsg={props.errorMsg}
            >
            <input type="text"
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed}
                className={props.flag ? 'flagSpace' : null}
            />
        </InputCoverComponent>
    )
}
export default InputTextComponent;