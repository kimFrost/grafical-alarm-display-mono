import React, { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { getEmptyImage } from 'react-dnd-html5-backend';
import { Select } from '@material-ui/core';
import Axios from 'axios';

import {
    IZone,
    DragLayer,
    DraggableNode
} from '@kimfrost/shared';

import './App.scss';


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

    const imageRef = useRef<HTMLImageElement>(null);

    const [points, setPoints] = useState<IZone[]>([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('http://localhost:5002/zones', options).then(async (response) => {
            const data = await response.json();
            setPoints(data)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

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
                savePoints()
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
            savePoints()
        }
    })

    const savePoints = () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(points)
        }
        fetch('http://localhost:5002/zones', options).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        }).catch((error) => {
            console.error(error)
        })
    }

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
                            {point.Id}
                        </NavItem>
                    ))}
                </div>
                <div className="app__controls">
                    <input type="file" accept="image/*" onChange={(e) => {
                        e.persist();
                        if (e.target && e.target.files) {
                            Array.from(e.target.files).forEach(file => {

                                const formData = new FormData();
                                formData.append('image', file);
                                Axios.post('http://localhost:5002/upload', formData, {
                                    onUploadProgress: e => {
                                        let progress = Math.round(
                                            e.loaded / e.total * 100) + '%';
                                        console.log('progress', progress)
                                    }
                                }).then(res => {
                                    console.log(res);
                                    // getFile({
                                    //     name: res.data.name,
                                    //     path: 'http://localhost:4500' + res.data.path
                                    // })
                                }).catch(err => console.log(err))

                                // getFileFromInput(file)
                                //     .then((binary) => manageUploadedFile(binary, file))
                                //     .catch((reason) => {
                                //         console.log(`Error during upload ${reason}`);
                                //         e.target.value = ''; // to allow upload of same file if error occurs
                                //     })
                            });
                        }

                        // var file = e.target.files[0];
                        // const reader = new FileReader();
                        // var url = reader.readAsDataURL(file);

                        // reader.onloadend = function (e) {
                        //     this.setState({
                        //         selectedFile: [reader.result]
                        //     });
                        // }.bind(this);
                        // console.log(url); // Would see a path?

                        // this.setState({
                        //     mainState: "uploaded",
                        //     selectedFile: e.target.files[0],
                        //     imageUploaded: 1
                        // });
                    }} />
                    {/* <Select value={selectedLocation} variant="outlined" onChange={(e) => setSelectedLocation(e.target.value as any)}>
                        {locations.map(location => (
                            <MenuItem key={location.Id} value={location as any}>{location.Id}</MenuItem>
                        ))}
                    </Select> */}
                </div>
                <div className="app__map">
                    <div className="app__image" ref={(ref) => {
                        dropTarget(ref);
                    }}>
                        <div
                            className="app__points">
                            {points.map((point, index) => (
                                point.IsActive ?
                                    <DraggableNode key={index} id={point.Id} left={point.Position[0]} top={point.Position[1]}>
                                        <div className="point">{point.Id}</div>
                                    </DraggableNode>
                                    : null
                            ))}
                        </div>
                        <DragLayer />
                        <img src="./images/5dd854218135ad200a121f2d232146c8.jpg" alt="" ref={imageRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
