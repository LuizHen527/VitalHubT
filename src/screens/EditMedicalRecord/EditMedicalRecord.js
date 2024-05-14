import { Image, ScrollView, StyleSheet, View } from "react-native"
import { AlignContainer, Container } from "../../components/container/style"
import { ImageProfile } from "../../components/images/style"
import { ButtonTitle, InfoTextProfile, LabelLocal, ProfileName, TextPhoto } from "../../components/title/style"
import { ContainerInfoProfile } from "../Profile/style"
import { DateBox, DoubleContentBoxEP, Line } from "../EditProfile/Style"
import { InputBigProfile, InputGrey, InputResultProfile } from "../../components/input/styled"
import { ButtonPhoto, ContainerPhoto, ContentView, InputProfileBox, ScrollContainer } from "./Style"
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonBox, ButtonCancel, ButtonCancelProfile, ButtonEdit, ButtonSendProfile } from "../../components/button/style"
import { LinkCancel, LinkCancelProfile } from "../../components/Links/style"
import { AlignButton, AlingnButtonProfile } from "../AppointmentLocation/Style"
import { CameraComp } from "../../components/CameraComp/CameraComp"
import { useEffect, useState } from "react"
import api from "../../service/service"

export const EditMedicalRecord = ({navigation, route}) => {

    const [ showCamera, setShowCamera ] = useState(false);
    const [ uriCameraCapture, setUriCameraCapture ] = useState(null);
    const [ descricaoExame, setDescricaoExame ] = useState();

    async function InserirExame() {
        console.log('entrou');
        const formData = new FormData();
        formData.append("ConsultaId", '68402C87-2474-4F58-ADF2-62BBBA94D701')
        formData.append("Imagem", {
            uri : uriCameraCapture,
            name : `image.${uriCameraCapture.split('.').pop()}`,
            type : `image/${uriCameraCapture.split('.').pop()}`
        })
        console.log('format');

        await api.post(`/Exame/Cadastrar`, formData, {
            headers : {
                "Content-Type" : "multipart/form-data"
            }
        }).then(response => {
            
            setDescricaoExame( response.data.descricao)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        console.log(route.params.consulta.receita);
    }, [])

    return(
        
        <ContentView>
            {
                showCamera == true ? (
                    <CameraComp
                        setShowCameraModal={setShowCamera}
                        showCameraModal={showCamera}
                        setUriCameraCapture={setUriCameraCapture}
                        getMediaLibrary={true}
                    />
                ) : (
                    <ScrollContainer>
                    <Container>
                        <ImageProfile
                                source={require('../../assets/doctorProfileImage.png')}
                        />

                        <AlignContainer>

                            <ProfileName>{route.params.consulta.medicoClinica.medico.idNavigation.nome}</ProfileName>

                            <ContainerInfoProfile>
                                <InfoTextProfile>{route.params.consulta.medicoClinica.medico.especialidade.especialidade1}</InfoTextProfile>
                                <InfoTextProfile>CRM-{route.params.consulta.medicoClinica.medico.crm}</InfoTextProfile>
                            </ContainerInfoProfile>

                            <DateBox>
                                <LabelLocal>Descrição da consulta</LabelLocal>
                                <InputBigProfile
                                    multiline={true}
                                    placeholder={`${route.params.consulta.descricao === undefined ? 'Insira sua descrição' : route.params.consulta.descricao}`}
                                />
                            </DateBox>

                            <InputProfileBox>
                                <LabelLocal>Diagnóstico do paciente</LabelLocal>
                                <InputGrey
                                    multiline={true}
                                    placeholder={`${route.params.consulta.diagnostico === undefined ? 'Seu médico ainda vai colocar seu diagnóstico' : route.params.consulta.diagnostico}`}
                                />
                            </InputProfileBox>

                            <InputProfileBox>
                                <LabelLocal>Prescrição médica</LabelLocal>

                                {/* Pesquisar como wrap line in the placeholder */}
                                <InputBigProfile
                                    multiline={true}
                                    placeholder={`${route.params.consulta.receita === undefined ? 'Seu médico ainda vai colocar sua prescrição' : route.params.consulta.receita.medicamento}`}
                                />
                            </InputProfileBox>

                            <InputProfileBox>
                                <LabelLocal>Exames médicos</LabelLocal>
                                {
                                    uriCameraCapture == null ? (
                                        <ButtonPhoto onPress={() => setShowCamera(true)}>
                                            <AntDesign name="exclamationcircle" size={20} color="#4E4B59" />
                                            <TextPhoto>Nenhuma foto informada</TextPhoto>
                                        </ButtonPhoto> 
                                    ) : (
                                        <ButtonPhoto onPress={() => setShowCamera(true)}>
                                            <Image
                                                style={{ width: '100%', height: '100%', borderRadius: 5}}
                                                source={{uri : uriCameraCapture}}
                                            />
                                        </ButtonPhoto>
                                    )
                                }
                            </InputProfileBox>

                            <DoubleContentBoxEP>
                                <ButtonSendProfile onPress={() => InserirExame()}>
                                    <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
                                    <ButtonTitle>Enviar</ButtonTitle>
                                </ButtonSendProfile>

                                <ButtonCancelProfile>
                                    <LinkCancelProfile>Cancelar</LinkCancelProfile>
                                </ButtonCancelProfile>
                            </DoubleContentBoxEP>

                            <Line/>

                            <InputProfileBox>
                                {/* Pesquisar como wrap line in the placeholder */}
                                <InputResultProfile
                                    multiline={true}
                                    // placeholder={`${route.params.consulta.receita.observacoes}`}
                                    value={descricaoExame}
                                    numberOflines={20}
                                />
                            </InputProfileBox>

                            <AlingnButtonProfile>
                                <ButtonBox onPress={() => navigation.replace('Main')}>
                                    <LinkCancel >Voltar</LinkCancel>
                                </ButtonBox>
                            </AlingnButtonProfile>

                        </AlignContainer>


                    </Container>
                    </ScrollContainer>
                )
            }
        </ContentView>



        
    )
}