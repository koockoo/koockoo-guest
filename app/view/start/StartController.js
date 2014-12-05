/**
 * This View Controller is associated with the Login view.
 */
Ext.define('GUEST.view.start.StartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.start',

    loginText: 'Logging in...',

    constructor: function () {
        this.callParent(arguments);
    },

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    onSubmitClick: function () {
        this.doSignin();
    },

    doSignin: function () {
        var form = this.lookupReference('form');

        if (form.isValid()) {
            Ext.getBody().mask(this.loginText);
            console.log("guest signing in");
            var accStore = Ext.getStore('Account');
            var acc = accStore.first();
            // register guest on backend
            Ext.Ajax.request({
                url: koockoo.service.auth.signGuest.url + "/"+ acc.get('topicRef'),
                method: koockoo.service.auth.signGuest.type,
                params: form.getValues(),
                scope: this,
                success: this.onSigninSuccess
            });
        }
    },

    onSigninSuccess: function (response) {
        console.log("guest signin response received");
        var wrapper = Ext.JSON.decode(response.responseText);
        var store = Ext.getStore('Auth');
        store.loadRawData(response);
        if (wrapper.success) {
           // open chatroom
            var auth = store.first()
            this.doStart(auth.get("id"));
        }
    },

    doStart: function(token) {
        Ext.Ajax.request({
            url: koockoo.service.chatroom.open.url,
            method: koockoo.service.chatroom.open.type,
            params: {token:token},
            scope: this,
            success: this.onStartSuccess
        });
    },

    onStartSuccess: function (response) {
        Ext.getBody().unmask();
        var wrapper = Ext.JSON.decode(response.responseText);
        var store = Ext.getStore('ChatRoom');
        store.loadRawData(response);
        if (wrapper.success) {
            console.log("fire start");
            this.fireViewEvent('start');
        }
    },

    onLocaleChange: function () {
        this.fireViewEvent('localeChange');
    }

});
