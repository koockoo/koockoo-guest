/**
 * This global controller manages the login view and ensures that view is created when
 * the application is launched. Once login is complete we then create the main view.
 */
Ext.define('GUEST.controller.Root', {
    extend: 'Ext.app.Controller',

    requires: [
        'GUEST.view.start.Start',
        'GUEST.view.chat.Chat',
        'GUEST.view.chat.ChatController',
        'GUEST.view.lang.LangController',
        'Ext.direct.*'
    ],

    loadingText: 'Loading...',

    onLaunch: function () {
        this.initServices();
        this.loadAccount();
    },

    /** initialize service endpoints */
    initServices: function () {
        var self = this;
        if (koockoo != undefined && koockoo.service != undefined) {
            koockoo.service.init(function () {
                self.onServiceInitialized(self);
            }, self.onServiceInitializedFail);
        } else {
            Ext.Msg.alert('Service Unavailable', 'koockoo is not ready to serve');
        }
    },

    loadAccount: function() {
        Ext.Ajax.request({
            url: koockoo.service.account.get.url+"/"+koockoo.id,
            method: koockoo.service.account.get.type,
            scope: this,
            success: this.onLoadAccountSuccess
        });
    },

    onLoadAccountSuccess: function(response) {

        koockoo.userLocale = localStorage ? (localStorage.getItem('user-locale') || null) : null;
        console.log("LoadAccount response received");
        var wrapper = Ext.JSON.decode(response.responseText);
        var store = Ext.getStore('Account');
        store.loadRawData(response);
        if (wrapper.success) {
            var account = store.first();
            if (koockoo.userLocale == null) {
                koockoo.userLocale = account.get('locale');
                if (localStorage) {
                    localStorage.setItem('user-locale', koockoo.userLocale);
                }
            }
            this.reloadWithLocale();
        } else {
            console.log("LoadAccount error: "+ wrapper.message);
        }
    },

    onServiceInitialized: function (self) {
        console.log("service enpoints are initialized");
    },

    onServiceInitializedFail: function () {
        console.log("service enpoints fail to initialize");
        Ext.Msg.alert('Service Unavailable', 'Please retry later');
    },

    onLogout: function () {
        this.viewport.destroy();
        Ext.getStore('Auth').removeAll();
        this.showLogin();
    },

    showLogin: function () {
        this.login = new GUEST.view.start.Start({
            autoShow: true,
            listeners: {
                scope: this,
                start: 'onStart',
                localeChange: 'onLocaleChange'
            }
        });
    },

    showChat: function () {
        var store = Ext.getStore('Auth');
        this.viewport = new GUEST.view.chat.Chat({
            autoShow: true,
            listeners: {
                scope: this,
                logout: 'onLogout'
            },
            viewModel: {
                data: {
                    name: "OP",
                    auth: store.getAt(0),
                    operator: store.getAt(0).get('guest')
                }
            }
        });
    },

    onLocaleChange: function () {
        console.log("reload login screen with new lang");
        this.reloadWithLocale();
    },

    reloadWithLocale: function () {
        var url = Ext.util.Format.format("packages/locale/locale-{0}.js", koockoo.userLocale);
        Ext.Loader.loadScript({url: url, onLoad: this.onLocaleLoadSuccess, scope: this});
    },

    onLocaleLoadSuccess: function () {
        koockoo.locale[koockoo.userLocale].reload();
        if (this.login) {
            this.login.destroy();
        }
        this.showLogin();
    },

    onStart: function () {
        console.log("show the chat UI");
        this.login.destroy();
        this.showChat();
        this.startPollingMessages();
    },

    startPollingMessages: function () {
        var me = this;
        var messagePoll = new Ext.direct.PollingProvider({
            id: 'MessagePolling',
            interval: 30000,
            type: 'polling',
            url: me.getUrl(),
            listeners: {
                scope: me,
                data: me.onReceiveMessages,
                beforepoll: function (provider, eOpts) {
                    provider.url = me.getUrl();
                }
            }
        });
        Ext.direct.Manager.addProvider(messagePoll);
    },

    onReceiveMessages: function(provider, event) {
        console.log("response received for messages");
        var mStore = Ext.getStore('Message');
        var result  = mStore.getProxy().getReader().read(event.data);
        var records = result.getRecords();
        if (result.getSuccess()) {
            console.log("total: " + result.getTotal());
            mStore.add(records);
            this.viewport.controller.scroll();
        }
    },

    getUrl: function () {
        var aStore = Ext.getStore('Auth');
        var msStore = Ext.getStore('Message');
        var guest = aStore.first().get('guest');
        var lastId = null;

        if (msStore.count() > 0) {
            msStore.each(function (message, idx) {
                if (message.get("authorRef") != guest.id) {
                    lastId = message.id;
                }
            });
        }

        var url = "";
        if (lastId != null) {
            url = koockoo.service.message.readByGuest.url;
            url = Ext.String.format(url, guest.id, lastId);
        } else {
            url = koockoo.service.message.readAllByGuest.url;
            url = Ext.String.format(url, guest.id);
        }
        console.log("start polling messages " + url);
        return url;
    }


});
