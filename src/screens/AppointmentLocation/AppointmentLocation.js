import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { LinkCancel } from "../../components/Links/style"
import { ButtonBox } from "../../components/button/style"
import { Container, DoubleContentBox, SmallBox } from "../../components/container/style"
import { InputGrey } from "../../components/input/styled"
import { LabelLocal, SubtextCard, SubtextLocal, TitleProfile, TitleTextInfo } from "../../components/title/style"
import { AddressBox, AlignButton, ContainerBackground, ContentAL, MapImage } from "./Style"
import { useEffect, useRef, useState } from "react";
import { mapsKey } from "../../utils/mapsApiKey"

//importando bibliotecas do mapa
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { LocationAccuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import api from "../../Service/Service"



export const AppointmentLocation = ({navigation, route}) => {


    const mapReference = useRef(null)
    //Guarda a posicao do dispositivo
    const [initialPosition, setInitialPosition] = useState(null);
    //Guarda o destino/posicao final
    const [ finalPosition, setFinalPosition ] = useState({
        latitude: -23.5329,
        longitude: -46.7926
    })
    const [ darkTheme, setDarkTheme ] = useState(false);

    //Funcao que pede a permissao para a localizacao e guarda a posicao do dispositivo
    async function CapturarLocalizacao(){
        //Pede a permissao para pegar a localizacao
        const { granted } = await requestForegroundPermissionsAsync();

        //Se a permissao for concedida ele vai setar a localizacao
        if( granted ){
            const captureLocation = await getCurrentPositionAsync()
            setInitialPosition(captureLocation)
        }
    }

    //Funcao que recarrega o mapa com as novas informacoes
    async function RecarregarVizualizacaoMapa(){
        if( mapReference.current && initialPosition){
            await mapReference.current.fitToCoordinates(
                [{latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude},
                {latitude: finalPosition.latitude, longitude: finalPosition.longitude}
                ],

                {
                    edgePadding: { top: 60, right: 60, bottom: 60, left: 60},
                    animated: true
                }
            )
        }
    }

    useEffect(() => {
        //chama funcao de pedir permissao e guardar posicao inicial
        CapturarLocalizacao();

        //Monitora a posicao do dispositivo em tempo real e retorna sua nova posicao
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
        }, async (response) => {
            //Guarda a nova posicao
            await setInitialPosition(response);
        })
    }, [1000]);

    //Quando o watchPositionAsync guardar uma nova posicao esse useEffect sera acionado
    useEffect(() => {
        //Chama a funcao que recarrega o mapa com as novas coordenadas que foram passadas pelo watchPositionAsync
        RecarregarVizualizacaoMapa()
    }, [initialPosition]);

    useEffect(() => {
      if(clinica == null){
        BuscarClinica();
      }
      console.log(longitude);
      console.log(latitude);

    }, [clinica]);

    const [clinica, setClinica] = useState(null);
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();

    async function BuscarClinica(){
      await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaid}`)
      .then(response => {
        setClinica(response.data);
        setLongitude(response.data.endereco.longitude);
        setLatitude(response.data.endereco.latitude);
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
    }

    return(
        <Container>
            {
                initialPosition != null ? (
            <MapView
            
                ref={mapReference}
                style={styles.map}
                
                initialRegion={{
                    latitude: initialPosition.coords.latitude,
                    longitude: initialPosition.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                provider={PROVIDER_GOOGLE}
                customMapStyle={darkMapStyle}
            >
                <Marker
                    coordinate={{
                        latitude: initialPosition.coords.latitude,
                        longitude: initialPosition.coords.longitude
                    }}

                    title="Voce esta aqui"
                    description="posicao inicial"
                />
                <MapViewDirections
                    origin={initialPosition.coords}
                    destination={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    apikey={mapsKey}
                    strokeWidth={5}
                    strokeColor="#496BBA"
                />
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}

                    title="Destino"
                    description="Meu destino"
                    pinColor="blue"
                />
            </MapView>
                    
                ):(
                    <>
                    <Text>Localizacao nao encontrada</Text>
        
                    <ActivityIndicator/>
                    </>
                )
            }

            {
              clinica != null ? (
                <ContainerBackground
                darkTheme={darkTheme}
              >
                  <ContentAL
                    darkTheme={darkTheme}
                  >
  
                      <TitleProfile darkTheme={darkTheme}>{clinica.nomeFantasia}</TitleProfile>
                      <SubtextLocal darkTheme={darkTheme}>{clinica.endereco.cidade}</SubtextLocal>
  
                      <AddressBox>
                          <LabelLocal darkTheme={darkTheme}>Endereço</LabelLocal>
                          <InputGrey
                              darkTheme={darkTheme}
                              placeholder={`${clinica.endereco.logradouro}`}
                          />
                      </AddressBox>
  
  
                      {/* Criar os componentes DoubleContentBox e SmallBox na pasta Container. Porque vamos usar eles dnv */}
                      <DoubleContentBox>
                          <SmallBox>
                              <LabelLocal darkTheme={darkTheme}>Numero</LabelLocal>
                              <InputGrey
                                  darkTheme={darkTheme}
                                  placeholder={`${clinica.endereco.numero}`}
                              />
                          </SmallBox>
  
                          <SmallBox>
                              <LabelLocal>Bairro</LabelLocal>
                              <InputGrey
                                  placeholder={`${clinica.endereco.cidade}`}
                              />
                          </SmallBox>
                      </DoubleContentBox>
  
                      <AlignButton>
                          <ButtonBox onPress={() => navigation.replace("AppointmentPacient")}>
                              <LinkCancel >Voltar</LinkCancel>
                          </ButtonBox>
                      </AlignButton>
  
                  </ContentAL>
                </ContainerBackground>
              ):(<ActivityIndicator/>)
            }


        </Container>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '45%'
    }

    
})

const grayMapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#E1E0E7",
        },
      ],
    },
    {
      elementType: "geometry.fill",
      stylers: [
        {
          saturation: -5,
        },
        {
          lightness: -5,
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#FBFBFB",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#33303E",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#66DA9F",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1B1B1B",
        },
      ],
    },
    {
      featureType: "road",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#C6C5CE",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#FBFBFB",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#ACABB7",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#8C8A97",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#8C8A97",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#8EA5D9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
  ];

// --------------------------------------------------
// ---------------- Estilo Dark ---------------------
// --------------------------------------------------

const darkMapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#121212",
        },
      ],
    },
    {
      elementType: "geometry.fill",
      stylers: [
        {
          saturation: -5,
        },
        {
          lightness: -5,
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#AAC5FF",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#33303E",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#fbfbfb",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#AAC5FF",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#AAC5FF",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#AAC5FF",
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#002800",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#AAC5FF",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1B1B1B",
        },
      ],
    },
    {
      featureType: "road",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#3b3b3b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#AAC5FF",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#3b3b3b",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#636363",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#636363",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#AAC5FF",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#AAC5FF",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#152238",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#AAC5FF",
        },
      ],
    },
  ];