/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('GUEST.Application', {
    extend: 'Ext.app.Application',
    
    name: 'GUEST',

    requires: [
        'Ext.app.bindinspector.*'
    ],

    controllers: [
        'Root@GUEST.controller'
    ],

    stores: [
        'Auth@GUEST.store',
        'Account@GUEST.store',
        'Message@GUEST.store',
        'ChatRoom@GUEST.store'
    ],

    onBeforeLaunch: function () {
        this.callParent();
    }
});
