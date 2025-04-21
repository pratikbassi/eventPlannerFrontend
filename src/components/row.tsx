import React from 'react';
import Event from "@/components/event";
import {COLOR_LIST} from "@/helpers/constants";
import {root} from "postcss";

interface RowProps {
    events: any,
    setRefresh: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const Row: React.FC<RowProps> = ({events, setRefresh}) => {


    // Group events by track ID
    const groupedEvents = () => {

        let returnObj = {}

        for (let event of events) {
            if (returnObj[event['track_title']]) {
                returnObj[event['track_title']].push(event)
            } else {
                returnObj[event['track_title']] = [event]
            }
        }

        for (let key in returnObj) {
            returnObj[key].sort((a: any, b: any) => {
                return new Date(a['start_time']).getTime() - new Date(b['start_time']).getTime();
            })
        }

        return returnObj;
    };


    const rootStyle = {
        display: 'flex',
        flexDirection: 'column', // Arrange events in a row
        gap: '10px',
    };

    const trackContainerStyle = {
        display: 'flex',
        flexDirection: 'column', // Arrange events in a row
        position: 'relative',
        overflow: 'scroll',
        width: '100%',
        height: 'auto',
        margin: '10px',
        gap: '10px',
    };


    return (
        <div style={rootStyle}>
            {Object.entries(groupedEvents()).map(([trackId, eventsInTrack]) => (
                <div key={trackId} >
                    <h3>Track {trackId === 'null' ? 'Unassigned' : trackId}</h3>
                    <ul style={trackContainerStyle}>
                        {eventsInTrack.map((event: any, index: number) => (
                            <li key={event.id}
                                style={{listStyleType: 'none', position: "relative"}}>
                                <Event
                                    start_time={event['start_time']}
                                    end_time={event['end_time']}
                                    title={event['title']}
                                    color={COLOR_LIST[index % COLOR_LIST.length]}
                                    setRefresh={setRefresh}
                                    track={event['track']}
                                    description={event['description']}
                                    id={event['id']}
                                    />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Row;