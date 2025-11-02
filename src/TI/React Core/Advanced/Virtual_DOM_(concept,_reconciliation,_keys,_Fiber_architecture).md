# Virtual DOM (concept, reconciliation, keys, Fiber architecture)

как реакт события ловит на примере клика
(это все про capture. если ловим на bubbling, то просто слушатель на корне его ловит для bubbling и массив с другой стороны обходится)
- кликаем на кнопку
- браузере генерит событие клика. 
- оно погружается window - document - html - body - div (root) - ... - button
- оно всплывает button - ... - div (root)
- на руте отлавливается слушателем реакта
- находится ближайший к таргету файбер
- создается временный массив dispatchQueue = [] 
- начиная от него и до рута, двигаясь через return собирает такой объект, пихая в listeners такое объекты 

{
  event: syntheticEvent,
  listeners: [
    { instance: fiber, listener: onClickFn, currentTarget: domNode },
    ...
  ]
}
// syntheticEvent - это обертка надо обычным базовым евентом браузера
// instance - файбер у которого в memorizedProps висит onClick
// listener - onClick из пропсов 
// currentTarget - дом узел этого файбера (наш button например)

- кладет этот объект в dispatchQueue. (да, получается массив с 1 объектом. просто бывают события, которые генерят сразу 2 синтетических евента. mouseEnter и mouseOver)
- в цикле for пробегаемся по этому массиву вызываются слушатели с аргументов syntheticEvent
- если внутри обработчика вызван event.stopPropagation(), дальнейшие слушатели этой фазы не вызываются