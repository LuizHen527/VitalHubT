import { ImageAppointmentProfile } from "../images/style"
import { AgeProfile, ContainerCard, ContainerProfile, ContainerTime, NameProfile, TypeAppointment } from "./Style"

export const AppointmentCard = () => {
    return(
        <ContainerCard>
                <ImageAppointmentProfile
                    source={require('../../assets/eduProfileImage.png')}
                />
            <ContainerProfile>

                <NameProfile>Eduardo Benvenuti</NameProfile>

                <AgeProfile>38 anos - <TypeAppointment>Rotina</TypeAppointment></AgeProfile>

                <ContainerTime>

                </ContainerTime>

            </ContainerProfile>
        </ContainerCard>
    )
}