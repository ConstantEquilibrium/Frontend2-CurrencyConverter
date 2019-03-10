// getData(); 
createDropDown();

document.querySelector('#switch-order').addEventListener('click', switch_order());
document.querySelector('.btn-convert').addEventListener('click', convert());

async function getData() {
    let res = await api.getrates('response.json');
    let rates = res.rates;
    return rates;
}

async function createDropDown() {
    let rates = await getData();
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

function switch_order() {
    let country_input = document.querySelector('#convert-from');
        let country_input_val = country_input.value;
    let country_output = document.querySelector('#convert-to');
        let country_output_val = country_output.value;

    country_input.value = country_output_val;
    country_output.value = country_input_val;
}

