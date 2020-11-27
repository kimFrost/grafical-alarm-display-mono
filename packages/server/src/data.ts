import { IAlarm, IConfiguration, ILocation, IZone, EAlarmType } from '@kimfrost/shared';

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
            ImageUrl: 'http://localhost:5002/images/5dd854218135ad200a121f2d232146c8.jpg'
        },
        {
            Id: 'ShadyPines',
            ImageUrl: 'http://localhost:5002/images/floor_plan_02.jpg'
        },
        {
            Id: 'CozyFields',
            ImageUrl: 'http://localhost:5002/images/floor_plan_03.jpg'
        }
    ]
}

export const configuration: IConfiguration = {
    sounds: new Map([
        [EAlarmType.CARDIAC_ARREST, "http://localhost:5002/sounds/heart_attack.wav"]
    ]),
    icons: new Map<string, string>([

    ])
}

export default data