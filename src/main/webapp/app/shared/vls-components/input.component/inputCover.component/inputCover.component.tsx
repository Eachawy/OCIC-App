import React from 'react';

const InputCoverComponent = props => {

    return (
        <div className={`dataField 
                ${props.class} 
                ${props.valid !== null && props.valid !== undefined ?
                props.valid ? 'success' : 'fail'
                : ''}
            `}>
            <div>
                <label>{props.lbl}</label>
                {props.flag ? <span className={`flagIcon ${props.flag}`} /> : null}

                {props.children}

                <span className={`validIcon`} />
                <span className="validMSG">
                    {props.errorMsg}
                </span>
            </div>
        </div>
    )
}
export default InputCoverComponent;