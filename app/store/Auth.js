Ext.define('GUEST.store.Auth', {
    extend: 'Ext.data.Store',
    requires: 'GUEST.model.Auth',
    storeId: 'authStore',
    model: 'GUEST.model.Auth'
});