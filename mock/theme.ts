import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/theme',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        data: Array(15)
          .fill(1)
          .map(() => ({
            uuid: Random.id(),
            instance: Array(5)
              .fill(1)
              .map(() => ({
                uuid: Random.id(),
                ip: Random.ip(),
                port: Random.integer(1000, 50000),
                createAt: Random.time('yyyy-MM-dd hh:mm'),
              })),
            name: Random.string(undefined, 5, 10),
            createAt: Random.time('yyyy-MM-dd hh:mm'),
            status: Random.pick([1, 2]),
            user: {
              nickname: Random.string(undefined, 4, 8),
              uuid: Random.id(),
            },
          })),
      });
    },
  },
];

export default requests;
