import { supplies } from '../supply/supply'

export let locations = [
  { id: 1, name: '一号仓库', content: '方便面' },
  { id: 2, name: '一号仓库', content: '面包, 饼干' },
  { id: 3, name: '二号仓库', content: '饼干, 青霉素' },
  { id: 4, name: '三号仓库', content: '面包, 帐篷' },
  { id: 5, name: '二号仓库', content: '阿司匹林' }
]

export function queryLocationById(id) {
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].id === id) {
      return i
    }
  }
  return -1
}

export function queryLocationsByBlur(s) {
  let res = []
  for (let i = 0; i < locations.length; i++) {
    let u = locations[i]
    if (contains(u.id, s) || contains(u.name, s) || contains(u.content, s)) {
      res.push(locations[i])
    }
  }
  return res
}

function contains(key, val) {
  return key.toString().indexOf(val) >= 0
}
