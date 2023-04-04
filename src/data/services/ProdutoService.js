import * as Api from './ApiService';

const endpoint = 'produtos';

export function list(){
  return Api.get(endpoint);
}

export function create(data){
  return Api.create(endpoint, data);
}

export function update(data){
  return Api.update(endpoint, data);
}

export function remove(id){
  return Api.remove(endpoint, id);
}