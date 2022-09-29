import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Input, notification } from '../../src/index';

const App = () => {
    const [val, setVal] = useState(2);
    const inputRef = useRef(null)
    
    const changeValue = () => {
        setVal(val+1);
    }

    useEffect(() => {
        // console.log(notification, 'notification');
        console.log(inputRef.current, 'inputRef');
        notification.warning({message:'111'});
    }, [])
    

    return (
        <div>
            <Input ref={inputRef}  value={val}/>
            <button onClick={()=>changeValue()}>改变</button>
        </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);