
export interface IMessage {
    type: string
    data: any
}

export interface ILocation {
    id: string
    ImageUrl?: string
}

export interface IDisplayImage {
    fileExtension: string
    id: string
    parentId: string
    pathToImage: string
}

export interface IDisplayImageUpload extends IDisplayImage {
    imageBase64: string
}

export interface IConfigPoint {
    Id: string
    Guid?: string
    ZoneText: string
    Location: string
    Position: [number, number]
    IsActive: boolean
}

// export enum EAlarmType {
//     UNKNOWN = 'Ukendt',
//     CARDIAC_ARREST = 'Hj.Stop',
//     DEMENTIA = 'Demens',
//     ASSIST = 'Assistance',
//     CALL = 'Kald',
//     PRESENCE = 'Nærvær',
//     TECHNICAL = 'Teknisk',
// }

export enum EAlarmType {
    Unknown = 0,
    RemoteAcknowledge = 10,
    TechnicalAlarm = 11,
    BatteryAlarm = 12,
    Presence = 20,
    PatientCall = 30,
    AssistanceCall = 40,
    Dementia = 42,
    Emergency = 47,
    AssaultAlarm = 50,
    FireAlarm = 51,
    HeartAttack = 52,
    MaxUrgentAlarm = 59,
    AcknowledgeDeviceAlarms = 90,
    AcknowledgeCustomerAlarms = 91,
    AcknowledgeUnitAlarms = 92,
    AcknowledgeCustomerAlarmsAndSetPresence = 93,
    AcceptedAlarm = 99
}

export enum EAlarmTypePriority {
    UNKNOWN = 0,
    CARDIAC_ARREST = 8,
    DEMENTIA = 7,
    ASSIST = 6,
    CALL = 4,
    PRESENCE = 3,
    TECHNICAL = 2,
}

export interface IAlarm {
    Id: string
    ZoneId: string
    ZoneText: string
    Location: string
    UnitText: string
    EquipmentPhysicalId: string
    Type: EAlarmType
    Priority: number
    Position: [number, number]
    Acknowledged: boolean
}

export enum ERequestStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface IRequest {
    Id: string
    status: ERequestStatus
}

export interface IConfiguration {
    icons: Map<string, string>
    sounds: Map<string, string>
}

export class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}