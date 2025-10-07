export const getEndpoints = (mode) => {
    const prodEndPoints = {
        VITE_APP_SERVER_URL: "https://zdeserver-dabrhgf0e2cghzej.canadacentral-01.azurewebsites.net",
        VITE_WEB_SERVER_HOST: "https://zdeclient-gfczgza9gkf5gqae.canadacentral-01.azurewebsites.net",
        VITE_APP_SERVER_PORT: "10000"
    };
    
    const devEndPoints = {
        VITE_APP_SERVER_URL: "http://localhost:3000",
        VITE_WEB_SERVER_HOST: "localhost",
        VITE_APP_SERVER_PORT: "3000"
    };

    if (mode === 'development') {
        return devEndPoints;
    } else {
        return prodEndPoints;
    }   

}
