import request from '../utils/request'
import { API_BASE } from '../config'

export const fetchData = params => request({
    url: './table.json',
    method: 'get',
    params
})

export const login = data => request({
    url: API_BASE + '/auth/login',
    method: 'post',
    data
})
