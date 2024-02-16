import { Octicons } from '@expo/vector-icons';
import { ContainerHeader } from '../container/style';
import { BoxBell, BoxUser, DataUser, ImageUser } from '../../screens/AppointmentDoctor/style';
import { NameUser, TextDefault } from '../title/style';

export const HeaderProfile = () => {
    return(
        <ContainerHeader>
            <BoxUser>
                <ImageUser
                    source={{uri: 'https://s2-oglobo.glbimg.com/rvZN1JuI1Wr8wiS1a-q_F-GVH10=/0x0:4948x3296/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2022/s/E/Ic8QULSoSoPi6n7n0SqA/99124606-saude-sao-paulo-sp-16-05-2022-doutor-drauzio-varella-itaim-bibi-maria-isabel.jpg'}}
                />

                <DataUser>
                    <TextDefault>Bem vindo</TextDefault>
                    <NameUser>Dr. Drauzio</NameUser>
                </DataUser>

                
            </BoxUser>
            <BoxBell>
                <Octicons name="bell-fill" size={22} color="#FFFFFF" />
            </BoxBell>
        </ContainerHeader>
    )
}