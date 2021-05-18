export let events = [
  {
    label: "自然灾害",
    children: [
      {
        "label": "水旱灾害",
        children: [{ label: "一级", number: "123", memo: "memo" }]
      },
      {
        "label": "火灾",
        children: [{ label: "一级", number: "123", memo: "memo"}]
      },
    ]
  },
  {
    label: "事故灾难",
    children: [
      {
        "label": "公交车翻倒",
        children: [{ label: "二级", number: "123", memo: "memo" }]
      },
      {
        "label": "工人猝死",
        children: [{ label: "四级", number: "123", memo: "memo" }]
      },
    ],
  },
  {
    label: "公共卫生事件",
    children: [
      {
        "label": "矿泉水污染",
        children: [{ label: "一级", number: "123", memo: "memo"}]
      },
    ]
  }
]

function translate(form) {
  let lev1 = {label: form.level, number: form.number, memo: form.memo}
  let lev2 = {label: form.name, children: []}
  lev2.children.push(lev1)
  let lev3 = {label: form.type, children: []}
  lev3.children.push(lev2)
  return lev3
}

export function add(form) {
  let lev = translate(form)
  addOnNode(lev, events, null)
}

function addOnNode(lev, es) {
  let isDone = false
  for (let i = 0; i < es.length; i++) {
    let e = es[i]
    if (e.label === lev.label) {
      isDone = true
      addOnNode(lev.children[0], e.children)
    }
  }
  if (!isDone) {
    es.push(lev)
  }
}
