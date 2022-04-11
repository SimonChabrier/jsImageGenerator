const app = {

    init: function ()
    { 
        console.log('appinit');
        app.appendImage();
    },

    //number generator
    randomNumber: function () 
    {
        return Math.floor(Math.random() * 100);
    },

    //get client screen resolution
    checkScreenResolution :function(){
        let screenWidth = window.screen.width * window.devicePixelRatio ;
        return screenWidth;
    },

    //pic size adaptation
    requestPictureSize : function (){
        
        // request image size in terms of user current window size.
        let imgHeight = Math.round((( window.innerHeight)));

        // set a query proportionate image height in % of curent user screen resolution
        if (app.checkScreenResolution() >= 1920){
            imgHeight = Math.round(imgHeight * 55 / 100);
            console.log('screen up than 1920px : request img size = ' + imgHeight)
        }

        if (app.checkScreenResolution() < 1919){
            imgHeight = Math.round(imgHeight * 30 / 100);
            console.log('screen less than 1920px : request img size =  ' + imgHeight)
        }

        return imgHeight
    },

    //pic generator 
    imageGenerateur: function () 
    {   
        //init new empty image tag
        let img = document.createElement('img');
        //insert link in this new empty image tag
        img.src = 'https://picsum.photos/' + app.requestPictureSize() + '/?random=' + app.randomNumber();

        //set start picture styles diplay state
        img.style.opacity = '0'
        img.style.width = '0'; 
        img.style.borderRadius = '100%'; 
        img.style.transition = '5s';
        
        //set end picture styles diplay state
        setInterval(function(){   
        img.style.width = '';   
        img.style.opacity = '1';  
        img.style.borderRadius = ''; 
        if (app.checkScreenResolution() >= 1920){
        img.style.width = 10 + '%'; 
        }

        if (app.checkScreenResolution() <= 1919){
            img.style.width = 30 + '%'; 
            }
        
        }, 1000)

        // return each new img element and style properties
        return img; 

    },

    //append img generator 
    appendImage: function () 
    {       

            let windowHeight = window.innerHeight; //get user window current height

            let Interval = setInterval(function(){ // I set a time interval between each action

            let imageInsert = document.getElementById('insert'); 
            let divSize = imageInsert.offsetHeight

            if(divSize < windowHeight) { 

                let img = app.imageGenerateur(); // call my image generator function to grab each new generated picture
                imageInsert.append(img); // Happend each new generated picture
                
                app.OnMouseOver(); // call my custom style function
  
            } else (
                
                clearInterval(Interval)
            )
           
        }, 380) //timming between insert actions in ms
                                                                                                                            
    },     

    //style generator on currentTarget                                                                                                                                                                                                                      
    OnMouseOver: function ()
    {
        let imgList = document.querySelectorAll('img');                        
        for (let i = 0; i < imgList.length; i++) {   

            imgList[i].addEventListener("mouseover", function(event) {                                                            
            if (app.checkScreenResolution() >= 1920){
            event.target.style.width = 20 + '%'; 
            }
            if (app.checkScreenResolution() <= 1919){
            event.target.style.width = 50 + '%';  
            }  
            event.target.style.filter = "grayscale(100%)";     
            event.target.style.borderRadius = 100 + '%';
            event.target.style.transition = "1.2s"; 
            })

            imgList[i].addEventListener("mouseout", function(event) {                                                        
                event.target.style.filter = "grayscale(30%)"; 
                event.target.style.borderRadius = ""; 
                event.target.style.transition = "8s";                                                                                                                                                            
            })
        }   
    },

}

document.addEventListener("DOMContentLoaded", app.init);

