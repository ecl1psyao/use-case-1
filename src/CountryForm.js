import React, {useMemo, useState} from 'react';
import axios from 'axios';

const CountryForm = () => {
    // State for the form fields
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const [field4, setField4] = useState('');
    const [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [populationFilter, setPopulationFilter] = useState('');

    const filteredCountries = useMemo(() => {
        if (!data) return [];

        const lowercasedSearchTerm = searchTerm.toLowerCase();

        return data.filter(country => {
            const countryName = country.name.common.toLowerCase();
            const populationCondition = populationFilter ? country.population < populationFilter * 1000000 : true;
            return countryName.includes(lowercasedSearchTerm) && populationCondition;
        });
    }, [data, searchTerm, populationFilter]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/all?fields=${field1},${field2},${field3},${field4}`);
            setData(response.data);
            // Here, you can parse the JSON response further if needed.
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Field 1</label>
                    <input
                        type="text"
                        value={field1}
                        onChange={(e) => setField1(e.target.value)}
                    />
                </div>
                <div>
                    <label>Field 2</label>
                    <input
                        type="text"
                        value={field2}
                        onChange={(e) => setField2(e.target.value)}
                    />
                </div>
                <div>
                    <label>Field 3</label>
                    <input
                        type="text"
                        value={field3}
                        onChange={(e) => setField3(e.target.value)}
                    />
                </div>
                <div>
                    <label>Field 4</label>
                    <input
                        type="text"
                        value={field4}
                        onChange={(e) => setField4(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            <div>
                <label>Search Countries: </label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />
            </div>

            <div>
                <label>Filter by Population (in millions): </label>
                <input
                    type="number"
                    value={populationFilter}
                    onChange={(e) => {
                        setPopulationFilter(e.target.value);
                    }}
                />
            </div>

            {filteredCountries.length &&
                <div>
                    <pre>{JSON.stringify(filteredCountries, null, 2)}</pre>
                </div>
            }
        </div>
    );
};

export default CountryForm;
