import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode, encode } from 'base-64'


//Pegamos o token armazenado no AsyncStorage para retorno dos dados que nos importam como role e name

if (!global.atob) {
    global.atob = decode
}
if (!global.btoa) {
    global.btoa = encode
}

export const userDecodeToken = async () => {
    const token = await AsyncStorage.getItem('token');
    
    if (token === null) {
        return null;
    }

    // Descriptografando o token 
    const decoded = jwtDecode(token)

    return{

        role : decoded.role,
        name : decoded.name,
        email : decoded.email,
        jti : decoded.jti

    }
}