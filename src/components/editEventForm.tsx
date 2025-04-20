import React, {useState} from 'react';

interface EditEventProps {
    startTimeProp: string,
    endTimeProp: string,
    descriptionProp?: string | undefined
    id: number,
    cancelProp: () => void
}


const editEventForm: React.FC<EditEventProps> = ({startTimeProp, endTimeProp, descriptionProp, id, cancelProp}) => {
    const [description, setDescription] = useState(descriptionProp);
    const [start_time, setStartTime] = useState(startTimeProp);
    const [end_time, setEndTime] = useState(endTimeProp)


    const onEventEdit = async (event: { start_time: unknown; end_time: string; description: unknown; }) => {
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
        onEventEdit({start_time, end_time, description})
            .catch((error => {
                console.log(error)
            }));
    };

    const formStyle = {
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
        margin: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '300px'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <label>
                Type:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>
            <label>
                Start Time:
                <input type="datetime-local" value={start_time} onChange={(e) => setStartTime(e.target.value)}/>
            </label>
            <label>
                End Time:
                <input type="datetime-local" value={end_time} onChange={(e) => setEndTime(e.target.value)}/>
            </label>
            <button type="submit">Update Event</button>
            <button type="button" onClick={() => {}}>Delete Event</button>
            <button type="button" onClick={() => {cancelProp()}}>Close</button>
        </form>
    );
};

export default editEventForm;