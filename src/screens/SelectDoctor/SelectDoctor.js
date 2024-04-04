import { useEffect, useState } from "react"
import { DoctorCard } from "../../components/DoctorCard/DoctorCard"
import { LinkCancel } from "../../components/Links/style"
import { ComponentList } from "../../components/List/Style"
import { ButtonCancel, ButtonSchedule } from "../../components/button/style"
import { Container } from "../../components/container/style"
import { ButtonTitle, TitleModal } from "../../components/title/style"
import { AlignBox, ContentBox } from "../SelectClinic/Style"
import api from "../../Service/Service"

export const SelectDoctor = ({navigation}) => {
    const [medicosLista, setMedicosLista] = useState([]);

    async function ListarMedicos(){
        //Instanciar a chamada da api
        await api.get('/Medicos')
        .then( response => {
            setMedicosLista(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        ListarMedicos()
    }, []);

    return(
        <Container>
            <ContentBox>
                <TitleModal>Selecionar médico</TitleModal>

                <ComponentList
                data={medicosLista}
                keyExtractor={(item) => item.id}

                renderItem={(medico) =>
                (
                    <DoctorCard
                        medico={medico.item}
                    />
                )
                }
            />

                
            </ContentBox>
                

            <AlignBox>
                <ButtonSchedule onPress={() => navigation.navigate("SelectDate")}>
                    <ButtonTitle>continuar</ButtonTitle>
                </ButtonSchedule>

                <ButtonCancel onPress={() => navigation.pop(2)}>
                    <LinkCancel>Cancelar</LinkCancel>
                </ButtonCancel>
            </AlignBox>
        </Container>
    )
}