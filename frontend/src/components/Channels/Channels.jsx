import { Spinner, Dropdown, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import { useGetChannelsQuery } from '../../RTKQueryAPI/api.js';

const Channels = ({ activeChannel, setActiveChannel, handleModal }) => {
  const { data, error, isLoading } = useGetChannelsQuery();

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {isLoading && <Spinner animation="border" />}
      {data && Object.entries(data).map(([, channel]) => {
        const classNamesButton = cn(
          'w-100',
          'rounded-0',
          'text-start',
          'text-truncate',
          'btn',
          { 'btn-secondary': channel.name === activeChannel.name },
        );

        const classNamesToggle = cn(
          'flex-grow-0',
          'text-start',
          'btn',
          { 'btn-secondary': channel.name === activeChannel.name },
        );

        if (channel.removable) {
          return (
            <li key={channel.id} className="nav-item w-100">
              <Dropdown as={ButtonGroup} className="d-flex">
                <button type="button" className={classNamesButton} onClick={() => setActiveChannel(channel)}>
                  <span className="me-1">#</span>
                  {channel.name}
                </button>

                <Dropdown.Toggle split variant="none" className={classNamesToggle} id="dropdown-split-basic" />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleModal('removing', channel)}>Удалить</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleModal('renaming', channel)}>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          );
        }

        return (
          <li key={channel.id} className="nav-item w-100">
            <button type="button" className={classNamesButton} onClick={() => setActiveChannel(channel)}>
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