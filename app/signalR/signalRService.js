import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5070/miritushHubs")
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Debug)
    .build();

/**
 * Starts the SignalR connection and retries on failure.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */
export const startConnection = async () => {
    try {
        await connection.start();
        console.log('SignalR connected');
    } catch (error) {
        console.log('SignalR connection error: ', error);
        setTimeout(startConnection, 5000); // Retry connection
    }
};

/**
 * Returns the SignalR connection instance.
 * @returns {signalR.HubConnection} The SignalR connection instance.
 */
export const getConnection = () => connection;