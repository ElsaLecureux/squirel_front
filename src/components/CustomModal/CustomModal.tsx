import { Modal } from 'react-native';
import { YStack, View } from 'tamagui';
import { PropsWithChildren } from 'react';
import { styles } from './CustomModalStyle';

type ModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  style_modal: boolean;
};

const CustomModal = ({
  modalVisible,
  setModalVisible,
  style_modal,
  children,
}: PropsWithChildren<ModalProps>) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={style_modal ? styles.bottomView : styles.centeredView}>
        <YStack style={styles.modalView}>{children}</YStack>
      </View>
    </Modal>
  );
};

export default CustomModal;
