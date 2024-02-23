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

export const InputScheduleModal_1 = styled(Input)`
    width: 27.8%;
    margin-top: 0px;
`

export const InputScheduleModal_2 = styled(Input)`
    width: 31%;
    margin-top: 0px;
`

export const InputScheduleModal_3 = styled(Input)`
    width: 100%;
    margin-top: 10px;
`

export const InputDiagnosisProfile = styled(InputDescriptionProfile)`
    height: 53px;
`

export const InputPrescriptionProfile = styled(InputDescriptionProfile)`
    height: 120px;
`