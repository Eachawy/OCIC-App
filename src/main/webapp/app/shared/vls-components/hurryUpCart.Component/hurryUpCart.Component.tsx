import React, { useState, useEffect } from 'react';
import { CalculatingDiff } from 'app/shared/util/calculating-diff-date';
import './hurryUpCart.Component.scss'
import { translate } from 'react-jhipster';

const HurryUpCart = props => {

    const [timer, setTimer] = useState({});

    const realDate = new Date();
    (realDate.setHours(realDate.getHours() + 2)).toString();
    const [realTime, setrealTime] = useState(realDate); // realDate - '05/19/2020 15:30:00'


    useEffect(
        () => {
            if (timer['stop'] > 0) {
                props.callBackTime(true);
                return;
            }
            let timeProps;
            props.time !== undefined ? timeProps = props.time : timeProps = realTime;
            const intervalTime = setInterval(() => {
                setTimer(
                    CalculatingDiff(new Date(timeProps), null,
                        translate("common.hours"),
                        translate("common.minutes"),
                        translate("common.seconds"))
                );
            }, 1000);
            return () => clearInterval(intervalTime);
        },
        [timer]
    );


    return (
        <div className="hurryUpCart">
            <div>
                {props.caption}
                {
                    timer['hoursTime'] === undefined ?
                        <span>00:00:00</span> :
                        <span>{timer['hoursTime'] + ' : ' + timer['minutesTime'] + ' : ' + timer['secondsTime']}</span>
                }

            </div>
        </div>
    );
}

export default HurryUpCart;