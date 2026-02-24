import { createContext, useContext, useEffect, useRef } from 'react'
import { getSocket, connectSocket, disconnectSocket } from './socket'

const SocketContext = createContext(null)

export function SocketProvider({ children }) {
    const socketRef = useRef(null)

    useEffect(() => {
        socketRef.current = getSocket()
        connectSocket()
        return () => disconnectSocket()
    }, [])

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    )
}

export function useSocket() {
    return useContext(SocketContext)
}
