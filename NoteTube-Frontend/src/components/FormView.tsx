import React from 'react';

interface FormViewProps {
  handleSubmit: (e: React.FormEvent) => void;
  link: string;
  setLink: (link: string) => void;
  setDescription: (description: string) => void;
}
export default function FormView({
  handleSubmit,
  link,
  setLink,
  setDescription,
}: FormViewProps) {
  return (
    <form className='inputForm' onSubmit={handleSubmit}>
      <div className='inputElement'>
        <label>Enter Youtube Link</label>
        <input
          placeholder='Enter Youtube Video Link'
          className='input'
          type='text'
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div className='inputElement'>
        <label>Description for Notes</label>
        <textarea
          placeholder='Enter Description'
          className='descInput'
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className='inputElement'>
        <button className='submitBtn' type='submit'>
          Submit
        </button>
      </div>
    </form>
  );
}
