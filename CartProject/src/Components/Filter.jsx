function Filter({ categories, selectedCategories, handleCheckbox }) {
  return (
    <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      <h3>Filters</h3>
      {categories.map((cat) => (
        <label key={cat} style={{ marginRight: '15px' }}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat)}
            onChange={() => handleCheckbox(cat)}
          />
          {cat}
        </label>
      ))}
    </div>
  );
}
export default Filter;