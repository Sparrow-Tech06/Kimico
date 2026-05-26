/* Haptic Feedback */
document.querySelectorAll('.haptic').forEach(item => {

    item.addEventListener('click', () => {

        if (navigator.vibrate) {
            navigator.vibrate(80);
        }

    });

});
