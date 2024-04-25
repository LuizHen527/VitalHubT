import { useState } from "react"
import { LinkCancel } from "../../components/Links/style"
import { ButtonLoginVE } from "../../components/button/style"
import { Container, ContainerLogoTipo } from "../../components/container/style"
import { Logo } from "../../components/images/style"
import { Input } from "../../components/input/styled"
import { ButtonTitle, RegularTextRP, Title } from "../../components/title/style"
import api from "../../service/service"

export const CriarConta = ({ navigation }) => {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmSenha, setConfirmSenha] = useState("")
    const [idTipoUsuario, setIdTipoUsuario] = useState("21A9FD40-9E9E-410F-B45D-861F3A0FFACB")

    // const handleEmailInputChange = (event) => setEmail(event.target.value)
    // const handleSenhaInputChange = (event) => setSenha(event.target.value)


    async function CadastrarConta() {

        console.log(email,senha,nome);
        if (senha !== senha) {
            setError("Senhas não conferem! \n Digite Novamente ");
            return;
        }

        async function CadastrarConta() {
            const response = await api.post('/Pacientes',{
                nome:nome,
            })
        }







    }





return (
    <Container>
        <ContainerLogoTipo>
            <Logo
                source={require('../../assets/logo.png')}
            />
        </ContainerLogoTipo>

        <Title>Entrar ou criar conta</Title>

        <RegularTextRP>Insira seu endereço de e-mail e senha para realizar seu cadastro.</RegularTextRP>

        <Input
            placeholder="Nome"
            value={nome}
            onChangeText={(txt) => setNome(txt)}
        />
        <Input
            placeholder="Usuario ou Email"
            value={email}
            onChangeText={(txt) => setEmail(txt)}
        />

        <Input
              placeholder="Senha"
              secureTextEntry={true}
              value={senha}
              onChangeText={(txt) => setSenha(txt)}
        />

        <Input
                placeholder="Confirmar Senha"
                secureTextEntry={true}
                value={confirmSenha}
                onChangeText={(txt) => setConfirmSenha(txt)}
        />
        <ButtonLoginVE
            title='Volta para login'
            onPress={() => CadastrarConta()}
        // onPress={() => navigation.navigate('Profile')}
        >
            <ButtonTitle>CADASTRAR</ButtonTitle>
        </ButtonLoginVE>

        <LinkCancel
            title='Volta para login'
            onPress={() => navigation.navigate('Login')}
        >Cancelar</LinkCancel>

    </Container>
)
}