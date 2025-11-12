const fn = () => {
  const obj = {}
  const a = {}

  return (name) => {
    obj.name = name
    console.log(obj);
  }
}


const valera = fn()


valera('Aliaksei')


const valera2 = fn()
