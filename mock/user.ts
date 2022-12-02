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
        userdata: Array(15)
          .fill(1)
          .map(() => ({
            uuid: Random.id(),
            username: Random.string(undefined, 5, 10),
            nickname: Random.string(undefined, 5, 10),
            authid: Array(5).fill(() => Random.integer(1, 10)),
          })),
      });
    },
  },

  {
    url: '/api/v1/auth',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        authdata: Array(15)
          .fill(1)
          .map(() => ({
            id: Random.integer(1, 100),
            uuid: Random.id(),
            systemname: Random.string(undefined, 2, 2),
            authname: Random.string(undefined, 5, 10),
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
            role: Random.integer(1, 10),
          })),
      });
    },
  },
];

export default requests;
