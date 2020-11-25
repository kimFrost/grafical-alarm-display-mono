import { atom, atomFamily, RecoilState, selector, selectorFamily } from "recoil";
import { IAlarm, ILocation, IRequest } from '../Types/types';



//RecoilState<IAlarm | null>
export const selectedAlarmState = atom<IAlarm | null>({
    key: "selectedAlarm",
    default: null
});

export const selectedLocationState = atom<ILocation | null>({
    key: "selectedLocation",
    default: null
});

export const requestState = atom<IRequest[]>({
    key: 'requests',
    default: []
})

// export const requestsState = atomFamily<IRequest, string>({
//     key: 'request',
//     default: {
//         Id: '',
//         status: ERequestStatus.PENDING
//     },
// });

export const requestsState = selectorFamily<IRequest | undefined, string>({
    key: 'request',
    get: Id => ({ get }) => {
        const requests = get(requestState);
        const request = requests.find(request => request.Id === Id)
        return request;
    },
    set: Id => ({ get, set }, newValue) => {
        console.log('set required by Id', Id, newValue)
        if (newValue) {
            const requests = get(requestState);
            console.log('requests', requests)
            set(requestState, [
                ...requests.filter(request => request.Id !== Id),
                {
                    Id: Id,
                    status: (newValue as any).status
                }
            ])
        }
    }
})


// const myDataQuery = selectorFamily({
//     key: 'MyDataQuery',
//     get: (queryParameters) => async ({ get }) => {
//         const response = await asyncDataRequest(queryParameters);
//         if (response.error) {
//             throw response.error;
//         }
//         return response.data;
//     },
// });
//const data = useRecoilValue(myDataQuery({userID: 132}));


// useEffect(() => {
//     if (selectedAlarm) {
//         const alarmLocation = locations.find(location => location.Id === selectedAlarm.Location)
//         if (alarmLocation) setSelectedLocation(alarmLocation)
//     }
// }, [selectedAlarm, locations])