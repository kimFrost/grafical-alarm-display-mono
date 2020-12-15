import { useRef, useEffect, useState } from 'react';
import { useAPI, IZone, ILocation, requestsState, ERequestStatus } from '@kimfrost/shared';
import { useRecoilState } from 'recoil';

import * as tempData from '../tempdata'

const useData = () => {

    const [points, setPoints] = useState<IZone[]>([]);
    const [locations, setLocations] = useState<ILocation[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(null);
    const [imageSrc, setImageSrc] = useState<string>('');

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
                    console.log('image', response)
                    setImageSrc(response.data.imageBase64)
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
                    const newPoints: IZone[] = response.data.map((item: any) => {
                        return {
                            Id: item.customerId,
                            ZoneText: item.customerName,
                            Location: '',
                            Position: [0, 0],
                            IsActive: false
                        }
                    });
                    api.get(`/crossorigin/GetConfiguration?unitId=${selectedLocation.id}`)
                        .then(response => {
                            setPoints(newPoints.map(point => {
                                response.data.map((config: any) => {
                                    if (point.Id === config.id) {
                                        point.Position = [config.xValue, config.yValue];
                                        point.IsActive = true;
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

    const savePoint = (point: IZone) => {
        if (api) {
            api.post('/crossorigin/SaveConfiguration', [
                {
                    id: point.Id,
                    unitId: selectedLocation?.id,
                    customerId: point.Id,
                    zoneNumber: 0,
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
        imageSrc: imageSrc,
        savePoint: savePoint
    };
}
export default useData