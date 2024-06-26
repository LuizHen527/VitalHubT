import { ScrollView } from "react-native"
import { ClinicCard } from "../../components/ClinicCard/ClinicCard"
import { LinkCancel } from "../../components/Links/style"
import { ComponentList, ListComponent } from "../../components/List/Style"
import { ButtonCancel, ButtonSchedule } from "../../components/button/style"
import { Container } from "../../components/container/style"
import { ButtonTitle, TitleModal } from "../../components/title/style"
import { AlignBox, ContentBox, FooterBox } from "./Style"
import { useEffect, useState } from "react";
import api from "../../service/service"

// const Clinicas = [
//     { id: 1, nome: "Clínica Natureh", local: "São Paulo, SP", rating: "4,5", agenda: "Seg-Sex", border: "yes" },
//     { id: 2, nome: "Diamond Pró-Mulher", local: "São Paulo, SP", rating: "4,8", agenda: "Seg-Sex", border: "yes" },
//     { id: 3, nome: "Clinica Villa Lobos", local: "Taboão, SP", rating: "4,2", agenda: "Seg-Sab", border: "yes" },
//     { id: 4, nome: "SP Oncologia Clínica", local: "Taboão, SP", rating: "4,2", agenda: "Seg-Sab", border: "no" },
// ];

export const SelectClinic = ({navigation}) => {
    const [clinicasLista, setClinicasLista] = useState([]);

    async function ListarClinicas(){
        await api.get('/Clinica/ListarTodas')
        .then( response => {
            setClinicasLista(response.data)
            console.log(clinicasLista);
        }).catch(error => {
            console.log(error);
        })
    }
    async function Login() {
        navigation.replace("Main")
    };

    useEffect(() => {
        ListarClinicas()
    }, []);

    return (

        // Falta colocar a lista em uma scroll view, tive um erro. por isso vou deixar pra depois
        <Container>
            <ContentBox>
            <TitleModal>Selecionar clínica</TitleModal>

            <ComponentList
                data={clinicasLista}
                keyExtractor={(item) => item.id}
                renderItem={(clinica) =>
                (
                    <ClinicCard
                        clinica={clinica.item}
                        // nome={item.nome}
                        // local={item.local}
                        // rating={item.rating}
                        // agenda={item.agenda}
                     />
                )
                }
            />
            </ContentBox>
                

            <AlignBox>
                <ButtonSchedule onPress={() => navigation.navigate("SelectDoctor")}>
                    <ButtonTitle>continuar</ButtonTitle>
                </ButtonSchedule>

                <ButtonCancel onPress={() => navigation.goBack("Main")}>
                    <LinkCancel>Cancelar</LinkCancel>
                </ButtonCancel>
            </AlignBox>
        </Container>
    )
}