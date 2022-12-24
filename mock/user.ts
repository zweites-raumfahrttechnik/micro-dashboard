import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/user',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        data: Array(15)
          .fill(1)
          .map(() => ({
            uuid: Random.uuid(),
            username: Random.string(undefined, 5, 10),
            nickname: Random.string(undefined, 5, 10),
          })),
      });
    },
  },

  {
    url: '/api/v1/user/auth',
    method: 'get',
    response: () => {
      return successResp({
        system: Random.string(undefined, 5, 10),
        role: Random.integer(0, 1),
      });
    },
  },

  {
    url: '/api/v1/auth',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        data: Array(15)
          .fill(1)
          .map(() => ({
            uuid: Random.uuid(),
            system: Random.string(undefined, 2, 2),
            auth: Random.integer(0, 1),
          })),
      });
    },
  },

  {
    url: '/api/v1/user',
    method: 'post',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/user',
    method: 'put',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/user',
    method: 'delete',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/info',
    method: 'get',
    response: () => {
      return successResp({
        nickname: Random.string(undefined, 5, 10),
        auth: Array(5)
          .fill(1)
          .map(() => ({
            role: Random.integer(0, 1),
          })),
      });
    },
  },
];

export default requests;
