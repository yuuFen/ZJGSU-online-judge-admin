import request from '@/utils/request';

/**
 * 通用资源 API 请求配置
 * @param resource 资源名称
 * @return { query, remove, add, update }
 */
const requestResource = (resource) => {
  return {
    async query(params) {
      return request(`/api/${resource}`, {
        params,
      });
    },
    async remove(params) {
      return request(`/api/${resource}`, {
        method: 'POST',
        data: { ...params, method: 'delete' },
      });
    },
    async add(params) {
      return request(`/api/${resource}`, {
        method: 'POST',
        data: { ...params, method: 'post' },
      });
    },
    async update(params) {
      return request(`/api/${resource}`, {
        method: 'POST',
        data: { ...params, method: 'update' },
      });
    },
  };
};

export default requestResource;

// export const query = (resource) => async (params) => {
//   // return Promise
//   return request(`/api/${resource}`, {
//     params,
//   });
// };

// export const remove = (resource) => async (params) => {
//   return request(`/api/${resource}`, {
//     method: 'POST',
//     data: { ...params, method: 'delete' },
//   });
// };

// export const add = (resource) => async (params) => {
//   return request(`/api/${resource}`, {
//     method: 'POST',
//     data: { ...params, method: 'post' },
//   });
// };

// export const update = (resource) => async (params) => {
//   return request(`/api/${resource}`, {
//     method: 'POST',
//     data: { ...params, method: 'update' },
//   });
// };
