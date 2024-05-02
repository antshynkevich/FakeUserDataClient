import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { CSVLink } from "react-csv";
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

function Generator(props) {
    const [fakeRecords, setFakeRecords] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(2);

    const getRecords = async () => {
        const options = {
            method: 'GET'
        }
        const errorToLink = Math.floor((props.errors > 1000 ? 1000 : props.errors) * 100);
        const result = await fetch(`http://www.fakeuserdataapi.somee.com/api/generator/params?page=1&region=${props.region}&seed=${props.seed}&errors=${errorToLink}`, options);
        if (result.ok) {
            const records = await result.json();
            setFakeRecords(records);
        }
    };

    //http://www.fakeuserdataapi.somee.com/api/
    //https://localhost:7145/api/

    const getMoreRecords = async () => {
        const options = {
            method: 'GET'
        }
        const errorToLink = Math.floor((props.errors > 1000 ? 1000 : props.errors) * 100);
        const result = await fetch(`http://www.fakeuserdataapi.somee.com/api/generator/params?page=${index}&region=${props.region}&seed=${props.seed}&errors=${errorToLink}`, options);
        if (result.ok) {
            const records = await result.json();
            setFakeRecords((prevItems) => [...prevItems, ...records]);
            records.length > 0 ? setHasMore(true) : setHasMore(false);
            setIndex(index + 1);
        } 
    };

    useEffect(() => {
        setIndex(2);
        getRecords();
    }, [props]);

    const headers = [
        { label: "Id", key: "id" },
        { label: "Full name", key: "fullName" },
        { label: "Post Address", key: "streetAddress" },
        { label: "Phone number", key: "phone" }
    ];

    let numberInTable = 0;

    return (
        <div>
            <div className="d-grid my-1 mx-2">
                <CSVLink className='btn btn-outline-success' data={fakeRecords} headers={headers}>
                    Export to CSV file
                </CSVLink>
            </div>
            <InfiniteScroll
                dataLength={fakeRecords.length}
                next={getMoreRecords}
                hasMore={hasMore}
            >
                <Table striped bordered hover variant='light'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>FULL NAME</th>
                            <th>STREET ADDRESS</th>
                            <th>PHONE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fakeRecords.map(record =>
                            <tr key={record.id}>
                                <td>{ ++numberInTable }</td>
                                <td>{record.id}</td>
                                <td>{record.fullName}</td>
                                <td>{record.streetAddress}</td>
                                <td>{record.phone}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </InfiniteScroll>
        </div> 
    )
}

Generator.propTypes = {
    seed: PropTypes.number,
    errors: PropTypes.number,
    region: PropTypes.string
}

export default Generator;
