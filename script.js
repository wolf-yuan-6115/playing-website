const request = new XMLHttpRequest();
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("server")) {
    request.open("GET", "https://blackcatbot.herokuapp.com/api/exist?server=" + urlParams.get("server"), false);
    request.send();
    var respone = JSON.parse(request.response);
    if (!respone.exist) {
        document.getElementById("songtitle").innerHTML = "無法取得伺服器的播放狀態..."
    }
    setInterval(function() {
        request.open("GET", "https://blackcatbot.herokuapp.com/api/playing?server=" + urlParams.get("server"), false);
        request.send();
    })
} else {
    document.getElementById("songtitle").innerHTML = "你沒有指定要查詢哪個伺服器的播放狀態!";
    document.getElementById("loader").style.display = "none";
    document.getElementById("thumbnail").style.display = "none";
    document.getElementById("container").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("songtitle").style.color = "#ffffff"
}