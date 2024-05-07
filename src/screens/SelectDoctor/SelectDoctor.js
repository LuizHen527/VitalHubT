import { useEffect, useState } from "react"
import { DoctorCard } from "../../components/DoctorCard/DoctorCard"
import { LinkCancel } from "../../components/Links/style"
import { ComponentList } from "../../components/List/Style"
import { ButtonCancel, ButtonSchedule } from "../../components/button/style"
import { Container } from "../../components/container/style"
import { ButtonTitle, TitleModal } from "../../components/title/style"
import { AlignBox, ContentBox } from "../SelectClinic/Style"
import api from "../../service/service"
import { Text } from "react-native"

export const SelectDoctor = ({navigation, route}) => {
    const [medicosLista, setMedicosLista] = useState([]);
    const [medico, setMedico] = useState();
    const [ erroMedico,setErroMedico] = useState("");

    async function ListarMedicos(){
        //Instanciar a chamada da api
        
        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
        .then( response => {
            setMedicosLista(response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    function cancelarMedico(){
        setMedico(null)
        navigation.replace("SelectClinic")
    }

    function handleContinue() {

        if (medico == null ) {
            let error
            setErroMedico("Selecione o Medico")
            error = true
            return !error
            
        }

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

            <Text style={{color: 'red',marginRight:"46.5%"}}>{erroMedico}</Text>
                

            <AlignBox>
                <ButtonSchedule onPress={() => handleContinue()}>
                    <ButtonTitle>continuar</ButtonTitle>
                </ButtonSchedule>

                <ButtonCancel onPress={() => cancelarMedico()}>
                    <LinkCancel>Cancelar</LinkCancel>
                </ButtonCancel>
            </AlignBox>
        </Container>
    )
}