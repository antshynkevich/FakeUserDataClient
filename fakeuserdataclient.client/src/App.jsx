import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import Generator from './Generator';
import MenuBar from './MenuBar';

function App() {
    const [dataFromMenu, setDataFromMenu] = useState({ region: 'en_US', seed: 0, errors: 0 });

    const handleDataUpdate = (data) => {
        setDataFromMenu(data);
    };
    
    return (
        <div>
            <MenuBar onDataUpdate={handleDataUpdate} />
            <Generator region={dataFromMenu.region} seed={dataFromMenu.seed} errors={+dataFromMenu.errors} />
        </div>
    );
}

export default App;
