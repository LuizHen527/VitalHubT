import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode, encode } from 'base-64';

if( !global.atob ){
    global.atob = decode
}

if( !global.btoa ){
    global.btoa = encode
}

//funcao de decodificar o token
export const userDecodeToken = async () => {
    //Capturando token
    const token = await AsyncStorage.getItem('token');

    if( token === null){
        return null;
    }
    //console.log(token.token);
    //Descriptografando token
    const decoded = jwtDecode(token);

    //console.log(decoded);

    return {
        role : decoded.role,
        name : decoded.name,
        email : decoded.email,
        jti : decoded.jti
    }

}