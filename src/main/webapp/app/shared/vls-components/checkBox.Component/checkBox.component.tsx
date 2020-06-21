import React from 'react';
import './checkBox.Component.scss';

const CheckBoxComponent = props => {

    return (
        <label className="checkbox"> {props.lbl}
            <input type="checkbox" defaultChecked={props.Checked} onChange={props.handleChangeChk} />
            <span className="checkmark"></span>
        </label>
    )
}
export default CheckBoxComponent;