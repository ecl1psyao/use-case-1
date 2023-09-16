import React from 'react';
import {render, fireEvent, findByText} from '@testing-library/react';
import CountryForm from './CountryForm';
import axios from "axios";

jest.mock('axios');


// Mocking the axios call
jest.mock('axios', () => ({
    get: jest.fn()
}));

describe('<CountryForm />', () => {
    beforeEach(() => axios.get.mockResolvedValue({ data: [
            { name: { common: 'India' }, population: 1300000000 },
            { name: { common: 'Australia' }, population: 25000000 },
            { name: { common: 'Zambia' }, population: 17000000 },
            { name: { common: 'Austria' }, population: 9000000 },
        ]}));

    const renderWithSubmission = () => {
        const screen = render(<CountryForm />)

        const submitButton = screen.getByText('Submit');

        // Simulate the form submission
        fireEvent.click(submitButton);

        return screen;
    }

    test('filters countries by name', async () => {
        const {  getByLabelText, findByText } = renderWithSubmission();

        fireEvent.change(getByLabelText(/Search Countries:/i), { target: { value: 'au' } });
        const australia = await findByText(/Australia/i);
        expect(australia).toBeInTheDocument();
        const austria = await findByText(/Austria/i);
        expect(austria).toBeInTheDocument();
    });

    test('filters countries by population', async () => {
        const {  getByLabelText, findByText } = renderWithSubmission()

        fireEvent.change(getByLabelText(/Filter by Population \(in millions\):/i), { target: { value: '15' } });
        const austria = await findByText(/Austria/i);
        expect(austria).toBeInTheDocument();
    });

    test('sorts countries in ascending order', async () => {
        const {  findByTestId, getByLabelText} = renderWithSubmission();

        fireEvent.change(getByLabelText(/Sort Countries:/i), { target: { value: 'ascend' } });
        const countriesText = await findByTestId('countries-test-id');
        const countries = JSON.parse(countriesText.textContent);

        expect(countries[0].name.common).toBe('Australia');
        expect(countries[1].name.common).toBe('Austria');
        expect(countries[2].name.common).toBe('India');
        expect(countries[3].name.common).toBe('Zambia');
    });

    test('sorts countries in descending order', async () => {
        const { getByLabelText, findByTestId } = renderWithSubmission();

        fireEvent.change(getByLabelText(/Sort Countries:/i), { target: { value: 'descend' } });
        const countriesText = await findByTestId('countries-test-id');
        const countries = JSON.parse(countriesText.textContent);
        expect(countries[0].name.common).toBe('Zambia');
        expect(countries[1].name.common).toBe('India');
    });

    test('pagination - limits the number of records', async () => {
        const { getByLabelText, findByTestId } = renderWithSubmission();
        fireEvent.change(getByLabelText(/Record Limit:/i), { target: { value: '2' } });
        const countriesText = await findByTestId('countries-test-id');
        const countries = JSON.parse(countriesText.textContent);

        expect(countries).toHaveLength(2);
    });
});
