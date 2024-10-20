import request from '@/router/axios';

export const getMeetings = () => {
  return request({
    url: '/api/test-demo/meeting/all',
    method: 'get',
  })
}


export const createMeeting = (row) => {
  return request({
    url: '/api/test-demo/meeting/add',
    method: 'post',
    data: row
  })
}


export const updateMeeting = (row) => {
  return request({
    url: '/api/test-demo/meeting/update',
    method: 'post',
    data: row,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}



export const deleteMeeting = (id) => {
  return request({
    url: `/api/test-demo/meeting/${id}`,
    method: 'post',
  })
}
