$(document).ready(function() {
    let isDragging = false;
    const comparisonWidth = 370;
    const totalWidth = comparisonWidth + 1086;

    $('.slider').mousedown(function() {
        isDragging = true;
    });

    $(document).mouseup(function() {
        isDragging = false;
    });

    $(document).mousemove(function(e) {
        if (isDragging) {
            const containerOffset = $('.comparison-container').offset().left;
            const mouseX = e.pageX - containerOffset;
            if (mouseX >= 0 && mouseX <= totalWidth) {
                $('.slider').css('left', mouseX + 'px');
                if (mouseX > comparisonWidth) {
                    const textContainerOffset = mouseX - comparisonWidth;
                    const textPercentage = (textContainerOffset / 1086) * 100;
                    $('.text-image').eq(0).css('clip-path', 'inset(0 0 0 ' + textContainerOffset + 'px)');
                    $('.text-image').eq(1).css('clip-path', 'inset(0 ' + (1086 - textContainerOffset) + 'px 0 0)');
                }
            }
        }
    });
});


$(document).ready(function() {
    let isDragging = false;
    const comparisonWidth = 370;
    const totalWidth = comparisonWidth + 1086;

    $('.slider').mousedown(function() {
        isDragging = true;
    });

    $(document).mouseup(function() {
        isDragging = false;
    });

    $(document).mousemove(function(e) {
        if (isDragging) {
            const containerOffset = $('.comparison-container').offset().left;
            const mouseX = e.pageX - containerOffset;
            if (mouseX >= 0 && mouseX <= totalWidth) {
                $('.slider').css('left', mouseX + 'px');
                if (mouseX <= comparisonWidth) {
                    $('.new-window').css('clip', 'rect(0, ' + mouseX + 'px, 180px, 0)');
                }
            }
        }
    });
});
// 


$(document).ready(function() {
    let isDragging = false;
    let isDelaying = false;
    const comparisonWidth = 370;
    const totalWidth = comparisonWidth + 1086;
    const buffer = 50; 
    const images = ['banner_images/beautiful.png', 'banner_images/convinient.png', 'banner_images/reliable.png', 'banner_images/silent.png', 'banner_images/warm.png'];
    let firstIndex = 1; 
    let secondIndex = 0;


    function updateTextImages() {
        $('.text-image').eq(0).attr('src', images[firstIndex]);
        $('.text-image').eq(1).attr('src', images[secondIndex]);
    }

    $('.slider').mousedown(function() {
        isDragging = true;
    });

    $(document).mouseup(function() {
        isDragging = false;
        isDelaying = false; 
    });

    $(document).mousemove(function(e) {
        if (isDragging && !isDelaying) {
            const containerOffset = $('.comparison-container').offset().left;
            const mouseX = e.pageX - containerOffset;
            if (mouseX >= 0 && mouseX <= totalWidth) {
                $('.slider').css('left', mouseX + 'px');
                if (mouseX > totalWidth - buffer) { 
                    firstIndex = (firstIndex + 1) % images.length; 
                    updateTextImages();
                    isDelaying = true; 
                    setTimeout(function() {
                        isDelaying = false; 
                    }, 300);
                } else if (mouseX < buffer) { 
                    secondIndex = (secondIndex + 1) % images.length; 
                    updateTextImages();
                    isDelaying = true; 
                    setTimeout(function() {
                        isDelaying = false; 
                    }, 300);
                }
            }
        }
    });
});
