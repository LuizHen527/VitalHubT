import { ImageAppointmentProfile } from "../images/style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AgeProfile, ButtonCard, ButtonText, ButtonTextPront, ContainerCard, ContainerProfile, ContainerTime, DataProfileCard, DateTime, NameProfile, TypeAppointment, ViewRow } from "./Style"
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import moment from "moment";

export const AppointmentCard = ({
    situacao,
    perfil,
    consultaS,
    consultas,
    dataNascimento,
    onPressCancel,
    onPressAppointment,
    onPressDoctorModal,
    onPressDoctorInsert,

}) => {
    const navigation = useNavigation();

    const [ profile, setProfile ] = useState("paciente");
    const [ idade, setIdade ] = useState();

    async function CalcIdade(){
        const date = moment().format('YYYY');
        const nascimento = moment(dataNascimento).format('YYYY');
        const idadeResult = date - nascimento;

        setIdade({idadeResult});
    }

    async function openLocalModal(){
        
    }

    useEffect(() => {
        CalcIdade();
    }, []);
    return(
        <ContainerCard onPress={situacao === "Pendentes" ? onPressDoctorModal : null} style={styles.shadow}>
                <ImageAppointmentProfile
                    source={require('../../assets/eduProfileImage.png')}
                />
            <ContainerProfile>

                <DataProfileCard>

                <NameProfile maxLength={27} >{consultas.paciente.idNavigation.nome}</NameProfile>

                <AgeProfile> anos - <TypeAppointment>Rotina</TypeAppointment></AgeProfile>

                </DataProfileCard>

                <ViewRow>
                    <ContainerTime situacao={situacao}>
                        <MaterialCommunityIcons 
                            name="clock" size={15} 
                            color={situacao == "Pendentes" ? "#49B3BA" : "#8C8A97"} />
                        <DateTime situacao={situacao} color={"#49B3BA"}>
                            14:00
                        </DateTime>
                    </ContainerTime>

                    {
                        situacao == "Cancelados" ? (
                            <></>
                        ) : situacao == "Pendentes" ? (
                            <ButtonCard onPress={onPressCancel}>
                                <ButtonText situacao={situacao}>Cancelar</ButtonText>
                            </ButtonCard>
                        ) : (
                            <ButtonCard onPress={profile === "paciente" ? onPressAppointment : onPressDoctorInsert}>
                                <ButtonTextPront situacao={situacao}>Ver Prontuario</ButtonTextPront>
                            </ButtonCard>
                        )
                    }
                </ViewRow>

            </ContainerProfile>
        </ContainerCard>
    )
}

const styles =  StyleSheet.create({
    shadow: {
        elevation: 5,
        shadowColor: '#000000',
    },
});