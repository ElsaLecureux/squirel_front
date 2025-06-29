import { Platform } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation | null>(null);
  const isMobile = Platform.OS !== 'web' || (Platform.OS === 'web' && window.innerWidth < 768);

  const isLandscape =
    isMobile &&
    orientation &&
    (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT);

  useEffect(() => {
    if (!isMobile) return;
    const getInitialOrientation = async () => {
      try {
        const currentOrientation = await ScreenOrientation.getOrientationAsync();
        setOrientation(currentOrientation);
      } catch (error) {
        console.log('Error getting orientation:', error);
      }
    };
    const subscription = ScreenOrientation.addOrientationChangeListener((orientationInfo) => {
      setOrientation(orientationInfo.orientationInfo.orientation);
    });
    getInitialOrientation();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };
  }, [isMobile]);

  return {
    isLandscape,
    isMobile,
  };
};
