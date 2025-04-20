import {useEffect, useState} from "react";
import Row from "@/components/row";
import Column from "@/components/column";
import EventForm from "@/components/eventForm";

let getData = async () => {
    const res = await fetch("http://localhost:8000/api/events/",);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}


export default function Home() {
    const [data, setData] = useState<any>(null);
    const [orientation, setOrientation] = useState<any>('landscape');

    useEffect(() => {
        getData()
            .then((data) => {
                setData(data);
                console.log(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleOrientationChange = () => {
        if (orientation === 'landscape') {
            setOrientation('portrait');
        } else {
            setOrientation('landscape');
        }
    };

    return (
        <div>
            <main>
                <h1>Event List</h1>
                <button onClick={() => { handleOrientationChange() }}>Change Orientation</button>
                <EventForm></EventForm>
                {data ? (orientation === 'landscape' ? <Row events={data} /> : <Column events={data} /> ) : "Loading..."}

            </main>
            <footer>

            </footer>
        </div>
  );
}
