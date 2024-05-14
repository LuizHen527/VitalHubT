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
    nome,
    fotoPerfil,
    dataValidation,

    prioridade,
    dataConsulta,
    dataNascimento,

    onPressCancel,
    onPressAppointment,
    onPressDoctorModal,
    onPressDoctorInsert,

}) => {
    const navigation = useNavigation();

    const [tipoPrioridade, setTipoPrioridade] = useState();
    const [idade, setIdade] = useState();
    const [dataAtual, setDataAtual] = useState();


    async function CalcIdade() {
        const date = moment().format('YYYY');
        const nascimento = moment(dataNascimento).format('YYYY');
        const idadeResult = date - nascimento;

        setIdade(idadeResult);
    }

    async function SwitchPrioridade() {
        if (prioridade == '0') {
            setTipoPrioridade('Rotina');
        } else if (prioridade == '1') {
            setTipoPrioridade('Exame');
        } else {
            setTipoPrioridade('Urgencia');
        }
    }

    async function openLocalModal() {

    }

    async function CriarDatas() {
        if (perfil == 'Medico') {
            // var date = new Date().getDate();
            // var month = new Date().getMonth();
            // var year = new Date().getFullYear();
            // var hours = new Date().getHours();

            var date = moment()
                .utcOffset('-03:00')
                .format('YYYY-MM-DD hh:mm:ss a');
                console.log(date);

            const diferenca = moment.min([dataConsulta, date]);
            console.log('diferenca');
            console.log(diferenca);


            setDataAtual(date);



            return false
        }

        //profile.role == 'Medico' ? moment.min(dataConsulta) == item.dataConsulta ? false : true : 'paciente'

    }

    function CompararDatas() {
        const diferenca = moment.min([dataConsulta, dataAtual]);

        console.log(diferenca);
    }

    useEffect(() => {
        CalcIdade();
        SwitchPrioridade();
        if (situacao == "Pendentes") {
            const statusValidation = CriarDatas();
            // console.log('Data atual');
            // console.log(dataAtual);
            // CompararDatas();
            // console.log(statusValidation);
        }
    }, []);
    return (
        <ContainerCard onPress={situacao == "Pendentes" ? onPressDoctorModal : ''} style={styles.shadow}>
            <ImageAppointmentProfile
                source={{ uri: fotoPerfil }}
            />
            <ContainerProfile>

                <DataProfileCard>

                    <NameProfile editable={false} maxLength={27} >{nome}</NameProfile>

                    <AgeProfile>{idade} anos - <TypeAppointment>{tipoPrioridade}</TypeAppointment></AgeProfile>

                </DataProfileCard>

                <ViewRow>
                    <ContainerTime situacao={situacao}>
                        <MaterialCommunityIcons
                            name="clock" size={15}
                            color={situacao == "Pendentes" ? "#49B3BA" : "#8C8A97"} />
                        <DateTime situacao={situacao} color={"#49B3BA"}>
                            {dataConsulta}
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
                            <ButtonCard onPress={perfil === "Paciente" ? onPressAppointment : onPressDoctorInsert}>
                                <ButtonTextPront situacao={situacao}>Ver Prontuario</ButtonTextPront>
                            </ButtonCard>
                        )
                    }
                </ViewRow>

            </ContainerProfile>
        </ContainerCard>
    )
}

const styles = StyleSheet.create({
    shadow: {
        elevation: 5,
        shadowColor: '#000000',
    },
});