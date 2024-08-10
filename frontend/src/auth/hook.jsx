import { useContext } from 'react';

import authContext from './contexts.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;
