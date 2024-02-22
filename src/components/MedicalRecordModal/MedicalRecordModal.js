import { Modal } from "react-native"
import { ContainerBoxModal, ContainerBoxModalMedicalRecord, PacientModal } from "../CancelAppointmentModal/Style"
import { ContainerData, ImageModalMedicalRecord, ModalMedicalRecord } from "./Style"
import { AgeModalRecord, ButtonTitle, EmailModalRecord, TitleModal, TitleModalRecord } from "../title/style"
import { AgeProfile, TypeAppointment } from "../AppointmentCard/Style"
import { ButtonCancel, ButtonModal } from "../button/style"
import { LinkCancel } from "../Links/style"

export const MedicalRecordModal = ({
    visible, setShowModalAppointment, ...rest
}) => {
    return(
        <ModalMedicalRecord {...rest} visible={visible} transparent={true} animationType="fade">
            <PacientModal>
                <ContainerBoxModalMedicalRecord>

                    <ImageModalMedicalRecord
                        source={require('../../assets/eduProfileImage.png')}
                    />
                    <TitleModalRecord>Eduardo Benvenuti</TitleModalRecord>

                    <ContainerData>
                        <AgeModalRecord>38 anos</AgeModalRecord>
                        <EmailModalRecord>brksedu.123@gmail.com</EmailModalRecord>
                    </ContainerData>

                    <ButtonModal>
                        <ButtonTitle>Inserir prontuario</ButtonTitle>
                    </ButtonModal>

                    <ButtonCancel onPress={() => setShowModalAppointment(false)}>
                        <LinkCancel>Cancelar</LinkCancel>
                    </ButtonCancel>
                </ContainerBoxModalMedicalRecord>
            </PacientModal>
        </ModalMedicalRecord>
    )
}