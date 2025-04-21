import React, {useEffect, useState} from 'react';

interface EditEventProps {
    title: string,
    startTime: string,
    endTime: string,
    description: string,
    id: number,
    track?: string,
    cancel: () => void,
    setRefresh: (value: (((prevState: boolean) => boolean) | boolean)) => void
}


const editEventForm: React.FC<EditEventProps> = ({
                                                     startTime,
                                                     endTime,
                                                     description,
                                                     id,
                                                     cancel,
                                                     title,
                                                     track,
                                                     setRefresh
                                                 }) => {
    const [descriptionState, setDescription] = useState(description);
    const [startTimeState, setStartTime] = useState(startTime ? new Date(startTime).toISOString().slice(0, 16) : '');
    const [endTimeState, setEndTime] = useState(endTime ? new Date(endTime).toISOString().slice(0, 16) : '');
    const [titleState, setTitle] = useState(title);
    const [trackState, setTrack] = useState(track);
    const [trackList, setTrackList] = useState<string[]>([]);

    const fetchTracks = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/tracks/');
            if (!response.ok) {
                throw new Error('Failed to fetch tracks');
            }
            const data = await response.json();
            setTrackList(data);
        } catch (error) {
            console.error('Error fetching tracks:', error);
        }
    };

    useEffect(() => {
        fetchTracks()
    }, []);


    const onEventEdit = async (event: {
        descriptionState: string;
        endTimeState: string;
        startTimeState: string;
        titleState: string;
        trackState: string;
    }) => {
        try {

            const response = await fetch('http://localhost:8000/api/event/update/' + id, {
                method: 'PATCH',
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
        onEventEdit({startTimeState, endTimeState, descriptionState, trackState, titleState}).then(() => {
            setRefresh(true)
            }
        )
            .catch((error => {
                console.log(error)
            }));
    };

    const handleDelete = async (e: React.FormEvent) => {
        try {
            const response = await fetch('http://localhost:8000/api/event/destroy/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.log(response)
                throw new Error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }




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
            <h3>Edit {title}</h3>

            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>
                    Title:
                    <input type="text" value={titleState} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label style={labelStyle}>
                    Type:
                    <input type="text" value={descriptionState} onChange={(e) => setDescription(e.target.value)}
                           />
                </label>
                <label style={labelStyle}>
                    Start Time:
                    <input type="datetime-local" value={startTimeState} onChange={(e) => setStartTime(e.target.value)}
                           />
                </label>
                <label style={labelStyle}>
                    End Time:
                    <input type="datetime-local" value={endTimeState} onChange={(e) => setEndTime(e.target.value)}
                           />
                </label>

                <label style={labelStyle}>
                    Track:
                    <select value={trackState} onChange={(e) => setTrack(e.target.value)} >
                        {trackList.length > 0 ? trackList.map((track, index) => {
                            console.log(track)
                            return (
                                <option key={track['id']} value={track['id']}>{track['title']}</option>
                            )
                        }) : ""
                        }

                    </select>
                </label>

                <button type="submit">Update Event</button>
                <button type="button" onClick={(e) => {
                    handleDelete(e)
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