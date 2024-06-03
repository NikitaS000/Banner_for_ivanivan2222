$(document).ready(function() {
    let isDragging = false;
    let isDelaying = false;
    const comparisonWidth = $('.comparison').width();
    const buffer = 50;
    const images = ['banner_images/beautiful.svg', 'banner_images/convinient.svg', 'banner_images/reliable.svg', 'banner_images/silent.svg', 'banner_images/warm.svg'];
    let firstIndex = 1;
    let secondIndex = 0;

    function updateTextImages() {
        $('.text-image').eq(0).attr('src', images[firstIndex]);
        $('.text-image').eq(1).attr('src', images[secondIndex]);
    }

    function updateClipPath(mouseX) {
        const textContainerOffset = mouseX - comparisonWidth;
        const textContainerWidth = $('.text-container').width();
        if (mouseX > comparisonWidth && mouseX <= comparisonWidth + textContainerWidth) {
            const textPercentage = (textContainerOffset / textContainerWidth) * 100;
            $('.text-image').eq(0).css('clip-path', 'inset(0 0 0 ' + textPercentage + '%)');
            $('.text-image').eq(1).css('clip-path', 'inset(0 ' + (100 - textPercentage) + '% 0 0)');
        }
    }

    $('.slider').on('mousedown touchstart', function(e) {
        isDragging = true;
        e.preventDefault();
    });

    $(document).on('mouseup touchend', function() {
        isDragging = false;
        isDelaying = false;
    });

    $(document).on('mousemove touchmove', function(e) {
        if (isDragging) {
            const containerOffset = $('.comparison-container').offset().left;
            let mouseX;
            if (e.type === 'touchmove') {
                mouseX = e.originalEvent.touches[0].pageX - containerOffset;
            } else {
                mouseX = e.pageX - containerOffset;
            }

            const totalWidth = comparisonWidth + $('.text-container').width();
            if (mouseX >= 0 && mouseX <= totalWidth) {
                $('.slider').css('left', mouseX + 'px');
                if (mouseX <= comparisonWidth) {
                    $('.new-window').css('clip', 'rect(0, ' + mouseX + 'px, 180px, 0)');
                } else {
                    updateClipPath(mouseX);
                }
            }

            if (mouseX >= 0 && mouseX <= totalWidth && !isDelaying) {
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
