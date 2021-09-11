import { useEffect, useState } from 'react';

export default function useForm(initial) {
  const [inputs, setInputs] = useState(initial);

  const inputValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [inputValues]);

  const handleChange = e => {
    let { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => setInputs(initial);

  return { handleChange, inputs, resetForm };
}
