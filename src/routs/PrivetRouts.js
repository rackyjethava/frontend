import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivetRouts(props) {
    const auth=true;
    return (
        <div>
            {
                auth ?<Outlet /> :<Navigate to="/" replace/>
            }
        </div>
    );
}

export default PrivetRouts;