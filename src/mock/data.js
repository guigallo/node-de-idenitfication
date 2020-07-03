const Users = [
  { id: 101, name: 'John Doe', email: 'john@doe.com' },
  { id: 102, name: 'Jane Doe', email: 'jane@doe.com' },
]

const SensitiveData = [
  { id: 201, message: 'Loremn ipsum', userId: 101 },
  { id: 202, message: 'Ipsum loremn', userId: 102 },
]

module.exports = {
  Users,
  SensitiveData,
}
