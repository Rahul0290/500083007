import React, { useEffect, useState } from 'react';
import { getAllTrains, getAuthToken } from './API';
import TrainList from './TrainList';

function App() {
    const [trains, setTrains] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            // This should be stored securely and not hardcoded.
            const authData = {
                companyName: "Train Central",
                clientID: "b46128a0-fbde-4c16-a4b1-6ae6ad718e27",
                ownerName: "Ram",
                ownerEmail: "ram@abc.edu",
                rollNo: "1",
                clientSecret: "XOyolORPayKBOdAN"
            };
            const response = await getAuthToken(authData);
            const authToken = response.data.access_token;
            setToken(authToken);
            

            const trainsData = await getAllTrains(authToken);
            setTrains(trainsData.data);
            console.log(trainsData);
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <TrainList trains={trains} />
        </div>
    );
}

export default App;
