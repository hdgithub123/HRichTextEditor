const ParentComponent = ({ onClick }) => {
    return (
        <button onClick={onClick} style={{ padding: '10px', cursor: 'pointer' }}>
            Click to Toggle
        </button>
    );
};



const ChildComponent = () => {
    return (
        <ul style={{
            background: 'white',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
            padding: '10px',
            listStyle: 'none',
            width: '150px'
        }}>
            <li style={{ padding: '5px 0', cursor: 'pointer' }}>Option 1</li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }}>Option 2</li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }}>Option 3</li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }}>Option 1</li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }}>Option 2</li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }}>Option 3</li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }}>Option 1</li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }}>Option 2</li>
            <li style={{ padding: '5px 0', cursor: 'pointer' }}>Option 3</li>
        </ul>
    );
};



import React from 'react';
import DropListComponent from './DropListComponent';

const Vidu = () => {
    return (
        <div>
            <DropListComponent ParentComponent={ParentComponent} ChildComponent={ChildComponent} />
        </div>
    );
};

export default Vidu;