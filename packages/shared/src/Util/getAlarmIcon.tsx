
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
        case EAlarmType.Unknown:
            return <HelpOutlineIcon fontSize="inherit"/>
        case EAlarmType.AssistanceCall:
            return <NotificationsIcon fontSize="inherit"/>
        case EAlarmType.HeartAttack:
            return <FavoriteIcon fontSize="inherit"/>
        case EAlarmType.PatientCall:
            return <CallIcon fontSize="inherit"/>
        case EAlarmType.Dementia:
            return <ContactSupportIcon fontSize="inherit"/>
        case EAlarmType.Presence:
            return <LocalHospitalIcon fontSize="inherit"/>
        case EAlarmType.TechnicalAlarm:
            return <BuildIcon fontSize="inherit"/>
        default:
            return null;
    }
}