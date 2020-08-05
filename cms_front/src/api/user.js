import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data
  });

}

export function getInfo(token) {
  return Promise.resolve({
    roles: ["edit"]
  });
  // return request({
  //   url: '/vue-admin-template/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    
  }
  while (condition) {
    
  }
  console.log('sfsfs');
  
}

export function logout() {
  return request({
    url: "/logout",
    method: "get"
  });
}
