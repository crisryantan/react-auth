export const storageVersion = 'v1';

export const userStateSave = state => {
  // eslint-disable-line consistent-return
  try {
    const serializedState = JSON.stringify({ ...state, storageVersion });
    return localStorage.setItem('user', serializedState);
  } catch (error) {
    return undefined;
  }
};

export const userStateLoad = () => {
  try {
    const serializedState = localStorage.getItem('user');

    if (serializedState === null) {
      return undefined;
    }
    const userState = JSON.parse(serializedState);

    if (userState.storageVersion !== storageVersion) {
      return undefined;
    }

    return userState;
  } catch (error) {
    return undefined;
  }
};

export const userStateDelete = () => {
  try {
    localStorage.removeItem('user');
    return undefined;
  } catch (error) {
    return undefined;
  }
};
