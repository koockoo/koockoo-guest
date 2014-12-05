/** This class is the wrapper for all the koockoo-services responses. */
Ext.define('GUEST.model.ResponseWrapper', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'success', type: 'boolean' },
        { name: 'type', type: 'string' },
        { name: 'message', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'code', type: 'number' }
    ]
});
