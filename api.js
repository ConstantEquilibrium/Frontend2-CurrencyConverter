var api = (function() {
    async function fetchdata(base, out) {
        if(base == undefined) {
            base = 'SEK';
        }

        if(out == undefined) {
            out = '';
        }

        let url = 'https://api.exchangeratesapi.io/latest?base=' + base + '&symbols=' + out;
        // let url = 'https://api.exchangeratesapi.io/latest?base=' + base;
        // let url = 'response2.json';
        let promise = await fetch(url).then(res => res.json());
        return promise;
    }

    return { getrates:fetchdata }
})();