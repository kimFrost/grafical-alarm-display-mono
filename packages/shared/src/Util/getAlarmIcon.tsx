
import React from 'react';

import { EAlarmType } from '../Types/types';

import AccessAlarm from '@material-ui/icons/AccessAlarm';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CallIcon from '@material-ui/icons/Call';
import BuildIcon from '@material-ui/icons/Build';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export const getAlarmIcon = (type: EAlarmType): JSX.Element | null => {
    switch (type) {
        case EAlarmType.UNKNOWN:
            return <HelpOutlineIcon fontSize="inherit"/>
        case EAlarmType.ASSIST:
            return <NotificationsIcon fontSize="inherit"/>
        case EAlarmType.CARDIAC_ARREST:
            return <FavoriteIcon fontSize="inherit"/>
        case EAlarmType.CALL:
            return <CallIcon fontSize="inherit"/>
        case EAlarmType.DEMENTIA:
            return <ContactSupportIcon fontSize="inherit"/>
        case EAlarmType.PRESENCE:
            return <LocalHospitalIcon fontSize="inherit"/>
        case EAlarmType.TECHNICAL:
            return <BuildIcon fontSize="inherit"/>
        default:
            return null;
    }
}