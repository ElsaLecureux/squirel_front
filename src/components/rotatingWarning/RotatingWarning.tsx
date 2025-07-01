import { Stack, Text } from 'tamagui';

export const RotationWarning = () => (
  <Stack
    position="absolute"
    top={0}
    left={0}
    right={0}
    bottom={0}
    backgroundColor="rgba(0,0,0,0.9)"
    justifyContent="center"
    alignItems="center"
    zIndex={1000}
  >
    <Stack
      backgroundColor="rgba(255,255,255,0.1)"
      padding="$4"
      borderRadius={15}
      alignItems="center"
      gap="$3"
    >
      <Text fontSize={24} color="white" textAlign="center">
        ⟲
      </Text>
      <Text color="white" fontSize={18} textAlign="center" fontWeight="bold">
        Veuillez tourner l'écran
      </Text>
    </Stack>
  </Stack>
);
