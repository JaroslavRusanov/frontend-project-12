const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  channelEditPath: (id) => [apiPath, 'channels', `:${id}`].join('/'),
};
