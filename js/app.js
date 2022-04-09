const app = {

    init: function ()
    { 
        console.log('appinit');
        app.appendImage()
    },

    //number generator
    randomNumber: function () 
    {
        return Math.floor(Math.random() * 100);
    },


     
    //pic generator 
    imageGenerateur: function () 
    {   
        // first I create an img element
        let img = document.createElement('img');
        // request image size in terms of user current window size.
        let imgHeight = ((15 * window.innerHeight) / 100);
        roudImgHeight = Math.round(imgHeight);
        console.log(Math.round(imgHeight))
        
        img.src = 'https://picsum.photos/' + roudImgHeight + '/?random=' + app.randomNumber()
        img.style.opacity = '0'
        img.style.width = '0'; 
        img.style.borderRadius = '100%'; 
        img.style.transition = '2.5s';

        //final picture styles diplay state
        setInterval(function(){   
        img.style.width = '';   
        img.style.opacity = '1'  
        img.style.borderRadius = ''; 
        }, 1000) //transition intervals

        // end return img each new element
        return img; 

    },

    //append img generator 
    appendImage: function () 
    {       
            //* actually we don't use counter cause we clear actions intervale using 'offsetHeight'
            //let counter = 0; // I set a counter

            let Interval = setInterval(function(){ // I set a time interval between each action
            //counter++;// increment couter on each new interval action

            app.OnMouseOver(); // call my custom style function
            let imageInsert = document.getElementById("insert"); 
            
            let img = app.imageGenerateur(); // call my image generator function to grab each new generated picture
            imageInsert.append(img); // And I happend each generated picture
               
            let divPictWrapper = document.getElementById('wrapper');
            let currentHeightPictWrapper = divPictWrapper.offsetHeight;
            let windowHeight = window.innerHeight; //hauteur de l'écran

            //if(counter === 10) { // use it if you whant to use counter and uncomment let couter ans couter++ lines

            if(currentHeightPictWrapper >= windowHeight) { 
                console.log(currentHeightPictWrapper >= windowHeight)
                clearInterval(Interval); // then I stop actions and stop add pictures
            } 
        }, 400) //timming between actions in ms
                                                                                                                            
    },     

    //style generator                                                                                                                                                                                                                          
    OnMouseOver: function ()
    {
        let imgList = document.querySelectorAll('img');                        
        for (let i = 0; i < imgList.length; i++) {   

            imgList[i].addEventListener("mouseover", function(event) {                                                            
                event.target.style.filter = "grayscale(100%)";      
            })

            imgList[i].addEventListener("mouseout", function(event) {                                                        
                event.target.style.filter = "grayscale(0%)";                                                                                                                                                                
            })
        }   
    },

}

document.addEventListener("DOMContentLoaded", app.init);

