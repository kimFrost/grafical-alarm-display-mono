
export interface IMessage {
    type: string
    data: any
}

export interface ILocation {
    Id: string
    ImageUrl: string
}

export interface IZone {
    Id: string;
    ZoneText: string
    Location: string
    Position: [number, number]
    IsActive: boolean
}

export enum EAlarmType {
    UNKNOWN = 'Ukendt',
    CARDIAC_ARREST = 'Hj.Stop',
    DEMENTIA = 'Demens',
    ASSIST = 'Assistance',
    CALL = 'Kald',
    PRESENCE = 'Nærvær',
    TECHNICAL = 'Teknisk',
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