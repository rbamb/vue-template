export let routes = [
  {
    id: 1,
    name: '一号路线',
    start: 'A',
    end: 'F',
    length: 4200,
    memo: '1111'
  },
  {
    id: 2,
    name: '二号路线',
    start: 'B',
    end: 'E',
    length: 345,
    memo: '2222'
  },
  {
    id: 3,
    name: '三号路线',
    start: 'C',
    end: 'D',
    length: 35,
    memo: '3333'
  },
]

export function queryRoutesByBlur(s) {
  let res = []
  for (let i = 0; i < routes.length; i++) {
    let c = routes[i]
    if (contains(c.id, s) || contains(c.name, s) || contains(c.start, s)
      || contains(c.end, s) || contains(c.length, s) || contains(c.memo, s)) {
      res.push(routes[i])
    }
  }
  return res
}

function contains(key, val) {
  return key.toString().indexOf(val) >= 0
}

export function queryRouteById(id) {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].id === id) {
      return i
    }
  }
  return -1
}
