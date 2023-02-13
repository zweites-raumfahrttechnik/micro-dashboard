import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/user/v1/login',
    method: 'post',
    response: () => {
      return successResp({
        token: Random.string(undefined, 15, 20),
        role: 1,
      });
    },
  },
];

export default requests;
