import { useNavigation } from "@react-navigation/native"
import { BoxModalSchedule, PacientModal, ScheduleModalView } from "../CancelAppointmentModal/Style"
import { LinkCancel } from "../Links/style"
import { ModalMedicalRecord } from "../MedicalRecordModal/Style"
import { ButtonCancel, ButtonLogin, ButtonLoginVE, ButtonSchedule } from "../button/style"
import { Input, InputScheduleModal_1, InputScheduleModal_2, InputScheduleModal_3 } from "../input/styled"
import { ButtonTitle, ScheduleModalText, TitleModal } from "../title/style"
import { BoxContent, BoxInput, ContainerBoxAlign } from "./Style"
import { useEffect, useState } from "react"
import { Text,StyleSheet } from "react-native"
import styled from "styled-components"
import api from "../../service/service"
import { SelectList } from "react-native-dropdown-select-list"



const niveis = [{ id: 'D083C4DC-66E3-4856-BBFB-159764AA958D', tipo: 'Rotina' },
{ id: '07033F9A-4E0E-4F1B-928F-08990DF17761', tipo: 'Exame' },
{ id: '63261F6A-F19C-4651-A4DB-3601D68677E7', tipo: 'Urgencia' }]

export const ScheduleModal = ({
    visible, setShowModalSchedule, route, ...rest
}) => {
    const cidadeClinica = useState([])
    const [agendamento, setAgendamento] = useState(null);
    const [erroNivel, setErroNivel] = useState("");
    const [listaLocalizacao, setListaLocalizacao] = useState([])
    const [localizacao, setLocalizacao] = useState(null)
    const [erroLocalizacao, setErroLocalizacao] = useState("");

    const navigation = useNavigation();

    async function GetCitys(){
       await api.get("/Clinica/ListarTodas")
       .then(response => {
           setLocalizacao(response.data)
           console.log("CIDADES--------------->");
           console.log(response.data);
       }).catch(error => {
        console.log(error);
       })
    }

    function SetCitys(){
        if (localizacao && localizacao.length > 0) {
            const cidades = localizacao.map(item => item.endereco.cidade);
            setListaLocalizacao(cidades);
        }
    }


   useEffect(() => {
    GetCitys();
}, []);

useEffect(() => {
    SetCitys();
    console.log(listaLocalizacao);
}, [localizacao]);


    function HandleContinue() {
        // Verifica se o nível e a localização foram selecionados
        if (!agendamento || agendamento.prioridadeId == null || agendamento.localizacao == null) {

            let error = false
            setErroNivel("Selecione prioridade")
            setErroLocalizacao("Preencha localização")
            error = true

            return !error; // Se não estiverem selecionados, retorna sem fazer nada
        }

        // Esconde o modal de agendamento
        setShowModalSchedule(false);

        // Navega para a tela de seleção de clínica, passando os detalhes do agendamento
        navigation.replace('SelectClinic', { agendamento: agendamento });
    }


    function Cancelar() {

        setShowModalSchedule(false)

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
                                ><Text style={styles.placeHolderNivel}  >Rotina</Text></InputScheduleModal_1>
                                <InputScheduleModal_1
                                    onPress={() => setAgendamento({
                                        ...agendamento,

                                        prioridadeId: '07033F9A-4E0E-4F1B-928F-08990DF17761',
                                        prioridadeLabel: 'Exame'
                                    })}
                                >
                                    <Text style={styles.placeHolderNivel}  >Exame</Text>
                                </InputScheduleModal_1>
                                <InputScheduleModal_2
                                    onPress={() => setAgendamento({
                                        ...agendamento,

                                        prioridadeId: '63261F6A-F19C-4651-A4DB-3601D68677E7',
                                        prioridadeLabel: 'Urgencia'
                                    })}
                                    
                                ><Text style={styles.placeHolderNivel}  >Urgência</Text></InputScheduleModal_2>
                            </BoxInput>

                            <Text style={{ color: 'red', marginRight: "46.5%" }}>{erroNivel}</Text>


                            <ScheduleModalText>Informe a localização desejada</ScheduleModalText>
                            
                     
                           
                            <SelectList

                                data={listaLocalizacao}
                                placeholder="Informe a localização"
                                value={agendamento ? agendamento.localizacao : null}
                                onSelect={(item)=> setAgendamento({
                                    ...agendamento,
                                    localizacao:item
                                })}
                            
                            />
                     

                         
                            {/* <InputScheduleModal_3
                                placeholder="Informe a localização"
                                value={agendamento ? agendamento.localizacao : null}
                                onChangeText={(txt) => setAgendamento({
                                    ...agendamento, //Mantendo as informacoes de agendamento
                                    localizacao: txt
                                })}
                            /> */}

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


const styles = StyleSheet.create({
    placeHolderNivel:{
        color:"#34898f"
    }
})