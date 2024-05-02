import { useEffect, useState } from "react"
import { DoctorCard } from "../../components/DoctorCard/DoctorCard"
import { LinkCancel } from "../../components/Links/style"
import { ComponentList } from "../../components/List/Style"
import { ButtonCancel, ButtonSchedule } from "../../components/button/style"
import { Container } from "../../components/container/style"
import { ButtonTitle, TitleModal } from "../../components/title/style"
import { AlignBox, ContentBox } from "../SelectClinic/Style"
import api from "../../service/service"

export const SelectDoctor = ({navigation, route}) => {
    const [medicosLista, setMedicosLista] = useState([]);
    const [medico, setMedico] = useState();

    async function ListarMedicos(){
        //Instanciar a chamada da api
        
        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
        .then( response => {
            setMedicosLista(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    function handleContinue() {
        navigation.replace("SelectDate", {
            agendamento : {
                ...route.params.agendamento,
                ...medico
            }
        })
    }


    useEffect(() => {
        console.log(route);
        ListarMedicos()
    }, [route]);

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
                        setMedico={setMedico}
                        medico={medico.item}
                    />
                )
                }
            />

                
            </ContentBox>
                

            <AlignBox>
                <ButtonSchedule onPress={() => handleContinue()}>
                    <ButtonTitle>continuar</ButtonTitle>
                </ButtonSchedule>

                <ButtonCancel onPress={() => navigation.pop(2)}>
                    <LinkCancel>Cancelar</LinkCancel>
                </ButtonCancel>
            </AlignBox>
        </Container>
    )
}