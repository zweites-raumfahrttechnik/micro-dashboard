import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/template/list',
    method: 'get',
    response: () => {
      return successResp({
        data: Array(18)
          .fill(1)
          .map(() => ({
            templateName: Random.string(undefined, 8, 17),
            status:1,
          })),
      });
    },
  },
];

export default requests;
