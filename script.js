const urlParams = new URLSearchParams(window.location.search);

document.getElementById("serverid").style.display = "none";
document.getElementById("query").style.display = "none";

document.getElementById("query").onclick = function() {
    if (document.getElementById("serverid").value.length !== 18) alert("請輸入有效的伺服器ID!");
    else {
        urlParams.searchParams.set("server", document.getElementById("serverid").value);
    }
};

if (urlParams.has("server")) {
    fetch("https://api.blackcatbot.tk/api/exist?server=" + urlParams.get("server"), {mode:"cors","Access-Control-Allow-Origin":"*"}).then(respone => respone.json()).then(json => {
        if (!json.exist) {
            document.getElementById("songtitle").innerHTML = "無法取得伺服器的播放狀態... 請使用Black cat提供的網址或再次確認你的伺服器ID!";
            document.getElementById("loader").style.display = "none";
        }
        else {
            var title = "";
            var thumbnail = "";
            document.getElementById("loader").style.display = "none";
            setInterval(function() {
                fetch("https://api.blackcatbot.tk/api/playing?server=" + urlParams.get("server"), {mode:"cors","Access-Control-Allow-Origin":"*"}).then(respone => respone.json()).then(json => {
                    if (json.playing) {
                        document.getElementById("loader").style.display = "inline-block";
                        document.getElementById("thumbnail").style.display = "inline-block";
                        document.getElementById("time").style.display = "";
                        document.getElementById("container").style.backgroundColor = "white";
                        document.getElementById("songtitle").style.color = "black";
                        
                        document.getElementById("thumbnail").src = json.thumbnail;
                        document.getElementById("songtitle").innerHTML = json.title;
                        document.getElementById("link").href = json.url;
                        if (json.total <= 0 || json.total === null) {
                            var sec = Math.floor(json.now % 60);
                            var min = Math.floor((json.now - sec)/60);
                            document.getElementById("time").innerHTML = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
                        } else {
                            var nowSec = Math.floor(json.now % 60);
                            var nowMin = Math.floor((json.now - nowSec)/60);
                            var totalSec = Math.floor(json.total % 60);
                            var totalMin = Math.floor((json.total - totalSec)/60);
                            document.getElementById("time").innerHTML = `${nowMin < 10 ? "0" + nowMin : nowMin}:${nowSec < 10 ? "0" + nowSec : nowSec}/${totalMin < 10 ? "0" + totalMin : totalMin}:${totalSec < 10 ? "0" + totalSec : totalSec}`;
                        }
                        document.getElementById("loader").style.display = "none";
                    } else {
                        document.getElementById("songtitle").innerHTML = "伺服器沒有在播放音樂...";
                        document.getElementById("loader").style.display = "none";
                        document.getElementById("thumbnail").style.display = "none";
                        document.getElementById("time").style.display = "none";
                        document.getElementById("container").style.backgroundColor = "rgba(0,0,0,0)";
                        document.getElementById("songtitle").style.color = "#ffffff";
                    }
                }).catch(console.error);
            }, 1000);
        }
    }).catch(console.error);
} else {
    document.getElementById("songtitle").innerHTML = "請輸入伺服器ID或是使用Black cat在播放時提供的網址!";
    document.getElementById("serverid").style.display = "inline-block";
    document.getElementById("query").style.display = "inline-block";
    document.getElementById("loader").style.display = "none";
    document.getElementById("thumbnail").style.display = "none";
    document.getElementById("time").style.display = "none";
    document.getElementById("container").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("songtitle").style.color = "#ffffff";
}

