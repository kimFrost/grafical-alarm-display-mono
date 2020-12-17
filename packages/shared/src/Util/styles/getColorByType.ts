import { EAlarmType } from "../../Types/types"

export const getColorByType = (type: EAlarmType): string => {
    switch (type) {
        case EAlarmType.Unknown:
            return '#000'
        case EAlarmType.AssistanceCall:
            return '#ee2d24'
        case EAlarmType.HeartAttack:
            return '#15709c'
        case EAlarmType.PatientCall:
            return '#ee2d24'
        case EAlarmType.Dementia:
            return '#f7941d'
        case EAlarmType.Presence:
            return '#299446'
        case EAlarmType.TechnicalAlarm:
            return '#92278f'
        default:
            return 'transparent';
    }
}