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
    margin-bottom: 30px;
`

export const ButtonGoogle = styled(ButtonLogin)`
    background-color: white;
    border: 1px solid #496BBA;
    flex-direction: row;
    gap: 27px;
`