document.querySelectorAll('.haptic').forEach(item => {

item.addEventListener('click', () => {
    navigator.vibrate?.(80);
});

});
