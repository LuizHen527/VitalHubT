import moment from "moment";
import { HeaderProfile } from "../../components/HeaderProfile/HeaderProfile"
import { Container, ContainerHeader } from "../../components/container/style";
import { StyledCalendarStrip } from "../../components/StyledCalendarStrip/styledCalendarStrip";
import { StyleSheet } from "react-native";
import { BoxBell, BoxUser, ContainerList, DataUser, FilterAppointment, ImageUser } from "../AppointmentDoctor/style";
import { AbsListAppointment } from "../../components/AbsListAppointment/AbsListAppointment";
import { useEffect, useState } from "react";
import { ListComponent } from "../../components/List/Style";
import { AppointmentCard } from "../../components/AppointmentCard/AppointmentCard";
import { CancelAppointmentModal } from "../../components/CancelAppointmentModal/CancelAppointmentModal";
import { MedicalRecordModal } from "../../components/MedicalRecordModal/MedicalRecordModal";
import { ContainerAppointmentButton } from "./Style";
import { FontAwesome } from '@expo/vector-icons';
import { ScheduleModal } from "../../components/ScheduleModal/ScheduleModal";
import { DoctorModal } from "../../components/DoctorModal/DoctorModal";
import { NameUser, TextDefault } from "../../components/title/style";
import { Octicons } from '@expo/vector-icons';
import api from "../../service/service"
import { userDecodeToken } from '../../utils/Auth'; 

import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,

        shouldPlaySound: false,

        shouldSetBadge: false,
    })
});

const User = { id: 1, nome: "Dr Drauzio", sourceImage: '../../assets/eduProfileImage.png' };

