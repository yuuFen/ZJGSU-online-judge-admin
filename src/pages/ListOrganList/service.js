import request from '@/utils/request';

export async function queryOrgan(params) {
  return request('/api/organ', {
    params,
  });
}
export async function removeOrgan(params) {
  return request('/api/organ', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addOrgan(params) {
  return request('/api/organ', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateOrgan(params) {
  return request('/api/organ', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
