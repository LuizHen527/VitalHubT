import styled from 'styled-components'

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    background-color: #FAFAFA;
`

export const ContainerBanner = styled.View`
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 25px;
    width: 100%;
`

export const ContainerLogo = styled.View`
    width: 100%;
    margin-left: 5.5%;
`

export const ContentRP = styled.View`
    align-items: center;
    width: 90%;
`

export const ContainerInput = styled.View`
    flex-direction: row;
    margin-bottom: 15px;
`

export const ContainerInputRP = styled(ContainerInput)`
    margin-bottom: 0px;
`