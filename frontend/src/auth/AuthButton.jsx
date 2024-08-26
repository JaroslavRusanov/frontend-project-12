import { Button } from 'react-bootstrap';
import useAuth from './hook.jsx';

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn && <Button type="button" onClick={auth.logOut}>Выйти</Button>
  );
};

export default AuthButton;
