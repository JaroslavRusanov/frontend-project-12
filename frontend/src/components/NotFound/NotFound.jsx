import notFound from './notFound.svg';

const NotFound = () => (
  <div className="text-center">
    <img alt="Страница не найдена" className="img-fluid h-25" width={250} src={notFound} />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      <a href="/login"> на главную страницу</a>
    </p>
  </div>
);

export default NotFound;
