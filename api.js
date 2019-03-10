var api = (function() {
    // const url = 'https://openexchangerates.org/api/latest.json?app_id=b8bc3addebe34cdbb7bbb2a86fbff4ef';
    async function fetchdata(url) {
        let promise = await fetch(url).then(res => res.json());
        return promise;
    }

    return { getrates:fetchdata }
})();