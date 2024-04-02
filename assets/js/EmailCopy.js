const toast = document.getElementById('toast');
document.getElementById('emailbtn').addEventListener('click', function () {
  console.log('hi');
  const textToCopy = 'info@chesscoordinates.com';
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      toast.innerHTML = 'copied!</br>info@chesscoordinates.com';
      toast.classList.remove('toast-hidden');
      setTimeout(() => toast.classList.add('toast-hidden'), 3000);
    })
    .catch((err) => {
      toast.innerHTML = 'failed to copy!</br>info@chesscoordinates.com';
      toast.classList.remove('toast-hidden');
      setTimeout(() => toast.classList.add('toast-hidden'), 300);
    });
});
