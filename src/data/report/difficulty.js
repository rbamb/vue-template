export let difficulties = [
  {
    id: 2,
    name: '洪水',
    code: '002',
    type: '1',
    reporter: '张三',
    phone: '12483264131',
    reportTime: '2021/04/18 13:46',
    company: '小米',
    lastModifier: '李四',
    lastModifiedTime: '2021/04/18 13:46',
    status: '已结束'
  }
]

export function queryDifficultyById(id) {
  for (let i = 0; i < difficulties.length; i++) {
    if (difficulties[i].id === id) {
      return i
    }
  }
  return -1
}

export function queryDifficultiesByBlur(s) {
  let res = []
  for (let i = 0; i < difficulties.length; i++) {
    let u = difficulties[i]
    if (contains(u.id, s) || contains(u.name, s) || contains(u.code, s)
      || contains(u.type, s) || contains(u.reporter, s) || contains(u.phone, s)
      || contains(u.reportTime, s) || contains(u.company, s) || contains(u.lastModifier, s)
      || contains(u.lastModifiedTime, s) || contains(u.status, s)) {
      res.push(difficulties[i])
    }
  }
  return res
}

function contains(key, val) {
  return key.toString().indexOf(val) >= 0
}
