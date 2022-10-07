const env = process.env.REACT_APP_ENV;
let envApiUrl = '';

if (env === 'production') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_PROD}`;
} else if (env === 'staging') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_STAG}`;
} else {
  envApiUrl = `http://${process.env.REACT_APP_DOMAIN_DEV}`;
}

export const apiUrl = envApiUrl;
