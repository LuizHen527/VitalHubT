import { View, Text, ActivityIndicator, Modal } from 'react-native'
import React from 'react'
import { Container } from '../components/container/style'

export default function Loading({visible}) {
  return (
    <Modal transparent visible={visible}>

    <Container>
     <ActivityIndicator
        size="large"
        color={"blue"}
        animating={true}
     />
    </Container>

    </Modal>
  )
}