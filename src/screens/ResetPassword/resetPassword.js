import { useState } from "react"
import { CancelIcon } from "../../components/CancelIcon/cancelIcon"
import { ButtonLoginVE } from "../../components/button/style"
import { Container, ContainerBanner, ContainerInput, ContainerInputRP, ContainerLogo } from "../../components/container/style"
import { Logo } from "../../components/images/style"
import { Input } from "../../components/input/styled"
import { ButtonTitle, RegularTextRP, Title } from "../../components/title/style"
import { ButtonArrow } from "../RecoverPassword/style"
import api from "../../service/service"

export const ResetPassword = ({navigation, route}) => {
    const [senha, setSenha] = useState('');
    const [confirmar, setConfirmar] = useState('');

    async function AtualizarSenha() {
        if (senha === confirmar) {
            await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
                senhaNova : senha
            }).then(() => {
                navigation.replace('Login')
            }).catch(error => {
                console.log(error);
            })
        }
    }
    return (
        <Container>
            <ContainerBanner>

                <ButtonArrow onPress={ () => navigation.navigate('Login')}>
                    <CancelIcon />
                </ButtonArrow>

                <ContainerLogo>
                    <Logo
                        source={require('../../assets/logo.png')}
                    />
                </ContainerLogo>
            </ContainerBanner>

            <Title>Redefinir senha</Title>

            <RegularTextRP>Insira e confirme a sua nova senha</RegularTextRP>

            <ContainerInputRP>
                <Input
                    placeholder="Nova Senha"
                    value={senha}
                    onChangeText={(txt) => setSenha(txt)}
                />
            </ContainerInputRP>
            
            <ContainerInputRP>
                <Input
                    placeholder="Confirmar nova senha"
                    value={confirmar}
                    onChangeText={(txt) => setConfirmar(txt)}
                />
            </ContainerInputRP>

            <ButtonLoginVE
                title='Volta para login'
                // onPress={() => navigation.navigate('Login')}
                onPress={() => AtualizarSenha()}
            >
                <ButtonTitle>CONFIRMAR NOVA SENHA</ButtonTitle>
            </ButtonLoginVE>
        </Container>
    )
}