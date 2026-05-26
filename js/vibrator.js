document.querySelectorAll('.back-btn, .haptic').forEach(item => {

item.addEventListener('click', () => {
    navigator.vibrate?.(60);
});

});
