import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';
const requests: MockMethod[] = [
    {
        url: '/api/v1/dataDisplay/serviceManage',
        method: 'get',
        response: () => {
          return successResp({
            liveService: Random.integer(0,100),
            approveService: Random.integer(0,100),
            notApproveService:Random.integer(0,100),
          });
        },
      },
];
export default requests;