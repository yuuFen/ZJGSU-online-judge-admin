import request from '@/utils/request';

export async function accountLogin(params) {
  const formData = new FormData();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      formData.append(key, params[key]);
    }
  }
  return request('/login', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    body: formData,
  });
}

export async function fakeUniversityLogin(params) {
  return request('/api/login/University', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
