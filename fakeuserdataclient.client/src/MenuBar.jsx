import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FaShuffle } from "react-icons/fa6";

function MenuBar({onDataUpdate}) {
    const countries = [
        { label: 'USA', value: 'en_US' },
        { label: 'Russia', value: 'ru' },
        { label: 'Turkey', value: 'tr' },
        { label: 'Sweden', value: 'sv' },
        { label: 'Germany', value: 'de' },
    ];

    const [region, setRegion] = useState('en_US');
    const [seed, setSeed] = useState(0);
    const [errors, setErrors] = useState(0);

    useEffect(() => {
        onDataUpdate({ region, seed, errors });
    }, [seed, region, errors]);

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const handleSeedChange = (event) => {
        setSeed(event.target.value);
    };

    const setRandomSeed = () => {
        const maxInt32Value = 2147483647;
        setSeed(Math.floor(Math.random() * maxInt32Value));
    };

    const handleErrorsChange = (event) => {
        setErrors(event.target.value);
    };
    
    return (
        <Navbar className="bg-body-tertiary">
            <Nav className="mx-auto">
                <Navbar.Text className='me-2'>Region:</Navbar.Text>
                <Form.Select value={region} onChange={handleRegionChange}>
                        {countries.map((country) => (
                            <option key={country.value} value={country.value}>
                                {country.label}
                            </option>
                        ))}
                </Form.Select>
            </Nav>

            <Nav className="mx-auto">
                <Navbar.Text>Errors:</Navbar.Text>
                <Form.Range className='custom-slider' min="0" max="10" step="0.25" value={errors} onChange={handleErrorsChange} />
                <Form.Control value={errors} onChange={handleErrorsChange} 
                    type="number" className="mr-sm-2" min="0" max="1000" step="0.25" />
            </Nav>

            <Nav className="mx-auto">
                <Navbar.Text className='me-2'>Seed:</Navbar.Text>
                <Form.Control value={seed} onChange={handleSeedChange} type="number" className="mr-sm-2" />
                <Button variant='light' onClick={setRandomSeed}><FaShuffle /></Button>
            </Nav>
        </Navbar>
    );
}

MenuBar.propTypes = {
    onDataUpdate: PropTypes.func
}
export default MenuBar;
