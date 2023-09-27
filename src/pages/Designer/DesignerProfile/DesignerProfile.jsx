import React from 'react'
import DesignerProfileComponent from './DesignerProfileComponent';
import { useUserData } from '../../../store/userStore';

function DesignerProfile() {
    const currentUserDatas = useUserData();
  
    return (
      <div>
        {currentUserDatas && (
          <DesignerProfileComponent CurrentUserData={currentUserDatas} />
        )}
      </div>
    );
}

export default DesignerProfile
