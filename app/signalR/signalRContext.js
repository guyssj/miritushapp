// context/SignalRContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { startConnection, getConnection } from './signalRService';

const SignalRContext = createContext();

/**
 * Context provider for SignalR connection.
 * @param {Object} props The properties object.
 * @param {React.ReactNode} props.children The child components.
 * @returns {JSX.Element} The context provider component.
 */
export const SignalRProvider = ({ children }) => {
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const initConnection = async () => {
            await startConnection();
            setConnection(getConnection());
        };
        initConnection();
    }, []);

    return (
        <SignalRContext.Provider value={connection}>
            {children}
        </SignalRContext.Provider>
    );
};


/**
 * Hook to use the SignalR context.
 * @returns {signalR.HubConnection|null} The SignalR connection instance.
 */
export const useSignalR = () => {
    return useContext(SignalRContext);
};