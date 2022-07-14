const CountryList = ({nameFilter, countries}) => {
    const countriesToShow =
    nameFilter.length === 0
      ? countries
      : countries.filter((country) => country.name.common.toLowerCase().includes(nameFilter.toLowerCase()));

    return (
      <div>
        {countriesToShow.map((country, i) => (
            <p key={i}>{country.name.common}</p>
        ))}
      </div>
    );
  };
  export default CountryList;