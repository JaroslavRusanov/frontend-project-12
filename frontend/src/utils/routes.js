const apiPath = '/api/v1';

export default {
  apiPath,
  loginPath: '/login',
  channelsPath: '/channels',
  messagesPath: '/messages',
  channelsPathWithID: (id) => `/channels/${id}`,
  messagesPathWithID: (id) => `/messages/${id}`,
};
