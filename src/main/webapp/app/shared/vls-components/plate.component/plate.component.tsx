import React from 'react';
import { translate } from 'react-jhipster';

import './plate.component.scss';

const PlateComponent = props => {

    // class = "coloured" for change plate style to plate coloured
    // class = "expo" for change plate style to plate expo


    let plateType;
    switch (props.plateType) {
        case 'luxu':
            plateType = 'luxu';
            break;
        case 'short':
            plateType = 'short';
            break;
        case 'long':
            plateType = 'long';
            break;
        default:
            plateType = 'luxu';
            break;
    }

    return (
        <div className={`plate ${props.class} ${plateType}`}>
            {props.notLicensed &&
                <span className="notLicensed">{translate("common.notLicensed")}</span>
            }

            {!props.notLicense &&
                <>
                    <span>{props.plateCharacter}</span>
                    <div>{props.plateNum}</div>
                </>
            }
            {props.caption &&
                <div className="caption">
                    {props.caption}
                </div>
            }
        </div>
    );
}

export default PlateComponent;