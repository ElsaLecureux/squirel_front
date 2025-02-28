import Card from '@/src/models/Card';
import { iconMap } from '@/src/utils/memoryCards';
import { Modal, Text, Button, StyleSheet } from 'react-native';
import { Image, XStack, YStack, View } from 'tamagui';
import { imageMap } from '../../utils/memoryCards';

type Props = {
    card: Card |undefined;
    modalVisible: boolean;
    setModalVisible : Function;
}

const CustomModal = (props : Props) => {

    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
            props.setModalVisible(!props.modalVisible);
        }}>
             <View style={styles.centeredView}>
                <YStack style={styles.modalView}>
                    <XStack style={styles.cardFirstHalf}>
                        <View>
                            <Image
                            style={styles.image}
                            source={imageMap[props.card?.image]}/>
                        </View>
                        <YStack>
                            <Text style={styles.modalText}>
                            Name: {props.card?.name}
                            </Text>
                            <Text style={styles.modalText}>
                            Size: {props.card?.size}
                            </Text>
                            <Text style={styles.modalText}>
                            Weight: {props.card?.weight}
                            </Text>
                            <Text style={styles.modalText}>
                            Speed: {props.card?.speed}
                            </Text>
                            <Text style={styles.modalText}>
                            Endangered: {props.card?.endangered ? 'yes' : 'no'}
                            </Text>
                        </YStack>
                    </XStack>
                    <YStack style={styles.cardSecondHalf}>
                        <Text style={styles.modalText}>
                            Food: {props.card?.food}
                        </Text>
                        <Text style={styles.modalText}>
                            Habitat: {props.card?.habitat}
                        </Text>
                        <Text style={styles.modalText}>
                            Region: {props.card?.region}
                        </Text>
                        <Text style={styles.modalText}>
                            Fun fact: {props.card?.funFact}
                        </Text>
                    </YStack>                   
                    <Button
                        title="Close"
                        onPress={() => props.setModalVisible(false)}
                        //style={styles.button}
                    />
                </YStack>
            </View>  
        </Modal>
    )  
} 

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        height: 600,
        width: 400,
        margin: 20,
        backgroundColor: '#ff8a01',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    cardFirstHalf: {
        backgroundColor: '#ff8a01',
        flex: 2
    },
    cardSecondHalf: {
        backgroundColor: '#ff8a01',
        flex: 1
    },
    image: {
        width: 150,
        height: 280,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default CustomModal;