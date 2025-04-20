import React, { useState } from 'react';
import Cookies from 'js-cookie';

const onEventCreate = async (event: { start_time: string; end_time: string; description: string; title: string }) => {
    try {
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        //
        // const csrfToken = Cookies.get('csrftoken');
        // if (!csrfToken) {
        //     console.error('CSRF token not found');
        //     return;
        // }
        // headers.append('x-CSRFToken', csrfToken);

        const response = await fetch('http://localhost:8000/api/create/', {
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

const EventForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onEventCreate({ title, description, start_time, end_time }).then(() => {
            setTitle('');
            setStartTime('');
            setEndTime('');
            setDescription('');
        }).catch((error => { console.log(error) }));

    };

    return (
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
                <input type="datetime-local" value={end_time} onChange={(e) => setEndTime(e.target.value)} required/>
            </label>
            <button type="submit">Create Event</button>
        </form>
    );
};

export default EventForm;