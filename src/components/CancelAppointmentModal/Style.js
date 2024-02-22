import { Modal } from "react-native";
import styled from "styled-components";

export const PacientModal = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.6);
`

export const ContainerBoxModal = styled.View`
    width: 92%;
    height: 310px;
    background-color: white;
    border-radius: 10px;
    align-items: center;
`

export const ContainerBoxModalMedicalRecord = styled(ContainerBoxModal)`
    height: 436px;
`

export const ModalCancel = styled(Modal)`
    align-items: center;
    justify-content: center;

    background-color: rgba(0,0,0,0.6);
`

