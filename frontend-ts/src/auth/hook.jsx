import { useContext } from 'react';

import authContext from './contexts';

const useAuth = () => useContext(authContext);

export default useAuth;
