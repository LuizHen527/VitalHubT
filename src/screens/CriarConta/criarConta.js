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
    const [idTipoUsuario, setIdTipoUsuario] = useState("599F8438-6A6C-4075-A638-D9BD16D39CBD")

    // const handleEmailInputChange = (event) => setEmail(event.target.value)
    // const handleSenhaInputChange = (event) => setSenha(event.target.value)


    async function CadastrarConta() {

        try {
            if (senha !== confirmSenha) {
                Alert("Senhas não conferem! \n Digite Novamente ");
                return;
            }
                const formData = new FormData();
                formData.append("Rg","")
                formData.append("Cpf","")
                formData.append("DataNascimento","")
                formData.append("Cep","")
                formData.append("Logradouro","")
                formData.append("Numero",0)
                formData.append("Cidade","")
                formData.append("Nome",nome)
                formData.append("Email",email)
                formData.append("Senha",senha)
                formData.append("IdTipoUsuario",idTipoUsuario)
                formData.append("Foto","")
                formData.append("Arquivo","")
    
    
                await api.post('/Pacientes',formData,{
                    headers:{"Content-Type" : "multipart/form-data"}
                }).then(response =>
                     {console.log(response.data);
                }).catch(error => {
                    console.log(error);
                    console.log(response.data);
                })

        } catch (error) {
            alert("Não cadastrou,verifique se senhas conferem")
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







