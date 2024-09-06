import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import useAuth from './hook.jsx';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    auth.loggedIn && <Button type="button" onClick={auth.logOut}>{t('authButton')}</Button>
  );
};

export default AuthButton;
