import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import './App.css';
import Generator from './Generator';
import FetchData from './FetchData';

function App() {
    //const [fakeRecords, setFakeRecords] = useState();

    //useEffect(() => {
    //    populateFakeUserRecordsData();
    //}, []);

    //const contents = fakeRecords === undefined
    //    ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
    //    : <table className="table table-striped" aria-labelledby="tabelLabel">
    //        <thead>
    //            <tr>
    //                <th>ID</th>
    //                <th>FULL NAME</th>
    //                <th>STREET ADDRESS</th>
    //                <th>PHONE</th>
    //            </tr>
    //        </thead>
    //        <tbody>
    //            {fakeRecords.map(record =>
    //                <tr key={record.id}>
    //                    <td>{record.id}</td>
    //                    <td>{record.fullName}</td>
    //                    <td>{record.streetAddress}</td>
    //                    <td>{record.phone}</td>
    //                </tr>
    //            )}
    //        </tbody>
    //    </table>;

    //return (
    //    <div>
    //        <h1 id="tabelLabel">Weather forecast</h1>
    //        <p>This component demonstrates fetching data from the server.</p>
    //        {contents}
    //    </div>
    //);

    //async function populateFakeUserRecordsData() {
    //    const response = await fetch('api/generator', {method:
    //    "GET"})
    //        .then(response => console.log(response))
    //        .catch(error => console.error(error));
    //    const data = await response.json();
    //    console.log(data);
    //    setFakeRecords(data);
    //    console.log(fakeRecords);
    //}

    return (
        <div>
            {/* <Generator></Generator> */}
            <FetchData></FetchData>
        </div>
    );
}

export default App;