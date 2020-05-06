
(function(){


   
    fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=all", {
        method: "GET",
        headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "X-RapidAPI-Key": "9cff85b28dmsh47cfe0092aa717bp172b48jsn19e7c7d03be8"
        }
    })
            
        .then(function(response){
            return response.json();
        })
        .then(function(json)
        {
            let top_Album = (json.data)
             console.log(top_Album)
            // console.log(json)

            top_Album.sort(function(a, b) {
                var keyA = a.rank,
                keyB = b.rank;
                // Compare the 2 ranks
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
//this function is creating all the element and storing in the display id 
            function display(id)
            {
                let newDisplay = document.getElementById("Display")
                newDisplay.style.display="block"
                let eachDisplay = `<h2>Title: ${top_Album[id].title}</h2>
                                    <p>Album: ${top_Album[id].album.title}</p>
                                    <p>Artist: ${top_Album[id].artist.name}</p>
                                    <p>Duration: ${top_Album[id].duration}</p>
                                    <img src="${top_Album[id].album.cover_big}">
                                
                                    <div class="audiojs" classname="audiojs" id="audiojs_wrapper0"><audio 
                                    src="${top_Album[id].preview}" preload="auto"></audio>          
                                    <div class="play-pause">             
                                    <p class="play"></p>             
                                    <p class="pause"></p>             
                                    <p class="loading"></p>             
                                    <p class="error"></p>
                                    </div>           
                                    <div class="scrubber">             
                                    <div class="progress" style="width: 0px;"></div>             
                                    <div class="loaded" style="width: 280px;"></div>           
                                    </div>           
                                    <div class="time">             
                                    <em class="played">00:00</em>/<strong class="duration"></strong>           
                                    </div>          
                                     <div class="error-message"></div></div>
                                    <button id="CloseInfo" class="w3-button w3-black">Close</button>
                                    </div>`
                                    
                                    

                
                
            newDisplay.innerHTML=eachDisplay
            document.getElementById("CloseInfo").onclick= function()
            {
                newDisplay.style.display="none"
                
                
            } 
            //here is where all the audio are created that will play when the user click the play button to listen to the preview
            audiojs.events.ready(function(){
                var as = audiojs.createAll()
            });
            
    
            
          
             }
            // looping through top-Album creating on ID and a numbering system and tiles to all the songs that are loaded onto the page
            
            let list = "";
    
            for (let i = 0; i < top_Album.length; i++) {
                let title = top_Album[i].title;
                list += `<div id=${i}>  ${(i+1)}. ${title}</div>`;
            }
    // adding the entire list i created into the innerHTML Demo id
            document.getElementById("Demo").innerHTML = list;
        
//looping throught with an onclick event to diplay the song and statics aboout the song  click on
            for (let i = 0; i < top_Album.length; i++) {

            document.getElementById(i).onclick= function()
            {
                display(i)
            };
            

            
           
            

            }
            //this function will create a name search for artist by name 
            function artistSearch()
            {
               let nameSearch = document.getElementById("artistSearch").value
               let searchResult = addParticipant(top_Album, nameSearch)
               let timeplay = totalDuration(searchResult);
               let finalSearch = document.getElementById("Display")
               finalSearch.style.display="block"
               finalSearch.innerHTML=" "
               let elementVariable = ""
               elementVariable += `<h2>Artist: ${searchResult[0].artist.name}</h2>
                   <img src="${searchResult[0].artist.picture_big}">
                   <p>${Math.round(timeplay/60)} minutes of songs</p>
                   <div class="w4-container">
                    <button id="CloseInfo" class="w4-button w4-black">Close</button>
                    </div>`
                    
                   console.log(timeplay)
            




                
                finalSearch.innerHTML=elementVariable
                //this will close the 
                document.getElementById("CloseInfo").onclick= function()
                {
                    finalSearch.style.display="none"
                    
                } 
                audiojs.events.ready(function(){
                    var as = audiojs.createAll()
                });
            
            }
            
            document.getElementById("artistPick").onclick= function()
            {
                artistSearch()
                
            }
             

           
            
            let totalArtist = top_Album.map(activity => activity.artist)
            console.log(totalArtist)
            function addParticipant(totalArtist,x)
            {
               return totalArtist.filter(participant => participant.artist.name.toLowerCase() == x.toLowerCase())
                
            }
           // console.log(addParticipant(top_Album, "Frank Sinatra"))
            //console.log(addParticipant(top_Album, "James Malley"))
            //this function  will total up the duration of the artist that is selected
            function totalDuration(inData)
            {
                
                return inData.reduce(function(accumulator,currentValue){return accumulator + currentValue.duration},0);		
            }
           
            console.log(totalDuration(addParticipant(top_Album, "James Malley")));
   
           
            
         
        })
        
    })()
    