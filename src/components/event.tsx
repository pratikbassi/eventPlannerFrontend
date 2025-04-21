import React, {useState} from 'react';
import EditEventForm from "@/components/editEventForm";

interface EventProps {
    id: number,
    start_time: string,
    end_time: string,
    title: string,
    description: string,
    color: string,
    width?: string,
    left?: string,
    track?: number,
    setRefresh: (value: (((prevState: boolean) => boolean) | boolean)) => void
    listView?: boolean
}

const Event: React.FC<EventProps> = ({
                                         start_time,
                                         end_time,
                                         title,
                                         color,
                                         description,
                                         id,
                                         left,
                                         width,
                                         setRefresh,
                                         track,
                                         listView = false
                                     }) => {
    const [editing, setEditing] = useState(false);


    const start = new Date(start_time);
    const end = new Date(end_time);
    const duration = end.getTime() - start.getTime(); // Duration in milliseconds
    const durationInHours = duration / (1000 * 3600);
    const timeFromCurrentInHours = Math.floor(start.getTime() - new Date().getTime()) / (1000 * 3600);
    const timeRemainingInHours = Math.floor((end.getTime() - new Date().getTime()) / (1000 * 3600));

    const barStyle = {
        width: width ? width : `${durationInHours * 4}px`,
        minWidth: '150px',
        maxWidth: '1000px',
        backgroundColor: color,
        padding: '3px 3px 0px 10px',
        overflow: 'hidden',
        whiteSpace: 'wrap',
        textOverflow: 'hidden',
        left: left ? left : `${timeFromCurrentInHours * 3}px`,
        position: 'relative',
        borderRadius: '5px',
        textAlign: listView || (timeFromCurrentInHours && timeFromCurrentInHours) > 0 ? 'left' : 'right',
    };


    const handleClick = () => {
        if (editing) {
            return;
        }
        setEditing(true);
    };
    const handleClose = () => {
        setEditing(false);
    };


    return (
        <div className={"event-item"} style={barStyle} onClick={() => {
            handleClick()
        }}>
            <p>{title} </p>
            {editing ? <EditEventForm id={id} description={description} startTime={start_time} endTime={end_time}
                                      cancel={handleClose} title={title} setRefresh={setRefresh} track={track}/> : ""}
            <div className={"event-details"}>
                <p style={{fontSize: '12px'}}>Hours left: {timeRemainingInHours}</p>
                <p style={{fontSize: '12px'}}>{description}</p>
            </div>
        </div>
    );
};

export default Event;