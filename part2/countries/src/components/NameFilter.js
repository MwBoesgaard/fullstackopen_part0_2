const NameFilter = ({handleNameFilterChange}) => {
    return (
      <div>
        <p>find countries <input onChange={handleNameFilterChange}/></p> 
      </div>
    );
  };
  export default NameFilter;