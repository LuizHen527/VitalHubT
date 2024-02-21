import { Modal } from "react-native";
import styled from "styled-components";

export const ContainerBoxModal = styled.View`
    width: 92%;
    height: 310px;
    background-color: white;
    border-radius: 10px;
    align-items: center;
`

export const ModalCancel = styled(Modal)`
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.6);
`