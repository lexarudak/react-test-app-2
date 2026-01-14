# Typechecking (TypeScript)

Разбор темы: **Проверка типов в React - от PropTypes к TypeScript**

## Теория

### Что такое Typechecking?
Typechecking (проверка типов) - это механизм проверки соответствия данных ожидаемым типам. В React это особенно важно для props компонентов.

### Зачем нужен typechecking:
1. **Раннее обнаружение ошибок** - проблемы выявляются на этапе разработки, а не в production
2. **Лучшая документация** - типы служат живой документацией API компонентов  
3. **Улучшенная поддержка IDE** - автодополнение, рефакторинг, навигация
4. **Повышение надежности** - снижение runtime ошибок


#### 2. TypeScript (современный стандарт)
- Статическая проверка на этапе компиляции
- Полная экосистема типизации
- Поддержка сложных типов и generics
- Нулевой runtime overhead

### Основные концепции TypeScript в React:

#### Props интерфейсы:
```typescript
interface Props {
  name: string;
  age?: number; // опциональный prop
  children: React.ReactNode;
}

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}
```

#### Generic компоненты:
```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}
```

#### Event handlers типизация:
```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // обработка клика
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // обработка изменения
};
```

### Полезные React типы:
- `React.ReactNode` - любой React элемент
- `React.ReactElement` - JSX элемент
- `React.ComponentProps<'div'>` - типы props HTML элемента
- `React.FC<Props>` - функциональный компонент (не рекомендуется)
React.FC добавляет неявные children - это часто не нужно
React.VFC удален из типов React 18+
Явная типизация дает больше контроля и ясности
Generic компоненты проще создавать без React.FC
Лучше читаемость - сразу видно что принимает компонент

### TypeScript подход (современный):
```typescript
interface User {
  id: number;
  name: string;
  age: number;
}

interface UserCardProps {
  user: User;
  avatar?: string;
  onEdit: (userId: number) => void;
}

function UserCard({ user, avatar = '/default-avatar.png', onEdit }: UserCardProps) {
  return (
    <div>
      <img src={avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>Age: {user.age}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  );
}
```

### Сложные типы и generic:
```typescript
// Тип для состояния загрузки данных
type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// Хук с типизацией
function useAsyncData<T>(fetchFn: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null
  });

  // логика хука...
  
  return state;
}

// Использование
function UsersPage() {
  const { data: users, loading, error } = useAsyncData<User[]>(fetchUsers);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {users?.map(user => (
        <UserCard key={user.id} user={user} onEdit={handleEdit} />
      ))}
    </div>
  );
}
```

### Типизация форм:
```typescript
interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // formData уже типизирован
    console.log(formData.email); // TypeScript знает, что это string
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <input
        type="checkbox"
        name="rememberMe"
        checked={formData.rememberMe}
        onChange={handleInputChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Типизация компонентов высшего порядка (HOC):
```typescript
// HOC с типизацией
function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P & { isLoading: boolean }> {
  return function WithLoadingComponent({ isLoading, ...props }: P & { isLoading: boolean }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    return <Component {...(props as P)} />;
  };
}

// Использование HOC
const UserCardWithLoading = withLoading(UserCard);

function App() {
  const [loading, setLoading] = useState(true);
  const user = { id: 1, name: 'John', age: 25 };
  
  return (
    <UserCardWithLoading
      user={user}
      isLoading={loading}
      onEdit={(id) => console.log('Edit user', id)}
    />
  );
}
```

## Вопросы для самопроверки

1. **В чем основные различия между PropTypes и TypeScript для типизации React компонентов?**
   <details>
   <summary>Ответ</summary>
   PropTypes - runtime проверка только в dev mode, ограниченная типизация.
   TypeScript - compile-time проверка, полная экосистема типов, лучшая поддержка IDE, нет runtime overhead.
   </details>

2. **Как правильно типизировать опциональные props с default значениями?**
   <details>
   <summary>Ответ</summary>
   ```typescript
   interface Props {
     name: string;
     age?: number; // опциональный
   }
   
   function Component({ name, age = 18 }: Props) {
     // age автоматически имеет тип number (не undefined)
   }
   ```
   </details>

3. **Какая разница между React.ReactNode и React.ReactElement?**
   <details>
   <summary>Ответ</summary>
   ReactNode - любой валидный React child (элемент, строка, число, null, undefined, массив).
   ReactElement - конкретный JSX элемент, возвращаемый React.createElement.
   </details>

4. **Как типизировать event handlers для разных HTML элементов?**
   <details>
   <summary>Ответ</summary>
   ```typescript
   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
   ```
   </details>

5. **Зачем не рекомендуется использовать React.FC?**
   <details>
   <summary>Ответ</summary>
   React.FC автоматически добавляет children prop, что не всегда нужно. Лучше явно типизировать props:
   ```typescript
   // Плохо
   const Component: React.FC<Props> = ({ name }) => <div>{name}</div>;
   
   // Хорошо
   function Component({ name }: Props) {
     return <div>{name}</div>;
   }
   ```
   </details>

6. **Как создать generic компонент в TypeScript?**
   <details>
   <summary>Ответ</summary>
   ```typescript
   interface ListProps<T> {
     items: T[];
     renderItem: (item: T) => React.ReactNode;
   }
   
   function List<T>({ items, renderItem }: ListProps<T>) {
     return <ul>{items.map((item, index) => (
       <li key={index}>{renderItem(item)}</li>
     ))}</ul>;
   }
   ```
   </details>

7. **Как правильно типизировать useState с объектами?**
   <details>
   <summary>Ответ</summary>
   ```typescript
   interface User {
     id: number;
     name: string;
   }
   
   const [user, setUser] = useState<User | null>(null);
   const [users, setUsers] = useState<User[]>([]);
   ```
   </details>

8. **Что такое discriminated unions и когда они полезны в React?**
   <details>
   <summary>Ответ</summary>
   Discriminated unions позволяют создавать типы с взаимоисключающими свойствами:
   ```typescript
   type ButtonProps = 
     | { variant: 'primary'; color?: never }
     | { variant: 'secondary'; color: string };
   
   // TypeScript будет требовать color только для secondary
   ```
   </details>
