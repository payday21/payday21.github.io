
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Assignment 5 
//         Author : Michael Abraham
//         Description: To simulate 3-ina-row puzzel by writeing it in JavaScript
//
//
//         What is expected of me from this assignment:
//         1. REQ-001	RETRIEVAL OF THE JSON STARTING DATA FOR THE PUZZLE (6 PTS.)
//         2. REQ-002	DRAWING AND DISPLAYING OF 3-IN-A-ROW TABLE WITH JAVASCRIPT ONLY (6 PTS.)
//         3. REQ-003	CHANGING OF SQUARE COLORS WITH MOUSE CLICKS (6 PTS.)
//         4. 3-IN-A-ROW PUZZLE STATUS CHECKING  (6 PTS.)
//         5. REQ-005	ERROR DISPLAY CHECKBOX (6 PTS.)
//         6. REQ-006	ADDING AN INNOVATIVE FEATURE (7 PTS.)
//         7. REQ-007	UNOBTRUSIVE JAVASCRIPT. (3 PTS.)
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


(function () {
   
fetch("https://www.mikecaines.com/3inarow/puzzle.php")   
        .then(function(response){
            return response.json();
        })
        .then(function(json)
        {
        var myDiv= document.getElementById("theGame");
        var y = document.querySelector("td .gray")
        var myNode = document.getElementsByTagName("td")
         var myPuzzle = document.getElementById("Puzzelcheck")   

           

        // console.log(json)  
        var myTable = "<table>";
          
            for (var i =0; i < json.rows.length; i++)//row
            {
                //code to generate rows
                myTable+=`<tr "${[i]}">`
                for(var j =0; j < json.rows[i].length; j++)//columns
                {
                    //code to generate columns
                    if(json.rows[i][j].currentState==1)
                    {
                        myTable+=`<td class="yellow" id =${[i]}-${[j]}></td>`;
                    }
                        
                   
                    if(json.rows[i][j].currentState==2)
                    {
                        myTable+=`<td class="green" id =${[i]}-${[j]}></td>`;
                    }
                    
                    
                    if(json.rows[i][j].currentState==0)
                    {
                        myTable+=`<td class="red" id =${[i]}-${[j]}></td>`;
                    }
                }                            
                myTable+=`</tr>`
            }
          
            
                myTable+="</table>"; 
            //installing a check box and button for eventlistener. 
                myTable+= 
                `<input type="checkbox" id="myCheck">Show incorrect squares</input>`
                myTable+=
                `<button class="btn default" id=mydefault>Check</button>`
            //add a div id to receive the id from the condition that will write in the dom
                myTable+=`<input type="reset" id = startover></input>`
                myTable+=
                `<div id="Puzzelcheck"></div>   `
            
          
          myDiv.innerHTML= myTable;
      
// create variables to hold the different id that will work for the click eveent
          var puBox = document.getElementById("mydefault")
          let chbox = document.getElementById("myCheck");
          
      
          
            puBox.addEventListener("click", myCheckEvent)
           
             
                
    // This function will determin the status of the game 
                function myCheckEvent()
                {
                    
                    var stValue=0;
                    var erValue=0;

          // this nested for loop will loop through the json.rows date to determing the state of the different tds           
                    for (var i =0; i < json.rows.length; i++){
                        for(var j =0; j < json.rows[i].length; j++)
                      
                        {                                                     
                                if(json.rows[i][j].currentState === 0)
                                {
                                  //count cells in initial
                                  stValue++
                                }
                                else if(json.rows[i][j].currentState !== json.rows[i][j].correctState)
                                {
                                    //count cells with error
                                    erValue++
                                }
                        }                      

                    }

                    

// This if condition will display a text base on the current and correct state of the different tds!
                    if(erValue > 0)
                    {
                        document.getElementById("Puzzelcheck").innerHTML="error"
                    }
                    else if(stValue > 0)
                    {
                     document.getElementById("Puzzelcheck").innerHTML= "Almost there"
                    }
                    else
                    {
                    document.getElementById("Puzzelcheck").innerHTML= "You did it"
                    }
                        
                         

                }
           

 // This  addEventListener will call the function myclickevent to run the it code to display the present condition    
        chbox.addEventListener("change",myclickevent) 
            

      //         
                function myclickevent(){
                    for (var i =0; i < json.rows.length; i++)//row
                    {                        
                    
                        for(var j =0; j < json.rows[i].length; j++)//columns
                        {
//split the row and column to access the the different cells
                            let cell = document.getElementById(`${i}-${j}`);
                            cell.innerHTML = " "
// create the a if condition to that will dispaly an x in every cell once the function 
                            if(chbox.checked){
//loop through the json data and check that the current value matches the correct value...if not add 'x' to that square...
                                if ((json.rows[i][j].currentState !== 0 ) && (json.rows[i][j].currentState !== json.rows[i][j].correctState))
                                {
                                cell.innerHTML= "X" 

                                }
                                else{
                                    
                                    cell.innerHTML = " "
                                }
                                    
                            }
            
                        }
                    }
                    

                 
        }

// looping throught to change the state when the cells are toggle

        for( var i=0; i<myNode.length;i++)
        {
            myNode[i].addEventListener("click", function(){
                        
               console.log(json.rows)

                let cellRow = event.target.id.split("-")[0];
                let cellCol = event.target.id.split("-")[1]; 
               
                
               
                
                
// creating a condition that will change the the color of the tds when the cell is toggle         
                 if(json.rows[cellRow][cellCol].canToggle)
                    {
                            if(json.rows[cellRow][cellCol].currentState === 0){
                                json.rows[cellRow][cellCol].currentState = 1;
                                
                                this.className = "yellow";
                        }   else if (json.rows[cellRow][cellCol].currentState === 1){
                                json.rows[cellRow][cellCol].currentState = 2;
                                this.className ="green"

                        }   else {
                                json.rows[cellRow][cellCol].currentState = 0;
                                this.className = "red";
                        }
                    }

                    myclickevent();
                    

                    
                    

                    

                
        }, false);
        }

        let redo = document.getElementById("startover") 
        
        redo.addEventListener("click", redoMe)
        
        function redoMe()
        {
            for ( var i = 0; i<json.rows.length; i++)
             {
                location.reload()
            }

        }
            
           

        
               
                
        
    });
        
    })();