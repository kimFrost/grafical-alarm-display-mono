import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const AlarmScrollList = styled.div`
    flex: 1 1 100%;
    overflow-y: auto;
`; 


interface IAlarmListItemProps {
    state: any
}

export const AlarmListItem = styled.div<IAlarmListItemProps>`

`;


// enter transition
// max-height 0 => 100 / To push neighbours smoothly apart.
// offset.x -100% => 0