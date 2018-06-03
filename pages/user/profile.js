import React from 'react';
import RestrictedResource 
  from '../../src/components/containers/RestrictedResource';
import UserProfile from '../../src/components/containers/UserProfile';

import Head from 'next/head';
import { metaInfo } from '../../src/config/seo';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Head key='SEO'>
          <title>{metaInfo.profile.title}</title>
          <meta name="description" content={metaInfo.profile.description}/>
        </Head>     

        <RestrictedResource>
          <UserProfile />
        </RestrictedResource>
      </div>
    );
  }
}

export default Profile;