import RNPickerSelect from 'react-native-picker-select';
import { SelectComponent, ViewSelect } from './Style';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import moment from 'moment';

export const Select = ({setHoraSelecionada}) => {
    const dataAtual = moment().format('YYYY-MM-DD');
    const [arrayOptions,setArrayOption] = useState(null)


    function LoadOptions(){
      //conferir quanto falta em horas para meia noite
      const horasRestantes = moment(dataAtual).add(24,'hours').diff( moment(), 'hours' )
      console.log(horasRestantes);
      //Criar um laço que rode a quantidade de horas que faltan
      const options = Array.from({length : horasRestantes},(_,index)=>{
        let valor = new Date().getHours() + (index + 1);

        return{
          label : `${valor}:00`,value : `${valor}:00`
        }

      })  // no caso de 8:27 de hoje faltam 15 horas pra acabar o dia logo tem 15 posisões

      //Devolver cada hora,uma nova opção no select

      setArrayOption(options)
    }

    useEffect(()=>{
      LoadOptions()
    },[])
    
    return(
        <ViewSelect>
          {arrayOptions != null 
            ?(
              <RNPickerSelect
                placeholder={{
                    label: 'Selecionar horário',
                    value: null,
                    color: '#34898F',
                  }}
                useNativeAndroidPickerStyle={false} 
                onValueChange={(value) => setHoraSelecionada(value)}
                items={
                  arrayOptions
                }
    
                style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                        top: 28,
                        right: 16,
                      },
                    placeholder: {
                        color: '#34898F',
                        fontSize: 14,
                        fontFamily: 'MontserratAlternates_600SemiBold',
                    }
                }}

                Icon={() => {
                    return (
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          borderTopWidth: 10,
                          borderTopColor: '#34898F',
                          borderRightWidth: 10,
                          borderRightColor: 'transparent',
                          borderLeftWidth: 10,
                          borderLeftColor: 'transparent',
                          width: 0,
                          height: 0,
                        }}
                      />
                    );
                  }}
    
                
            />
            ) :

            (
              <></>
            )
          
          
          
          
          }
            
        </ViewSelect>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'pink',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderWidth: 2,
      borderColor: '#60BFC5',
      borderRadius: 5,
      color: '#34898F',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  