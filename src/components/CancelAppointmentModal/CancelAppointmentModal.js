import { Modal } from "react-native"
import { LinkCancel } from "../Links/style"
import { ButtonCancel, ButtonLoginVE } from "../button/style"
import { ContainerModal } from "../container/style"
import { ButtonTitle, RegularText, RegularTextModal, Title, TitleModal } from "../title/style"
import { ContainerBoxModal, ModalCancel } from "./Style"

export const CancelAppointmentModal = ({
    visible, setShowModalCancel, ...rest
}) => {
    return(
        
        
        <ModalCancel {...rest} visible={visible} transparent={true} animationType="fade">

            <ContainerBoxModal>
                 <TitleModal>Cancelar consulta</TitleModal>
                 <RegularTextModal>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</RegularTextModal>
                 <ButtonLoginVE>
                     <ButtonTitle>Confirmar</ButtonTitle>
                 </ButtonLoginVE>

                 <ButtonCancel onPress={() => setShowModalCancel(false)}>
                    <LinkCancel>Cancelar</LinkCancel>
                 </ButtonCancel>
                 
            </ContainerBoxModal>

        </ModalCancel>

        // <ContainerModal>
        //     <ContainerBoxModal>
        //         <TitleModal>Cancelar consulta</TitleModal>
        //         <RegularTextModal>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</RegularTextModal>
        //         <ButtonLoginVE>
        //             <ButtonTitle>Confirmar</ButtonTitle>
        //         </ButtonLoginVE>

        //         <LinkCancel>Cancelar</LinkCancel>
        //     </ContainerBoxModal>
            
        // </ContainerModal>
    )
}