export const AppointmentPacient = ({navigation}) => {
    const [consultasMedico, setConsultasMedico] = useState([]);
    const [idUser, setIdUser] = useState('');
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalAppointment, setShowModalAppointment] = useState(false);
    const [showModalSchedule, setShowModalSchedule] = useState(false);
    // Nao sei onde colocar a ativacao desse modal, por isso esta true. 
    const [showModalDoctor, setShowModalDoctor] = useState(false);
    const[statusLista, setStatusLista] = useState("pedente");
    const [dataConsulta, setDataConsulta] = useState();
    const [consultas, setConsultas] = useState([]);
    const [profile, setProfile] = useState();
    const [consultaSelecionada, setConsultaSelecionada] = useState();

    async function profileLoad(){
        const token = await userDecodeToken();

        if(token != null){
            setProfile(token);

            setDataConsulta(moment().format('YYYY-MM-DD'));
        }

        setIdUser(token.name);

        //console.log(idUser);
    }

    async function ListarConsultas(){
        const url = (profile.role == 'Medico' ? 'Medicos' : 'Pacientes');
        console.log(`/${url}/BuscarPorData?data=${dataConsulta}&id=${profile.jti}`);

        await api.get(`/${url}/BuscarPorData?data=${dataConsulta}&id=${profile.jti}`)
        .then( response => {
            setConsultas(response.data);
            //console.log(response.data[0]);
        }).catch( error => {
            console.log(error);
        })
    }

    const handleCallNotifications = async () => {

        const { status } = await Notifications.getPermissionsAsync();

        if (status != "granted") {
            alert('Voce precisa permitir as notificacoes');
            return;
        };

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Consulta cancelada",
                body: "Uma de suas consultas foi cancelada. Entre para saber mais."
            },
            trigger: null
        })
    }

    function MostrarModal(modal, consulta){
        setConsultaSelecionada(consulta);

        if(modal == 'cancelar'){
            setShowModalCancel(true)
            
        }else if (modal == 'local'){
            setShowModalDoctor(true)

        }else{
            
            setShowModalAppointment(true);
        }
    }

    useEffect(() => {
        profileLoad();
    }, []);

    useEffect(() => {
        if( dataConsulta != ''){
            ListarConsultas();
            console.log('CONSULTASaaaaaaaa' + consultas);
        }
        console.log('CONSULTAS' + consultas);
    }, [dataConsulta]);



    //define padrão pt-br para calendário
    moment.updateLocale("pt-br", {

        //meses
        months:
            "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
                "_"
            ),

        //abreviação de meses
        monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),

        //dias da semana
        weekdays:
            "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split(
                "_"
            ),

        //abreviação dias da semana
        weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),

        //abreviação dias da semana 
        weekdaysMin: 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
    });

    //instância da data atual
    const currentDate = new Date();

    //define a data inicial como sendo o primeiro dia do mês
    const startingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    //define a data final como sendo o último dia do mês
    const endingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    return (
        <Container>

            {/* Queria passar props com o nome e a URL da imagem, mas nao consegui */}
            {/* Update: O react native nao consegue renderizar imagens dinamicamente, quero ver como o professor vai fazer isso */}
            {/* <HeaderProfile
            sourceImage={User.sourceImage}
            name={User.nome}
        /> */}

            <HeaderProfile />

        <StyledCalendarStrip

        onDateSelected={date => setDataConsulta(moment(date).format('YYYY-MM-DD'))}
        // animação e seleção de cada data
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={styles.selectedAnimationStyle}

                // seta esquerda e direita para avançar e voltar(aqui como display none)
                iconLeftStyle={styles.iconsStyle}
                iconRightStyle={styles.iconsStyle}

                // deixa uma marcação default - data atual
                selectedDate={currentDate}
                // dia que começamos a visualizar a barra
                startingDate={moment()}

                //data min e max - início do mês e final do mês
                minDate={startingDate}
                maxDate={endingDate}

                //estilização dos itens que não estão selecionados
                calendarHeaderStyle={styles.calendarHeaderStyle}
                dateNumberStyle={styles.numberDateStyle}
                dateNameStyle={styles.nameDateStyle}

                // estilização do item que está selecionado - efeito do item marcado
                highlightDateNameStyle={styles.selectedDateNameStyle}
                highlightDateNumberStyle={styles.selectedDateNumberStyle}
                highlightDateContainerStyle={styles.selectedContainerStyle}

                //tamanho do container
                iconContainer={{ flex: 0.1 }}

                //scroll da barra
                scrollable={true}
            />

            {/* Container */}
            <FilterAppointment>

                {/* Botao agendado */}
                <AbsListAppointment
                    textButton={"Agendadas"}
                    clickButton={statusLista === "Pendentes"}
                    onPress={() => setStatusLista("Pendentes")}
                />
                {/* Botao realizado */}
                <AbsListAppointment
                    textButton={"Realizadas"}
                    clickButton={statusLista === "Realizados"}
                    onPress={() => setStatusLista("Realizados")}
                />
                {/* Botao cancelado */}
                <AbsListAppointment
                    textButton={"Canceladas"}
                    clickButton={statusLista === "Cancelados"}
                    onPress={() => setStatusLista("Cancelados")}
                />

            </FilterAppointment>

            <ContainerList>
            <ListComponent
                data={consultas}
                keyExtractor={(item) => item.id}

                renderItem={({item}) => 
                statusLista == item.situacao.situacao && (

                     <AppointmentCard
                         

                         perfil={profile.role}
                         consultas={item}

                         //funções
                         onPressCancel={() => setShowModalCancel(true)}
                         onPressAppointment={() => navigation.replace("EditMedicalRecord", {consulta : item})}
                         onPressDoctorModal={() => MostrarModal('local', item)}
                         
                         // apagar depois (Fiz so pra testar validacao)
                         onPressDoctorInsert={() => setShowModalAppointment(true)}

                         //Dados
                         dataNascimento={item.paciente.dataNascimento}
                         prioridade={item.prioridade.prioridade}
                         dataConsulta={moment(item.dataConsulta).format('h:mm')}
                         situacao={item.situacao.situacao}

                         //Modal de cancelar
                         onConnectCancelar={() => MostrarModal('cancelar', item)}
                         onConnectAppoitment={() => MostrarModal('prontuario', item)}
                         consultaS={consultaSelecionada}

                     />
                )
            }
            />
            </ContainerList>

            <CancelAppointmentModal
                visible={showModalCancel}
                setShowModalCancel={setShowModalCancel}
                onPressConfirmation={() => setShowModalCancel(false) & handleCallNotifications()}
            />

            <DoctorModal
                visible={showModalDoctor}
                navigation={navigation}

                consulta={consultaSelecionada}

                setShowModalDoctor={setShowModalDoctor}
                onPressLocal={() => setShowModalDoctor(false)}
            />

            <MedicalRecordModal
                visible={showModalAppointment}
                setShowModalAppointment={setShowModalAppointment}
            />

            <ContainerAppointmentButton
                onPress={() => setShowModalSchedule(true)}
            >
                <FontAwesome name="stethoscope" size={32} color="white" />
            </ContainerAppointmentButton>

            <ScheduleModal
                visible={showModalSchedule}
                setShowModalSchedule={setShowModalSchedule}
            />




        </Container>


    )
}

const styles = StyleSheet.create({
    iconsStyle: {
        display: 'none'
    },
    calendarHeaderStyle: {
        fontSize: 22,
        textAlign: "center",
        alignSelf: 'flex-start',
        color: '#4E4B59',
        fontFamily: "MontserratAlternates_600SemiBold",
        paddingHorizontal: 16
    },
    nameDateStyle: {
        color: "#ACABB7",
        fontSize: 12,
        textTransform: 'capitalize'
    },
    numberDateStyle: {
        color: "#5F5C6B",
        fontSize: 16
    },
    selectedDateNameStyle: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        textTransform: 'capitalize'
    },
    selectedDateNumberStyle: {
        color: "white",
        fontSize: 14
    },
    selectedContainerStyle: {
        backgroundColor: `#60BFC5`
    },
    selectedAnimationStyle: {
        type: "border",
        duration: 200,
        borderWidth: 2,
        borderHighlightColor: "#49B3BA"
    }
})
