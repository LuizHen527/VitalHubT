import { useNavigation } from "@react-navigation/native";
import {
  BoxModalSchedule,
  PacientModal,
  ScheduleModalView
} from "../CancelAppointmentModal/Style";
import { LinkCancel } from "../Links/style";
import { ModalMedicalRecord } from "../MedicalRecordModal/Style";
import {
  ButtonCancel,
  ButtonLogin,
  ButtonLoginVE,
  ButtonSchedule
} from "../button/style";
import {
  Input,
  InputScheduleModal_1,
  InputScheduleModal_2,
  InputScheduleModal_3
} from "../input/styled";
import { ButtonTitle, ScheduleModalText, TitleModal } from "../title/style";
import { BoxContent, BoxInput, ContainerBoxAlign } from "./Style";
import { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import styled from "styled-components";
import api from "../../service/service";
import { SelectList } from "react-native-dropdown-select-list";

const niveis = [
  { id: "D083C4DC-66E3-4856-BBFB-159764AA958D", tipo: "Rotina" },
  { id: "07033F9A-4E0E-4F1B-928F-08990DF17761", tipo: "Exame" },
  { id: "63261F6A-F19C-4651-A4DB-3601D68677E7", tipo: "Urgencia" }
];

export const ScheduleModal = ({
  visible,
  setShowModalSchedule,
  route,
  ...rest
}) => {
  const [erroNivel, setErroNivel] = useState("");
  const [listaLocalizacao, setListaLocalizacao] = useState([]);
  const [selected, setSelected] = useState("");
  const [localizacao, setLocalizacao] = useState(null);
  const [erroLocalizacao, setErroLocalizacao] = useState("");
  const [agendamento, setAgendamento] = useState({ prioridadeId: null, localizacao: null });

  const navigation = useNavigation();

  async function GetCitys() {
    await api
      .get("/Clinica/ListarTodas")
      .then((response) => {
        setLocalizacao(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function SetCitys() {
    if (localizacao && localizacao.length > 0) {
      const cidades = localizacao.map((item) => item.endereco.cidade);
      setListaLocalizacao(cidades);
    }
  }

  function dePara(retornoApi) {
    if (listaLocalizacao != null) {
      let arrayOptions = [];
      retornoApi.forEach((e) => {
        arrayOptions.push({ value: e });
      });

      return arrayOptions;
    }
  }

  useEffect(() => {
    GetCitys();
  }, []);

  useEffect(() => {
    SetCitys();
  }, [localizacao]);

  function HandleContinue() {
    // Verifica se o nível e a localização foram selecionados
    if (!agendamento || agendamento.prioridadeId == null || agendamento.localizacao == null) {
      let error = false;
      setErroNivel("Selecione prioridade");
      setErroLocalizacao("Preencha localização");
      error = true;

      return !error; // Se não estiverem selecionados, retorna sem fazer nada
    }

    // Esconde o modal de agendamento
    setShowModalSchedule(false);

    // Navega para a tela de seleção de clínica, passando os detalhes do agendamento
    navigation.replace("SelectClinic", { agendamento: agendamento });
  }

  function Cancelar() {
    setShowModalSchedule(false);
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
                  onPress={() =>
                    setAgendamento({
                      ...agendamento,
                      prioridadeId: "83F5E13D-163C-41FD-98AF-A2A5BC765C77",
                      prioridadeLabel: "Rotina"
                    })
                  }
                >
                  <Text style={styles.placeHolderNivel}>Rotina</Text>
                </InputScheduleModal_1>
                <InputScheduleModal_1
                  onPress={() =>
                    setAgendamento({
                      ...agendamento,
                      prioridadeId: "BE3B3BD5-B62E-48C4-B17D-9B0441E54E10",
                      prioridadeLabel: "Exame"
                    })
                  }
                >
                  <Text style={styles.placeHolderNivel}>Exame</Text>
                </InputScheduleModal_1>
                <InputScheduleModal_2
                  onPress={() =>
                    setAgendamento({
                      ...agendamento,
                      prioridadeId: "1C69B86B-29BE-4C0C-AF88-F112A05992BD",
                      prioridadeLabel: "Urgencia"
                    })
                  }
                >
                  <Text style={styles.placeHolderNivel}>Urgência</Text>
                </InputScheduleModal_2>
              </BoxInput>
              <Text style={{ color: "red", marginRight: "46.5%" }}>{erroNivel}</Text>

              <ScheduleModalText>Informe a localização desejada</ScheduleModalText>

              <SelectList
                boxStyles={{ width: "100%", height: 70, alignItems: "center", marginTop: 20 }}
                fontFamily="Quicksand_500Medium"
                searchPlaceholder="Pesquise"
                placeholder="Selecione uma cidade"
                maxHeight={100}
                dropdownTextStyles={{ fontSize: 18 }}
                inputStyles={{ fontSize: 18 }}
                setSelected={(txt) =>
                  setAgendamento({
                    ...agendamento,
                    localizacao: txt
                  })
                }
                notFoundText="Nenhum dado encontrado"
                data={dePara(listaLocalizacao)}
                save="value"
              />

              <Text style={{ color: "red", marginRight: "46.5%" }}>{erroLocalizacao}</Text>

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
  );
};

const styles = StyleSheet.create({
  placeHolderNivel: {
    color: "#34898f"
  }
});
