let editProfileButton = document.querySelector('.profile__name-edit');
let closeProfileButton = document.querySelector('.popup__close')
const profilePopup = document.querySelector('.profile__popup');

editProfileButton.addEventListener('click', function() {
    profilePopup.classList.remove('profile__popup')
});

closeProfileButton.addEventListener('click', function(){
    profilePopup.classList.add('profile__popup')
});