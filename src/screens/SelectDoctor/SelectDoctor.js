import { DoctorCard } from "../../components/DoctorCard/DoctorCard"
import { LinkCancel } from "../../components/Links/style"
import { ButtonCancel, ButtonSchedule } from "../../components/button/style"
import { Container } from "../../components/container/style"
import { ButtonTitle, TitleModal } from "../../components/title/style"
import { AlignBox, ContentBox } from "../SelectClinic/Style"

export const SelectDoctor = () => {
    return(
        <Container>
            <ContentBox>
                <TitleModal>Selecionar clínica</TitleModal>

                <DoctorCard/>
            </ContentBox>
                

            <AlignBox>
                <ButtonSchedule>
                    <ButtonTitle>continuar</ButtonTitle>
                </ButtonSchedule>

                <ButtonCancel>
                    <LinkCancel>Cancelar</LinkCancel>
                </ButtonCancel>
            </AlignBox>
        </Container>
    )
}