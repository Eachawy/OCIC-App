import React from 'react';
import InputCoverComponent from '../inputCover.component/inputCover.component';
import InputMask from "react-input-mask";


const InputMaskComponent = props => {

    return (
        <InputCoverComponent
            class={props.class}
            valid={props.valid}
            lbl={props.lbl}
            flag={props.flag}
            errorMsg={props.errorMsg}
        >
            <InputMask
                mask={props.mask}
                value={props.value}
                onChange={props.changed}
                className={props.flag ? 'flagSpace' : null}
                placeholder={props.placeholder}
            />
        </InputCoverComponent>
    )
}
export default InputMaskComponent;