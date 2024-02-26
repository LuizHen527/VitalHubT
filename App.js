import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Navegation } from './src/screens/Navegation/navegation';
import { Login } from './src/screens/login/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Instancia do stack navigator
const Stack = createNativeStackNavigator();

//Import das fontes

import { useFonts, MontserratAlternates_600SemiBold, MontserratAlternates_500Medium, MontserratAlternates_700Bold } from '@expo-google-fonts/montserrat-alternates';
import { Quicksand_500Medium, Quicksand_600SemiBold, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { LinkMedium } from './src/components/Links/style';
import { RecoverPassword } from './src/screens/RecoverPassword/recoverPassword';
import { VerifyEmail } from './src/screens/VerifyEmail/VerifyEmail';
import { ResetPassword } from './src/screens/ResetPassword/resetPassword';
import { CriarConta } from './src/screens/CriarConta/criarConta';
import { Profile } from './src/screens/Profile/profile';
import { AppointmentDoctor } from './src/screens/AppointmentDoctor/appointmentDoctor';
import { AppointmentPacient } from './src/screens/AppointmentPacient/AppointmentPacient';
import { SelectClinic } from './src/screens/SelectClinic/SelectClinic';
import { SelectDoctor } from './src/screens/SelectDoctor/SelectDoctor';

export default function App() {

  const [fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_400Regular
  })

  if(!fontsLoaded && !fontsError){
    return null;
  }
  return (
    //Navegacao
    //Container
    //StackNavigator
    //StackScreen

    //Envolve a estrutura de navegacao
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name='Navegacao'
          component={Navegation}
          options={{title:'Navegacao'}}
        />

        <Stack.Screen
          name='Login'
          component={Login}
          options={{title:'Login'}}
        />

        <Stack.Screen
          name='RecuperarSenha'
          component={RecoverPassword}
          options={{title:'RecuperarSenha'}}
        />

        <Stack.Screen
          name='VerifyEmail'
          component={VerifyEmail}
          options={{title:'VerifyEmail'}}
        />
        <Stack.Screen
          name='ResetPassword'
          component={ResetPassword}
          options={{title:'Redefinir senha'}}
        />
        <Stack.Screen
          name='CriarConta'
          component={CriarConta}
          options={{title:'Criar conta'}}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{title:'Perfil'}}
        />
        <Stack.Screen
          name='AppointmentDoctor'
          component={AppointmentDoctor}
          options={{title:'Consulta doutor'}}
        />
        <Stack.Screen
          name='AppointmentPacient'
          component={AppointmentPacient}
          options={{title:'Consulta paciente'}}
        />
        <Stack.Screen
          name='SelectClinic'
          component={SelectClinic}
          options={{title:'Selecionar clinica'}}
        />
        <Stack.Screen
          name='SelectDoctor'
          component={SelectDoctor}
          options={{title:'Selecionar medico'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
