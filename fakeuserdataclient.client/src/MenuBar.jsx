import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MenuBar({onDataUpdate}) {
    const countries = [
        { label: 'United States', value: 'en_US' },
        { label: 'Russia', value: 'ru' },
        { label: 'Turkey', value: 'tr' },
        { label: 'Norway', value: 'nb_NO' },
      ];
  
    // const [selectedCountry, setSelectedCountry] = useState('');
  
    // const handleSelectCountry = (event) => {
    //   setSelectedCountry(event.target.value);
    // };    

    const [region, setRegion] = useState('en_US');
    const [seed, setSeed] = useState(0);
    const [errors, setErrors] = useState(0);

    useEffect(() => {
        onDataUpdate({ region, seed, errors });
    }, [seed, region, errors]);

    // Event handler for region input change
    const handleRegionChange = (event) => {
        setRegion(event.target.value);
        // onDataUpdate({ region, seed }); // Call the callback function with data
    };

    // Event handler for seed input change
    const handleSeedChange = (event) => {
        setSeed(event.target.value);
    };

    const handleErrorsChange = (event) => {
        setErrors(event.target.value);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Menu</a>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <div>
                        <select value={region} onChange={handleRegionChange}>
                            <option value="">Select a country</option>
                            {countries.map((country) => (
                            <option key={country.value} value={country.value}>
                                {country.label}
                            </option>
                            ))}
                        </select>
                    </div>
                </li>

            {/* <RegionDropdown onRegionUpdate={handleRegionUpdate} /> */}
                {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
                </li> */}
                {/* <span>Errors:</span> */}
                <li>Errors: </li>
                <li className="nav-item">
                    <input type="range" className="form-range" min="0" max="10" step="0.25" value={errors} onChange={handleErrorsChange}/>
                </li>

                {/* <li className="nav-item">
                    <input type="range" className="form-range" />
                </li> */}
                <li className="nav-item">
                    <input type="number" className="form-control" placeholder='0' min="0" max="1000" step="0.25" value={errors} onChange={handleErrorsChange}/>
                </li>
                <li>Seed:</li>
                <li className="nav-item">
                    <input type="number" className="form-control" placeholder="Seed" value={seed} onChange={handleSeedChange} />
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}

export default MenuBar;

// import React, { useState } from 'react';

// function MenuBar() {
//       const [errors, setErrors] = useState(0);
//       const [seed, setSeed] = useState(0);
    
//       const handleErrorsChange = (event) => {
//         setErrors(event.target.value);
//       };
    
//       const handleSeedChange = (event) => {
//         setSeed(event.target.value);
//       };

//     return (
//         <nav>
//             <div>
//                 <label htmlFor="errorsSlider">Errors:</label>
//                 <input
//                 type="range"
//                 id="errorsSlider"
//                 min="0"
//                 max="10"
//                 value={errors}
//                 onChange={handleErrorsChange}
//                 />
//                 <span>{errors}</span>
//             </div>
//             <div>
//                 <label htmlFor="seedInput">Seed:</label>
//                 <input
//                 type="text"
//                 id="seedInput"
//                 value={seed}
//                 onChange={handleSeedChange}
//                 />
//             </div>
//         </nav>
//     )
// }

// export default MenuBar
