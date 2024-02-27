import { ImageAppointmentProfile } from "../images/style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AgeProfile, ButtonCard, ButtonText, ButtonTextPront, ContainerCard, ContainerProfile, ContainerTime, DataProfileCard, DateTime, NameProfile, TypeAppointment, ViewRow } from "./Style"
import { StyleSheet } from "react-native";

export const AppointmentCard = ({
    situacao = "realizado",
    onPressCancel,
    onPressAppointment,
}) => {
    return(
        <ContainerCard style={styles.shadow}>
                <ImageAppointmentProfile
                    source={require('../../assets/eduProfileImage.png')}
                />
            <ContainerProfile>

                <DataProfileCard>

                <NameProfile>Eduardo Benvenuti</NameProfile>

                <AgeProfile>38 anos - <TypeAppointment>Rotina</TypeAppointment></AgeProfile>

                </DataProfileCard>

                <ViewRow>
                    <ContainerTime situacao={situacao}>
                        <MaterialCommunityIcons 
                            name="clock" size={15} 
                            color={situacao == "pendente" ? "#49B3BA" : "#8C8A97"} />
                        <DateTime situacao={situacao} color={"#49B3BA"}>
                            14:00
                        </DateTime>
                    </ContainerTime>

                    {
                        situacao == "cancelado" ? (
                            <></>
                        ) : situacao == "pendente" ? (
                            <ButtonCard onPress={onPressCancel}>
                                <ButtonText situacao={situacao}>Cancelar</ButtonText>
                            </ButtonCard>
                        ) : (
                            <ButtonCard onPress={onPressAppointment}>
                                <ButtonTextPront situacao={situacao}>Ver Prontuario</ButtonTextPront>
                            </ButtonCard>
                        )
                    }
                </ViewRow>

            </ContainerProfile>
        </ContainerCard>
    )
}

const styles =  StyleSheet.create({
    shadow: {
        elevation: 5,
        shadowColor: '#000000',
    },
});