/**
 * This class is the base class for all entities in the application.
 */
Ext.define('GUEST.model.ChatRoom', {
    extend: 'Ext.data.Model',

    fields: [
        'id', 'startDate', 'endDate'
    ],
    associations: [{
            model: 'Guest',
            type: 'hasOne',
            autoLoad: false
        }
    ],

    schema: {
        id: "chatroomSchema",
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
