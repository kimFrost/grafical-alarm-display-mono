import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'
import MultiBackend, { TouchTransition } from "react-dnd-multi-backend";
import { RecoilRoot } from 'recoil';
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

ReactDOM.render(
    <DndProvider backend={MultiBackend as any} options={HTML5toTouch}>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </DndProvider>,
    document.getElementById('root')
);
