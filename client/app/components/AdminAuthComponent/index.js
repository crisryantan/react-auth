import React from 'react';

function AdminAuthComponent(WrappedComponent, user) {
  if (user && user.userType === 'Admin') {
    return WrappedComponent;
  }

  return () => <div>Hello World</div>;
}

export default AdminAuthComponent;
