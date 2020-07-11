import request from '@/utils/request';

export async function getLessons() {
  return request('/api/getLessons');
}
export async function addLesson(params) {
  return request('/api/addLesson', {
    method: 'POST',
    data: params,
  });
}
export async function queryNotices() {
  return request('/api/notices');
}