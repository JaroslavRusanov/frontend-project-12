// import path from 'path';
// import AutoLoad from '@fastify/autoload';
// import fastifyStatic from '@fastify/static';
import logo from './logo.svg';
import './App.css';

// module.exports = async function (fastify, opts) {
//   // Place here your custom code!

//   fastify.register(fastifyStatic, {
//     root: `${process.cwd()}/frontend/build`,
//   });

//   fastify.setNotFoundHandler((req, res) => {
//     res.sendFile('index.html');
//   });

//   // Do not touch the following lines

//   // This loads all plugins defined in plugins
//   // those should be support plugins that are reused
//   // through your application
//   fastify.register(AutoLoad, {
//     dir: path.join(__dirname, 'plugins'),
//     options: Object.assign({}, opts)
//   });

//   // This loads all plugins defined in routes
//   // define your routes in one of these
//   fastify.register(AutoLoad, {
//     dir: path.join(__dirname, 'routes'),
//     options: Object.assign({}, opts)
//   });
// }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
