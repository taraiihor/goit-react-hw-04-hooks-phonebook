import './Filter.css';
function Filter({ value, onChangle }) {
  return (
    <label className="item__filter">
      <p className="item__text-filter">Пошук контактів</p>
      <input
        className="item__element"
        type="text"
        value={value}
        onChange={onChangle}
      />
    </label>
  );
}

export default Filter;
