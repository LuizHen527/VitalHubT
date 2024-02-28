import { Container } from "../../components/container/style"
import { InputGrey } from "../../components/input/styled"
import { LabelLocal, SubtextCard, SubtextLocal, TitleProfile, TitleTextInfo } from "../../components/title/style"
import { AddressBox, ContainerBackground, ContentAL, DoubleContentBox, MapImage } from "./Style"

export const AppointmentLocation = () => {
    return(
        <Container>

            <MapImage
                source={require('../../assets/mapImage.jpg')}
            />

            <ContainerBackground>
                <ContentAL>
                    <TitleProfile>Clínica Natureh</TitleProfile>
                    <SubtextLocal>São Paulo, SP</SubtextLocal>

                    <AddressBox>
                        <LabelLocal>Endereço</LabelLocal>
                        <InputGrey
                            placeholder="Rua Vicenso Silva, 987"
                        />
                    </AddressBox>


                    {/* Criar os componentes DoubleContentBox e SmallBox na pasta Container. Porque vamos usar eles dnv */}
                    <DoubleContentBox>
                        <SmallBox>

                        </SmallBox>

                        <SmallBox>

                        </SmallBox>
                    </DoubleContentBox>
                </ContentAL>
            </ContainerBackground>

        </Container>
    )
}