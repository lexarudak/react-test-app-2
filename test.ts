




const linksBuilder = (item) => (id) => {
  switch (item.type) {
    case "book":
      return `https://books.example.com/${item.id}`;
    case "magazine":
      return `http://magazines.example.com/${item.an}`;
    default:
      return `http://items.example.com/${item.id}`;
  }
};


const items = [
  {
    id: "bk-0001",
    type: "book",
  },
  {
    id: "mg-0001",
    an: "456",
    type: "magazine",
  }
]

const addBasePathList = items.map(linksBuilder)