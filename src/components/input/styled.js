import styled from 'styled-components'

export const Input = styled.TextInput.attrs({
    placeholderTextColor:'#34898f',
})`
    width: 90%;
    height: 53px;
    padding: 16px;
    margin-top: 15px;

    border: 2px solid #49b3ba;
    border-radius: 5px;
    color: #34898f;
    font-size: 14px;
    font-family: MontserratAlternates_600SemiBold;
    
`

export const InputDescriptionProfile = styled(Input)`
    height: 320px;
    justify-content: flex-start;
    text-align: left;
    width: 90%;
`

export const InputDiagnosisProfile = styled(InputDescriptionProfile)`
    height: 53px;
`

export const InputPrescriptionProfile = styled(InputDescriptionProfile)`
    height: 120px;
`