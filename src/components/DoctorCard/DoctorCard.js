import { StyleSheet } from "react-native";
import { ContainerClinicCard, ContainerDoctorCard, NameProfile } from "../AppointmentCard/Style"
import { BoxText } from "../ClinicCard/Style";
import { SubtextModal } from "../title/style";
import { ImageDoctorProfile } from "./Style";

export const DoctorCard = ({
    border="",
}) => {
    return(
        <ContainerDoctorCard border={border}  style={styles.shadow}>

            <ImageDoctorProfile
                source={require('../../assets/eduProfileImage.png')}
            />  

            <BoxText>
                <NameProfile>Dra Alessandra</NameProfile>
                <SubtextModal>Demartologa, Esteticista</SubtextModal>
            </BoxText>

        </ContainerDoctorCard>
    )
}

const styles =  StyleSheet.create({
    shadow: {
        elevation: 5,
        shadowColor: '#000000',
    },
});