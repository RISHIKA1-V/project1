const form = document.querySelector('#Form');
const res = document.querySelector('#tableResult');
var upd;


form.addEventListener('submit', (e) => {

    e.preventDefault();
    if (upd) {
        clearTimerout(upd);
    }

    const ctype = form.elements.coinType.value;

    fetchPrice(ctype);

});

const fetchPrice = async(ctype) => {
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`);
    console.log(r.data.coin.price);
    const price = r.data.coin.price;
    const volume = r.data.coin.volume;
    const change = r.data.coin.priceChange1d;
    const base = r.data.coin.name;
    const target = 'USD';
    const time = r.data.timestamp;


    res.innerHTML = ` <tr style="background-color:blue; color:white;  font-weight:700">
    <td>Property</td>
    <td>Value</td>
</tr>

<tr>
    <td>${base}</td>
    <td>${price}   ${target}</td>
</tr>

<tr>
    <td>Volume</td>
    <td>${volume}</td>
</tr>

<tr>
    <td>Change</td>
    <td>${change}</td>
</tr>

<tr>
    <td>Last Update</td>
    <td>${time}</td>
</tr>`


    upd = setTimeout(() => fetchPrice(ctype), 10000);
}