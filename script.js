const request = new XMLHttpRequest();
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("server")) {
    var respone = null;
    fetch ("https://blackcatbot.herokuapp.com/api/exist?server=" + urlParams.get("server"), {mode:"no-cors",cache:"no-cache"}).then(res => console.log(res)).catch(console.error);
    console.log(respone)
    //request.open("GET", "https://blackcatbot.herokuapp.com/api/exist?server=" + urlParams.get("server"), false);
    //request.send();
    //var respone = JSON.parse(request.response);
    var title = null;
    var thumbnail = null;
    if (!respone.exist) {
        document.getElementById("songtitle").innerHTML = "無法取得伺服器的播放狀態...";
        document.getElementById("loader").style.display = "none";
    }
    else {
        //request.open("GET", "https://blackcatbot.herokuapp.com/api/playing?server=" + urlParams.get("server"), false);
        fetch ("https://blackcatbot.herokuapp.com/api/playing?server=" + urlParams.get("server"), {mode:"no-cors"}).then(res => respone = res.json()).catch(console.error);
        document.getElementById("loader").style.display = "none";
        setInterval(function() {
            //request.send();
            //respone = JSON.parse(request.response);
            if (respone.playing) {
                if (thumbnail !== document.getElementById("thumbnail").src) document.getElementById("thumbnail").src = respone.thumbnail;thumbnail = respone.thumbnail;
                if (title !== document.getElementById("songtitle").innerHTML) document.getElementById("thumbnail").innerHTML = respone.title;title = respone.title;
                if (respone.total <= 0 || respone.total === null) {
                    var sec = Math.floor(respone.now % 60);
                    var min = Math.floor((respone.now - sec)/60);
                    document.getElementById("time").innerHTML = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
                } else {
                    var nowSec = Math.floor(respone.now % 60);
                    var nowMin = Math.floor((respone.now - nowSec)/60);
                    var totalSec = Math.floor(respone.now % 60);
                    var totalMin = Math.floor((respone.now - totalSec)/60);
                    document.getElementById("time").innerHTML = `${nowMin < 10 ? "0" + nowMin : nowMin}:${nowSec < 10 ? "0" + nowSec : nowSec}/${totalMin < 10 ? "0" + totalMin : totalMin}:${totalSec < 10 ? "0" + totalSec : totalSec}`;
                }
            } else {
                document.getElementById("songtitle").innerHTML = "伺服器沒有在播放音樂...";
                document.getElementById("loader").style.display = "none";
                document.getElementById("thumbnail").style.display = "none";
                document.getElementById("time").style.display = "none";
                document.getElementById("container").style.backgroundColor = "rgba(0,0,0,0)";
                document.getElementById("songtitle").style.color = "#ffffff"
            }
        })
    }
} else {
    document.getElementById("songtitle").innerHTML = "你沒有指定要查詢哪個伺服器的播放狀態!";
    document.getElementById("loader").style.display = "none";
    document.getElementById("thumbnail").style.display = "none";
    document.getElementById("time").style.display = "none";
    document.getElementById("container").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("songtitle").style.color = "#ffffff"
}