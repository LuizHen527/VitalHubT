import { ScrollView } from "react-native"
import { ImageProfile } from "../../components/images/style"
import { ButtonTitle, InfoProfile, InfoTextProfile, LabelLocal, ProfileName, TitleProfile } from "../../components/title/style"
import { AlignContainer, Container, DoubleContentBox, SmallBox } from "../../components/container/style"
import { ContainerInfoProfile } from "../Profile/style"
import { DateBox, DoubleContentBoxEP } from "./Style"
import { InputGrey } from "../../components/input/styled"
import { ButtonEdit, ButtonLeave, ButtonLoginVE } from "../../components/button/style"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { userDecodeToken } from "../../utils/Auth"

export const EditProfile = ({navigation}) => {

    const [nome,setNome] = useState('')
    const [email,setEmail] = useState('')

    async function profileLoad(){

        const token = await userDecodeToken();

        setNome(token.name)
        setEmail(token.email)


        console.log(token);
    }

    useEffect(() => {
        profileLoad();
    },[]);

    async function logOff() {


try {
    
    const token = await AsyncStorage.removeItem('token')

    console.log(token);
} catch (error) {
    console.log(error);
}


        navigation.replace("Login")
    }



    return(
        <ScrollView>
            <Container>
                <ImageProfile
                    source={require('../../assets/profilePic.jpg')}
                />
                <AlignContainer>
                    <ProfileName>{nome}</ProfileName>

                    <InfoProfile>{email}</InfoProfile>

                    <DateBox>
                        <LabelLocal>Data de nascimento:</LabelLocal>
                        <InputGrey
                            placeholder="04/05/1999"
                        />
                    </DateBox>

                    <DateBox>
                        <LabelLocal>CPF</LabelLocal>
                        <InputGrey
                            placeholder="859********"
                        />
                    </DateBox>

                    <DateBox>
                        <LabelLocal>Endereço</LabelLocal>
                        <InputGrey
                            placeholder="Rua Vicenso Silva, 987"
                        />
                    </DateBox>

                    <DoubleContentBoxEP>
                        <SmallBox>
                            <LabelLocal>Numero</LabelLocal>
                            <InputGrey
                                placeholder="578"
                            />
                        </SmallBox>

                        <SmallBox>
                            <LabelLocal>Bairro</LabelLocal>
                            <InputGrey
                                placeholder="Moema-SP"
                            />
                        </SmallBox>
                    </DoubleContentBoxEP>

                    <ButtonEdit>
                        <ButtonTitle>SALVAR</ButtonTitle>
                    </ButtonEdit>

                    <ButtonEdit>
                        <ButtonTitle>Editar</ButtonTitle>
                    </ButtonEdit>

                    <ButtonLeave 
                     onPress={() => logOff()}
                    >
                        <ButtonTitle>sair do app</ButtonTitle>
                    </ButtonLeave>
                </AlignContainer>
            </Container>
        </ScrollView>
    )
}