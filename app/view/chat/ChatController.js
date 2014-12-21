/**
 * This View Controller is associated with the Login view.
 */
Ext.define('GUEST.view.chat.ChatController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chat',


    constructor: function () {
        this.callParent(arguments);
    },

    scroll: function () {
        // scroll to the bottom
        var ms = this.getViewModel().getStore('messages');
        var grid = this.lookupReference('chat-grid');
        grid.getView().focusRow(ms.count() - 1);
        grid.getEl().down('.x-grid-view').scroll('bottom', 200, true);
    },

    onSendClick: function () {
        var ms = Ext.getStore('Message');
        var cs = Ext.getStore('ChatRoom');
        var chatroom = cs.first();
        var textarea = this.lookupReference('chat-textarea');
        var text = textarea.getValue();
        var auth = Ext.getStore('Auth').first();
        var msg = this.createMessage(auth.get("guest"), text, chatroom.id);
        ms.add(msg);
        textarea.setValue("");

        // scroll to the bottom
        var grid = this.lookupReference('chat-grid');
        grid.getView().focusRow(ms.count() - 1);
        grid.getEl().down('.x-grid-view').scroll('bottom', 200, true);
        textarea.focus();

        // publish
        this.postMessage(msg);
    },

    postMessage: function (message) {
        var url = koockoo.service.message.postByGuest.url;
        url = Ext.String.format(url, message.get("authorRef"), message.get("chatRoomId"));
        Ext.Ajax.request({
            url: url,
            method: koockoo.service.message.postByGuest.type,
            params: {text: message.get("text")},
            scope: this,
            success: this.onMessagePosted,
            original: message
        });
    },

    onMessagePosted: function(response, opts){
        var original = opts.original;
        var resp = Ext.decode(response.responseText);
        var updated = new GUEST.model.Message(resp.data);
        var msStore = Ext.getStore('Message');
        var idx = msStore.indexOf(original);
        msStore.removeAt(idx);
        msStore.insert(idx, updated);
    },

    createMessage: function (author, text, roomId) {
        return new GUEST.model.Message({
            authorName: author.displayName,
            id: Ext.id(),
            timestamp: '2013-01-31T10:10:05.000Z',
            text: text,
            chatRoomId: roomId,
            authorRef: author.id
        });
    }
});
