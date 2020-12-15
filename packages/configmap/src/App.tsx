import React, { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { getEmptyImage } from 'react-dnd-html5-backend';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';

import {
    DragLayer,
    DraggableNode,
    Point,
    requestsState,
    ERequestStatus
} from '@kimfrost/shared';

import './App.scss';

import ImageUploader from './Components/ImageUploader';
import useData from './hooks/useData';
import { useRecoilState } from 'recoil';


interface INavItemProps {
    id: string,
    type: string,
    active: boolean
}

const NavItem: React.FC<INavItemProps> = ({ id, type, active, children }) => {
    const [{ isDragging }, drag, preview] = useDrag({
        item: { id, type, active, children },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        // end: (item, monitor) => {
        //     const dropResult = monitor.getDropResult();
        //     if (dropResult) {
        //         const { name } = dropResult;
        //         console.log('dropResult', dropResult, item)
        //     }
        // }
    })

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, [])

    return (
        <div ref={drag}
            className={['app__aside-item', (active ? 'app__aside-item--active' : null)].join(' ')}
        >
            {children}
        </div>
    )
}


const App = () => {

    const [request] = useRecoilState(requestsState('locationImage'))
    const imageRef = useRef<HTMLImageElement>(null);
    const {
        locations,
        selectedLocation,
        setSelectedLocation,
        points,
        setPoints,
        imageSrc,
        savePoint
    } = useData()



    const [{ }, dropTarget] = useDrop({
        accept: ['NAVITEM', 'POINT'],

        drop: (item: any, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset(); // mouse delta
            //const initLocalOffset = monitor.getInitialSourceClientOffset(); // point offset when drag started
            const initLocalOffset = monitor.getInitialClientOffset(); // mouse offset when drag started
            //const vPos = monitor.getClientOffset();
            if (imageRef && imageRef.current && delta && initLocalOffset) {

                const vPos = { x: initLocalOffset.x + delta.x, y: initLocalOffset.y + delta.y }
                const targetRect = imageRef.current.getBoundingClientRect();
                const [x, y] = [vPos.x - targetRect.left, vPos.y - targetRect.top];

                setPoints(points.map(point => {
                    if (point.Id === item.id) {
                        if (imageRef && imageRef.current) {
                            point.Position = [x / targetRect.width, y / targetRect.height];
                            point.IsActive = true;
                        }
                    }
                    return point
                }))
                const point = points.find(point => point.Id === item.id);
                if (point) savePoint(point)
            }
        }
    })

    const [{ canDrop, isOver }, dropDeleteTarget] = useDrop({
        accept: ['POINT'],
        options: {

        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item, monitor) => {
            return (item.type === 'POINT')
        },
        drop: (item: any, monitor) => {
            //const result = monitor.getDropResult() // should drop handler return result?
            setPoints(points.map(point => {
                if (point.Id === item.id) {
                    point.IsActive = false;
                }
                return point
            }))
            const point = points.find(point => point.Id === item.id);
            if (point) savePoint(point)
        }
    })

    const getFileFromInput = (file: File): Promise<any> => {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function () { resolve(reader.result); };
            reader.readAsBinaryString(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
        });
    }

    const manageUploadedFile = (binary: String, file: File) => {
        console.log(`The file size is ${binary.length}`);
        console.log(`The file name is ${file.name}`);
    }
    return (
        <div className="app">
            <div className="app__body">
                <div className={[
                    'app__aside',
                    canDrop ? 'app__aside--accept' : null,
                    (canDrop && isOver) ? 'app__aside--drop' : null
                ].join(' ')} ref={dropDeleteTarget}>
                    {points.map((point, index) => (
                        <NavItem
                            key={index}
                            id={point.Id}
                            active={point.IsActive}
                            type="NAVITEM"
                        >
                            <Point>
                                <SettingsRemoteIcon fontSize="inherit" />
                            </Point>
                            {point.Id}
                        </NavItem>
                    ))}
                </div>
                <div className="app__controls">
                    <Select value={selectedLocation ? (selectedLocation as any).id : null} variant="outlined" onChange={(e) => {
                        const location = locations.find(location => (location as any).id === e.target.value);
                        if (location) {
                            setSelectedLocation(location)
                        }
                    }}>
                        {locations.map(location => (
                            <MenuItem key={(location as any).id} value={(location as any).id}>{(location as any).id}</MenuItem>
                        ))}
                    </Select>

                    <ImageUploader id={selectedLocation?.id} />

                </div>
                <div className="app__map">
                    {request && request.status === ERequestStatus.PENDING &&
                        <div>Loading</div>
                    }
                     {request && request.status === ERequestStatus.ERROR &&
                        <div>Could not load image</div>
                    }
                    {request && request.status === ERequestStatus.SUCCESS &&
                        <div className="app__image" ref={(ref) => {
                            dropTarget(ref);
                        }}>
                            <div
                                className="app__points">
                                {points.map((point, index) => (
                                    point.IsActive ?
                                        <DraggableNode key={index} id={point.Id} left={point.Position[0]} top={point.Position[1]}>
                                            <Point>
                                                {/* {point.Id} */}
                                                <SettingsRemoteIcon fontSize="inherit" />
                                            </Point>
                                        </DraggableNode>
                                        : null
                                ))}
                            </div>
                            <DragLayer />
                            <img src={imageSrc} alt="" ref={imageRef} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default App;
