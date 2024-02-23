import { StyleSheet } from "react-native";
import { ContainerCard, ContainerClinicCard, NameProfile } from "../AppointmentCard/Style"

export const ClinicCard = () => {
    return(
        <ContainerClinicCard style={styles.shadow}>

            <NameProfile>Clínica Natureh</NameProfile>

        </ContainerClinicCard>
    )
}

const styles =  StyleSheet.create({
    shadow: {
        elevation: 5,
        shadowColor: '#000000',
    },
});