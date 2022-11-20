import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/visit',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        data: Array(15)
          .fill(1)
          .map(() => ({
            uuid: Random.id(),
            name: Random.string(undefined, 5, 10),
            createAt: Random.time('yyyy-MM-dd hh:mm'),
            user: {
              nickName: Random.string(undefined, 4, 8),
              uuid: Random.id(),
            },
            visitor: {
              name: Random.string(undefined, 4, 8),
              uuid: Random.id(),
            },
            status: Random.integer(1, 3),
          })),
      });
    },
  },
  {
    url: '/api/v1/visit',
    method: 'post',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/visit',
    method: 'delete',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/visit/approve',
    method: 'post',
    response: () => {
      return successResp(null);
    },
  },
];

export default requests;
