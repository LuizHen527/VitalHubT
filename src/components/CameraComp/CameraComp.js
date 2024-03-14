import { StyleSheet, TouchableOpacity, View } from 'react-native';


//import das bibliotecas da camera
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useRef, useState } from 'react';


export const CameraComp = () => {

    const [ tipoCamera, setTipoCamera ] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);

    useEffect(() => {
        ( async () => {
            const { status: cameraStatus } =  await Camera.requestCameraPermissionsAsync();
        })();
    }, []);
    return(
        <Camera
            ref={cameraRef}
            style={styles.camera}
            type={tipoCamera}
            ratio={'16:9'}
        >

            <View style={styles.viewFlip}>
                <TouchableOpacity style={styles.btnFlip} onPress={() => setTipoCamera( tipoCamera == CameraType.front ? CameraType.back : CameraType.front)}>

                </TouchableOpacity>
            </View>

        </Camera>
    )
}

const styles = StyleSheet.create({
    camera: {
        height: '100%',
        width: '100%',
    },

    viewFlip: {
        flex: 1,
        backgroundColor: 'trasparent',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    btnFlip: {
        // position: 'absolute',
        // bottom: 20,
        // left: 20,
        padding:15
    },
})