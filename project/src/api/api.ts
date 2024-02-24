
import axios from 'axios';
const baseURL  = 'http://127.0.0.1:8081';
const instance = axios.create({
  baseURL ,
  timeout: 8000, // 设置请求超时时间
});
export const tologin = (url, data) => {
  return instance.post(url, data);
};
export const getall = (url) => {
  return instance.get(url);
};
export const updateHead = (url, data) => {
  return instance.post(url,data);
};
export const getuser = (url, data) => {
  return instance.post(url,data);
};
export const updateVrimage = (url, data) => {
  return instance.post(url,data);
};
export const getVrimg = (url, data) => {
  return instance.post(url,data);
};
export const getimgTosee = (url, data) => {
  return instance.post(url,data);
};
export const updateNewhome = (url, data) => {
  return instance.post(url,data);
};
export const addNewhome = (url, data) => {
  return instance.post(url,data);
};
export const getHousetype = (url, data) => {
  return instance.post(url,data);
};
export const updateHousetype = (url, data) => {
  return instance.post(url,data);
};
export const addHousetype = (url, data) => {
  return instance.post(url,data);
};
export const deleteHousetype = (url, data) => {
  return instance.post(url,data);
};
export const deletenNewhome = (url, data) => {
  return instance.post(url,data);
};
export const searchNewhome = (url, data) => {
  return instance.post(url,data);
};
export const usedgetall = (url) => {
  return instance.get(url);
};
export const searchUsed = (url, data) => {
  return instance.post(url,data);
};
export const addUsed = (url, data) => {
  return instance.post(url,data);
};
export const updateUsed = (url, data) => {
  return instance.post(url,data);
};
export const deletenUsed = (url, data) => {
  return instance.post(url,data);
};
export const searchRent = (url, data) => {
  return instance.post(url,data);
};
export const rentgetall = (url) => {
  return instance.get(url);
};
export const addRent = (url, data) => {
  return instance.post(url,data);
};
export const updateRent = (url, data) => {
  return instance.post(url,data);
};
export const deletenRent = (url, data) => {
  return instance.post(url,data);
};
export const getrentimg = (url, data) => {
  return instance.post(url,data);
};
export const deletenRentimg = (url, data) => {
  return instance.post(url,data);
};
export const getallhouseqa = (url) => {
  return instance.post(url);
};