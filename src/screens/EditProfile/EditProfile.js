import { ActivityIndicator, ScrollView } from "react-native"
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
import Loading from "../../utils/Loading"

import api from "../../Service/Service"

export const EditProfile = ({ navigation }) => {

    const [visible, setVisible] = useState(false)

    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')

    const [profile, setProfile] = useState()
    const [pacienteInfo, setPacienteInfo] = useState(null)

    //carrega o token com as informacoes do usuario
    async function profileLoad() {

        const token = await userDecodeToken();

        // setIdUsuario()
        setNome(token.name)
        setEmail(token.email)

        await LoadInfo(token.jti);

    }

    async function LoadInfo(idUsuario) {
        await api.get(`/Pacientes/BuscarPorID?id=${idUsuario}`)
            .then(response => {
                setPacienteInfo(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        profileLoad();
    }, []);

    // useEffect(() => {
    //     LoadInfo();
    // }, [])

    async function logOff() {
        setVisible(true);

        try {
            const token = await AsyncStorage.removeItem('token')
            console.log(token);
        } catch (error) {
            console.log(error);
            setVisible(false);
        }

        navigation.replace("Login")
        setVisible(false);
    }



    return (
        <ScrollView>

            {pacienteInfo !== null ?
                (<Container>
                    <ImageProfile
                        source={require('../../assets/profilePic.jpg')}
                    />
                    <AlignContainer>
                        <ProfileName>{nome}</ProfileName>

                        <InfoProfile>{email}</InfoProfile>

                        <DateBox>
                            <LabelLocal>Data de nascimento:</LabelLocal>
                            <InputGrey
                                placeholder={pacienteInfo.dataNascimento}
                            />
                        </DateBox>

                        <DateBox>
                            <LabelLocal>CPF</LabelLocal>
                            <InputGrey
                                placeholder={pacienteInfo.cpf}
                            />
                        </DateBox>

                        <DateBox>
                            <LabelLocal>Endereço</LabelLocal>
                            <InputGrey
                                placeholder={pacienteInfo.endereco.logradouro}
                            />
                        </DateBox>

                        <DoubleContentBoxEP>
                            <SmallBox>
                                <LabelLocal>Numero</LabelLocal>
                                <InputGrey
                                    placeholder={`${pacienteInfo.endereco.numero}`}
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


                        {
                            !visible ? (

                                <ButtonLeave
                                    onPress={() => logOff()}

                                >
                                    <Loading visible={visible} />

                                    <ButtonTitle>sair do app</ButtonTitle>
                                </ButtonLeave>
                            ) : (
                                <ButtonLeave
                                    onPress={() => setVisible(true) &
                                        setTimeout(() => {
                                            setVisible(false);
                                        }, 5000)
                                    }

                                >
                                    <Loading visible={visible} />

                                    <ButtonTitle>sair do app</ButtonTitle>
                                </ButtonLeave>
                            )
                        }


                    </AlignContainer>
                </Container>) : (<ActivityIndicator/>)
            }




        </ScrollView>
    )
}