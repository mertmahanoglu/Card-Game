
//Kart oyununun kod kaynağı https://www.youtube.com/watch?v=4BOSWPnC9Uk



$(document).ready(function() {

    function correctAudio() {
        new Audio('correct.mp3').play();
      }
    
      function incorrectAudio() {
        new Audio('incorrect.mp3').play();
      }


      var cards = ['epic', 'origin', 'steam', 'ubisoft', 'xbox']; //Kartların id'leri alınıyor
      var pairs = cards.concat(cards);//Her karttan iki tane oluşturulur
      var seciliKartlar = [];// Seçilen 1. ve 2. kart bu dizide depolanacak
      var cevrilecekKartlar = [];// Çevrilecek kartlar bu dizide olacak
      
      var gameStarted = false;
      var running = false;
      var bittiMi = false;//Süre bitti mi
      var basladiMi = false;// Süre başladı mı
      var win = false; // yendi mi
      var ciftSayisi = 0; // Kaç adet çift buldu ona göre win alınacak
      const dakika=1;//Dakika
      let time = dakika*30;//Toplam Saniye
      var puan = 0;//Puan değeri
      const countdown = document.getElementById('timer'); // Htmlden timer objesi alınıyor
      var skorMenu = document.getElementById("menuScore");// Htmlden oyun sonunda gelecek olan menü objesi alınıyor
      var skorLabel = document.getElementById('score');// Htmlden skor gösterge objesi alınıyor



      // Timer(countdown) kaynağı https://www.youtube.com/watch?v=x7WJEmxNlEs
      function updateCountdown(){

        const minutes = Math.floor(time / 60);//Dakika değeri elde ediliyor
        let saniye = time %60; // kalan saniye hesaplanıyor
    

        // Süre bitmişse timer'ı yok et ve timesUp fonksiyonu ile game over menüsü gelsin
        if(minutes<0 && bittiMi == false ){
            bittiMi = true;
            clearInterval(updateCountdown);
            timesUP();
            
       
        }
        //Kişi tüm kartları bulmuşsa timer'ı yok et
        else if (win) {
                  
            clearInterval(updateCountdown);
        }
        //Süre devam ediyorsa else'i yap
        else{
       
            //Saniye 10'dan küçükse 9 yerine 09 formatında göster
            if(saniye<10 && minutes>0){
                countdown.innerHTML = `${minutes}:0${saniye}`;
                console.log("Çalıştı");
            }
            
            else{
                   //Süre bitmişse timer'ı yok et(Saniye için ekstra kontrol)
                if(saniye<=0 && minutes<=0){
                    clearInterval(updateCountdown);
                }
                     //Süre bitmemişse countdown objesinin yazısını timer
                else{
                    countdown.innerHTML = `${minutes}:${saniye}`;
                }
           
            }
             //Süreyi azalt
            time--;
    
        }
    
      
    
    }

      /*openNav ve timesUP https://www.w3schools.com/howto/howto_js_fullscreen_overlay.asp*/
    function openNav() {
        new Audio('win.mp3').play();//Win sesi çal
        skorMenu.innerHTML = "TEBRİKLER! SKORUNUZ : " + puan;//Menüde skoru güncelle
    
        document.getElementById("myNav").style.height = "100%";//Menüyü görünür yap
        console.log("Çalıştı");
      }



      
    function timesUP() {
        new Audio('timesup.mp3').play();//Süre bitti sesi çal
        document.getElementById("timesUP").style.height = "100%";//Menüyü görünür yap
       
      }
   
      
      karistir(pairs);//Kartları karıştır
      
      $('.arka').each(function(i, element) {
          $(this).attr('id', pairs[i]);//Her kart'a id atanıyor çünkü css ile dönme vs hareketlerinin dinamik olması lazım
      });
      
     //Karta tıklandığında çalış
      $('.card').click(function(){
          
        //Süre bitmiş mi kontrol
          if (!bittiMi) {
          
            //Oyun başlamamışsa ve süre başlamamışsa  kartları göster
              if (!gameStarted && !running){
                  
                //Süre başladı  kartları göster
                  running = true;
                  
                  //Kartları döngüye alarak css'in her karta uygulanmasını sağlıyoruz
                  $('.card').each(function() {
                      $(this).toggleClass('flip');//CSS'te bulunan kısmı uygular
                  });
                  

                  //Kartları başlamadan 2 saniye göster ve çevir
                  setTimeout(function() {
                      
                      $('.card').each(function() {
                          $(this).toggleClass('flip');
                      });

                       //Oyun başladı  kartları göster
                      gameStarted = true;
                               //Timer başladı 1sn aralıkla 
                      setInterval(updateCountdown,1000);
                  //Timer başladı
                      basladiMi = true;
                        //Kart görme işlemi bitti
                      running = false;

                  }, 2000);
              }
      
            
              //Eğer kart zaten tıklanmışsa return at
              else if ($(this).hasClass('flip')) {
                          
                  return;
                  
              }

          //Seçilen kartların 2si de seçilmemişse if'e gir
              else if (seciliKartlar[0] == null && seciliKartlar[1] == null && !$(this).hasClass('flip') && !running) {
                  
                      //Süre başlamamışsa başlat
                  if (!basladiMi) {
                         updateCountdown();
                  }
                  
                  running = true;
                  
                  seciliKartlar[0] = $(this).find('.arka').attr('id');//Hiçbir kart seçilmemişse seçilen ilk kartı bu diziye  at
                  $(this).toggleClass('flip');//CSS ile çevir
                  
                  running = false;
                  
              }
          
                //1 kart seçilmiş diğeri seçilmemişse if'e gir
              else if (seciliKartlar[0] != null && seciliKartlar[1] == null && !$(this).hasClass('flip') && !running) {
                  
                  running = true;
                  
                  seciliKartlar[1] = $(this).find('.arka').attr('id');//Bir kart seçilmemişse ve ikinci kart seçilmemişse seçilen ikinci kartı bu diziye at
                  $(this).toggleClass('flip');//CSS ile çevir
          
                  //Seçilen kartlar aynıysa doğru bilmiştir
                  if (seciliKartlar[0] == seciliKartlar[1]) {

                     //Doğru sesi
                      correctAudio();
                         //Puanı arttır
                      puan+=100;
                       //Skor yazısını güncelle
                      skorLabel.innerHTML = "Skor : " + puan;
                           //Seçilen kartları al
                    var allCard = document.querySelectorAll('*[id*=' + seciliKartlar[0] + ']')
 
                    //Seçilen kartlar solarak kaybolsun
                    jQuery(allCard).fadeOut(1000);
                    jQuery(allCard[2]).fadeOut(1000);
                      
                        //Tekrar null'a çevir çünkü kartlar kayboldu
                      seciliKartlar[0] = null;
                      seciliKartlar[1] = null;

                        
                        //Bilgilendirme label'ını güncelle ve göster
                      var label = document.getElementById('ciftLabel');
                      label.innerHTML = "Bir Çift Buldunuz!";
                      label.style.display="block";


                      //Çift sayısını arttır
                      ciftSayisi++;
                      
                          //Çift sayısı kartların sayısına eşitse yenmiştir.
                      if (ciftSayisi == cards.length) {
                          win = true;
                          //menüyü getir
                          openNav();
                      }
                      
                      running = false;
                      
                  }

                 
                //Kartlar eşleşmezse seçilen kartları null yap ve tekrar kapat
                  else {
                      
                         //Seçilen kartlar geçici olarak depolanır
                      cevrilecekKartlar[0] = seciliKartlar[0];
                      cevrilecekKartlar[1] = seciliKartlar[1];
                      //Yanlış sesi
                      incorrectAudio();
                      seciliKartlar[0] = null;
                      seciliKartlar[1] = null;
                      
       //Bilgilendirme label'ını güncelle ve göster
                      var label = document.getElementById('ciftLabel');
                      label.innerHTML = "Bir Çift Değil!";
                      label.style.display="block";


                      //Yanlış kartları geri çevir
                      setTimeout(function(){
          
                        //DOM ağacındaki eşleşen ilk öğeleri al(closest) ve geri çevir
                          $('*[id*=' + cevrilecekKartlar[0] + ']').each(function() {
                              $(this).closest('.flip').toggleClass('flip');
                          });
                          $('*[id*=' + cevrilecekKartlar[1] + ']').each(function() {
                              $(this).closest('.flip').toggleClass('flip');
                          });
                          
                          running = false;
                          
                      }, 800);//0.8 sn
                  }
                  
              }
                  
          } 
          
      });
      
      //Kartları karıştırma fonksiyonu
      function karistir(array) {

        //i= kart sayısı kadar. Büyük 0 olduğu sürece azalt ve elemanlara random elemanları(j) ata
          for (var i = array.length - 1; i > 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var gecici = array[i];
              array[i] = array[j];
              array[j] = gecici;
          }
          return array;
      }
      
  
  });