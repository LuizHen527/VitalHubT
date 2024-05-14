import { Octicons } from '@expo/vector-icons';
import { ContainerHeader } from '../container/style';
import { BoxBell, BoxUser, DataUser, ImageUser } from '../../screens/AppointmentDoctor/style';
import { NameUser, TextDefault } from '../title/style';
import { useNavigation } from '@react-navigation/native';

import { userDecodeToken } from '../../utils/Auth'; 
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Queria passar props com o nome e a URL da imagem, mas nao consegui
//Update: O react native nao consegue renderizar imagens dinamicamente, quero ver como o professor vai fazer isso

export const HeaderProfile = ({
    fotoPerfil
}) => {
    const navigation = useNavigation();
    const [ nome, setNome ] = useState('');
    const [idUser, setIdUser] = useState('');

    async function profileLoad(){
        const token = await userDecodeToken();

        setNome(token.name);
        setIdUser(token.jti);

        await AsyncStorage.setItem('idUsuario', (idUser));

    }

    useEffect(() => {
        profileLoad();
    }, []);

    return(
        <ContainerHeader>
            <BoxUser onPress={() => navigation.navigate("Profile")}>
                <ImageUser
                    source={{ uri: fotoPerfil }}
                />

                <DataUser>
                    <TextDefault>Bem vindo</TextDefault>
                    <NameUser>{nome}</NameUser>
                </DataUser>

                
            </BoxUser>
            <BoxBell>
                <Octicons name="bell-fill" size={22} color="#FFFFFF" />
            </BoxBell>
        </ContainerHeader>
    )
}