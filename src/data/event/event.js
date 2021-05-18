export let events = [
  {
    id: 1,
    label: '自然灾害',
    children: [
      {
        id: 2,
        label: '水旱灾害',
        children: [{ id: 3, label: '一级', number: '123', memo: 'memo' }]
      },
      {
        id: 4,
        'label': '火灾',
        children: [{ id: 5, label: '一级', number: '123', memo: 'memo' }]
      }
    ]
  },
  {
    id: 6,
    label: '事故灾难',
    children: [
      {
        id: 7,
        'label': '公交车翻倒',
        children: [{ id: 8, label: '二级', number: '123', memo: 'memo' }]
      },
      {
        id: 9,
        'label': '工人猝死',
        children: [{ id: 10, label: '四级', number: '123', memo: 'memo' }]
      }
    ]
  },
  {
    id: 11,
    label: '公共卫生事件',
    children: [
      {
        id: 12,
        'label': '矿泉水污染',
        children: [{ id: 13, label: '一级', number: '123', memo: 'memo' }]
      }
    ]
  }
]

function translate(form) {
  let lev1 = { label: form.level, number: form.number, memo: form.memo }
  let lev2 = { label: form.name, children: [] }
  lev2.children.push(lev1)
  let lev3 = { label: form.type, children: [] }
  lev3.children.push(lev2)
  return lev3
}

export function add(form) {
  let lev = translate(form)
  for (let event of events) {
    if (lev.label === event.label) {
      event.children.push(lev.children[0])
    }
  }
}

export function remove(form) {
  let lev = translate(form)
  for (let event of events) {
    if (lev.label === event.label) {
      let idx = 0
      for (let i = 0; i < event.children.length; i++) {
        if (event.children[i].label === lev.children[0].label) {
          idx = i
          break
        }
      }
      event.children.splice(idx, 1)
    }
  }
}

export function addType(type) {
  let evn = {"label": type, children: []}
  events.push(evn)
}
