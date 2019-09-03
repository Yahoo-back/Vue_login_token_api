import fetch from '@/utils/fetch'

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
export function login(params) {
  return fetch({
      url: '/admin/login',
      method: 'post',
      data: params
  })
}
export function logout() {
  return fetch({
      url: '/admin/logout',
      method: 'post',
      params: {  }
  })
}
export function adminInfo(params) {
  return fetch({
      url: '/admin/info',
      method: 'get',
      data: params
  })
}

export function adminPermission() {
  return fetch({
      url: '/admin/permission/' + localStorage.getItem('userId'),
      method: 'get',
      params: {  }
  })
}

// export function getInfo() {
//   return fetch({
//       url: '/api/user',
//       method: 'get'
//   })
// }
