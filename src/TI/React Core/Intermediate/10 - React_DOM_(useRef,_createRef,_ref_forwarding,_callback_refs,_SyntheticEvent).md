# React DOM (useRef, createRef, ref forwarding, callback refs, SyntheticEvent)

## useRef

под капотом что-то вроде 
```ts
// Inside of React
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

поэтому не вызывает ререндеры при изменении карента. можно использовать для хранения данных между ререндерами не провацируя их
обычно используется для хранения ссылки на дом элемент. передавая ref в пропс ref={ref}

по возможности лучше домом не манипулировать напрямую. лучше использовать для получения данных об элементе или установки фокуса, или скролла

изначально current мы дапустим задаем null. и передаем наш реф в пропс реф, чтобы положить туда ссылку на дом элемент. так вот нашиж дом элементы будут обновляться. и чтоб ссылка на них не пропадала, реакт в начале коммит фазы сбрасывает карент изменившегося узла на null и после изменения сетит в него уже новый дом узел

## createRef аналог юз рефа но для классовых компонентов 

## forwardRef
деприкейтнут в 19 реакте. до этого использовался для передачи рефа из родителя в дом элелемент чайлда. т.е. если просто надо было передать реф в чайлда - можно было его просто передавть пропсом. это ж объект просто. но если надо было пролучить реф и прочкинуть его в какой-то дом элемент через ref={ref} но надо было обернуть компнент в forwardRef таким образом

```ts
const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
```

а еще, можно заюзать хук useImperativeHandle который сделает так чтоб в родителя торчали только те методы, которые ты в нем прописал. а не весь дом элемент

```ts
import { useRef, useImperativeHandle } from 'react';

function MyInput({ ref }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input ref={inputRef} />;
};
```

теперь в родителе торчат только focus и scrollIntoView. ну или называй их как хочешь


## callback refs 
в реф можно передавать не только объект полученный из useRef, но и функцию. она будет вызвана когда дом элемент будет вмонтирован. причем аргументом будет этот дом элемент. а при его размонтировании будет вызвана клинап функция (с 19 реакта добавлена)

до 19 реакта
```ts
<div ref={(node) => {
  console.log('Function called with:', node)
  // Mount: node = div элемент  
  // Unmount: node = null
  // ОДНА И ТА ЖЕ функция вызывается дважды!
}}>
```
с 19-ого
```ts
<div ref={(node) => {
  console.log('Mount logic:', node) // выполняется ТОЛЬКО при mount
  
  if (node) {
    return () => {
      console.log('Unmount logic') // выполняется ТОЛЬКО при unmount
    }
  }
}}>
```


## SyntheticEvent

### Как React ловит события на примере клика

*Примечание: это описание для capture фазы. Для bubbling слушатель на корне ловит события при всплытии и массив обходится в обратном порядке.*

**Пошаговый процесс:**

1. **Кликаем на кнопку**
2. **Браузер генерирует событие клика**
3. **Событие погружается**: window → document → html → body → div (root) → ... → button
4. **Событие всплывает**: button → ... → div (root)
5. **На root отлавливается слушателем React**
6. **Находится ближайший к target fiber**
7. **Создается временный массив** `dispatchQueue = []`
8. **Начиная от target fiber и до root**, двигаясь через return, собирается объект:

```ts
{
  event: syntheticEvent,
  listeners: [
    { instance: fiber, listener: onClickFn, currentTarget: domNode },
    ...
  ]
}
```

**Описание полей:**
- `syntheticEvent` - обертка над обычным базовым событием браузера
- `instance` - fiber у которого в memoizedProps висит onClick
- `listener` - onClick из пропсов
- `currentTarget` - DOM узел этого fiber (наш button например)

9. **Объект кладется в dispatchQueue** (получается массив с 1 объектом. Бывают события, которые генерируют сразу 2 синтетических события, например mouseEnter и mouseOver)
10. **В цикле for обходится массив** и вызываются слушатели с аргументом syntheticEvent
11. **Если внутри обработчика вызван** `event.stopPropagation()`, дальнейшие слушатели этой фазы не вызываются

В целом синтетик ивент - это обертка над браузурным евентом. доступ к оригинальному евенту через поле nativeEvent (причем в разных брузерах он может быть разным. в хроме и мозиле отличаются nativeEvent для onChange инпута). так что синтетик ивент нужен для удобства (он может объединять несколько евентов onChange это input + change) и для совместимости с разными браузерами

```ts
event.preventDefault() // отменить действие по умолчанию
event.stopPropagation() // остановить всплытие
event.currentTarget // элемент с обработчиком
event.target // элемент где произошло событие  
event.type // тип события ('click', 'change')
event.nativeEvent // оригинальное событие браузера
```

