document.getElementById('emailbtn').addEventListener('click', function () {
  navigator.clipboard
    .writeText('info@chesscoordinates.com')
    .then(() => {
      document.getElementById('toast').innerHTML = 'copied!</br>info@chesscoordinates.com';
      document.getElementById('toast').classList.remove('toast-hidden');
      setTimeout(() => document.getElementById('toast').classList.add('toast-hidden'), 3000);
    })
    .catch(() => {
      document.getElementById('toast').innerHTML = 'failed to copy!</br>info@chesscoordinates.com';
      document.getElementById('toast').classList.remove('toast-hidden');
      setTimeout(() => document.getElementById('toast').classList.add('toast-hidden'), 3000);
    });
});
