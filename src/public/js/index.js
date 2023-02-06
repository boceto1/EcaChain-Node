

function seemoreTransaction (transactionId) {
  fetch(`/api/data/transactions/${transactionId}`)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
}
