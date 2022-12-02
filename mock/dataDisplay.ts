import { MockMethod } from 'vite-plugin-mock';
import { mock, Random } from 'mockjs';
import { successResp } from './_utils';
const servicveName = ['NACOS', 'ngnix', 'Eureka', 'Ribbon', 'Zuul', 'Config'];
const requests: MockMethod[] = [
  {
    url: '/api/v1/dataDisplay/serviceData',
    method: 'get',
    response: () => {
      return successResp({
        liveService: Random.integer(90, 100),
        approveService: Random.integer(50, 60),
        notApproveService: Random.integer(10, 20),
      });
    },
  },
  {
    url: '/api/v1/dataDisplay/configData',
    method: 'get',
    response: () => {
      return successResp({
        liveConfig: Random.integer(0, 100),
        approveConfig: Random.integer(0, 100),
        notApproveConfig: Random.integer(0, 100),
      });
    },
  },
  {
    url: '/api/v1/dataDisplay/permissionData',
    method: 'get',
    response: () => {
      return successResp({
        livePermission: Random.integer(0, 100),
        approvePermission: Random.integer(0, 100),
        notApprovePermission: Random.integer(0, 100),
      });
    },
  },
  {
    url: '/api/v1/dataDisplay/integratedServiceData',
    method: 'get',
    response: () => {
      return successResp({
        systemOrientedService: Random.integer(50, 100),
        serviceOrientedService: Random.integer(50, 100),
        configOrientedService: Random.integer(50, 100),
        otherService: Random.integer(50, 100),
      });
    },
  },
  {
    url: '/api/v1/dataDisplay/instanceData',
    method: 'get',
    response: () => {
      return successResp({
        count: 20,
        data: Array(20)
          .fill(1)
          .map(() => ({
            name: servicveName[Random.integer(0, 5)],
            value: Random.integer(30, 50),
          })),
      });
    },
  },
  {
    url: '/api/v1/dataDisplay/ClusterData',
    method: 'get',
    response: () => {
      return successResp({
        count: 20,
        data: Array(20).fill([
          () => Random.ip(),
          () => Random.integer(0, 100) + '%',
          () => Random.integer(0, 100) + '%',
          () => Random.integer(0, 100) + '%',
          () => Random.integer(500, 1000) + 'Mbps',
        ]),
      });
    },
  },
];
export default requests;
