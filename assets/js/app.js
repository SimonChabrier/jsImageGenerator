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
        // check if we are currently on smartphone
        if(app.windowMobileCheck() === true){

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

                    // actions to do on Accelerometer reading
                    let imgList = document.querySelectorAll('img');    
                    for (let i = 0; i < imgList.length; i++) { 
                        // set Y axe inclinaison min value we need to start this
                        if (acl.y > 7) {                        
                            imgList[i].style.filter = "grayscale(100%)"; 
                            imgList[i].style.borderRadius = 100 + '%'; 
                            imgList[i].style.width = "50%"; 
                            imgList[i].style.transition = "2s"; 
                            app.displayMessage();
                        }      
                        
                        else {
                            imgList[i].style.filter = ''; 
                            app.hideMessage();
                        }
                    } 
                });

                acl.start(); // start Accelerometer
            });
        }
    },

    //Add a message if the screen is tilted enough
    displayMessage:function() {
        let target = document.getElementById('info'); 
        target.classList.add('visible');
        target.classList.remove('hidden');
    },

    //Hide the message if the screen is not tilted enough
    hideMessage:function() {
        let target = document.getElementById('info'); 
        target.classList.add('hidden');
        target.classList.remove('visible');
    },

    // For exemple, here an otherway to check if user currently use a SmartPhone
    windowMobileCheck :function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        //console.log(check)
        return check;
    },

}

document.addEventListener("DOMContentLoaded", app.init);

