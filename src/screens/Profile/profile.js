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


export const Profile = ({navigation, route}) => {

    const [ editInput, setEditInput ] = useState(false);
    const [idade, setIdade] = useState();

    async function CalcIdade() {
        const date = moment().format('YYYY');
        const nascimento = moment(route.params.consulta.paciente.dataNascimento).format('YYYY');
        const idadeResult = date - nascimento;

        setIdade(idadeResult);
    }

    async function CadastrarProntuario() {
        api.put(``)
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
                                <TextInput>O paciente possuí uma infecção no 
                                ouvido. Necessário repouse de 2 dias 
                                e acompanhamento médico constante</TextInput>
                            </InputDescriptionProfile>
                        ) :
                        (
                            <InputDescriptionEdit>
                                <TextInputEdit multiline={true}>Descrição</TextInputEdit>
                            </InputDescriptionEdit>
                        )
                    }
                </ContainerInputProfile>

                <ContainerInputProfile>
                    <InputTitle>Diagnostico do paciente</InputTitle>

                    {
                        editInput == false ? (
                            <InputDiagnosisProfile editable={false}>
                                <TextInput>Infecção no ouvido</TextInput>
                            </InputDiagnosisProfile>
                        ):

                        (
                            <InputDiagnosisEdit>
                                <TextInputEdit>Diagnostico </TextInputEdit>
                            </InputDiagnosisEdit>
                        )
                    }
                </ContainerInputProfile>

                <ContainerInputProfile>
                    <InputTitle>Prescrição médica</InputTitle>

                    {
                        editInput == false ? (
                            <InputPrescriptionProfile multiline={true} editable={false}>
                                <TextInput>Medicamento: Advil 
                                    Dosagem: 50 mg 
                                    Frequência: 3 vezes ao dia 
                                    Duração: 3 dias</TextInput>
                            </InputPrescriptionProfile>
                        ):(
                            <InputPrescriptionEdit>
                                <TextInputEdit>Prescrição medica</TextInputEdit>
                            </InputPrescriptionEdit>
                        )
                    }


                </ContainerInputProfile>

                {
                    editInput == false ? (
                        <ButtonGrayEdit2 onPress={() => setEditInput(true)}>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </ButtonGrayEdit2>
                    ):
                    (
                        <ButtonBlue2 onPress={() => setEditInput(false)}>
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