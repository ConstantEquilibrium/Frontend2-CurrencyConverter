// getData(); 
init();

async function init() {
    createDropDown();
    if(storage.compare === true) {
        storage.setStorage();
    }
}

document.querySelector('#switch-order').addEventListener('click', switch_order);
document.querySelector('.btn-convert').addEventListener('click', convert);

async function getData(base, out) {
    let res = await api.getrates(base, out);
    let rates = res.rates;
    return rates;
}

async function createDropDown() {
    let rates = await getData('SEK', '');
    let select = document.querySelectorAll("select");

    for(let i = 0; i < select.length; i++) {
        for (const prop in rates) {
            if (rates.hasOwnProperty(prop)) {
                const currency = rates[prop];

                let option = document.createElement('option');
                option.setAttribute('value', prop);
                option.innerHTML = prop;

                select[i].appendChild(option);
            }
        }
    }
}

async function switch_order() {
    let country_input = document.querySelector('#convert-from');
        let country_input_val = country_input.value;
    let country_output = document.querySelector('#convert-to');
        let country_output_val = country_output.value;

    country_input.value = country_output_val;
    country_output.value = country_input_val;
}

async function convert() {
    let base = document.querySelector('#convert-from').value;
    let out = document.querySelector('#convert-to').value;
    
    let input_amount = document.querySelector('.currency-amount-input').value;
    let output_amount;

    let rates = (JSON.parse(localStorage.getItem('rates')).rates);
    
    let result = await getData(base, out);

    for (const key in result) {
        if (result.hasOwnProperty(key)) {
            const element = result[key];
            output_amount = input_amount * element;
        }
    }

    // return output_amount;
    let container = document.querySelector('.result');
    container.innerHTML = '';
    let h2 = document.createElement('h2');
    let node = document.createTextNode(base + ' ' + input_amount + ' = ' + out + ' ' + output_amount);
    h2.appendChild(node);
    container.appendChild(h2);
}