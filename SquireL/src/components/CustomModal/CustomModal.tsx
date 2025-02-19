import Card from '@/src/models/Card';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

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
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        {props.card?.name}
                    </Text>
                    <Button
                        title="Close"
                        onPress={() => props.setModalVisible(false)}
                        //style={styles.button}
                    />
                </View>
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
        margin: 20,
        backgroundColor: 'white',
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