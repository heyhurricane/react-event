import { FC, useEffect, useRef } from 'react';

import { formatDate } from '../../utils/formatUtils';
import { HelpRequest } from '../../types/HelpRequest';
import { IYandexMap, IYandexObjectManager } from '../../types/IMap';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ymaps: any;
  }
}

type YandexMap = {
  helpRequests: HelpRequest[];
  isMounted: React.MutableRefObject<boolean>; // Update type here
};

const YandexMap: FC<YandexMap> = ({ helpRequests, isMounted }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<IYandexMap | null>(null);
  const objectManagerRef = useRef<IYandexObjectManager | null>(null);

  const initMap = async () => {
    try {
      await loadYandexMaps();
      await waitForYmapsMap();
      const ymaps = window.ymaps;

      if (mapContainerRef.current) {
        // Initialize map only once
        if (!mapRef.current) {
          mapRef.current = new ymaps.Map(mapContainerRef.current, {
            center: [55.76, 37.64],
            zoom: 4,
          });

          objectManagerRef.current = new ymaps.ObjectManager({
            clusterize: true,
            gridSize: 32,
            clusterDisableClickZoom: true,
          });

          if (mapRef.current) {
            // Check if mapRef.current is not null
            mapRef.current.geoObjects.add(objectManagerRef.current);
          }
        }
        updateMarkers();
      }
    } catch (error) {
      //todo: handle error and delete console.log
      console.log('___map Error:', error);
    }
  };

  const loadYandexMaps = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.ymaps) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=noKey&lang=ru_RU';
        script.async = true;
        script.onload = () => {
          const checkYmapsLoaded = setInterval(() => {
            if (window.ymaps) {
              clearInterval(checkYmapsLoaded);
              resolve();
            }
          }, 100);
        };
        script.onerror = () => reject(new Error('Failed to load Yandex Maps'));
        document.head.appendChild(script);
      }
    });
  };

  const waitForYmapsMap = () => {
    return new Promise<void>((resolve) => {
      const checkMapReady = setInterval(() => {
        if (window.ymaps.Map) {
          clearInterval(checkMapReady);
          resolve();
        }
      }, 100);
    });
  };

  const updateMarkers = () => {
    if (objectManagerRef.current) {
      const features = helpRequests.map((item) => ({
        type: 'Feature',
        id: `${item.location.latitude}-${item.location.longitude}`,
        geometry: {
          type: 'Point',
          coordinates: [item.location.latitude, item.location.longitude],
        },
        properties: {
          balloonContent: `
            Город: ${item.location.city}, <br />
            Округ: ${item.location.district}, <br />
            Помощь актуальна до: ${formatDate(item.endingDate)}
          `,
          clusterCaption: `${item.location.city}`,
        },
      }));

      objectManagerRef.current.removeAll();
      if (helpRequests.length > 0) objectManagerRef.current.add(features);
    }
  };

  useEffect(() => {
    initMap();

    return () => {
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      updateMarkers();
    }
  }, [helpRequests, isMounted]);

  return <div ref={mapContainerRef} style={{ maxWidth: '100%', height: '600px' }} />;
};

export default YandexMap;
