import { Modal, StyleSheet } from 'react-native';
import { YStack, View } from 'tamagui';
import { PropsWithChildren } from 'react';

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  style_modal: boolean;
};


const CustomModal = ({ modalVisible, setModalVisible, style_modal, children }: PropsWithChildren<ModalProps>) => {

    return(
            <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
                <View style={ style_modal? styles.bottomView: styles.centeredView }>
                    <YStack style={styles.modalView}> 
                        { children }
                    </YStack>
                </View>  
            </Modal>
    )  
} 

const styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        borderRadius: 20,
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
    bottomView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

});

export default CustomModal;