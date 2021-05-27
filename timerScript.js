const startMinute=3;
let time = startMinute*60;


const countdown = document.getElementById('timer');

setInterval(updateCountdown,100);

function updateCountdown(){
    const minutes = Math.floor(time / 60);
    let seconds = time %60;

    if(minutes<0){
        clearInterval(updateCountdown);
    }
    else{

        if(seconds<10 && minutes>0){
            countdown.innerHTML = `${minutes}:0${seconds}`;
            console.log("Çalıştı");
        }
        else{
            countdown.innerHTML = `${minutes}:${seconds}`;
        }
    
        time--;

    }

  

}