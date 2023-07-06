import jwt from 'jsonwebtoken';

export const isJwtExpired = (token: string) => {
    const currentTime = Math.round(Date.now() / 1000 + 60);
    const decoded = jwt.decode(token);

    if (decoded && decoded.exp) {
        const adjustedExpiry = decoded.exp;

        if (adjustedExpiry < currentTime) {
            console.log('Token expired');
            return true;
        }

        console.log('Token has not expired yet');
        return false;
        }

        console.log('Token or "exp" property does not exist');
        return true;
};

export const makeUrl = (...endpoints: string[]) => {
    let url = endpoints.reduce((prevUrl, currentPath) => {
        if(prevUrl.length === 0){
            return prevUrl + currentPath;
        }

        return prevUrl.endsWith("/") ? prevUrl + currentPath + "/" : prevUrl + "/" + currentPath + "/";
    }, "");
    return url;
}

