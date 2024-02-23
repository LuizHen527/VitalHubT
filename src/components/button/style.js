import styled from "styled-components";

export const ButtonLogin = styled.TouchableOpacity`
    background-color: #496BBA;
    width: 90%;
    height: 44px;
    border-radius: 5px;
    margin-top: 15px;

    align-items: center;
    justify-content: center;
    border: #496BBA;
`

export const ButtonLoginVE = styled(ButtonLogin)`
    margin-top: 30px;
    margin-bottom: 27px;
`

export const ButtonSchedule = styled(ButtonLoginVE)`
    width: 100%;
    margin-bottom: 30px;
`

export const ButtonModal = styled(ButtonLoginVE)`
    width: 285px;
`

export const ButtonCancel = styled.TouchableOpacity`
   width: 100%;
   align-items: center;
`

export const ButtonGoogle = styled(ButtonLogin)`
    background-color: white;
    border: 1px solid #496BBA;
    flex-direction: row;
    gap: 27px;
`