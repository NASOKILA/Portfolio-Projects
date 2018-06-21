



let receiptService = (() => {

   
    function getMyActiveReceipt() {
        let userId = sessionStorage.getItem('userId');

        const endpoint = `receipts?query={"userId":"${userId}","active":"true"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function createReceipt(userId, active, productCount, total) {
        let data = { userId, active, productCount, total };

        return remote.post('appdata', 'receipts', 'kinvey', data);
    }

    function getAllMyNonActiveReceipts() {
        const endpoint = `receipts?query={"_acl.creator":"${sessionStorage.getItem('userId')}","active":"false"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }


    function receiptDetails(receipt_id){
        const endpoint = `receipts/${receipt_id}`;
        
        return remote.update('appdata', endpoint, 'kinvey');
    }


    function commitReceipt(receipt_id, userId, active, productCount, total){

        const endpoint = `receipts/${receipt_id}`;
        let data = {active, userId, productCount, total}
        
        return remote.update('appdata', endpoint, 'kinvey', data);
    }

    function getAllReceipts(){
        const endpoint = `receipts`;
        
        return remote.get('appdata', endpoint, 'kinvey');
    }



    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

  

    return {
        getMyActiveReceipt,
        createReceipt,
        getAllMyNonActiveReceipts,
        receiptDetails,
        commitReceipt,
        getAllReceipts,
        calcTime
    }
})();