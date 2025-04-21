import React from 'react';
import Event from "@/components/event";
import {COLOR_LIST, groupedEvents} from "@/helpers/constants";
import {wrap} from "node:module";


interface RowProps {
    events: any,
    setRefresh: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const Column: React.FC<RowProps> = ({events, setRefresh}) => {
    const [filter, setFilter] = React.useState('');

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column', // Arrange events in a row
        position: 'relative',
        width: '100%',
        height: 'auto',
        margin: '10px',
        gap: '10px',
    }

    const listStyle = {
        width: `400px`,
        display: 'flex',
        flexDirection: 'column', // Arrange events in a row
        overflow: 'wrap',
        gap: '10px',
    };

    const rowOfListsStyle = {
        display: 'flex',
        flexDirection: 'row', // Arrange events in a row
        flexWrap: 'wrap',
        gap: '20px',
    }

    const subColumnStyle = {
        textAlign: 'start',
    }

    return (
        <div style={columnStyle}>
            <label>
                Filter:
                <input value={filter} onChange={(e) => {
                    setFilter(e.target.value)
                }}/>
            </label>

            <div style={rowOfListsStyle}>
                {Object.entries(groupedEvents(events)).map(([trackId, eventsInTrack]) => (
                    <div style={subColumnStyle} key={trackId}>
                        <h3 style={{padding: '0 0 0 20px'}}>Track {trackId === 'null' ? 'Unassigned' : trackId}</h3>

                        <ul style={listStyle}>
                            {eventsInTrack.map((event, index) => {
                                if (filter && !event['title'].toLowerCase().includes(filter.toLowerCase())) {
                                    return null;
                                }
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
                                            description={event['description']}
                                            id={event['id']}
                                            listView={true}
                                        />

                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                ))}
            </div>


        </div>


    );
};

export default Column;