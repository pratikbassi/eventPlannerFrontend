import React from 'react';
import Event from "@/components/event";

interface RowProps {
    events: any;
}

const Row: React.FC<RowProps> = ({events}) => {

    const COLOR_LIST = ['#CD7A7A', '#B2FFD6', '#35A7FF', '#B08EA2', '#FDCA40'];


    // Group events by track ID
    const groupedEvents = events.reduce((acc: { [key: number]: any[] }, event: any) => {
        const trackId = event.track || 0; // Use 0 for events without a track
        if (!acc[trackId]) {
            acc[trackId] = [];
        }
        acc[trackId].push(event);
        return acc;
    }, {});


    const rowStyle = {
        width: `100%`,
        display: 'flex',
        overflow: 'hidden',
    };

    const trackContainerStyle = {
        display: 'flex',
        flexDirection: 'row', // Arrange events in a row
        position : 'relative',
        overflow: 'scroll',
        width: '100%',
        height: 'auto',
        margin: '10px',
    };



    return (
        <div >
            {Object.entries(groupedEvents).map(([trackId, eventsInTrack]) => (
                <div key={trackId}>
                    <h3>Track {trackId === '0' ? 'Unassigned' : trackId}</h3>
                    <ul style={trackContainerStyle}>
                        {eventsInTrack.map((event: any, index: number) => (
                            <li key={event.id} style={{listStyleType: 'none'}} className={"event-item"}>
                                <Event
                                    start_time={event.start_time}
                                    end_time={event.end_time}
                                    title={event.title}
                                    color={COLOR_LIST[index % COLOR_LIST.length]}
                                    id={event.id}
                                    description={event.description}
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