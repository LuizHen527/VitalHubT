import { AntDesign } from '@expo/vector-icons';

import { ArrowIcon } from '../../components/ArrowIcon/arrowIcon';
import { Logo } from '../../components/images/style';
import { Container, ContainerBanner, ContainerInput, ContainerLogo, ContentRP } from '../../components/container/style';
import { ButtonTitle, RegularTextRP, Title } from '../../components/title/style';
import { Input } from '../../components/input/styled';
import { ButtonLogin } from '../../components/button/style';

export const RecoverPassword = () => {
    return (
        <Container>
            <ContainerBanner>
                <ArrowIcon />
                <ContainerLogo>
                    <Logo
                        source={require('../../assets/logo.png')}
                    />
                </ContainerLogo>
            </ContainerBanner>

            <Title>Recuperar senha</Title>

            <RegularTextRP>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</RegularTextRP>


            <ContainerInput>
                <Input
                    placeholder="Usuario ou Email"
                />
            </ContainerInput>


            <ButtonLogin>
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </ButtonLogin>



        </Container>

    )
}