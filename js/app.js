const app = {

    init: function () { 
        console.log('appinit');
        app.appendImage();
    },

    // listen window rezise action
    listenIfWindowIsResized: function (){
    window.addEventListener('resize', app.handledDisplayWindowSize)
    },

    // dynamically get curent window size
    handledDisplayWindowSize : function() {
        let currentHeight = window.innerHeight;
        return currentHeight;
    },
        

    //get client screen resolution
    checkScreenResolution :function() {
        let screenWidth = window.screen.width * window.devicePixelRatio ;
        return screenWidth;
    },

    //just for fun ! optimize requested pics size on sreen resolution
    requestPictureSize : function () {
        
        // request image size in terms of user current window size.
        let imgHeight = Math.round((( window.innerHeight)));

        // set a query proportionate image height in % of curent user screen resolution
        if (app.checkScreenResolution() >= 1920){
            imgHeight = Math.round(imgHeight * 55 / 100);
            //console.log('screen up than 1920px : request img size = ' + imgHeight)
        }

        if (app.checkScreenResolution() < 1919){
            imgHeight = Math.round(imgHeight * 30 / 100);
            //console.log('screen less than 1920px : request img size =  ' + imgHeight)
        }

        return imgHeight
    },

    //number generator for randomize requested pics in LoremPicsum
    generateRandomNumber: function () {
        return Math.floor(Math.random() * 100);
    },

    //pics generator 
    pictureGenerator: function () {   
        //init new empty image tag
        let img = document.createElement('img');
        //insert link in this new empty image tag
        img.src = 'https://picsum.photos/' + app.requestPictureSize() + '/?random=' + app.generateRandomNumber();

        app.setStyleOnPictureGeneration(img);
        // return each new img element and style properties
        return img; 

    },

    //set picts style on pict generate start and end state
    setStyleOnPictureGeneration : function (img) {

        //start display state state
        img.style.opacity = '0'
        img.style.width = '0'; 
        img.style.borderRadius = '100%'; 
        img.style.transition = '5s';
        
        //final pict display state
        setInterval(function() {   
        img.style.width = '';   
        img.style.opacity = '1';  
        img.style.borderRadius = ''; 

        if (app.checkScreenResolution() >= 1920){
        img.style.width = 10 + '%'; 
        }

        if (app.checkScreenResolution() <= 1919){
            img.style.width = 33.33 + '%'; 
        }

        }, 1000)
    },

    //append generated picts
    appendImage: function () {   
        // listent if user resize the window
        app.listenIfWindowIsResized();
        
        
        let Interval = setInterval(function(){ // Set a time interval between each action
        
        app.OnMouseOverAction(); // call my custom style function
        app.sensor(); // call Accelerometer function

        let imageInsert = document.getElementById('insert'); 
        let divSize = imageInsert.offsetHeight;

        if (divSize < app.handledDisplayWindowSize()) { 
            let img = app.pictureGenerator(); // call my image generator function to grab each new generated picture
            imageInsert.append(img); // Happend each new generated picture   
        } 
          
        }, 250) //timming between insert actions in ms

        if (app.handledDisplayWindowSize() > app.handledDisplayWindowSize()) (
           
            clearInterval(Interval)

        )
                                                                                                                            
    },     

    //style actions on currentTarget                                                                                                                                                                                                                      
    OnMouseOverAction: function () {
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
        });

        imgList[i].addEventListener("mouseout", function(event) {                                                        
            event.target.style.filter = "grayscale(30%)"; 
            event.target.style.borderRadius = "";                                                                                                                                                             
        });

        }   
    },

    //Change styles on SmartPhone X mouvements
    sensor:function() {
        navigator.permissions.query({ name: 'accelerometer' }).then(result => {
            if (result.state === 'denied') {
                alert('Permission to use accelerometer sensor is denied.');
                return;
            }
            // frequency is in Hz value: 60 -> 60 times a second
            let acl = new Accelerometer({frequency: 10});

            acl.addEventListener('activate', () => console.log('Accelerometer is reading.'));
            acl.addEventListener('error', error => console.log(`Error: ${error.name}`));
            acl.addEventListener('reading', () => {

                let element = document.createElement('div');
                let message = document.createTextNode('Vous inclinez suffisament l\'écran')
                element.appendChild(message);

                let target = document.getElementById('insert');
                document.body.insertBefore(element, target);


                // actions to do on Accelerometer reading
                let imgList = document.querySelectorAll('img');    
                for (let i = 0; i < imgList.length; i++) { 
                    // set Y axe inclinaison min value we need to start this
                    if (acl.y > 7) {                         
                        imgList[i].style.filter = "grayscale(100%)"; 
                        imgList[i].style.borderRadius = 100 + '%'; 
                        imgList[i].style.width = "50%"; 
                        imgList[i].style.transition = "2s"; 
                    }      
                    
                    else {
                        imgList[i].style.filter = ''; 
                    }
                } 
            });

            acl.start(); // start Accelerometer
        });
    },

}

document.addEventListener("DOMContentLoaded", app.init);

