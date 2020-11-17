import { useState, useEffect } from 'react';
import produce from 'immer';

const Notes = (props) => props.data.map((note) => <div>{note.text}</div>);

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const initialData = [{ text: 'Loading Notes ... ' }];
  const [data, setData] = useState(initialData);

  const handleClick = () => {
    const text = document.querySelector('#noteinput').value.trim();
    if (text) {
      const nextState = produce(data, (draftState) => {
        draftState.push({ text });
      });
      document.querySelector('#noteinput').value = '';

      if (typeof window !== 'undefined') {
        localStorage.setItem('data', JSON.stringify(nextState));
      }

      setData(nextState);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getData = localStorage.getItem('data');

      if (getData !== '' && getData !== null) {
        return setData(JSON.parse(getData));
      }
      return setData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, 0);

  return (
    <div className='container'>
      <h1>
        <span>Take notes and</span> <br />
        they will be saved in your localStorage.
      </h1>
      <p>
        View app source code on{' '}
        <a href='https://github.com/lebogangolifant/e-notes'>Github</a>
      </p>
      <textarea id='noteinput' type='text' placeholder='Enter a new note' />
      <button onClick={() => handleClick()}>Add notes</button>
      <Notes data={data} />
    </div>
  );
};
