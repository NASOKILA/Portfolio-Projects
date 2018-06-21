
let entryService = (() => {


    function addEntry(receiptId, type, quantity, price) {
        const endpoint = 'entries';
        let data = { receiptId, type, quantity, price };

        return remote.post('appdata', endpoint, 'kinvey', data);
    }

    function deleteEntry(entryId) {
        const endpoint = `entries/${entryId}`;

        return remote.remove('appdata', endpoint, 'kinvey');
    }

    function getEntriesReceiptById(receiptId) {
        const endpoint = `entries?query={"receiptId":"${receiptId}"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }


   
    return {
        addEntry,
        deleteEntry,
        getEntriesReceiptById
    }

})();