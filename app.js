var submitButton = document.getElementById("submitButton");
var body = document.querySelector('body');
var riotApiKey = "RGAPI-fb84cabe-3dc0-460e-a42d-80f7ada8402f";
var cors = '';
var version = "11.1.1"

submitButton.addEventListener("click", function(ev){
    ev.preventDefault();
    var ingameName = document.getElementById("ingameName").value;
    var url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${ingameName}?api_key=${riotApiKey}`;
    var accountUrl = `${cors}${url}`;
    getJsonAccountInfo(accountUrl);
})

function getJsonAccountInfo(url){
    fetch(url)
    .then(response => response.json())
    .then(jsonData => processData(jsonData));
    
    function processData(data){
        console.log('data - ',data);
        var url2 = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${data.id}?api_key=${riotApiKey}`;
        var masteryUrl = `${cors}${url2}`;
        var div = document.createElement('div');
        div.innerHTML = '<p>'+"Your ingame name: "+data.name+'</p>';
        div.innerHTML += '<p>'+"Your account level: "+data.summonerLevel+'</p>';
        body.appendChild(div);
        getJsonMasteryInfo(masteryUrl)

        function getJsonMasteryInfo(url){
            fetch(url)
            .then(response => response.json())
            .then(jsonData => processData(jsonData));
            
            function processData(masteryData){
                console.log('data - ',masteryData);
                var div = document.createElement('div');
                div.innerHTML = '<p>'+masteryData[4].championId+'</p>';
                body.appendChild(div);
                // getChampName(masteryData[4].championId);
                getJsonChampionInfo('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/champion.json');

                function getJsonChampionInfo(url){
                    fetch(url)
                    .then(response => response.json())
                    .then(jsonData => processData(jsonData));

                    function processData(championData){
                        console.log('data - ',championData);

                        for (var i in championData) {
                            if (championData[i].key == masteryData[4].championId){
                                console.log(championData[i].id);
                            }
                        }
                    }
                }
            }
        }

    }
}