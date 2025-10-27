const items = [
  {
    id: 'bk-0001',
    type: 'book',
  },
  {
    id: 'mg-0001',
    an: '456',
    type: 'magazine',
  },
];

const onClickHandlers = items.map(mapper);

function mapper(item: { id: string; type: string; an?: string }) {
  const { id, type, an } = item;
  const itemMeta = [type, id, an].filter(Boolean).join('/');

  return function (index: number) {
    return function () {
      console.log(itemMeta + '/' + index);
    };
  };
}

export function App() {
  return (
    <div>
      {onClickHandlers.map((onClick, idx) => (
        <button key={idx} onClick={onClick(idx)}>
          {idx}
        </button>
      ))}
    </div>
  );
}

// клик по айтему book выводит в консоль "book/bk-0001/индекс кнопки"
// клик по айтему magazine выводит в консоль "magazine/mg-0001/456/индекс кнопки"

const linkCreator = (
  basepath: string,
  category: string,
  subCategory: string,
  id: string,
) => {
  return `${basepath}/${category}/${subCategory}/${id}`;
};

// const getBookLink = linkCreator.bind(null, 'valera', 'books');
// const getMagazineLink = linkCreator.bind(null, 'valera', 'magazines');
// const getPublicationLink = linkCreator.bind(null, 'valera', 'publications');
// const getNatashaBookLink = linkCreator.bind(null, 'natasha', 'books');

// const bookLink = getBookLink('fiction', 'bk-0001');
// const magazineLink = getMagazineLink('science', 'mg-0001');
// const publicationLink = getPublicationLink('history', 'pc-0001');
// const natashaBookLink = getNatashaBookLink('non-fiction', 'bk-0002');

// const getBookLink2 = (subCategory: string, id: string) =>
//   linkCreator('valera', 'books', subCategory, id);

// const fn = (a) => (b) => (c) => (d) => (e) => a + b + c + d + e;
// const result = fn(1)(2)(3)(4)(5); // 15
