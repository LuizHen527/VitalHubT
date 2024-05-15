import { useNavigation } from "@react-navigation/native"
import { BoxModalSchedule, PacientModal, ScheduleModalView } from "../CancelAppointmentModal/Style"
import { LinkCancel } from "../Links/style"
import { ModalMedicalRecord } from "../MedicalRecordModal/Style"
import { ButtonCancel, ButtonLogin, ButtonLoginVE, ButtonSchedule } from "../button/style"
import { Input, InputScheduleModal_1, InputScheduleModal_2, InputScheduleModal_3 } from "../input/styled"
import { ButtonTitle, ScheduleModalText, TitleModal } from "../title/style"
import { BoxContent, BoxInput, ContainerBoxAlign } from "./Style"
import { useState } from "react"
import { Text } from "react-native"

const niveis = [{ id: 'D083C4DC-66E3-4856-BBFB-159764AA958D', tipo: 'Rotina' },
{ id: '07033F9A-4E0E-4F1B-928F-08990DF17761', tipo: 'Exame' },
{ id: '63261F6A-F19C-4651-A4DB-3601D68677E7', tipo: 'Urgencia' }]

export const ScheduleModal = ({
    visible, setShowModalSchedule, route, ...rest
}) => {
    const [agendamento, setAgendamento] = useState(null);
    const [erroNivel, setErroNivel] = useState("");
    const [listaLocalizacao,setListaLocalizacao] = useState(null)
    const [localizacao,setLocalizacao] = useState(null)
    const [erroLocalizacao, setErroLocalizacao] = useState("");

    const navigation = useNavigation();

    function HandleContinue() {
        // Verifica se o nível e a localização foram selecionados
        if (!agendamento || agendamento.prioridadeId == null || agendamento.localizacao == null) {

            let error = false
            setErroNivel("Selecione prioridade")
            setErroLocalizacao("Preencha corretamente")
            error = true

            return !error; // Se não estiverem selecionados, retorna sem fazer nada
        }

        // Esconde o modal de agendamento
        setShowModalSchedule(false);

        // Navega para a tela de seleção de clínica, passando os detalhes do agendamento
        navigation.replace('SelectClinic', { agendamento: agendamento });
    }


    function Cancelar() {

        console.log("E NULOOOOOOOOOOOOOOOOOO___________________", agendamento);
        navigation.replace("AppointmentPacient")

    }

    return (
        <ModalMedicalRecord {...rest} visible={visible} transparent={true} animationType="fade">
            <ScheduleModalView>
                <BoxModalSchedule>

                    <ContainerBoxAlign>
                        <TitleModal>Agendar consulta</TitleModal>
                        <BoxContent>
                            <ScheduleModalText>Qual o nível da consulta</ScheduleModalText>

                            <BoxInput>
                                <InputScheduleModal_1
                                    onPress={() => setAgendamento({
                                        ...agendamento,

                                        prioridadeId: '83F5E13D-163C-41FD-98AF-A2A5BC765C77',
                                        prioridadeLabel: 'Rotina'
                                    })}
                                    placeholder="Rotina"
                                />
                                <InputScheduleModal_1
                                    onPress={() => setAgendamento({
                                        ...agendamento,

                                        prioridadeId: 'BE3B3BD5-B62E-48C4-B17D-9B0441E54E10',
                                        prioridadeLabel: 'Exame'
                                    })}
                                    placeholder="Exame"
                                />
                                <InputScheduleModal_2
                                    onPress={() => setAgendamento({
                                        ...agendamento,

                                        prioridadeId: '1C69B86B-29BE-4C0C-AF88-F112A05992BD',
                                        prioridadeLabel: 'Urgencia'
                                    })}
                                    placeholder="Urgência"
                                />
                            </BoxInput>

                            <Text style={{ color: 'red', marginRight: "46.5%" }}>{erroNivel}</Text>


                            <ScheduleModalText>Informe a localização desejada</ScheduleModalText>

                            

                            <InputScheduleModal_3
                                placeholder="Informe a localização"
                                value={agendamento ? agendamento.localizacao : null}
                                onChangeText={(txt) => setAgendamento({
                                    ...agendamento, //Mantendo as informacoes de agendamento
                                    localizacao: txt
                                })}
                            />
                            
                            <Text style={{ color: 'red', marginRight: "46.5%" }}>{erroLocalizacao}</Text>



                            <ButtonSchedule onPress={() => HandleContinue()}>
                                <ButtonTitle>continuar</ButtonTitle>
                            </ButtonSchedule>

                            <ButtonCancel onPress={() => Cancelar()}>
                                <LinkCancel>Cancelar</LinkCancel>
                            </ButtonCancel>

                        </BoxContent>
                    </ContainerBoxAlign>

                </BoxModalSchedule>
            </ScheduleModalView>
        </ModalMedicalRecord>
    )
}