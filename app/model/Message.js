/**
 * This class is the base class for all entities in the application.
 */
Ext.define('GUEST.model.Message', {
    extend: 'Ext.data.Model',

    fields : ['id', 'authorName',  'text', 'chatRoomId', 'authorRef', 'authorType', 'utcDateTime']

});
