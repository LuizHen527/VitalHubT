import { useNavigation } from "@react-navigation/native"
import { ContentModalConfirmationBox } from "../../screens/SelectClinic/Style"
import { BoxConfirmationModal, ContainerBoxModal, PacientModal } from "../CancelAppointmentModal/Style"
import { LinkCancel } from "../Links/style"
import { ButtonBox, ButtonCancel, ButtonModal, ButtonSchedule } from "../button/style"
import { ButtonTitle, ConfirmationText, RegularText, RegularTextModal, TextDefault, TitleM, TitleTextInfo } from "../title/style"
import { AlignBoxModal, DateBox, DoctorBox, ModalConfirmation } from "./Style"
import moment from "moment"
import { useEffect, useState } from "react"
import api from "../../service/service"
import { userDecodeToken } from '../../utils/Auth'; 

export const ConfirmationModal = ({
    visible, setShowModalConfirmation, agendamento, ...rest
}) => {
    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);

    async function profileLoad() {
        const token = await userDecodeToken();
        console.log('token');
        console.log(token);

        if (token != null) {
            setProfile(token)
        }
    }

    async function ConfirmarConsulta() {
        await api.post(`/Consultas/Cadastrar`, {
            ...agendamento,
            pacienteId : profile.jti,
            situacaoId : "24656A4C-9DCA-47D1-8FE2-25B51B8C9F3A"
        }).then(async response => {
            await setShowModalConfirmation(false);
            console.log(response);
            navigation.replace("Main")
        }).catch(error => {
            console.log(error);
        })
    }

    async function CancelarConsulta(){
        agendamento.dataConsulta = null
        console.log(agendamento);
        setShowModalConfirmation(false)
    }

    useEffect(() => {
        profileLoad()
    },[])
    return (
        <ModalConfirmation {...rest} visible={visible} transparent={true} animationType="fade">

            <PacientModal>

                <BoxConfirmationModal>

                    <ContentModalConfirmationBox>
                        <TitleM>Agendar consulta</TitleM>
                        <ConfirmationText>Consulte os dados selecionados para a sua consulta</ConfirmationText>

                        <DateBox>
                            <TitleTextInfo>Data da consulta</TitleTextInfo>
                            <TextDefault>{'Data '+ moment(agendamento.dataConsulta).format('DD/MM/YYYY HH:mm')}</TextDefault>
                        </DateBox>

                        <DoctorBox>
                            <TitleTextInfo>Médico(a) da consulta</TitleTextInfo>
                            <TextDefault>{agendamento.medicoLabel}</TextDefault>
                            {/* <TextDefault>Demartologa, Esteticista</TextDefault> */}
                        </DoctorBox>

                        <DoctorBox>
                            <TitleTextInfo>Local da consulta</TitleTextInfo>
                            <TextDefault>{agendamento.localizacao}</TextDefault>
                        </DoctorBox>

                        <DoctorBox>
                            <TitleTextInfo>Tipo da consulta</TitleTextInfo>
                            <TextDefault>{agendamento.prioridadeLabel}</TextDefault>
                        </DoctorBox>
                    </ContentModalConfirmationBox>

                    <AlignBoxModal>
                        <ButtonSchedule onPress={() => ConfirmarConsulta()}>
                            <ButtonTitle>Confirmar</ButtonTitle>
                        </ButtonSchedule>

                        <ButtonCancel onPress={() => CancelarConsulta()}>
                            <LinkCancel >Cancelar</LinkCancel>
                        </ButtonCancel>
                    </AlignBoxModal>

                </BoxConfirmationModal>
            </PacientModal>

        </ModalConfirmation>
    )
}