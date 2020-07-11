import request from '@/utils/request';

export async function queryCourse(params) {
  return request('/api/course', {
    params,
  });
}
export async function removeCourse(params) {
  return request('/api/course', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addCourse(params) {
  return request('/api/course', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateCourse(params) {
  return request('/api/course', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
