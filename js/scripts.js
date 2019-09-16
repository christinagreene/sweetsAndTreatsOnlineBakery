var carousel = document.querySelector('.photoGallery');
var flkty = new Flickity( carousel, {
   cellAlign: 'center',
   contain: true,
   wrapAround: true,
   prevNextButtons: false,
   pageDots: false,
   autoPlay: true,
   accessibility: true
});