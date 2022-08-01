import Axios from 'axios';

export const Http = Axios.create({
    baseURL: 'https://app-demo.digimasia.com/api/public/index.php',
    headers: {
        "Content-Type": "application/json",
    }
});

export default Http;