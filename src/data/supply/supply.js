export const supplyType = ["食品", "饮品", "药品", "户外"]

export let supplies = [
  { id: 1, name: '方便面', quantity: "50包", type: "食品", manager: "ltz",
  phone: "16546511122", number: "3212", time: "2021/05/21 00:56" },
  { id: 2, name: '饼干', quantity: "50包", type: "食品", manager: "ltz",
    phone: "16546511122", number: "3212", time: "2021/05/21 00:56" },
  { id: 3, name: '方便面', quantity: "50包", type: "食品", manager: "ltz",
    phone: "16546511122", number: "3212", time: "2021/05/21 00:57" },
  { id: 4, name: '水', quantity: "50瓶", type: "饮品", manager: "ltz",
    phone: "16546511122", number: "3212", time: "2021/05/21 00:59" },
  { id: 5, name: '帐篷', quantity: "50顶", type: "户外", manager: "ltz",
    phone: "16546511122", number: "3212", time: "2021/05/20 00:56" },
]

export function querySupplyById(id) {
  for (let i = 0; i < supplies.length; i++) {
    if (supplies[i].id === id) {
      return i
    }
  }
  return -1
}


export function querySuppliesByBlur(s) {
  let res = []
  for (let i = 0; i < supplies.length; i++) {
    let u = supplies[i]
    if (contains(u.id, s) || contains(u.name, s) || contains(u.quantity, s) || contains(u.type, s) ||
      contains(u.manager, s) || contains(u.phone, s) || contains(u.number, s) || contains(u.time, s)) {
      res.push(supplies[i])
    }
  }
  return res
}

function contains(key, val) {
  return key.toString().indexOf(val) >= 0
}

