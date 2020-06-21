import React, { useState, useEffect } from 'react';
import { CalculatingDiff } from 'app/shared/util/calculating-diff-date';
import { Cell, PieChart, Pie } from 'recharts';
import './timeByChart.scss';
import { translate } from 'react-jhipster';

const TimeByChart = props => {

    const [timer, setTimer] = useState({});

    const realDate = new Date();
    (realDate.setHours(realDate.getHours() + 2)).toString();
    const [realTime, setrealTime] = useState(realDate)

    const [data, setData] = useState(
        [
            {
                value: 100
            }, {
                value: 0
            }
        ]
    );

    useEffect(
        () => {
            if (timer['stop'] > 0) {
                props.callBackTime(true);
                return;
            }
            let timeProps;
            props.time !== undefined ? timeProps = props.time : timeProps = realTime;
            const target = 100 - (((new Date(timeProps).getTime() - new Date().getTime()) / 1000) * 100) / 7200;
            const value = (((new Date(timeProps).getTime() - new Date().getTime()) / 1000) * 100) / 7200; // 2 Hours to Scn
            const intervalTime = setInterval(() => {
                setTimer(
                    CalculatingDiff(new Date(timeProps), null,
                        translate("common.hours"),
                        translate("common.minutes"),
                        translate("common.seconds"))
                );
                setData([{
                    value: ( value < 0 ? 0 : value )
                }, {
                    value: ( target < 0 ? 0 : target ) 
                }
                ]);
            }, 1000);
            return () => clearInterval(intervalTime);
        },
        [timer]
    );

    return (
        <>
            <PieChart height={400} width={500}>
                <Pie
                    startAngle={180}
                    endAngle={0}
                    innerRadius="66%"
                    data={data}
                    dataKey="value"
                    labelLine={true}
                    blendStroke
                    isAnimationActive={true}
                >
                    <Cell fill={props.color} />
                    <Cell fill="#E6E6E6" />
                </Pie>
            </PieChart>
            <div className="timer">
                <div>
                    {timer['hoursTime']}
                    <span>{timer['conTime']}</span>
                </div>
                <div>
                    {timer['minutesTime']}
                    <span>{timer['conmin']}</span>
                </div>
                <div>
                    {timer['secondsTime']}
                    <span>{timer['consec']}</span>
                </div>
            </div>
        </>
    );
}

export default TimeByChart;