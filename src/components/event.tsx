import React, {useState} from 'react';
import editEventForm from "@/components/editEventForm";
import EditEventForm from "@/components/editEventForm";

interface EventProps {
    id: number;
    start_time: string;
    end_time: string;
    title: string;
    description: string
    color: string
}

const Event: React.FC<EventProps> = ({start_time, end_time, title, color, description, id}) => {
    const [editing, setEditing] = useState(false);


    const start = new Date(start_time);
    const end = new Date(end_time);
    const duration = end.getTime() - start.getTime(); // Duration in milliseconds
    const durationInHours = duration / (1000 * 3600);

    const barStyle = {
        width: `${durationInHours * 20}px`,
        minWidth: '50px',
        backgroundColor: color,
        padding: '3px 3px 0px 10px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    };

    const handleClick = () => {
        if (editing) {
            return;
        }
        setEditing(true);
    };
    const handleClose = () => {
        console.log(editing);
        setEditing(false);
    };


    return (
        <div style={barStyle} onClick={() => {handleClick()}}>
            <p>{title} </p>
            {editing ? <EditEventForm id={id} description={description} startTime={start_time}  endTime={end_time} cancel={handleClose} title={title}/> :  ""}
        </div>
    );
};

export default Event;