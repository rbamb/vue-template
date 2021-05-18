export let flows = [
  { id: 1, name: '火灾处理流程', type: '自然灾害一级', step: 2,
    content: '1. 抢救伤员 2. 进行灭火'},
  { id: 2, name: '公交车翻倒处理流程', type: '事故灾害二级', step: 3,
    content: '1.固定公交车 2. 封锁道路 3. 抢救伤员'},
  { id: 3, name: '矿泉水污染出流程', type: '公共卫生事件一级', step: 2,
    content: '1. 切断水管 2. 污染处理'},
]

export function queryFlowsByBlur(s) {
  let res = []
  for (let i = 0; i < flows.length; i++) {
    let u = flows[i]
    if (contains(u.id, s) || contains(u.name, s) || contains(u.type, s) ||
      contains(u.step, s) || contains(u.content, s)) {
      res.push(flows[i])
    }
  }
  return res
}

function contains(key, val) {
  return key.toString().indexOf(val) >= 0
}

export function queryFlowById(id) {
  for (let i = 0; i < flows.length; i++) {
    if (flows[i].id === id) {
      return i
    }
  }
  return -1
}
