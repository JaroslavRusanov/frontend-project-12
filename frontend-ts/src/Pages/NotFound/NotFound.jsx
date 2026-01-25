import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFound from '../../assets/notFound.svg';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt={t('notFoundPage.logoAlt')} className="img-fluid h-25" width={250} src={notFound} />
      <h1 className="h4 text-muted">{t('notFoundPage.header')}</h1>
      <p className="text-muted">
        {t('notFoundPage.text')}
        <Link to="/login">{t('notFoundPage.link')}</Link>
      </p>
    </div>
  );
};
export default NotFound;
