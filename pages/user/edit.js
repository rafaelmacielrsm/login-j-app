import React from 'react';
import RestrictedResource 
  from '../../src/components/containers/RestrictedResource';
import EditUserForm 
  from '../../src/components/containers/EditUserForm';

import Head from 'next/head';
import { metaInfo } from '../../src/config/seo';

class EditPage extends React.Component {
  render() {
    return (
      <div>
        <Head key='SEO'>
          <title>{metaInfo.userEdit.title}</title>
          <meta name="description" content={metaInfo.userEdit.description}/>
        </Head>        

        <RestrictedResource>
          <EditUserForm />
        </RestrictedResource>
      </div>
    );
  }
}

export default EditPage;