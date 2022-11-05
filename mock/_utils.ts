// 创建接口，data的数据类型可以为任何类型
export interface RespWrapper<T> {
  code: number;
  msg: string;
  data?: T;
}

// 返回函数
export function successResp<T>(data?: T): RespWrapper<T> {
  return {
    code: 0,
    msg: 'success',
    data: data,
  };
}
