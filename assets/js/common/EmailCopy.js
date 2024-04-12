const emailCopyJsEmailButton = document.querySelector('.emailbtn');
const emailCopyJsToast = document.getElementById('toast');
if (emailCopyJsEmailButton) {
  emailCopyJsEmailButton.addEventListener('click', function () {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText('info@chesscoordinates.com')
        .then(() => {
          emailCopyJsToast.innerHTML = 'copied!</br>info@chesscoordinates.com';
          emailCopyJsToast.classList.remove('toast-hidden');
          setTimeout(() => emailCopyJsToast.classList.add('toast-hidden'), 4000);
        })
        .catch(() => {
          emailCopyJsToast.innerHTML = 'contact me at</br>info@chesscoordinates.com';
          emailCopyJsToast.classList.remove('toast-hidden');
          setTimeout(() => emailCopyJsToast.classList.add('toast-hidden'), 4000);
        });
    } else {
      emailCopyJsToast.innerHTML = 'contact me at</br>info@chesscoordinates.com';
      emailCopyJsToast.classList.remove('toast-hidden');
      setTimeout(() => emailCopyJsToast.classList.add('toast-hidden'), 4000);
    }
  });
}
