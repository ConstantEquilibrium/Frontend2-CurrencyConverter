var api = (function() {
    async function fetchdata(base, out) {
        let url = 'https://api.exchangeratesapi.io/latest?base=' + base + '&symbols=' + out;
        // let url = 'https://api.exchangeratesapi.io/latest?base=' + base;
        // let url = 'response2.json';
        let promise = await fetch(url).then(res => res.json());
        return promise;
    }

    return { getrates:fetchdata }
})();

var storage = (function() {
    async function compare() {
        let currentTime = new Date();
        if(localStorage.getItem('rates') === null || (currentTime.getTime() - JSON.parse(localStorage.getItem('rates')).time) > 360000) {
            return true;
        } else {
            return false;
        }
    }

    async function setStorage() {
        let res = await api.getrates('SEK', 'USD');
        let time = new Date();
        res.time = time.getTime();
        localStorage.setItem('rates', JSON.stringify(res));
    }
    
    return {
        compare:compare,
        setStorage:setStorage
    }
})();