import React, { useState } from 'react';
import axios from 'axios';

const CountryForm = () => {
    // State for the form fields
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const [field4, setField4] = useState('');
    const [data, setData] = useState(null);  // State to store fetched data

    // Fetch data from the API
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
        // Handle submission logic here if any
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
            {data && (
                <div>
                    <h3>Fetched Data</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default CountryForm;
