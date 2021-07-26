import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

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
