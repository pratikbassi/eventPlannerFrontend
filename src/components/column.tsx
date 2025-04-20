import React from 'react';
import Event from "@/components/event";

interface RowProps {
    events: any;
}

const Column: React.FC<RowProps> = ({events}) => {

    const COLOR_LIST = ['#CD7A7A', '#B2FFD6', '#35A7FF', '#B08EA2', '#FDCA40'];

    const columnStyle = {
        width: `80%`,
        display: 'flex-column',
        overflow: 'hidden',
    };

    return (
        <ul style={columnStyle}>
            {events.map((event, index) => {
                return (
                    <li key={index} style={columnStyle}>
                        <Event start_time={event['start_time']} end_time={event['end_time']} title={event['title']}
                               color={COLOR_LIST[index % COLOR_LIST.length]}/>
                    </li>
                );
            })}
        </ul>

    );
};

export default Column;