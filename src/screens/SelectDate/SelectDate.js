import { useEffect, useState } from "react"
import { LinkCancel } from "../../components/Links/style"
import { ButtonCancel, ButtonSchedule } from "../../components/button/style"
import { Container } from "../../components/container/style"
import { ButtonTitle, DateText, ScheduleModalText, TitleModal } from "../../components/title/style"
import { AlignBox, ContentBox } from "../SelectClinic/Style"
import { Calendar, LocaleConfig } from "react-native-calendars";
import { BoxCalendar, BoxSelect } from "./Style"
import { Select } from "../../components/Select/Select"
import { ConfirmationModal } from "../../components/ConfimationModal/ConfirmationModal"
import { CancelAppointmentModal } from "../../components/CancelAppointmentModal/CancelAppointmentModal"
import { Text } from "react-native"

LocaleConfig.locales['pt'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: "Hoje"
};

LocaleConfig.defaultLocale = 'pt';


export const SelectDate = ({ navigation, route }) => {
    const [selected, setSelected] = useState('');
    const [showModalConfirmation, setShowModalConfirmation] = useState(false);
    const [dataSelecionada, setDataSelecionada] = useState("")
    const [horaSelecionada, setHoraSelecionada] = useState("")
    const [agendamento, setAgendamento] = useState({})
    const [erroData,setErroData] = useState("")

    function HandleContinue() {

        if (dataSelecionada == null || horaSelecionada == null ) {

            let error 
            setErroData("Selecione Data e Hora")
            error = true 
            setShowModalConfirmation(false)
            return !error
            
        }

        setAgendamento(
            {
                ...route.params.agendamento,
                dataConsulta: `${dataSelecionada} ${horaSelecionada}`
            })

            setShowModalConfirmation(true)
    }

    function Cancelar(){
        agendamento.params = null
        console.log("E NULOOOOOOOOOOOOOOOOOO___________________",agendamento);
        navigation.replace("Main", {
            agendamento:{
                ...route.params.agendamento //Passando todas as informacoes contidas no route.params.agendamento
            
            }
        })
        console.log(agendamento);
    }


    useEffect(() => {
        console.log(route);
    }, [route])

    useEffect(() => {
        console.log(dataSelecionada);
        console.log(horaSelecionada);
    }, [dataSelecionada])

    return (
        <Container>
            <ConfirmationModal
                navigation={navigation}
                agendamento={agendamento}

                visible={showModalConfirmation}
                setShowModalConfirmation={setShowModalConfirmation}
            />
            <ContentBox>
                <TitleModal>Selecionar data</TitleModal>

                <BoxCalendar>
                    <Calendar



                        hideArrows={true}

                        style={{
                            height: 249,
                            fontFamily: 'MontserratAlternates_600SemiBold',
                            // width: 100%
                        }}

                        headerStyle={{
                            fontFamily: 'MontserratAlternates_600SemiBold',
                        }}

                        theme={{
                            backgroundColor: '#FAFAFA',
                            calendarBackground: '#FAFAFA',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: '#49B3BA',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: '#2d4150',
                            textDayFontFamily: 'Quicksand_600SemiBold',
                            textDayHeaderFontFamily: 'Quicksand_600SemiBold',
                            textMonthFontFamily: 'MontserratAlternates_600SemiBold',
                            textMonthFontSize: 20,
                            textDayHeaderFontSize: 12,



                        }}da
                        // (day => {
                        //     setSelected(day.dateString);
                        // }) &
                        onDayPress={(date) => setDataSelecionada(date.dateString)}
                        markedDates={{

                            [dataSelecionada]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                        }}
                    />

                </BoxCalendar>

                <BoxSelect>
                    <DateText>Selecione um horário disponível</DateText>
                    <Select
                        setHoraSelecionada={setHoraSelecionada}
                    />
                </BoxSelect>

                <Text style={{color: 'red',marginRight:"46.5%"}}>{erroData}</Text>



            </ContentBox>


            <AlignBox>
                <ButtonSchedule onPress={() => HandleContinue()}>
                    <ButtonTitle>continuar</ButtonTitle>
                </ButtonSchedule>

                <ButtonCancel onPress={() => Cancelar()}>
                    <LinkCancel>Cancelar</LinkCancel>
                </ButtonCancel>
            </AlignBox>


        </Container>
    )
}