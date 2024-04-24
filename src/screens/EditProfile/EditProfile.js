import { ActivityIndicator, ScrollView } from "react-native"
import { ContainerImage, ImageProfile } from "../../components/images/style"
import { ButtonTitle, InfoProfile, InfoTextProfile, LabelLocal, ProfileName, TitleProfile } from "../../components/title/style"
import { AlignContainer, Container, DoubleContentBox, SmallBox } from "../../components/container/style"
import { ContainerInfoProfile } from "../Profile/style"
import { ButtonCamera, DateBox, DoubleContentBoxEP } from "./Style"
import { InputGrey } from "../../components/input/styled"
import { ButtonEdit, ButtonLeave, ButtonLoginVE } from "../../components/button/style"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { userDecodeToken } from "../../utils/Auth"
import Loading from "../../utils/Loading";
import { MaterialCommunityIcons } from '@expo/vector-icons'

import api from "../../service/service"
import { CameraComp } from "../../components/CameraComp/CameraComp"

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
    const [pacienteInfo, setPacienteInfo] = useState(null);
    const [medicoInfo, setMedicoInfo] = useState(null);
    const [ showCamera, setShowCamera ] = useState(false);
    const [ uriCameraCapture, setUriCameraCapture ] = useState(null);

    //carrega o token com as informacoes do usuario
    async function profileLoad() {

        const token = await userDecodeToken();

        // setIdUsuario()
        setNome(token.name)
        setEmail(token.email)

        await LoadInfo(token);

        console.log(token);

    }

    async function LoadInfo(usuario) {
        if (usuario.role == 'Paciente') {
            await api.get(`/Pacientes/BuscarPorID?id=${usuario.jti}`)
                .then(response => {
                    setPacienteInfo(response.data)
                }).catch(error => {
                    console.log(error);
                })       
        } else {
            await api.get(`/Medicos/BuscarPorId?id=${usuario.jti}`)
                .then(response => {
                    setPacienteInfo(response.data);
                    console.log(response.data);
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    async function EraseInputText(){
        setEditField(false);

        setNascimento('');
        setCpf('');
        setEndereco('');
        setNumero('');
        setBairro('');
    }

    async function AlterarFotoPerfil(usuario) {
        const formData = new FormData();
        formData.append("Arquivo", {
            uri : uriCameraCapture,
            name : `image.${uriCameraCapture.split(".")[1]}`,
            type : `image/${uriCameraCapture.split(".")[1]}`
        })
        await api.put(`/Usuario/AlterarFotoPerfil?id=${usuario.jti}`, formdata, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }).then(response => {
            console.log('resposta' + response);
        }).catch( error => {
            console.log(error);
        })
    }

    async function SaveData(){
        
    }

    useEffect(() => {
        profileLoad();
    }, []);

    useEffect(() => {
        if (uriCameraCapture) {
            AlterarFotoPerfil();
        }
    }, [uriCameraCapture]);

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
                    {
                        showCamera == true ? (
                        <CameraComp
                            getMediaLibrary={true}
                            setShowCameraModal={setShowCamera}
                            showCameraModal={showCamera}
                            setUriCameraCapture={setUriCameraCapture}
                        />
                        ):(<></> )
                    }

                    <ContainerImage>
                        <ImageProfile
                            source={require('../../assets/profilePic.jpg')}
                        />
                        {/*  */}
                        
                        <ButtonCamera onPress={() => setShowCamera(true)}>
                            <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb" />
                        </ButtonCamera>
                    </ContainerImage>
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