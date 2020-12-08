import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'
import MultiBackend, { TouchTransition } from "react-dnd-multi-backend";
import { RecoilRoot } from 'recoil';
import { APIKit, APIProvider, LoginFlow } from '@kimfrost/shared';
import App from './App';
import './index.scss';


const HTML5toTouch = {
    backends: [
        {
            backend: HTML5Backend
        },
        {
            backend: TouchBackend, // Note that you can call your backends with options
            options: { enableMouseEvents: true },
            preview: true,
            transition: TouchTransition
        }
    ]
};

const api = new APIKit({
    baseURL: 'https://localhost:8083/api',
    timeout: 5000,
    headers: {
        ctAuthKey: "C551E850-5BD5-4159-8505-85A11C75E4DB"
    }
})

ReactDOM.render(
    <DndProvider backend={MultiBackend as any} options={HTML5toTouch}>
        <APIProvider api={api}>
            <RecoilRoot>
                <LoginFlow>
                    <App />
                </LoginFlow>
            </RecoilRoot>
        </APIProvider>
    </DndProvider>,
    document.getElementById('root')
);


