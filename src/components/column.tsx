import React from 'react';
import Event from "@/components/event";
import {COLOR_LIST} from "@/helpers/constants";


interface RowProps {
    events: any,
    setRefresh: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const Column: React.FC<RowProps> = ({events, setRefresh}) => {

    const columnStyle = {
        width: `100%`,
        display: 'flex',
        flexDirection: 'column', // Arrange events in a row
        overflow: 'hidden',
        gap: '10px',
    };

    return (
        <ul style={columnStyle}>
            {events.map((event, index) => {
                return (
                    <li key={index}>
                        <Event
                            start_time={event['start_time']}
                            end_time={event['end_time']}
                            title={event['title']}
                            color={COLOR_LIST[index % COLOR_LIST.length]}
                            width={"300px"} left={"20px"}
                            setRefresh={setRefresh}
                            track={event['track']}
                            description={event['description']}/>
                    </li>
                );
            })}
        </ul>

    );
};

export default Column;