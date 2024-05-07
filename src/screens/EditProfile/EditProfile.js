import { ActivityIndicator, ScrollView } from "react-native"
import { ContainerImage, ImageProfile } from "../../components/images/style"
import { ButtonTitle, InfoProfile, InfoTextProfile, LabelLocal, ProfileName, TitleProfile } from "../../components/title/style"
import { AlignContainer, Container, DoubleContentBox, SmallBox } from "../../components/container/style"
import { ContainerInfoProfile } from "../Profile/style"
import { ButtonCamera, DateBox, DoubleContentBoxEP } from "./Style"
import { InputGrey } from "../../components/input/styled"
import { ButtonEdit, ButtonLeave, ButtonLoginVE } from "../../components/button/style"
import React, { useEffect, useRef, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { userDecodeToken } from "../../utils/Auth"
import Loading from "../../utils/Loading";
import { MaterialCommunityIcons } from '@expo/vector-icons'

import api from "../../service/service"
import { CameraComp } from "../../components/CameraComp/CameraComp"
import moment from "moment"
import Toast from "react-native-toast-message"
import { useScrollToTop } from "@react-navigation/native"

export const EditProfile = ({ navigation }) => {

    const ref = useRef(null);
    useScrollToTop(ref);
    const [visible, setVisible] = useState(false)

    const [nome, setNome] = useState('')
    const [nomeUpdate, setNomeUpdate] = useState('')
    const [nomeUpdated, setNomeUpdated] = useState('')
    const [rg, setRg] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [cpf, setCpf] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep] = useState('')
    const [cidade, setCidade] = useState('');

    const [email, setEmail] = useState('')
    const [fotoPerfil, setFotoPerfil] = useState();

    const [editField, setEditField] = useState(false)
    const [pacienteInfo, setPacienteInfo] = useState(null);
    const [medicoInfo, setMedicoInfo] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [uriCameraCapture, setUriCameraCapture] = useState(null);
    const [usuarioInfo, setUsuarioInfo] = useState(null);



    //carrega o token com as informacoes do usuario
    async function profileLoad() {

        const token = await userDecodeToken();

        // setIdUsuario()
        setNome(token.name);
        setEmail(token.email);
        setUsuarioInfo(token);

        await LoadInfo(token);
    }



    async function LoadInfo(usuario) {
        if (usuario.role == 'Paciente') {
            await api.get(`/Pacientes/BuscarPorID?id=${usuario.jti}`)
                .then(response => {
                    setPacienteInfo(response.data);
                    setFotoPerfil(response.data.idNavigation.foto)
                }).catch(error => {
                    console.log(error);
                })
        } else {
            await api.get(`/Medicos/BuscarPorId?id=${usuario.jti}`)
                .then(response => {
                    setPacienteInfo(response.data);
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    async function EraseInputText() {
        setEditField(false);

        setRg('');
        setNomeUpdate('');
        setNascimento('');
        setCpf('');
        setLogradouro('');
        setNumero('');
        setCidade('');
        setCep('');
    }

    async function AlterarFotoPerfil() {
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: uriCameraCapture,
            name: `image.${uriCameraCapture.split(".")[1]}`,
            type: `image/${uriCameraCapture.split(".")[1]}`
        })
        await api.put(`/Usuario/AlterarFotoPerfil?id=${usuarioInfo.jti}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            setFotoPerfil(uriCameraCapture);
        }).catch(error => {
            console.log(error);
        })

        console.log(fotoPerfil);

    }

    async function SaveData() {
        if (usuarioInfo.role == 'Paciente') {

            await api.put(`/Pacientes?idUsuario=${usuarioInfo.jti}`, {
                rg: rg === '' ? pacienteInfo.rg : rg,
                cpf: cpf === '' ? pacienteInfo.cpf : cpf,
                dataNascimento: nascimento === '' ? pacienteInfo.dataNascimento : nascimento,
                cep: cep === '' ? pacienteInfo.endereco.cep : cep,
                logradouro: logradouro === '' ? pacienteInfo.endereco.logradouro : logradouro,
                numero: numero === '' ? pacienteInfo.endereco.numero : numero,
                cidade: cidade === '' ? pacienteInfo.endereco.cidade : cidade,
                nome: nomeUpdate === '' ? pacienteInfo.idNavigation.nome : nomeUpdate,
            }).then(response => {
                Refresh();
            }).catch(erro => {
                console.log(erro);
            })
        }
    }

    function Refresh() {
        EraseInputText();
        profileLoad();
        setNomeUpdated(nomeUpdate);
        
        ref.current?.scrollTo({
            y: 0,
            animated: true,
        });
        showToast();
    }

    useEffect(() => {
        profileLoad();
    }, []);

    useEffect(() => {
        if (uriCameraCapture) {
            AlterarFotoPerfil();
        } else {

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

    const showToast = () => {
        Toast.show({
          type: 'success',
          text1: 'Hello',
          text2: 'This is some something 👋'
        });
    }



    return (
        
        <ScrollView ref={ref}>

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
                        ) : (<></>)
                    }

                    <ContainerImage>
                        <ImageProfile
                            source={{ uri: fotoPerfil }}
                        />
                        {/*  */}

                        <ButtonCamera onPress={() => setShowCamera(true)}>
                            <MaterialCommunityIcons name="camera-plus" size={20} color="#fbfbfb" />
                        </ButtonCamera>
                    </ContainerImage>
                    <AlignContainer>
                        <ProfileName>{nomeUpdated === '' ? nome : nomeUpdated}</ProfileName>

                        <InfoProfile>{email}</InfoProfile>


                        <DateBox>
                            <LabelLocal>Nome</LabelLocal>
                            <InputGrey
                                editable={editField}
                                value={nomeUpdate}
                                placeholder={pacienteInfo.idNavigation.nome == undefined ? 'Não informado' : pacienteInfo.idNavigation.nome}
                                onChangeText={value => setNomeUpdate(value)}
                            />
                        </DateBox>


                        <DateBox>
                            <LabelLocal>RG</LabelLocal>
                            <InputGrey
                                editable={editField}
                                value={rg}
                                placeholder={pacienteInfo.rg == undefined ? 'Não informado' : pacienteInfo.rg}
                                onChangeText={value => setRg(value)}
                            />
                        </DateBox>

                        <DateBox>
                            <LabelLocal>Data de nascimento:</LabelLocal>
                            <InputGrey
                                editable={editField}
                                inputMode={'numeric'}
                                value={nascimento}
                                placeholder={pacienteInfo.dataNascimento == undefined ? 'Não informado' : moment(pacienteInfo.dataNascimento).format('L')}
                                onChangeText={value => setNascimento(value)}
                            />
                        </DateBox>

                        <DateBox>
                            <LabelLocal>CPF</LabelLocal>
                            <InputGrey
                                editable={editField}
                                value={cpf}
                                placeholder={pacienteInfo.cpf == undefined ? 'Não informado' : pacienteInfo.cpf}
                                onChangeText={value => setCpf(value)}
                            />
                        </DateBox>

                        <DoubleContentBoxEP>
                            <SmallBox>
                                <LabelLocal>Logradouro</LabelLocal>
                                <InputGrey
                                    editable={editField}
                                    value={logradouro}
                                    placeholder={pacienteInfo.endereco.logradouro == undefined ? 'Não informado' : pacienteInfo.endereco.logradouro}
                                    onChangeText={value => setLogradouro(value)}
                                />
                            </SmallBox>

                            <SmallBox>
                                <LabelLocal>Número</LabelLocal>
                                <InputGrey
                                    editable={editField}
                                    value={numero}
                                    placeholder={`${pacienteInfo.endereco.numero == undefined ? 'Não informado' : pacienteInfo.endereco.numero}`}
                                    onChangeText={value => setNumero(value)}
                                />
                            </SmallBox>
                        </DoubleContentBoxEP>

                        <DoubleContentBoxEP>
                            <SmallBox>
                                <LabelLocal>Cep</LabelLocal>
                                <InputGrey
                                    editable={editField}
                                    value={cep}
                                    placeholder={`${pacienteInfo.endereco.cep == undefined ? 'Não informado' : pacienteInfo.endereco.cep}`}
                                    onChangeText={value => setCep(value)}
                                />
                            </SmallBox>

                            <SmallBox>
                                <LabelLocal>Cidade</LabelLocal>
                                <InputGrey
                                    editable={editField}
                                    value={cidade}
                                    placeholder={`${pacienteInfo.endereco.cidade == undefined ? 'Não informado' : pacienteInfo.endereco.cidade}`}
                                    onChangeText={value => setCidade(value)}
                                />
                            </SmallBox>
                        </DoubleContentBoxEP>
                        {
                            editField == true ? (
                                <ButtonEdit onPress={() => SaveData()}>
                                    <ButtonTitle>SALVAR</ButtonTitle>
                                </ButtonEdit>
                            ) : (
                                <></>
                            )
                        }

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
                </Container>) : (<ActivityIndicator />)
            }
            <Toast />
        </ScrollView>
    )
}

//Botoes reagindo as acoes do usuario
//Tela recarregar quando salvar
//Validacoes e mascara para os campos