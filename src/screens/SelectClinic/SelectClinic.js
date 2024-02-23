import { ClinicCard } from "../../components/ClinicCard/ClinicCard"
import { Container } from "../../components/container/style"
import { TitleModal } from "../../components/title/style"

export const SelectClinic = () => {
    return(
        <Container>
            <TitleModal>Selecionar clínica</TitleModal>

            <ClinicCard/>
        </Container>
    )
}