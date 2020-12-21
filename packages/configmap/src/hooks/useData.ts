import { useRef, useEffect, useState } from 'react';
import { useAPI, IConfigPoint, ILocation, requestsState, ERequestStatus, Guid, IDisplayImage } from '@kimfrost/shared';
import { useRecoilState } from 'recoil';

//import * as tempData from '../tempdata'

const useData = () => {

    const [points, setPoints] = useState<IConfigPoint[]>([]);
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(null);
    const [image, setImage] = useState<IDisplayImage|null>(null);
    //const [imageSrc, setImageSrc] = useState<string>('');

    const api = useAPI();
    const [request, setRequest] = useRecoilState(requestsState('locationImage'))

    useEffect(() => {
        if (api) {
            api.get('/crossorigin/GetAllowedUnits')
                .then(response => {
                    console.log(response)
                    setLocations(response.data)
                    setSelectedLocation(response.data[0])
                })
                .catch(error => console.log(error))
        }
    }, [])

    useEffect(() => {
        if (api && selectedLocation) {
            setRequest({
                Id: 'locationImage',
                status: ERequestStatus.PENDING
            })
            api.get(`/crossorigin/GetGraphicalDisplayImage?unitId=${selectedLocation.id}`)
                .then(response => {
                    const data = response.data as IDisplayImage
                    console.log('image', data)
                    window.URL.revokeObjectURL(data.pathToImage) // clear image cache
                    setImage(data)
                    //setImageSrc(response.data.imageBase64)
                    // const width = Math.floor(Math.random() * (2500 - 1200 + 1)) + 1200;
                    // const height = Math.floor(Math.random() * (2500 - 1200 + 1)) + 1200;
                    // setImageSrc(`https://via.placeholder.com/${width}x${height}/0`)
                    setRequest({
                        Id: 'locationImage',
                        status: ERequestStatus.SUCCESS
                    })
                })
                .catch(error => {
                    console.log(error)
                    setRequest({
                        Id: 'locationImage',
                        status: ERequestStatus.ERROR
                    })
                })
            api.get(`crossorigin/GetCustomerEquipment?unitId=${selectedLocation.id}`)
                .then(response => {
                    const newPoints: IConfigPoint[] = response.data.map((item: any) => {
                        return {
                            Id: item.customerId,
                            ZoneText: item.customerName,
                            Location: '',
                            Position: [0, 0],
                            IsActive: false,
                            Guid: Guid.newGuid()
                        }
                    });
                    api.get(`/crossorigin/GetConfiguration?unitId=${selectedLocation.id}`)
                        .then(response => {
                            setPoints(newPoints.map(point => {
                                response.data.map((config: any) => {
                                    if (point.Id === config.customerId) {
                                        point.Position = [config.xValue, config.yValue];
                                        point.IsActive = (config.xValue >= 0 && config.yValue >= 0);
                                        point.Guid = config.id;
                                    }
                                })
                                return point;
                            }))
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }
    }, [selectedLocation])

    // const savePoints = () => {
    //     const options = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(points)
    //     }
    //     fetch('http://localhost:5002/zones', options).then(async (response) => {
    //         const data = await response.json();
    //         if (!response.ok) {
    //             const error = (data && data.message) || response.status;
    //             return Promise.reject(error);
    //         }
    //     }).catch((error) => {
    //         console.error(error)
    //     })
    // }

    const savePoint = (point: IConfigPoint) => {
        if (api && image) {
            api.post('/crossorigin/SaveConfiguration', [
                {
                    id: point.Guid,
                    parentId: selectedLocation?.id,
                    graphicalDisplayImageId: image?.id,
                    customerId: point.Id,
                    zoneNumber: 530,
                    xValue: point.Position[0],
                    yValue: point.Position[1],
                }
            ])
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
    }

    return {
        points: points,
        setPoints: setPoints,
        locations: locations,
        selectedLocation: selectedLocation,
        setSelectedLocation: setSelectedLocation,
        image: image,
        setImage: setImage,
        savePoint: savePoint
    };
}
export default useData