
Ext.define('GUEST.model.Account', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'locale', type: 'string'},
        {name: 'topicRef', type: 'string'}
    ],

    schema: {
        id: "accountSchema",
        namespace: 'GUEST.model',
        proxy: {
            reader: {
                type: 'json',
                rootProperty: 'data',
                successProperty: 'success'
            }
        }
    }
});
