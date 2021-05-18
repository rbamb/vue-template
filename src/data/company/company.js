export let companies = [
  { id: 1, name: '汪汪集团', address: '北京', legal: 'a', phone: '434634',
    lati: 42, long: 45, type: "互联网企业"},
  { id: 2, name: '喵喵集团', address: '上海', legal: 'b', phone: '454634',
    lati: 52, long: 55, type: "互联网企业"},
  { id: 3, name: '哈哈集团', address: '广州', legal: 'c', phone: '534634',
    lati: 72, long: 49, type: "互联网企业"},
]

export function queryCompaniesByBlur(s) {
  let res = []
  for (let i = 0; i < companies.length; i++) {
    let u = companies[i]
    if (contains(u.id, s) || contains(u.name, s) || contains(u.address, s)
      || contains(u.legal, s) || contains(u.phone, s) || contains(u.lati, s)
    || contains(u.long, s) || contains(u.type, s)) {
      res.push(companies[i])
    }
  }
  return res
}

function contains(key, val) {
  return key.toString().indexOf(val) >= 0
}

export function queryCompanyById(id) {
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].id === id) {
      return i
    }
  }
  return -1
}
