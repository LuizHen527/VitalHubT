import { CancelIcon } from "../../components/CancelIcon/cancelIcon"
import { ButtonLoginVE } from "../../components/button/style"
import { Container, ContainerBanner, ContainerInput, ContainerInputRP, ContainerLogo } from "../../components/container/style"
import { Logo } from "../../components/images/style"
import { Input } from "../../components/input/styled"
import { ButtonTitle, RegularTextRP, Title } from "../../components/title/style"

export const ResetPassword = () => {
    return (
        <Container>
            <ContainerBanner>
                <CancelIcon />
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
                />
            </ContainerInputRP>
            
            <ContainerInputRP>
                <Input
                    placeholder="Confirmar nova senha"
                />
            </ContainerInputRP>

            <ButtonLoginVE>
                <ButtonTitle>CONFIRMAR NOVA SENHA</ButtonTitle>
            </ButtonLoginVE>
        </Container>
    )
}