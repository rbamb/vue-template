let events = [
  {
    label: '自然灾害',
    children: [
      {
        'label': '水旱灾害',
        children: [{ label: '一级', number: '123', memo: 'memo' }]
      },
      {
        'label': '火灾',
        children: [{ label: '一级', number: '123', memo: 'memo' }]
      }
    ]
  },
  {
    label: '事故灾难',
    children: [
      {
        'label': '公交车翻倒',
        children: [{ label: '二级', number: '123', memo: 'memo' }]
      },
      {
        'label': '工人猝死',
        children: [{ label: '四级', number: '123', memo: 'memo' }]
      }
    ]
  },
  {
    label: '公共卫生事件',
    children: [
      {
        'label': '矿泉水污染',
        children: [{ label: '一级', number: '123', memo: 'memo' }]
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

function add(form) {
  let lev = translate(form)
  for (let event of events) {
    if (lev.label === event.label) {
      event.children.push(lev.children[0])
    }
  }
}

function remove(form) {
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

let form = {
  type: "自然灾害",
  name: "火灾",
  level: "一级",
  number: "123",
  memo: "memo"
}

remove(form)

console.log(events[0])
