init();

async function init() {
    if(await utilities.compare() == true) {
        await utilities.setStorage();
    }

    createDropDown();
    
    /** EVENT LISTENERS **/
    document.querySelector('#switch-order').addEventListener('click', switch_order);
    document.querySelector('.btn-convert').addEventListener('click', convert);
}

async function getData(base, out) {
    let res;
    if(utilities.compare() == true) {
        utilities.setStorage();
        res = JSON.parse(localStorage.getItem('rates'));
    } else {
        let datetime = new Date();
        res = JSON.parse(localStorage.getItem('rates'));
    }

    return res;
}

async function createDropDown() {
    let res = await getData();
    let select = document.querySelectorAll("select");

    for (let i = 0; i < select.length; i++) {
        for (const prop in res.rates) {
            if (res.rates.hasOwnProperty(prop)) {

                let option = document.createElement('option');
                option.setAttribute('value', prop);
                option.innerHTML = prop;

                select[i].appendChild(option);
            }
        }
    }
}

function switch_order() {
    let country_input = document.querySelector('#convert-from');
    let country_input_val = country_input.value;
    let country_output = document.querySelector('#convert-to');
    let country_output_val = country_output.value;

    country_input.value = country_output_val;
    country_output.value = country_input_val;
}

function convert() {
    out = document.querySelector('#convert-to').value;
    base = document.querySelector('#convert-from').value;
    
    let amount = document.querySelector('.currency-amount-input').value;
    
    let res = JSON.parse(localStorage.getItem('rates')).rates;
    let startval;
    let compareval;
    let baseval;

    for (const key in res) {
        if (res.hasOwnProperty(key)) {
            const element = res[key];
            if(key == base) {
                compareval = element;
            }

            if(key == out) {
                startval = element;
            }

            if(key == 'SEK') {
                baseval = element;
            }
        }
    }

    let result = Math.round(((baseval / compareval) * startval) * 1000) / 1000;

    let container = document.querySelector('.result');
    let h2 = document.createElement('h2');
    container.innerHTML = '';

    h2.appendChild(document.createTextNode(base + amount + " = " + out + result));
    container.appendChild(h2);

}