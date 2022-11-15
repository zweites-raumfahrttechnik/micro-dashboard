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
            instance: Random.integer(0, 5),
            name: Random.string(undefined, 5, 10),
            createAt: Random.time('yyyy-MM-dd hh:mm'),
            user: {
              nickName: Random.name(),
              uuid: Random.id(),
            },
          })),
      });
    },
  },
  {
    url: '/api/v1/theme/detail',
    method: 'get',
    response: () => {
      return successResp({
        instance: {
          count: 5,
          data: Array(5)
            .fill(1)
            .map(() => ({
              uuid: Random.id(),
              ip: Random.ip(),
              port: Random.integer(1000, 50000),
              createAt: Random.time('yyyy-MM-dd hh:mm'),
            })),
        },
        visited: {
          count: 5,
          data: Array(5)
            .fill(1)
            .map(() => ({
              uuid: Random.id(),
              name: Random.string(undefined, 5, 10),
              createAt: Random.time('yyyy-MM-dd hh:mm'),
              user: {
                nickName: Random.string(undefined, 4, 8),
                uuid: Random.id(),
              },
            })),
        },
      });
    },
  },
  {
    url: '/api/v1/theme',
    method: 'post',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/theme',
    method: 'delete',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/theme/instance',
    method: 'post',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/theme/instance',
    method: 'delete',
    response: () => {
      return successResp(null);
    },
  },
  {
    url: '/api/v1/theme/approve',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        data: Array(15)
          .fill(1)
          .map(() => ({
            uuid: Random.id(),
            serviceName: Random.string(undefined, 5, 10),
            createAt: Random.time('yyyy-MM-dd hh:mm'),
            status: Random.pick([0, 1, 2]),
            user: {
              nickName: Random.string(undefined, 4, 8),
              uuid: Random.id(),
            },
          })),
      });
    },
  },
  {
    url: '/api/v1/theme/approve',
    method: 'post',
    response: () => {
      return successResp();
    },
  },
  {
    url: '/api/v1/theme/list',
    method: 'get',
    response: () => {
      return successResp({
        count: 100,
        data: Array(15)
          .fill(1)
          .map(() => ({
            uuid: Random.id(),
            name: Random.string(undefined, 5, 10),
          })),
      });
    },
  },
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
            visitor: {
              name: Random.string(undefined, 4, 8),
              uuid: Random.id(),
            },
            status: Random.pick([0, 1, 2]),
            user: {
              nickName: Random.string(undefined, 4, 8),
              uuid: Random.id(),
            },
          })),
      });
    },
  },
];

export default requests;
