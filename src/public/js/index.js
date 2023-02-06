

function seemoreTransaction (transactionId) {
  fetch('/api/data/transactions')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
}
