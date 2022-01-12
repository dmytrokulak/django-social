const prod = {
    HOST: ''
};
const dev = {
    HOST: 'http://127.0.0.1:8000'
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;