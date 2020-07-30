import request from '@/utils/request';

export async function query(params) {
  return request(`/api/problem`, {
    params,
  });
}
export async function queryDetail(params) {
  return request(`/api/problem/detail`, {
    params,
  });
}

export async function remove(params) {
  return request(`/api/problem`, {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function add(params) {
  return request(`/api/problem`, {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function update(params) {
  return request(`/api/problem`, {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
