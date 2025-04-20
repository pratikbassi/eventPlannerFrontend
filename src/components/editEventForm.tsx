import React, {useState} from 'react';

interface EditEventProps {
    title: string,
    startTime: string,
    endTime: string,
    description: string
    id: number,
    cancel: () => void
}


const editEventForm: React.FC<EditEventProps> = ({startTime, endTime, description, id, cancel, title}) => {
    const [descriptionState, setDescription] = useState(description);
    const [startTimeState, setStartTime] = useState(startTime ? new Date(startTime).toISOString().slice(0, 16) : '');
    const [endTimeState, setEndTime] = useState(endTime ?  new Date(endTime).toISOString().slice(0, 16) : '');


    const onEventEdit = async (event: {
        descriptionState: string;
        endTimeState: string;
        startTimeState: string
    }) => {
    try {

        const response = await fetch('http://localhost:8000/api/update/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to update event');
        }

        const data = await response.json();
        console.log('Event updated:', data);
    } catch (error) {
        console.error('Error updating event:', error);
    }
}

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onEventEdit({startTimeState, endTimeState, descriptionState})
            .catch((error => {
                console.log(error)
            }));
    };

const modalStyle = {
        position: 'fixed',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        maxWidth: '500px',
        height: 'auto',
        overflow: 'auto',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    };

const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    const inputStyle = {

        fontWeight: 'normal',
        padding: '8px',
        margin: '0 0 0 5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    };


    return (
        <div style={modalStyle}>
            <h3 >Edit {title}</h3>

            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>
                    Type:
                    <input type="text" value={descriptionState} onChange={(e) => setDescription(e.target.value)} style={inputStyle}/>
                </label>
                <label style={labelStyle}>
                    Start Time:
                    <input type="datetime-local" value={startTimeState} onChange={(e) => setStartTime(e.target.value)} style={inputStyle}/>
                </label>
                <label style={labelStyle}>
                    End Time:
                    <input type="datetime-local" value={endTimeState} onChange={(e) => setEndTime(e.target.value)} style={inputStyle}/>
                </label>
                <button type="submit">Update Event</button>
                <button type="button" onClick={() => {
                }}>Delete Event
                </button>
                <button type="button" onClick={() => {
                    cancel()
                }}>Close
                </button>
            </form>
        </div>

    );
};

export default editEventForm;