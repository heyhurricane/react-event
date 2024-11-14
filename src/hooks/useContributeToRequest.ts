import { fetchСontributeToRequest } from '../store/api-actions';
import { toast } from 'react-toastify';
import { useAppDispatch } from './useAppDispatch';
import { HelpRequest } from '../types/HelpRequest';
import { unwrapResult } from '@reduxjs/toolkit';

const useContributeToRequest = (helpRequest: HelpRequest | undefined) => {
  const dispatch = useAppDispatch();

  const handleContributeToRequest = () => {
    //if (authorizationStatus === AuthorizationStatus.NoAuth) {
    //  return;
    //}

    if (helpRequest) {
      dispatch(fetchСontributeToRequest({ id: helpRequest.id }))
        .then(unwrapResult)
        .then(() => {
          toast.success('Успех! Спасибо за помощь');
        }).catch(() => {
          toast.error('Ошибка! Попробуйте еще раз');
        });
    }
  };

  return { handleContributeToRequest };
};

export default useContributeToRequest;