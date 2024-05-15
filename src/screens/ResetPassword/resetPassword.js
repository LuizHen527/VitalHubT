import { useState } from "react";
import { CancelIcon } from "../../components/CancelIcon/cancelIcon";
import { ButtonLoginVE } from "../../components/button/style";
import { Container, ContainerBanner, ContainerInput, ContainerInputRP, ContainerLogo } from "../../components/container/style";
import { Logo } from "../../components/images/style";
import { Input } from "../../components/input/styled";
import { ButtonTitle, RegularTextRP, Title } from "../../components/title/style";
import { ButtonArrow } from "../RecoverPassword/style";
import api from "../../service/service";
import { Text } from "react-native";

export const ResetPassword = ({ navigation, route }) => {
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erroNovaSenha, setErroNovaSenha] = useState('');
  const [erroConfirmSenha, setErroConfirmSenha] = useState('');

  async function AtualizarSenha() {
    if (await fieldValidation()) {
      try {
        await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
          senhaNova: senha,
        });
        navigation.replace('Login');
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function fieldValidation() {
    let error = false;

    if (!senha.trim()) {
      setErroNovaSenha("Senha deve ser preenchida corretamente");
      error = true;
    } else {
      setErroNovaSenha("");
    }

    if (!confirmar.trim() || confirmar !== senha) {
      setErroConfirmSenha("Confirme a senha corretamente");
      error = true;
    } else {
      setErroConfirmSenha("");
    }

    return !error;
  }

  return (
    <Container>
      <ContainerBanner>
        <ButtonArrow onPress={() => navigation.navigate('Login')}>
          <CancelIcon />
        </ButtonArrow>
        <ContainerLogo>
          <Logo source={require('../../assets/logo.png')} />
        </ContainerLogo>
      </ContainerBanner>

      <Title>Redefinir senha</Title>

      <RegularTextRP>Insira e confirme a sua nova senha</RegularTextRP>

      <ContainerInputRP>
        <Input
          placeholder="Nova Senha"
          value={senha}
          secureTextEntry
          onChangeText={(txt) => setSenha(txt)}
          onBlur={() => fieldValidation()}
        />
      </ContainerInputRP>

      <Text style={{ color: 'red', marginRight: "46.5%" }}>{erroNovaSenha}</Text>

      <ContainerInputRP>
        <Input
          placeholder="Confirmar nova senha"
          value={confirmar}
          secureTextEntry
          onChangeText={(txt) => setConfirmar(txt)}
          onBlur={() => fieldValidation()}
        />
      </ContainerInputRP>

      <Text style={{ color: 'red', marginRight: "40%" }}>{erroConfirmSenha}</Text>

      <ButtonLoginVE onPress={AtualizarSenha}>
        <ButtonTitle>CONFIRMAR NOVA SENHA</ButtonTitle>
      </ButtonLoginVE>
    </Container>
  );
};
