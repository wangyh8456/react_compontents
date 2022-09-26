import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { Input } from '../../src/index';

const App = () => {
    const [val, setVal] = useState(2);

    const changeValue = () => {
        setVal(val+1);
    }
    return (
        <div>
            <Input  value={val} />
            <button onClick={()=>changeValue()}>改变</button>
        </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);