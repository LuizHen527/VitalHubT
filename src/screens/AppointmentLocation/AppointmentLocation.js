import { View } from "react-native"
import { LinkCancel } from "../../components/Links/style"
import { ButtonBox } from "../../components/button/style"
import { Container, DoubleContentBox, SmallBox } from "../../components/container/style"
import { InputGrey } from "../../components/input/styled"
import { LabelLocal, SubtextCard, SubtextLocal, TitleProfile, TitleTextInfo } from "../../components/title/style"
import { AddressBox, AlignButton, ContainerBackground, ContentAL, MapImage } from "./Style"

export const AppointmentLocation = ({navigation}) => {
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
                            <LabelLocal>Numero</LabelLocal>
                            <InputGrey
                                placeholder="578"
                            />
                        </SmallBox>

                        <SmallBox>
                            <LabelLocal>Bairro</LabelLocal>
                            <InputGrey
                                placeholder="Moema-SP"
                            />
                        </SmallBox>
                    </DoubleContentBox>

                    <AlignButton>
                        <ButtonBox onPress={() => navigation.pop(1)}>
                            <LinkCancel >Voltar</LinkCancel>
                        </ButtonBox>
                    </AlignButton>

                </ContentAL>
            </ContainerBackground>

        </Container>
    )
}