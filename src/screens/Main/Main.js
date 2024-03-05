

//Importar recursos do bottom tabs
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AppointmentDoctor } from "../AppointmentDoctor/appointmentDoctor"
import { Profile } from "../Profile/profile"

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
const BottomTab = createBottomTabNavigator()

export const Main = () => {
    return(

        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={ ({ route }) => ({
                tabBarStyle: {backgroundColor: "#FFFFFF", height: 80, paddingTop: 10},
                tabBarActiveBackgroundColor: "Transparent",
                tabBarShowLabel: false,
                headerShow: false,

                tabBarIcon: ({ focused }) => {
                    if(route.name === "Home"){
                        return(
                            <></>
                        )
                    }else{

                    }
                }
            })}
        >
            {/* Criar a rota da home */}
            <BottomTab.Screen
                name='Home'
                component={ AppointmentDoctor }
            />

            {/* Criar rota do perfil */}

            <BottomTab.Screen
                name='Perfil'
                component={ Profile }
            />

        </BottomTab.Navigator>

    )
}