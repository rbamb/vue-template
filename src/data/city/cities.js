export let cities = [
  {
    id: 1,
    name: '沈阳',
    code: 'shenyang',
    province: '辽宁',
    aidWorkers: 345,
    aidVehicles: 36
  },
  {
    id: 2,
    name: '长春',
    code: 'changchun',
    province: '吉林',
    aidWorkers: 234,
    aidVehicles: 29
  },
  {
    id: 3,
    name: '哈尔滨',
    code: 'harbin',
    province: '黑龙江',
    aidWorkers: 229,
    aidVehicles: 23
  }

]

export function queryCitiesByBlur(s) {
  let res = []
  for (let i = 0; i < cities.length; i++) {
    let c = cities[i]
    if (contains(c.id, s) || contains(c.name, s) || contains(c.code, s)
      || contains(c.province, s) || contains(c.aidWorkers, s) || contains(c.aidVehicles, s)) {
      res.push(cities[i])
    }
  }
  return res
}

function contains(key, val) {
  return key.toString().indexOf(val) >= 0
}

export function queryCityById(id) {
  for (let i = 0; i < cities.length; i++) {
    if (cities[i].id === id) {
      return i
    }
  }
  return -1
}
