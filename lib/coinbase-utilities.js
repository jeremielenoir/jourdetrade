export let determineProductIDs = (productIDs) => {
    if (!productIDs || !productIDs.length) {
        return ['BTC-USD'];
    }

    if (Array.isArray(productIDs)) {
        return productIDs;
    }

    // If we got this far, it means it's a string.
    // Return an array for backwards compatibility.
    return [productIDs];
};
  
export let checkAuth = (auth) => {
    if (auth && !(auth.key && auth.secret && auth.passphrase)) {
        throw new Error(
        'Invalid or incomplete authentication credentials. Please provide all of the key, secret, and passphrase fields.'
        );
    }
    return auth || {};
};

export let signRequest = (auth, method, path, options = {}) => {
    checkAuth(auth);
    const timestamp = Date.now() / 1000;
    let body = '';
    if (options.body) {
      body = JSON.stringify(options.body);
    } else if (options.qs && Object.keys(options.qs).length !== 0) {
      body = '?' + querystring.stringify(options.qs);
    }
    const what = timestamp + method.toUpperCase() + path + body;
    const key = Buffer.from(auth.secret, 'base64');
    const hmac = crypto.createHmac('sha256', key);
    const signature = hmac.update(what).digest('base64');
    return {
      key: auth.key,
      signature: signature,
      timestamp: timestamp,
      passphrase: auth.passphrase,
    };
  };