import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

/**
 * function that detects device connectivity
 */
const useNetInfo = () => {
  const [connectionState, setConnectionState] = useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionState(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return connectionState;
};

export default useNetInfo;
