import { ScrollView } from "react-native"
import { Container } from "../../components/container/style"
import { ImageProfile } from "../../components/images/style"
import { InputDescriptionEdit, InputDescriptionProfile, InputDiagnosisEdit, InputDiagnosisProfile, InputPrescriptionEdit, InputPrescriptionProfile } from "../../components/input/styled"
import { ButtonTitle, InfoTextProfile, InputTitle, TitleProfile } from "../../components/title/style"
import { ContainerInfoProfile, ContainerInput, ContainerInputProfile, TextInput, TextInputEdit } from "./style"
import { ButtonBlue, ButtonBlue2, ButtonCancel, ButtonGrayEdit, ButtonGrayEdit2, ButtonLoginVE } from "../../components/button/style"
import { LinkCancel } from "../../components/Links/style"
import { useEffect, useState } from "react"
import moment from "moment"
import api from "../../service/service"


export const Profile = ({navigation, route}) => {

    const [ editInput, setEditInput ] = useState(false);
    const [idade, setIdade] = useState();
    const [medicamento, setMedicamento] = useState();
    const [descricao, setDescricao] = useState();
    const [diagnostico, setDiagnostico] = useState();

    async function CalcIdade() {
        const date = moment().format('YYYY');
        const nascimento = moment(route.params.consulta.paciente.dataNascimento).format('YYYY');
        const idadeResult = date - nascimento;

        setIdade(idadeResult);
    }

    async function CadastrarProntuario() {
        api.put(`/Consultas/Prontuario`, {
            consultaId: route.params.consulta.id,
            medicamento: medicamento,
            descricao: descricao,
            diagnostico: diagnostico,
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        CalcIdade();
    }, [])

    return(
        <ScrollView>
            <Container>
                <ImageProfile
                    source={{ uri: route.params.consulta.paciente.idNavigation.foto }}
                />

                <TitleProfile>{route.params.consulta.paciente.idNavigation.nome}</TitleProfile>

                <ContainerInfoProfile>
                    <InfoTextProfile>{idade} anos</InfoTextProfile>
                    <InfoTextProfile>{route.params.consulta.paciente.idNavigation.email}</InfoTextProfile>
                </ContainerInfoProfile>
                
                <ContainerInputProfile>
                    <InputTitle>Descrição da consulta</InputTitle>

                    {
                        editInput == false ? (
                            <InputDescriptionProfile
                                multiline={true}
                            >
                                <TextInput>{route.params.consulta.descricao == undefined ? 'Insira a descrição' : route.params.consulta.descricao}</TextInput>
                            </InputDescriptionProfile>
                        ) :
                        (
                            <InputDescriptionEdit multiline={true} onChangeText={value => setDescricao(value)} value={descricao}>
                            </InputDescriptionEdit>
                        )
                    }
                </ContainerInputProfile>

                <ContainerInputProfile>
                    <InputTitle>Diagnostico do paciente</InputTitle>

                    {
                        editInput == false ? (
                            <InputDiagnosisProfile editable={false}>
                                <TextInput>{route.params.consulta.diagnostico == undefined ? 'Insira o diagnóstico' : route.params.consulta.diagnostico}</TextInput>
                            </InputDiagnosisProfile>
                        ):

                        (
                            <InputDiagnosisEdit onChangeText={value => setDiagnostico(value)} value={diagnostico}>
                                
                            </InputDiagnosisEdit>
                        )
                    }
                </ContainerInputProfile>

                <ContainerInputProfile>
                    <InputTitle>Prescrição médica</InputTitle>

                    {
                        editInput == false ? (
                            <InputPrescriptionProfile multiline={true} editable={false}>
                                <TextInput>{route.params.consulta.receita.medicamento == undefined ? 'Insira o diagnóstico' : route.params.consulta.receita.medicamento}</TextInput>
                            </InputPrescriptionProfile>
                        ):(
                            <InputPrescriptionEdit onChangeText={value => setMedicamento(value)} value={medicamento}>
                            </InputPrescriptionEdit>
                        )
                    }


                </ContainerInputProfile>

                {
                    editInput == false ? (
                        <ButtonGrayEdit2 >
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </ButtonGrayEdit2>
                    ):
                    (
                        <ButtonBlue2 onPress={() => CadastrarProntuario()}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </ButtonBlue2>
                    )
                }

                {
                    editInput == false ? (
                        <ButtonBlue onPress={() => setEditInput(true)}>
                            <ButtonTitle>EDITAR</ButtonTitle>
                        </ButtonBlue>
                    ):
                    (
                        <ButtonBlue onPress={() => setEditInput(false)}>
                            <ButtonTitle>PARAR DE EDITAR</ButtonTitle>
                        </ButtonBlue>
                    )
                }


                <ButtonCancel onPress={() => navigation.pop(1)}>
                    <LinkCancel>Cancelar</LinkCancel>
                </ButtonCancel>

            </Container>
        </ScrollView>

    )
}