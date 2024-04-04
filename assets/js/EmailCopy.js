document.getElementById('emailbtn').addEventListener('click', function () {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText('info@chesscoordinates.com')
      .then(() => {
        document.getElementById('toast').innerHTML = 'copied!</br>info@chesscoordinates.com';
        document.getElementById('toast').classList.remove('toast-hidden');
        setTimeout(() => document.getElementById('toast').classList.add('toast-hidden'), 4000);
      })
      .catch(() => {
        document.getElementById('toast').innerHTML = 'contact me at</br>info@chesscoordinates.com';
        document.getElementById('toast').classList.remove('toast-hidden');
        setTimeout(() => document.getElementById('toast').classList.add('toast-hidden'), 4000);
      });
  } else {
    document.getElementById('toast').innerHTML = 'contact me at</br>info@chesscoordinates.com';
    document.getElementById('toast').classList.remove('toast-hidden');
    setTimeout(() => document.getElementById('toast').classList.add('toast-hidden'), 4000);
  }
});
