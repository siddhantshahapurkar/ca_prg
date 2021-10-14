window.onload = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.countapi.xyz/hit/ecelliith/ca_visits");
    xhr.responseType = "json";
    xhr.onload = function () {
        console.log(this.response.value);
    }
    xhr.send();
}