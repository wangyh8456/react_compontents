import React from 'react';
import { createRoot } from 'react-dom/client';
import JcInput from '../../src/index';

const App = () => {
    return (
        <div>
            <JcInput />
        </div>
    )
}

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);