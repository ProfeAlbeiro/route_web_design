import { RemoveUserLocalUseCase } from '../../../../Domain/useCases/userLocal/RemoveUserLocal';
import * as React from 'react';

export const ProfileInfoViewModel = () => {
    const removeSession = async () => {
        await RemoveUserLocalUseCase();
    }
  return {
    removeSession
  }
}

export default ProfileInfoViewModel;

