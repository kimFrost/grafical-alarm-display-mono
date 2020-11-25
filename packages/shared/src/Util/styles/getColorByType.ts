import { EAlarmType } from "../../Types/types"

export const getColorByType = (type: EAlarmType): string => {
    switch (type) {
        case EAlarmType.UNKNOWN:
            return '#000'
        case EAlarmType.ASSIST:
            return '#ee2d24'
        case EAlarmType.CARDIAC_ARREST:
            return '#15709c'
        case EAlarmType.CALL:
            return '#ee2d24'
        case EAlarmType.DEMENTIA:
            return '#f7941d'
        case EAlarmType.PRESENCE:
            return '#299446'
        case EAlarmType.TECHNICAL:
            return '#92278f'
        default:
            return 'transparent';
    }
}