import React from 'react';
function Tumb() {
  const [isActive, setIsActive] = React.useState(false);
  const handleChange = e => {
    setIsActive(e.target.checked);
  };
  return (
    <section className='tumb'>
      <label className={`switch ${isActive ? 'on' : 'off'}`} htmlFor='switch'>
        <input type='checkbox' onClick={handleChange} id='switch' />
        <span className='slider' />
      </label>
    </section>
  );
}
export default Tumb
