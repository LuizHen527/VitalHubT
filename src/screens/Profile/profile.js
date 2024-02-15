import { ScrollView } from "react-native"
import { Container } from "../../components/container/style"
import { ImageProfile } from "../../components/images/style"
import { InputDescriptionProfile } from "../../components/input/styled"
import { InfoTextProfile, InputTitle, TitleProfile } from "../../components/title/style"
import { ContainerInfoProfile, ContainerInput, TextInput } from "./style"


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
                
                <InputTitle>Descrição da consulta</InputTitle>

                <InputDescriptionProfile>
                        <TextInput>Descrição</TextInput>
                </InputDescriptionProfile>
            </Container>
        </ScrollView>

    )
}