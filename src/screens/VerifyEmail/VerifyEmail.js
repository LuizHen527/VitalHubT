import { CancelIcon } from "../../components/CancelIcon/cancelIcon"
import { LinkCancel } from "../../components/Links/style"
import { OtpInput } from "../../components/OtpInput/otpInput"
import { ButtonLogin, ButtonLoginVE } from "../../components/button/style"
import { Container, ContainerBanner, ContainerLogo, ContentRP } from "../../components/container/style"
import { Logo } from "../../components/images/style"
import { ButtonTitle, RegularText, RegularTextBlue, RegularTextVE, Title } from "../../components/title/style"

export const VerifyEmail = () => {
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


            <Title>Verifique seu email</Title>

            <RegularTextVE>Digite o código de 4 dígitos enviado para <RegularTextBlue>username@email.com</RegularTextBlue></RegularTextVE>

            <OtpInput />

            <ButtonLoginVE>
                <ButtonTitle>ENTRAR</ButtonTitle>
            </ButtonLoginVE>

            <LinkCancel>Reenviar Código</LinkCancel>




        </Container>
    )
}