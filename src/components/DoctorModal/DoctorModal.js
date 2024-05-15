import Toast, { BaseToast } from "react-native-toast-message"
import { ContentModalConfirmationBox, ContentModalDoctor } from "../../screens/SelectClinic/Style"
import { BoxConfirmationModal, BoxModalDoctor, PacientModal } from "../CancelAppointmentModal/Style"
import { AlignBoxModal, AlignButton, ModalConfirmation } from "../ConfimationModal/Style"
import { LinkCancel } from "../Links/style"
import { BoxButtonDoctor, ButtonBox, ButtonCancel, ButtonDoctorModal, ButtonSchedule } from "../button/style"
import { ButtonTitle, InfoTextProfile, TitleProfile } from "../title/style"
import { BoxInfoDoctor, DoctorImage } from "./Style"
import api from "../../service/service"



export const DoctorModal = ({
    consulta, visible, setShowModalDoctor, onPressLocal, navigation, showToast, ...rest
}) => {

    async function handleClose(screen){
        // await setShowModalAppoitment(false);

        if(screen == 'AppointmentLocation'){
            navigation.replace(screen, {clinicaid : consulta.medicoClinica.clinicaId})
        }else{
            navigation.replace(screen)
        }
    }

    async function MarcarComoRealizada() {
        console.log('IDCONSULTA');
        console.log(consulta.medicoClinica.clinicaId);
        await api.put(`/Consultas/Status?idConsulta=${consulta.id}&status=Realizados`)
        .then(response => {
            console.log(response.data);
            setShowModalDoctor(false);
            showToast();
        }).catch(error => {
            console.log(error);
        })
    }


    return(
        <ModalConfirmation {...rest} visible={visible} transparent={true} animationType="fade">
            <PacientModal>
                <BoxModalDoctor>

                    <ContentModalDoctor>
                    <DoctorImage
                        source={require('../../assets/noPhoto.jpg')}
                    />

                    <TitleProfile>Dr. Claudio</TitleProfile>

                    <BoxInfoDoctor>
                        <InfoTextProfile>Cliníco geral</InfoTextProfile>
                        <InfoTextProfile>CRM-15286</InfoTextProfile>
                    </BoxInfoDoctor>

                    </ContentModalDoctor>


                    <AlignButton>
                        <ButtonDoctorModal onPress={() => MarcarComoRealizada()}>
                            <ButtonTitle>Marcar como realizada</ButtonTitle>
                        </ButtonDoctorModal>

                        <ButtonDoctorModal onPress={() => handleClose("AppointmentLocation") & onPressLocal}>
                            <ButtonTitle>Ver local da consulta</ButtonTitle>
                        </ButtonDoctorModal>

                        <BoxButtonDoctor onPress={() => setShowModalDoctor(false)}>
                            <LinkCancel >Cancelar</LinkCancel>
                        </BoxButtonDoctor>
                    </AlignButton>
                </BoxModalDoctor>
            </PacientModal>
            

        </ModalConfirmation>
    )
}