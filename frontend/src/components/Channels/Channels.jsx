import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { channelsSelector } from '../../store/Slices/channels.js';
import { activeChannelSelector } from '../../store/Slices/activeChannel.js';

const Channels = ({ activeChannnelClick, handleModal }) => {
  const channels = useSelector(channelsSelector.selectAll);
  const activeChannel = useSelector(activeChannelSelector);
  const { t } = useTranslation();

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => {
        const classNamesButton = cn(
          'w-100',
          'rounded-0',
          'text-start',
          'text-truncate',
          'btn',
          { 'btn-secondary': channel.name === activeChannel?.name },
        );

        const classNamesToggle = cn(
          'flex-grow-0',
          'text-start',
          'btn',
          { 'btn-secondary': channel.name === activeChannel?.name },
        );

        if (channel.removable) {
          return (
            <li key={channel.id} className="nav-item w-100">
              <Dropdown as={ButtonGroup} className="d-flex">
                <button type="button" className={classNamesButton} onClick={() => activeChannnelClick(channel)}>
                  <span className="me-1">#</span>
                  {channel.name}
                </button>

                <Dropdown.Toggle
                  split
                  variant="none"
                  className={classNamesToggle}
                  id="dropdown-split-basic"
                >
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleModal('removing', channel)}>
                    {t('channels.removeButton')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleModal('renaming', channel)}>
                    {t('channels.renameButton')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          );
        }

        return (
          <li key={channel.id} className="nav-item w-100">
            <button type="button" className={classNamesButton} onClick={() => activeChannnelClick(channel)}>
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Channels;
