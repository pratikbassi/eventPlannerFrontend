import React from 'react';
import Event from "@/components/event";

interface RowProps {
    events: any;
}

const Row: React.FC<RowProps> = ({events}) => {

    const COLOR_LIST = ['#CD7A7A', '#B2FFD6', '#35A7FF', '#B08EA2', '#FDCA40'];

    const rowStyle = {
        width: `100%`,
        display: 'flex',
        overflow: 'hidden',
    };

    return (
        <ul style={rowStyle}>
            {events.map((event, index) => {
                return (
                    <li key={index} style={rowStyle}>
                        <Event start_time={event['start_time']} end_time={event['end_time']} title={event['title']}
                               color={COLOR_LIST[index % COLOR_LIST.length]} id={event['id']}/>
                    </li>
                );
            })}
        </ul>

    );
};

export default Row;