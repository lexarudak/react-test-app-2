class Store {
  count = 0;

  setCount = (count: number) => {
    this.count = count;
  };
}

const store = new Store();
export default store;
