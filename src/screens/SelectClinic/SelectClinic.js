import { ScrollView } from "react-native"
import { ClinicCard } from "../../components/ClinicCard/ClinicCard"
import { LinkCancel } from "../../components/Links/style"
import { ComponentList, ListComponent } from "../../components/List/Style"
import { ButtonCancel, ButtonSchedule } from "../../components/button/style"
import { Container } from "../../components/container/style"
import { ButtonTitle, TitleModal } from "../../components/title/style"
import { AlignBox, ContentBox, FooterBox } from "./Style"

const Clinicas = [
    { id: 1, nome: "Clínica Natureh", local: "São Paulo, SP", rating: "4,5", agenda: "Seg-Sex" },
    { id: 2, nome: "Diamond Pró-Mulher", local: "São Paulo, SP", rating: "4,8", agenda: "Seg-Sex" },
    { id: 3, nome: "Clinica Villa Lobos", local: "Taboão, SP", rating: "4,2", agenda: "Seg-Sab" },
    { id: 4, nome: "SP Oncologia Clínica", local: "Taboão, SP", rating: "4,2", agenda: "Seg-Sab" },
    { id: 5, nome: "SP Oncologia Clínica", local: "Taboão, SP", rating: "4,2", agenda: "Seg-Sab" },
    { id: 6, nome: "SP Oncologia Clínica", local: "Taboão, SP", rating: "4,2", agenda: "Seg-Sab" },
    { id: 7, nome: "SP Oncologia Clínica", local: "Taboão, SP", rating: "4,2", agenda: "Seg-Sab" },
    { id: 8, nome: "SP Oncologia Clínica", local: "Taboão, SP", rating: "4,2", agenda: "Seg-Sab" },
];

export const SelectClinic = () => {
    return (

        // Falta colocar a lista em uma scroll view, tive um erro. por isso vou deixar pra depois
        <Container>
            <ContentBox>
            <TitleModal>Selecionar clínica</TitleModal>


            
            <ComponentList
                data={Clinicas}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) =>
                (
                    <ClinicCard
                        nome={item.nome}
                        local={item.local}
                        rating={item.rating}
                        agenda={item.agenda}
                     />
                )
                }
            />
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