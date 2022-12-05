import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

//自定义可修改删除
const requests: MockMethod[] = [
  {
    url: '/api/v1/chart/cpu',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(0, 100),
        growth: Random.integer(-100, 100),
        value: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 100)),
      });
    },
  },
  {
    url: '/api/v1/chart/memory',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(0, 100),
        growth: Random.integer(-100, 100),
        value: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 100)),
      });
    },
  },
  {
    url: '/api/v1/chart/bandwidth',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(0, 100),
        growth: Random.integer(-100, 100),
        value: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 100)),
      });
    },
  },
  {
    url: '/api/v1/chart/pool',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(0, 100),
        growth: Random.integer(-100, 100),
        value: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 100)),
      });
    },
  },
  {
    url: '/api/v1/chart/storage',
    method: 'get',
    response: () => {
      return successResp(Random.float(5, 10000));
    },
  },
  {
    url: '/api/v1/chart/concurrent',
    method: 'get',
    response: () => {
      return successResp({
        xAxis: Array(12)
          .fill(1)
          .map(() => Random.string(5, 5)),
        concurrent: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 1000)),
        through: Array(12)
          .fill(1)
          .map(() => Random.integer(0, 1000)),
      });
    },
  },
];

export default requests;
