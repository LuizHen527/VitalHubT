import { useNavigation } from "@react-navigation/native"
import { BoxModalSchedule, PacientModal, ScheduleModalView } from "../CancelAppointmentModal/Style"
import { LinkCancel } from "../Links/style"
import { ModalMedicalRecord } from "../MedicalRecordModal/Style"
import { ButtonCancel, ButtonLogin, ButtonLoginVE, ButtonSchedule } from "../button/style"
import { Input, InputScheduleModal_1, InputScheduleModal_2, InputScheduleModal_3 } from "../input/styled"
import { ButtonTitle, ScheduleModalText, TitleModal } from "../title/style"
import { BoxContent, BoxInput, ContainerBoxAlign } from "./Style"
import { useState } from "react"

const niveis = [{ id: 'D083C4DC-66E3-4856-BBFB-159764AA958D', tipo: 'Rotina' },
{ id: '07033F9A-4E0E-4F1B-928F-08990DF17761', tipo: 'Exame' },
{ id: '63261F6A-F19C-4651-A4DB-3601D68677E7', tipo: 'Urgencia' }]

export const ScheduleModal = ({
    visible, setShowModalSchedule, ...rest
}) => {
    const [agendamento, setAgendamento] = useState(null);

    const navigation = useNavigation();

    function HandleContinue() {
        // Verifica se o nível e a localização foram selecionados
        if (!agendamento || agendamento.prioridadeId == null || agendamento.localizacao == null) {
            return; // Se não estiverem selecionados, retorna sem fazer nada
        }
    
        // Esconde o modal de agendamento
        setShowModalSchedule(false);
    
        // Navega para a tela de seleção de clínica, passando os detalhes do agendamento
        navigation.replace('SelectClinic', { agendamento: agendamento });
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

                                        prioridadeId: 'D083C4DC-66E3-4856-BBFB-159764AA958D',
                                        prioridadeLabel: 'Rotina'
                                    })}
                                    placeholder="Rotina"
                                />
                                <InputScheduleModal_1
                                    onPress={() => setAgendamento({
                                        ...agendamento,

                                        prioridadeId: '07033F9A-4E0E-4F1B-928F-08990DF17761',
                                        prioridadeLabel: 'Exame'
                                    })}
                                    placeholder="Exame"
                                />
                                <InputScheduleModal_2
                                    onPress={() => setAgendamento({
                                        ...agendamento,

                                        prioridadeId: '63261F6A-F19C-4651-A4DB-3601D68677E7',
                                        prioridadeLabel: 'Urgencia'
                                    })}
                                    placeholder="Urgência"
                                />
                            </BoxInput>

                            <ScheduleModalText>Informe a localização desejada</ScheduleModalText>

                            <InputScheduleModal_3
                                placeholder="Informe a localização"
                                value={agendamento ? agendamento.localizacao : null}
                                onChangeText={(txt) => setAgendamento({
                                    ...agendamento, //Mantendo as informacoes de agendamento
                                    localizacao: txt
                                })}
                            />

                            <ButtonSchedule onPress={() => setShowModalSchedule(false) & HandleContinue()}>
                                <ButtonTitle>continuar</ButtonTitle>
                            </ButtonSchedule>

                            <ButtonCancel onPress={() => setShowModalSchedule(true)}>
                                <LinkCancel>Cancelar</LinkCancel>
                            </ButtonCancel>

                        </BoxContent>
                    </ContainerBoxAlign>

                </BoxModalSchedule>
            </ScheduleModalView>
        </ModalMedicalRecord>
    )
}