import { IAlarm, ILocation, IZone, EAlarmType } from "./types"

const zones = require("./public/zones.json");

interface IData {
    alarms: IAlarm[],
    zones: IZone[],
    locations: ILocation[]
}


const data: IData = {
    alarms: [],
    zones: [...zones],
    locations: [
        {
            Id: 'DreamAvenue',
            ImageUrl: '5dd854218135ad200a121f2d232146c8.jpg'
            //ImageUrl: 'http://placekitten.com/g/2500/2000'
        },
        {
            Id: 'ShadyPines',
            ImageUrl: 'floor_plan_02.jpg'
            //ImageUrl: 'http://placekitten.com/g/2000/2500'
        },
        {
            Id: 'CozyFields',
            ImageUrl: 'floor_plan_03.jpg'
            //ImageUrl: 'http://placekitten.com/g/2500/2500'
        }
    ]
}

export default data