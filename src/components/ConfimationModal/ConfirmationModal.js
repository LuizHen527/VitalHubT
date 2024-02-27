import { ContentModalConfirmationBox } from "../../screens/SelectClinic/Style"
import { BoxConfirmationModal, ContainerBoxModal, PacientModal } from "../CancelAppointmentModal/Style"
import { LinkCancel } from "../Links/style"
import { ButtonBox, ButtonCancel, ButtonModal, ButtonSchedule } from "../button/style"
import { ButtonTitle, RegularTextModal, TitleM } from "../title/style"
import { AlignBoxModal, ModalConfirmation } from "./Style"

export const ConfirmationModal = ({
    visible, setShowModalCancel, ...rest
}) => {
    return(
        <ModalConfirmation {...rest} visible={visible} transparent={true} animationType="fade">

            <PacientModal>


                <BoxConfirmationModal>
                <ContentModalConfirmationBox>

                </ContentModalConfirmationBox>
                <AlignBoxModal>
                    <ButtonSchedule>
                        <ButtonTitle>Confirmar</ButtonTitle>
                    </ButtonSchedule>

                    <ButtonCancel>
                        <LinkCancel>Cancelar</LinkCancel>
                    </ButtonCancel>
                </AlignBoxModal>
                </BoxConfirmationModal>
            </PacientModal>

        </ModalConfirmation>
    )
}