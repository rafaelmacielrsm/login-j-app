import React from 'react';
import RestrictedResource 
  from '../../src/components/containers/RestrictedResource';
import UserProfile from '../../src/components/containers/UserProfile';

class Profile extends React.Component {
  render() {
    return (
      <RestrictedResource>
        <UserProfile />
      </RestrictedResource>
    );
  }
}

export default Profile;