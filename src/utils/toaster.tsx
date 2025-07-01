import { Toast, useToastController, useToastState } from '@tamagui/toast';
import { YStack } from 'tamagui';

export const UserToasterErrors = () => {
  const toast = useToastController();

  const showError = (message: string) => {
    toast.show('Error', {
      message,
      duration: 4000,
    });
  };

  const showSuccess = (message: string) => {
    toast.show('Success', {
      message,
      duration: 3000,
    });
  };

  return { showError, showSuccess };
};

export const Toaster = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, x: 100 }}
      exitStyle={{ opacity: 0, x: 50 }}
      x={0}
      opacity={1}
      animation="quick"
      backgroundColor={currentToast.title === 'Error' ? '$red9' : '$green9'}
      borderRadius="$4"
      padding="$3"
      maxWidth={350}
    >
      <YStack space="$2">
        <Toast.Title color="$white1" fontWeight="bold">
          {currentToast.title}
        </Toast.Title>
        {currentToast.message && (
          <Toast.Description color="$white1">{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
};
