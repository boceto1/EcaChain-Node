const TRANSACTION_ID_SELECTOR = '.details-box-id > p';
const TRANSACTION_INFORMATION_SELECTOR = '.details-box-information > textarea';

function seemoreTransaction (transactionId) {
  fetch(`/api/data/transactions/${transactionId}`)
    .then((response) => response.json())
    .then((data) => fillTransactionInformation(transactionId, data))
    .catch((error) => {
      console.error('Error:', error);
    });
}

function clearFields () {
  [TRANSACTION_ID_SELECTOR, TRANSACTION_INFORMATION_SELECTOR]
    .forEach(selector => {
      const element = document.querySelector(selector);
      element.textContent = '';
    })
};

function fillTransactionInformation (transactionId, transactionData) {
  const idElement = document.querySelector(TRANSACTION_ID_SELECTOR);
  const transactionElement = document.querySelector(TRANSACTION_INFORMATION_SELECTOR);

  clearFields();

  idElement.textContent = transactionId;
  transactionElement.textContent = JSON.stringify(transactionData);
}


function mineTransaction (transactionId) {
  fetch(`api/data/transactions/${transactionId}`, {
    method: 'POST',
  }).then(() => location.reload())
  .catch(error => console.error('Error:', error));
}
