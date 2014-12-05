/**
 * This class is the base class for all entities in the application.
 */
Ext.define('GUEST.model.Guest', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string', reference:'ChatRoom'},
        {name: 'displayName', type: 'string'},
        {name: 'location', type: 'string'},
        {name: 'env', type: 'string'},
        {name: 'connectionDate', type: 'string'}
    ]


});
