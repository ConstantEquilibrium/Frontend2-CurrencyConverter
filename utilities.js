var utilities = (function() {
    async function compare() {
        let currentTime = new Date();
        if(localStorage.getItem('rates') == null || (currentTime.getTime() - JSON.parse(localStorage.getItem('rates')).time) > 3600000) {
            return true;
        } else {
            return false;
        }
    }

    async function setStorage() {
        let res = await api.getrates('SEK', '');
        let time = new Date();
        res.time = time.getTime();
        localStorage.setItem('rates', JSON.stringify(res));
    }
    
    return {
        compare:compare,
        setStorage:setStorage
    }
})();