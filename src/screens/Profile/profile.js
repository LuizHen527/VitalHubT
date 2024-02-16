import { ScrollView } from "react-native"
import { Container } from "../../components/container/style"
import { ImageProfile } from "../../components/images/style"
import { InputDescriptionProfile, InputDiagnosisProfile, InputPrescriptionProfile } from "../../components/input/styled"
import { ButtonTitle, InfoTextProfile, InputTitle, TitleProfile } from "../../components/title/style"
import { ContainerInfoProfile, ContainerInput, ContainerInputProfile, TextInput } from "./style"
import { ButtonLoginVE } from "../../components/button/style"
import { LinkCancel } from "../../components/Links/style"


export const Profile = () => {
    return(
        <ScrollView>
            <Container>
                <ImageProfile
                    source={require('../../assets/profilePic.jpg')}
                />

                <TitleProfile>Richard Kosta</TitleProfile>

                <ContainerInfoProfile>
                    <InfoTextProfile>22 anos</InfoTextProfile>
                    <InfoTextProfile>richard.kosta@gmail.com</InfoTextProfile>
                </ContainerInfoProfile>
                
                <ContainerInputProfile>
                    <InputTitle>Descrição da consulta</InputTitle>

                    <InputDescriptionProfile>
                            <TextInput>Descrição</TextInput>
                    </InputDescriptionProfile>
                </ContainerInputProfile>

                <ContainerInputProfile>
                    <InputTitle>Diagnostico do paciente</InputTitle>

                    <InputDiagnosisProfile>
                            <TextInput>Diagnostico</TextInput>
                    </InputDiagnosisProfile>
                </ContainerInputProfile>

                <ContainerInputProfile>
                    <InputTitle>Diagnostico do paciente</InputTitle>

                    <InputPrescriptionProfile>
                            <TextInput>Diagnostico</TextInput>
                    </InputPrescriptionProfile>
                </ContainerInputProfile>

                <ButtonLoginVE>
                    <ButtonTitle>SALVAR</ButtonTitle>
                </ButtonLoginVE>

                <LinkCancel>Cancelar</LinkCancel>

            </Container>
        </ScrollView>

    )
}