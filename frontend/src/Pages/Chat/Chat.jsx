import { useState } from 'react';
import Channels from '../../components/Channels/Channels.jsx';
import ChatBox from '../../components/ChatBox/ChatBox.jsx';
import ChannelButtonSVG from '../../assets/ChannelButtonSVG.jsx';

const Chat = () => {
  const [activeChannel, setActiveChannel] = useState({ id: 1, name: 'general', removable: false });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <ChannelButtonSVG />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channels activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
        </div>
        <ChatBox activeChannel={activeChannel} />
      </div>
    </div>
  );
};

export default Chat;
