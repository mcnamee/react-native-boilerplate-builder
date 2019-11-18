const isDevEnv = process.env.NODE_ENV === 'development';

export default {
  // App Details
  appName: 'AwesomeProject',

  // Build Configuration - eg. Debug or Release?
  isDevEnv,

  // Date Format
  dateFormat: 'Do MMM YYYY',

  // API
  apiBaseUrl: isDevEnv
    ? 'https://www.digitalsupply.co/wp-json/wp'
    : 'https://www.digitalsupply.co/wp-json/wp',


  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: isDevEnv ? 'UA-84284256-2' : 'UA-84284256-1',
};
