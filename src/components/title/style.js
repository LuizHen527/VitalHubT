import styled from "styled-components"

export const Title = styled.Text`
 font-size: 20px;
 color: #33303e;
 font-family: MontserratAlternates_600SemiBold;
 margin-bottom: 5px;
`

export const ButtonTitle = styled.Text`
    font-family: MontserratAlternates_700Bold;
    font-size: 14px;
    color: white;
    text-transform: uppercase;
`

export const ButtonTitleGoogle = styled(ButtonTitle)`
    color: #496BBA;
`
export const TextAccount = styled.Text`
    font-family: MontserratAlternates_600SemiBold;
    font-size: 14px;
    color: #4e5e59;
`

export const TitleProfile = styled(TextAccount)`
    font-size: 20px;
    color: #33303E;
    margin-top: 20px;

`

export const RegularText = styled.Text`
    font-family: Quicksand_500Medium;
    font-size: 16px;
    text-align: center;
`

export const InfoTextProfile = styled(RegularText)`
    font-size: 14px;
    color: #5F5C6B;
`

export const RegularTextVE = styled(RegularText)`
    margin-top: 10px;
    margin-bottom: 20px;
    width: 90%;
`

export const RegularTextRP = styled(RegularText)`
    margin-top: 15px;
    margin-bottom: 5px;
    width: 90%;
`


export const RegularTextBlue = styled(RegularText)`
    color: #496BBA;
`

export const ContainerText = styled.View`
    margin-top: 15px;
    margin-bottom: 5px;
    width: 90%;
`

export const InputTitle = styled.Text`
    font-family: Quicksand_600SemiBold;
    font-size: 16px;
    margin-top: 24px;
    width: 90%;
`

export const TextDefault = styled.Text`
    color: #4E4B59;
    font-family: Quicksand_500Medium;
    font-size: 14px;
`

export const NameUser = styled(InputTitle)`
    margin-top: 0px;
    width: auto;
    color: #FBFBFB;
`