Ext.define('GUEST.store.Account', {
    extend: 'Ext.data.Store',
    requires: 'GUEST.model.Account',
    storeId: 'accountStore',
    model: 'GUEST.model.Account'
});