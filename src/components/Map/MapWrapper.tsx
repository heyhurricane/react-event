import React, { useEffect, useRef } from 'react';
import YandexMap from './YandexMap';
import { HelpRequest } from '../../types/HelpRequest';

type MapWrapperProps = {
  helpRequests: HelpRequest[];
};

const MapWrapper: React.FC<MapWrapperProps> = ({ helpRequests }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <YandexMap helpRequests={helpRequests} isMounted={isMounted} />
  );
};

export default MapWrapper;