import React from 'react'
import AccountManagerProfileComponent from './AccountManagerProfileComponent';
import { useUserData } from '../../../store/userStore';

function AccountManagerProfile() {
    const currentUserDatas = useUserData();

    return (
      <div>
        {currentUserDatas && (
          <AccountManagerProfileComponent CurrentUserData={currentUserDatas} />
        )}
      </div>
    );
}

export default AccountManagerProfile
