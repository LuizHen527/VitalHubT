import { useState } from "react";
import { Alert, ActivityIndicator } from "react-native";
import { LinkCancel } from "../../components/Links/style";
import { ButtonLoginVE, ButtonLogin } from "../../components/button/style";
import { Container, ContainerLogoTipo } from "../../components/container/style";
import { Logo } from "../../components/images/style";
import { Input } from "../../components/input/styled";
import { ButtonTitle, RegularTextRP, Title } from "../../components/title/style";
import api from "../../service/service";

export const CriarConta = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [idTipoUsuario, setIdTipoUsuario] = useState("599F8438-6A6C-4075-A638-D9BD16D39CBD");

  async function CadastrarConta() {
    if (loadingIcon) {
      return; // Se já estiver carregando, não faça nada
    }

    if (!fieldValidation()) {
      return; // Se a validação falhar, não continue com o cadastro
    }

    setLoadingIcon(true);

    try {
      if (senha !== confirmSenha) {
        Alert.alert("Erro", "Senhas não conferem! \nDigite novamente.");
        setLoadingIcon(false);
        return;
      }

      const formData = new FormData();
      formData.append("Rg", "");
      formData.append("Cpf", "");
      formData.append("DataNascimento", "");
      formData.append("Cep", "");
      formData.append("Logradouro", "");
      formData.append("Numero", 0);
      formData.append("Cidade", "");
      formData.append("Nome", nome);
      formData.append("Email", email);
      formData.append("Senha", senha);
      formData.append("IdTipoUsuario", idTipoUsuario);
      formData.append("Foto", "");
      formData.append("Arquivo", "");

      await api.post('/Pacientes', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }).then(response => {
        console.log(response.data);
        navigation.replace('Login');
      }).catch(error => {
        console.log(error);
        Alert.alert("Erro", "Erro ao cadastrar. Tente novamente.");
      });

    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoadingIcon(false);
    }
  }

  function fieldValidation() {
    let error = false;

    if (!nome.trim()) {
      Alert.alert("Erro", "Nome deve ser preenchido corretamente.");
      error = true;
    }

    if (!email.trim() || !validateEmail(email)) {
      Alert.alert("Erro", "Email deve ser preenchido corretamente.");
      error = true;
    }

    if (!senha.trim()) {
      Alert.alert("Erro", "Senha deve ser preenchida corretamente.");
      error = true;
    }

    if (!confirmSenha.trim() || confirmSenha !== senha) {
      Alert.alert("Erro", "Confirme a senha corretamente.");
      error = true;
    }

    return !error;
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <Container>
      <ContainerLogoTipo>
        <Logo source={require('../../assets/logo.png')} />
      </ContainerLogoTipo>

      <Title>Entrar ou criar conta</Title>

      <RegularTextRP>Insira seu endereço de e-mail e senha para realizar seu cadastro.</RegularTextRP>

      <Input
        placeholder="Nome"
        value={nome}
        onChangeText={(txt) => setNome(txt)}
      />
      <Input
        placeholder="Usuário ou Email"
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

      {!loadingIcon ? (
        <ButtonLoginVE onPress={CadastrarConta}>
          <ButtonTitle>CADASTRAR</ButtonTitle>
        </ButtonLoginVE>
      ) : (
        <ButtonLogin>
          <ActivityIndicator size="small" color="white" />
        </ButtonLogin>
      )}

      <LinkCancel onPress={() => navigation.navigate('Login')}>
        Cancelar
      </LinkCancel>
    </Container>
  );
};
