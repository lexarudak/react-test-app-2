import { useActionState, useRef, useState } from 'react';

type Props = {
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

const InputField = ({ setErrors }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    let newError = '';

    if (newValue.length < 3) {
      newError = 'Input must be at least 3 characters long.';
    }

    setError(newError);
    if (newError !== error && newError) {
      setErrors((prevErrors) => [...prevErrors, newError]);
    }

    if (newError !== error) {
      setErrors((prev) => prev.filter((err) => err !== error));
    }
  };

  return <input value={value} onChange={onChange} />;
};

export const FormApp = () => {
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ref.current) {
      const formData = new FormData(ref.current);
      const username = formData.get('username');
      const password = formData.get('password');
      console.log('Form Data:', { username, password });
    }
  };

  return (
    <>
      <form ref={ref} onSubmit={onSubmit}>
        <input type="text" name="username" defaultValue="123" />
        <input type="password" name="password" defaultValue="password" />
        <button>Submit</button>
      </form>
      <ReactNewForm />
    </>
  );
};
