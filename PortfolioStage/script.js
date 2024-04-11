document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById('overlay');
    const fullScreenImage = document.getElementById('fullScreenImage');
    const switchBtn = document.querySelector('.switch .btn');
    const textContainer = document.querySelector('.container');
    const projectBtn = document.querySelector('.btn-projecten');
    const aboutBtn = document.querySelector('.btn-overmij');
    
    let audio = document.querySelector('#audio');
    let audio2 = document.querySelector('#audio2');
    let imageIndex = 0;
    let textVisible = true;

    switchBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        overlay.style.display = 'block';

        switchBtn.classList.toggle('on'); 
        
        textVisible = !textVisible;
        if (textVisible) {
            textContainer.style.display = 'block';
            audio2.play();
            setTimeout(function() {
                audio2.pause();
                audio2.currentTime = 0;
            }, 2900);
            projectBtn.style.display = 'none';
            aboutBtn.style.display = 'none';
        } else {
            textContainer.style.display = 'none';
            audio2.pause();
            audio2.currentTime = 0;
            projectBtn.style.display = 'block';
            aboutBtn.style.display = 'block';
        }
        
        if (imageIndex === 0) {
            fullScreenImage.src = 'ondervragingskamer1.png';
            imageIndex = 1;
            audio.play();
        } else {
            fullScreenImage.src = 'onderzoekskamerzonderlicht.png';
            imageIndex = 0;
            audio.play();
        }
    });

    overlay.addEventListener('click', function() {
        overlay.style.display = 'block';
    });
});