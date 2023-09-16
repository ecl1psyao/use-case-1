# Country Information Viewer (React.js)

## Application Description

The Country Information Viewer is a sophisticated React.js application that enables users to fetch, filter, and sort detailed information about various countries from a remote API endpoint. By utilizing dynamic input fields, users have the flexibility to define the specific details they wish to fetch about each country. Not only can they retrieve specific attributes of each country, but they also have the capability to filter the results based on population and sort them either in ascending or descending order based on the country name. With an intuitive user interface, the application makes it seamless for users to search for and display information tailored to their needs.

## Running the Application Locally

1. Clone the repository to your local machine.
2. Navigate to the project's root directory in the terminal.
3. Run `npm install` to install all the necessary dependencies.
4. Once all dependencies are installed, run `npm start`.
5. Open your browser and navigate to `http://localhost:3000/` to view the application.
6. Interact with the application interface to fetch, filter, and sort country information based on your preferences.

## Using the Developed Endpoint

Given the application's functionality and the provided code snippet, here are some examples of how you might interact with the endpoint:

1. Fetching names and capitals of countries:
    - **Field 1**: name
    - **Field 2**: capital

2. Fetching countries with population less than 5 million:
    - **Filter by Population**: 5

3. Fetching only the top 3 countries after sorting:
    - **Record Limit**: 3

4. Sorting countries in descending order:
    - **Sort Countries**: Descending

5. Fetching names, capitals, region, and official languages:
    - **Field 1**: name
    - **Field 2**: capital
    - **Field 3**: region
    - **Field 4**: officialLanguages

6. Searching for countries with the term "united":
    - **Search Countries**: united

7. Fetching names and currencies of countries:
    - **Field 1**: name
    - **Field 2**: currencies

8. Fetching countries with population less than 50 million and limiting the output to the top 5:
    - **Filter by Population**: 50
    - **Record Limit**: 5

9. Sorting countries in ascending order:
    - **Sort Countries**: Ascending

10. Fetching names, capitals, and flag URLs:
- **Field 1**: name
- **Field 2**: capital
- **Field 3**: flags

By following the above examples and adjusting input fields, users can fetch a wide range of information based on their specific requirements.