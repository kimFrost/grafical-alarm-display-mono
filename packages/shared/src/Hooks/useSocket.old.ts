
import { useRef, useEffect, useState } from 'react';

const useSocket = (url: string) => {
    const ws = useRef<WebSocket | null>();
    const [lastMessage, setLastMessage] = useState<WebSocketEventMap['message'] | null>(null);
    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:5002");
        console.log('new connection')
        ws.current.onopen = () => {
            console.log('Conenction established')
        }
        ws.current.onmessage = (e) => {
            //setLastMessage(e.data)
            // const event = JSON.parse(e.data);
            // const data = event.data;
        }
        ws.current.onclose = () => {

        }
        ws.current.onerror = (error) => console.log('Conenction error', error)
    }, []);

    return {

    }

    // useEffect(() => {
    //     ref.current = value;
    // });
    // return ref.current as T;

}
export default useSocket