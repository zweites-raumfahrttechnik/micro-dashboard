import {} from 'path';
import { MockMethod } from 'vite-plugin-mock';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/upload/grpc',
    method: 'post',
    response: () => {
      return successResp('2022-22-22 56:33:11');
    },
  },
];

export default requests;
