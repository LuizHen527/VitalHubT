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

import api from "../../service/service"

export const EditProfile = ({ navigation }) => {

    const [visible, setVisible] = useState(false)

    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [cpf, setCpf] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    
    const [editField, setEditField] = useState(false)
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

    async function EraseInputText(){
        setEditField(false);

        setNascimento('');
        setCpf('');
        setEndereco('');
        setNumero('');
        setBairro('');
    }

    async function SaveData(){
        
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
                                editable={editField}
                                value={nascimento}
                                placeholder={pacienteInfo.dataNascimento}
                                onChangeText={value => setNascimento(value)}
                            />
                        </DateBox>

                        <DateBox>
                            <LabelLocal>CPF</LabelLocal>
                            <InputGrey
                                editable={editField}
                                value={cpf}
                                placeholder={pacienteInfo.cpf}
                                onChangeText={value => setCpf(value)}
                            />
                        </DateBox>

                        <DateBox>
                            <LabelLocal>Endereço</LabelLocal>
                            <InputGrey
                                editable={editField}
                                value={endereco}
                                placeholder={pacienteInfo.endereco.logradouro}
                                onChangeText={value => setEndereco(value)}
                            />
                        </DateBox>

                        <DoubleContentBoxEP>
                            <SmallBox>
                                <LabelLocal>Numero</LabelLocal>
                                <InputGrey
                                    editable={editField}
                                    value={numero}
                                    placeholder={`${pacienteInfo.endereco.numero}`}
                                    onChangeText={value => setNumero(value)}
                                />
                            </SmallBox>

                            <SmallBox>
                                <LabelLocal>Bairro</LabelLocal>
                                <InputGrey
                                    editable={editField}
                                    value={bairro}
                                    placeholder={`${pacienteInfo.endereco.cidade}`}
                                    onChangeText={value => setBairro(value)}
                                />
                            </SmallBox>
                        </DoubleContentBoxEP>

                        <ButtonEdit>
                            <ButtonTitle>SALVAR</ButtonTitle>
                        </ButtonEdit>

                        <ButtonEdit onPress={() => editField == true ? EraseInputText() : setEditField(true)}>
                            {
                                editField == true ? (
                                    <ButtonTitle>Parar de editar</ButtonTitle>
                                ) : (
                                    <ButtonTitle>Editar</ButtonTitle>
                                )
                            }
                            
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