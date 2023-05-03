import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ContentHeader} from '@components';
import {PfButton, PfImage} from '@profabric/react-components';
import styled from 'styled-components';

import ActivityTab from './ActivityTab';
import TimelineTab from './TimelineTab';
import SettingsTab from './SettingsTab';
import { useSelector } from 'react-redux';

const StyledUserImage = styled(PfImage)`
  --pf-border: 3px solid #adb5bd;
  --pf-padding: 3px;
`;

const Profile = () => {
  const user =useSelector((state: any) => state.auth.currentUser);
  const [activeTab, setActiveTab] = useState('ACTIVITY');
  const [t] = useTranslation();

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <ContentHeader title="Profile" />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <StyledUserImage
                      width={100}
                      height={100}
                      rounded
                      src="/img/default-profile.png"
                      alt="User profile"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
