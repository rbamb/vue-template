const roles = [
  'admin',
  '工作人员',
  '指挥人员',
  '专家'
]

const pages = {
  'staff': roles[0],
  'supply': roles[1],
  'inventory': roles[1],
  'flow': roles[1],
  'company': roles[1],
  'city': roles[1],
  'route': roles[1],
  'event': roles[1],
  'report-worker': roles[1],
  'report-director': roles[2],
  'report-expert': roles[3]
}

export function queryPermission(role, page) {
  return pages[page] === role
}

