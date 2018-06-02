import React from 'react';
import RestrictedResource 
  from '../../src/components/containers/RestrictedResource';
import EditUserForm 
  from '../../src/components/containers/EditUserForm';

class EditPage extends React.Component {
  render() {
    return (
      <RestrictedResource>
        <EditUserForm />
      </RestrictedResource>
    );
  }
}

export default EditPage;