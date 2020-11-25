
import { useRef, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ERequestStatus, IAlarm } from '../Types/types';
import { requestsState } from './../State/atoms';

const useAlarmInteraction = (alarm: IAlarm) => {
    const [request, setRequest] = useRecoilState(requestsState(alarm.Id))

    const acceptAlarm = () => {
        setRequest({
            Id: alarm.Id,
            status: ERequestStatus.PENDING
        })
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Id: alarm.Id
            })
        }
        fetch('http://localhost:5002/accept', options).then(async (response) => {

            //const data = await response.json();
            if (!response.ok) {
                //const error = (data && data.message) || response.status;
                //return Promise.reject(error);
                return Promise.reject();
            }
            else {
                setRequest({
                    Id: alarm.Id,
                    status: ERequestStatus.SUCCESS
                })
            }
        }).catch((error) => {
            console.error(error)
            setRequest({
                Id: alarm.Id,
                status: ERequestStatus.ERROR
            })
        })
    }

    const rejectAlarm = () => {
        setRequest({
            Id: alarm.Id,
            status: ERequestStatus.PENDING
        })
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Id: alarm.Id
            })
        }
        fetch('http://localhost:5002/reject', options).then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else {
                setRequest({
                    Id: alarm.Id,
                    status: ERequestStatus.SUCCESS
                })
            }
        }).catch((error) => {
            setRequest({
                Id: alarm.Id,
                status: ERequestStatus.ERROR
            })
        })
    }
    return {
        acceptAlarm,
        rejectAlarm,
        request
    }

}
export default useAlarmInteraction
