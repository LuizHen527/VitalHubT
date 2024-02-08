import { AntDesign } from '@expo/vector-icons';
import { ContainerBanner, ContainerButtonContinue, ContainerInput, ContainerLogo, ContentRP } from './style';
import { ArrowIcon } from '../../components/ArrowIcon/arrowIcon';
import { Logo } from '../../components/images/style';
import { Container } from '../../components/container/style';
import { ButtonTitle, ContainerText, RegularText, Title } from '../../components/title/style';
import { Input } from '../../components/input/styled';
import { ButtonLogin } from '../../components/button/style';

export const RecoverPassword = () => {
    return(
        <Container>
            <ContainerBanner>
                <ArrowIcon/>
                <ContainerLogo>
                    <Logo
                        source={require('../../assets/logo.png')}
                    />
                </ContainerLogo>
            </ContainerBanner>
            <ContentRP>
                <Title>Recuperar senha</Title>
                <ContainerText>
                    <RegularText>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</RegularText>
                </ContainerText>

                <ContainerInput>
                    <Input
                        placeholder="Usuario ou Email"
                    />
                </ContainerInput>

                
                <ButtonLogin>
                    <ButtonTitle>CONTINUAR</ButtonTitle>
                </ButtonLogin>
                
                
            </ContentRP>
        </Container>

    )
}