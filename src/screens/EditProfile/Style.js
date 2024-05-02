import styled from "styled-components";

export const DateBox = styled.View`
    width: 100%;
    margin-top: 24px;
    gap: 10px;
`

export const DoubleContentBoxEP = styled.View`
    flex-direction: row;
    width: 100%;
    /* gap: 32px; */
    justify-content: space-between;
    margin-top: 24px;
`

export const Line = styled.View`
    width: 100%;
    height: 2px;
    background-color: #8C8A97;
    margin-top: 19px;
`

export const ButtonCamera = styled.TouchableOpacity.attrs({
    activeOpacity : 0.8
})`
    padding: 12px;
    border-radius: 10px;
    background-color: #496bba;
    border: 1px solid #fbfbfb;

    bottom: -20px;
    right: 15px;
    position: absolute;
`