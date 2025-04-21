import React, {useState} from 'react';

const onEventCreate = async (event: { start_time: string; end_time: string; description: string; title: string }) => {
    try {

        const response = await fetch('http://localhost:8000/api/event/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to create event');
        }

        const data = await response.json();
        console.log('Event created:', data);
    } catch (error) {
        console.error('Error creating event:', error);
    }
}

interface EventFormProps {
    setRefresh: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    cancel: () => void
}

const EventForm: React.FC = ({setRefresh, cancel}: EventFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onEventCreate({title, description, start_time, end_time}).then(() => {
            setTitle('');
            setStartTime('');
            setEndTime('');
            setDescription('')
            setRefresh(true)
        }).catch((error => {
            console.log(error)
        }));

    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        gap: '10px',
        width: '100%',
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    return (
        <div className={"modal"}>
            <h3>Create Event</h3>

            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </label>
                <label style={labelStyle}>
                    Type:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label style={labelStyle}>
                    Start Time:
                    <input type="datetime-local" value={start_time} onChange={(e) => setStartTime(e.target.value)}
                           required/>
                </label>
                <label style={labelStyle}>
                    End Time:
                    <input type="datetime-local" value={end_time} onChange={(e) => setEndTime(e.target.value)}
                           required/>
                </label>
                <button type="submit">Save Event</button>
                <button type={"button"} onClick={() => { cancel()
                }}>Cancel
                </button>
            </form>
        </div>

    );
};

export default EventForm;