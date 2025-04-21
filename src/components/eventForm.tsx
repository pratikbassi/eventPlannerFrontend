import React, {useState} from 'react';
import Cookies from 'js-cookie';

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
    setRefresh: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const EventForm: React.FC = ({setRefresh}: EventFormProps) => {
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

    return (
        <div className={"modal"}>
            <h3>Create Event</h3>

            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </label>
                <label>
                    Type:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label>
                    Start Time:
                    <input type="datetime-local" value={start_time} onChange={(e) => setStartTime(e.target.value)}
                           required/>
                </label>
                <label>
                    End Time:
                    <input type="datetime-local" value={end_time} onChange={(e) => setEndTime(e.target.value)}
                           required/>
                </label>
                <button type="submit">Save Event</button>
            </form>
        </div>

    );
};

export default EventForm;