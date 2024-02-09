import { Button, View } from "react-native";

export const Navegation = ({navigation}) => {
    return(
        <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
            <Button
                title="Verificar Email"
                onPress={() => navigation.navigate("VerifyEmail")}
            />
            <Button
                title="Redefinir senha"
                onPress={() => navigation.navigate("ResetPassword")}
            />
        </View>
    );
} 