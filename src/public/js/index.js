const TRANSACTION_ID_SELECTOR = '.details-box-id > p';
const TRANSACTION_INFORMATION_SELECTOR = '.details-box-information > textarea';

const BLOCK_ID_SELECTOR = '.details-box-id > p';
const BLOCK_ID_HASH_SELECTOR = '.details-box-hash > p';
const BLOCK_ID_PREVIOUS_HASH_SELECTOR = '.details-box-previous > p'
const BLOCK_INFORMATION_SELECTOR = '.details-box-information > textarea';

function seemoreTransaction (transactionId) {
  fetch(`/api/data/transactions/${transactionId}`)
    .then((response) => response.json())
    .then((data) => fillTransactionInformation(transactionId, data))
    .catch((error) => {
      console.error('Error:', error);
    });
}

function clearFields (fields) {
  [fields]
    .forEach(field => {
      field.textContent = '';
    })
};

function fillTransactionInformation (transactionId, transactionData) {
  const idElement = document.querySelector(TRANSACTION_ID_SELECTOR);
  const transactionElement = document.querySelector(TRANSACTION_INFORMATION_SELECTOR);

  clearFields([idElement, transactionElement]);

  idElement.textContent = transactionId;
  transactionElement.textContent = JSON.stringify(transactionData);
}

function mineTransaction (transactionId) {
  fetch(`api/data/transactions/${transactionId}`, {
    method: 'POST',
  }).then(() => location.reload())
  .catch(error => console.error('Error:', error));
}

function seemoreBlock (blockId) {
  fetch(`/api/blocks/${blockId}`)
    .then((response) => response.json())
    .then((data) => fillBlockInformation(blockId, data))
    .catch((error) => {
      console.error('Error:', error);
    });
}


function fillBlockInformation (blockId, blockData) {
  const idElement = document.querySelector(BLOCK_ID_SELECTOR);
  const hashElement = document.querySelector(BLOCK_ID_HASH_SELECTOR);
  const previousHashElement = document.querySelector(BLOCK_ID_PREVIOUS_HASH_SELECTOR);
  const blockElement = document.querySelector(BLOCK_INFORMATION_SELECTOR);

  clearFields([idElement, hashElement, previousHashElement, blockElement]);

  idElement.textContent = blockId;
  hashElement.textContent = blockData.hash;
  previousHashElement.textContent = blockData.lastHash;
  blockElement.textContent = JSON.stringify(blockData.data);
}
