import { Text } from "react-native";
import { CancelIcon } from "../../components/CancelIcon/cancelIcon";
import { LinkCancel } from "../../components/Links/style";
import { OtpInput } from "../../components/OtpInput/otpInput";
import { ContainerOpt, TextInputOtp } from "../../components/OtpInput/style";
import { ButtonLogin, ButtonLoginVE } from "../../components/button/style";
import { Container, ContainerBanner, ContainerLogo, ContentRP } from "../../components/container/style";
import { Logo } from "../../components/images/style";
import { ButtonTitle, RegularText, RegularTextBlue, RegularTextVE, Title } from "../../components/title/style";
import api from "../../service/service";
import { ButtonArrow } from "../RecoverPassword/style";
import { useEffect, useRef, useState } from "react";

export const VerifyEmail = ({ navigation, route }) => {
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [codigo, setCodigo] = useState('');
  const [erroCodigo, setErroCodigo] = useState('');

  function focusNextInput(index) {
    // Verificar se o index é menor que a quantidade de campos
    if (index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  }

  function focusPrevInput(index) {
    if (index > 0) {
      inputs[index - 1].current.focus();
    }
  }

  async function ValidarCodigo() {
    if (codigo.length !== 4) {
      setErroCodigo("Preencha o Código corretamente");
      return;
    }

    try {
      await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`);
      navigation.replace('ResetPassword', { emailRecuperacao: route.params.emailRecuperacao });
    } catch (error) {
      console.log(error);
      setErroCodigo("Código inválido ou erro ao validar. Tente novamente.");
    }
  }

  useEffect(() => {
    inputs[0].current.focus();
  }, []);

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

      <Title>Verifique seu email</Title>

      <RegularTextVE>
        Digite o código de 4 dígitos enviado para <RegularTextBlue>{route.params.emailRecuperacao}</RegularTextBlue>
      </RegularTextVE>

      

      <ContainerOpt>
        {
          [0, 1, 2, 3].map((index) => (
            <TextInputOtp
              key={index}
              ref={inputs[index]}
              keyboardType="numeric"
              placeholder="0"
              maxLength={1}
              caretHidden={true}
              onChangeText={(text) => {
                const newCodigo = codigo.split('');
                if (text === "") {
                  focusPrevInput(index);
                } else {
                  newCodigo[index] = text;
                  setCodigo(newCodigo.join(''));
                  focusNextInput(index);
                }
              }}
            />
          ))
        }
      </ContainerOpt>

      <Text style={{ color: "red", marginRight: "4%" }}>{erroCodigo}</Text>

      <ButtonLoginVE onPress={ValidarCodigo}>
        <ButtonTitle>ENVIAR</ButtonTitle>
      </ButtonLoginVE>

      <LinkCancel>Reenviar Código</LinkCancel>
    </Container>
  );
};
