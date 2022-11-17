import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/config',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        data: Array(15)
          .fill(1)
          .map(() => ({
            uuid: Random.id(),
            dataId: Random.title(),
            createAt: Random.time('yyyy-MM-dd hh:mm'),
            type: Random.pick([1, 2, 3, 4]),
            updateAt: Random.time('yyyy-MM-dd hh:mm'),
            user: {
              nickName: Random.name(),
              uuid: Random.id(),
            },
          })),
      });
    },
  },
  {
    url: '/api/v1/config',
    method: 'post',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/config',
    method: 'delete',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/config/approve',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        data: Array(15)
          .fill(1)
          .map(() => ({
            uuid: Random.id(),
            dataId: Random.title(),
            createAt: Random.time('yyyy-MM-dd hh:mm'),
            status: Random.pick([0, 1, 2]),
            configType: Random.pick([0, 1, 2]),
            type: Random.pick([0, 1, 2]),
            user: {
              nickName: Random.name(),
              uuid: Random.id(),
            },
          })),
      });
    },
  },
  {
    url: '/api/v1/config/approve/publish',
    method: 'get',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/config/approve/delete',
    method: 'get',
    response: () => {
      return successResp();
    },
  },
];

export default requests;
