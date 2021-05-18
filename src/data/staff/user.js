export const userType = ['系统管理员', '工作人员', '指挥人员', '专家']

export const userStatus = ['正常', '停用']

export const userGender = ['男', '女']

export let users = [
  {
    id: 0, name: 'admin', age: 21, username: 'admin', password: '111111', type: userType[0],
    gender: userGender[0], birthYear: 2000, status: userStatus[0]
  },
  {
    id: 1, name: 'Alice', age: 21, username: 'Alice01', password: '111111', type: userType[1],
    gender: userGender[0], birthYear: 2000, status: userStatus[0]
  },
  {
    id: 2, name: 'Bob', age: 21, username: 'Bob01', password: '111111', type: userType[1],
    gender: userGender[0], birthYear: 2000, status: userStatus[0]
  },
  {
    id: 3, name: 'Candy', age: 22, username: 'Candy01', password: '111111', type: userType[2],
    gender: userGender[0], birthYear: 1999, status: userStatus[0]
  },
  {
    id: 4, name: 'David', age: 21, username: 'David01', password: '111111', type: userType[1],
    gender: userGender[1], birthYear: 2000, status: userStatus[1]
  },
  {
    id: 5, name: 'Eilish', age: 21, username: 'Eilish01', password: '111111', type: userType[3],
    gender: userGender[0], birthYear: 2000, status: userStatus[0]
  }
]

export function queryUserByUsername(username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      return users[i]
    }
    return null
  }
}

function contains(key, val) {
  return key.toString().indexOf(val) >= 0
}

export function queryUserByBlur(s) {
  let res = []
  for (let i = 0; i < users.length; i++) {
    let u = users[i]
    if (contains(u.id, s) || contains(u.name, s) || contains(u.age, s) || contains(u.username, s) ||
      contains(u.password, s) || contains(u.type, s) || contains(u.gender, s) || contains(u.birthYear, s) ||
      contains(u.status, s)) {
      res.push(users[i])
    }
  }
  return res
}

export function queryUserByUsernameBlur(input) {
  var res = []
  for (let user of users) {
    if (user.username.contains(input)) {
      res.push(user)
    }
  }
  return res
}

export function queryUserById(id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return users[i]
    }
    return null
  }
}
