import Spinner from 'react-bootstrap/Spinner';
import cn from 'classnames';
import { useGetChannelsQuery } from '../../RTKQueryAPI/api.js';

const Channels = ({ activeChannel, setActiveChannel }) => {
  const { data, error, isLoading } = useGetChannelsQuery();

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {isLoading && <Spinner animation="border" />}
      {data && Object.entries(data).map(([, channel]) => {
        const classNames = cn(
          'w-100',
          'rounded-0',
          'text-start',
          'btn',
          { 'btn-secondary': channel.name === activeChannel.name },
        );

        return (
          <li key={channel.id} className="nav-item w-100">
            <button type="button" className={classNames} onClick={() => setActiveChannel(channel)}>
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        );
      })}
      {error && console.log(error)}
    </ul>
  );
};

export default Channels;
