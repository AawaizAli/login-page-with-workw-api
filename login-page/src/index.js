import axios from 'axios';

// Function to perform the login and get the token
async function login() {
    const loginUrl = "https://dev.workw.com/konnectauth/api/login";
    const loginData = {
        email: "amir@miletap.com",
        password: "Lutebox@12"
    };

    try {
        const response = await axios.post(loginUrl, loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.data && response.data.data.accessToken) {
            return response.data.data.accessToken;
        } else {
            throw new Error('Login response does not contain accessToken');
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
    }
}

// Function to get all "feet" data using the token
async function getFeetData(token) {
    const feetUrl = "https://dev.workw.com/api/feet"; // Replace with the actual API endpoint

    try {
        const response = await axios.get(feetUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error retrieving feet data:', error.message);
        throw error;
    }
}

// Main function to perform the login and get feet data
async function main() {
    try {
        const token = await login();
        const feetData = await getFeetData(token);
        console.log(feetData);
    } catch (error) {
        console.error('Error in main function:', error.message);
    }
}

// Run the main function
main();
