import { Modal } from "react-native"
import { ContainerBoxModal, ContainerBoxModalMedicalRecord, PacientModal } from "../CancelAppointmentModal/Style"
import { ContainerData, ImageModalMedicalRecord, ModalMedicalRecord } from "./Style"
import { AgeModalRecord, ButtonTitle, EmailModalRecord, TitleModal, TitleModalRecord, TitleModalRecord2 } from "../title/style"
import { AgeProfile, TypeAppointment } from "../AppointmentCard/Style"
import { ButtonCancel, ButtonModal, ButtonModal2 } from "../button/style"
import { LinkCancel } from "../Links/style"
import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import moment from "moment"

export const MedicalRecordModal = ({
    visible, setShowModalAppointment, goToMedicalRecord, consulta, ...rest
}) => {
    const [idade, setIdade] = useState();

    const navigation = useNavigation();


    async function CalcIdade() {
        const date = moment().format('YYYY');
        const nascimento = moment(consulta.paciente.dataNascimento).format('YYYY');
        const idadeResult = date - nascimento;

        setIdade(idadeResult);
    }

    async function handlerContinue(){
        await setShowModalAppointment(false)

        navigation.navigate("Profile", { consulta: consulta })
    }

    useEffect(() => {
        CalcIdade();
    }, []);
    
    return(
        <ModalMedicalRecord {...rest} visible={visible} transparent={true} animationType="fade" animationOutTiming={0}>
            <PacientModal>
                <ContainerBoxModalMedicalRecord>

                    <ImageModalMedicalRecord
                        source={{ uri: consulta.paciente.idNavigation.foto }}
                    />
                    <TitleModalRecord2>{consulta.paciente.idNavigation.nome}</TitleModalRecord2>

                    <ContainerData>
                        <AgeModalRecord>{idade} anos</AgeModalRecord>
                        <EmailModalRecord>{consulta.paciente.idNavigation.email}</EmailModalRecord>
                    </ContainerData>

                    <ButtonModal2 onPress={() => handlerContinue()}>
                        <ButtonTitle>Inserir prontuario</ButtonTitle>
                    </ButtonModal2>

                    <ButtonCancel onPress={() => setShowModalAppointment(false)}>
                        <LinkCancel>Cancelar</LinkCancel>
                    </ButtonCancel>
                </ContainerBoxModalMedicalRecord>
            </PacientModal>
        </ModalMedicalRecord>
    )
}