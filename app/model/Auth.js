/**
 * This class is the base class for all entities in the application.
 */
Ext.define('GUEST.model.Auth', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'topicRef', type: 'string'}
    ],

    associations: [
        {
            model: 'Guest',
            type: 'hasOne',
            autoLoad: false
        }
    ],

    schema: {
        id: "authSchema",
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
