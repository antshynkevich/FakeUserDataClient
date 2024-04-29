import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";

function RegionDropdown() {
    const countries = [
      { label: 'United States', value: 'en_US' },
      { label: 'Russia', value: 'ru' },
      { label: 'Turkey', value: 'tr' },
      { label: 'Norway', value: 'nb_NO' },
    ];

  const [selectedCountry, setSelectedCountry] = useState('');

  const handleSelectCountry = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <>
      <div>
        <select value={selectedCountry} onChange={handleSelectCountry}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
      </div>

      <p>Selected value: {selectedCountry}</p>
    </>
  )
}

export default RegionDropdown;