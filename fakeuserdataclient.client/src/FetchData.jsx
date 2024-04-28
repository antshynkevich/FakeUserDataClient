import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

function FetchData() {
    const [fakeRecords, setFakeRecords] = useState([]);

    const getRecords = async () => {
        const options = {
            method: 'GET'
        }
        const result = await fetch('https://localhost:7145/api/generator', options)
        if (result.ok) {
            const records = await result.json();
            setFakeRecords(records);
            // console.table(records);
            // return records;
        }
    }

    useEffect(() => {
        getRecords();
    }, []);

    // function fetchFakeUserData() {
    //     try{
    //         const response = fetch('https://localhost:7145/api/generator');
    //         // if (!response.ok){
    //         //     throw new Error('Could not fetch resource');
    //         // }

    //         const data = response.json;
    //         console.log(data);
    //         setFakeRecords(data);
            
    //     }
    //     catch(error){
    //         console.error(error);
    //     }

    //     //const response = await fetch('https://localhost:7145/api/generator')
    //     //    .then(response => response.json())
    //     //    .then(data => console.log(data[0]))
    //     //    .catch(error => console.error(error));
    //     //const data = await response.json();
    //     //setFakeRecords(data);
    // }

    // fetchFakeUserData();

    return (
        <div>
            <h1>Hello from FetchData!</h1>
             {fakeRecords === undefined ? <h2>something went wrong</h2> :
                <h2>all right! and array length = {fakeRecords.length}</h2>}
                        
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FULL NAME</th>
                        <th>STREET ADDRESS</th>
                        <th>PHONE</th>
                    </tr>
                </thead>
                <tbody>
                    {fakeRecords.map(record =>
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.fullName}</td>
                            <td>{record.streetAddress}</td>
                            <td>{record.phone}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default FetchData
