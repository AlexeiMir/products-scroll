import React from 'react';
import Product,{ProductProps}  from './components/Product';
import debounce from 'lodash/debounce'

// Генерируем набор тестовых товаров, чтобы не вбивать руками
let products = Array.from({length:30},() => ({
    title: 'Тумба прикроватная Rubus с двумя ящиками',
    rating: Number((Math.random() *5 + 1).toFixed(2)),
    price: {
        new: Math.round(Math.random() *100000),
        old: Math.round(Math.random() *100000),
        hot: !!Math.round(Math.random() *1)
    },
    color: 'Черный',
    material: 'Ткань',
    size: 'ш. 349 х в. 234 х г. 323',
    mechanism: 'Французская раскладушк',
    seller: 'Laska Family',
}))



const App:React.FC = () => {
    // Максимальное отображение товаров
    const [maxCount,setMaxCount] = React.useState<number>(5)

    // Ссылка на DOM-элемент блока wrapper
    const wrapperRef = React.useRef<HTMLDivElement>(null)

    const onScroll =  React.useCallback(debounce((e:any) => {
            console.log('scroll')
        const isEnd = e.target.scrollWidth - e.target.scrollLeft - 250 <= e.target.clientWidth
        if (isEnd){
            setMaxCount(count => count + 1)
        }
    },150),
        [])
// Следим за изменениями переменных maxCount, onScroll.
    // Если макс. отображаемых товаров >= кол-во товаров
    // Удаляем слушатель скролла у основного блока wrapper
    React.useEffect(() => {
        console.log("Изменился maxCount")
        if (wrapperRef.current && maxCount >= products.length){
            wrapperRef.current.removeEventListener('scroll',onScroll)
        }
    },[onScroll,maxCount])

    // Устанавливаем слушатель скролла на блок wrapper
    // И очищаем, если произошло демонтирование компонента App
    React.useEffect(()=>{
        console.log("Навешали обработчик")
        const {current} = wrapperRef
        current?.addEventListener('scroll',onScroll)
        return () => {
            current?.removeEventListener('scroll', onScroll)
        }
    },[onScroll])

    console.log(products)
  return (
      <div ref={wrapperRef} className="wrapper">
        <ul className="columns columns--first">
            <li></li>
            <li>Рейтинг</li>
            <li>Цена</li>
            <li>Цвет</li>
            <li>Материал</li>
            <li>Размеры</li>
            <li>Механизм</li>
            <li>Продавец</li>
        </ul>
          {products.slice(0,maxCount).map((obj:ProductProps,index:number) => (
              <Product key={index} {...obj} />
          ) )}

      </div>

  );
}

export default App;
