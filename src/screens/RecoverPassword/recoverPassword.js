import { AntDesign } from '@expo/vector-icons';

import { ArrowIcon } from '../../components/ArrowIcon/arrowIcon';
import { Logo } from '../../components/images/style';
import { Container, ContainerBanner, ContainerInput, ContainerLogo, ContentRP, LogoContainer } from '../../components/container/style';
import { ButtonTitle, RegularTextRP, Title } from '../../components/title/style';
import { Input } from '../../components/input/styled';
import { ButtonLogin } from '../../components/button/style';
import { ButtonArrow } from './style';
import api from '../../service/service';
import { useState } from 'react';

export const RecoverPassword = ({navigation}) => {

    const [email, setEmail] = useState('');

    async function EnviarEmail(){
        await api.post(`/RecuperarSenha?email=${email}`)
        .then(() => {
            navigation.replace('VerifyEmail', {emailRecuperacao : email});
        }).catch(error => {
            console.log(error);
        })
    }
    return (
        <Container>
            <ContainerBanner>
                <ButtonArrow onPress={ () => navigation.navigate('Login')}>
                    <ArrowIcon 
                        rota='Login'
                    />
                </ButtonArrow>
                <LogoContainer>
                    <Logo
                        source={require('../../assets/logo.png')}
                    />
                </LogoContainer>
            </ContainerBanner>

            <Title>Recuperar senha</Title>

            <RegularTextRP>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</RegularTextRP>


            <ContainerInput>
                <Input
                    placeholder="Usuario ou Email"

                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                />
            </ContainerInput>


            <ButtonLogin
                title='Vai para verificar email'
                // onPress={() => navigation.navigate('VerifyEmail')}
                onPress={() => EnviarEmail()}
            >
                <ButtonTitle>CONTINUAR</ButtonTitle>
            </ButtonLogin>



        </Container>

    )
}