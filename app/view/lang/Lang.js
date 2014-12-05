Ext.define('GUEST.view.lang.Lang', {
    extend: 'Ext.button.Cycle',
    alias: 'widget.lang',

//    viewModel: 'lang',
    controller: 'lang',

    showText: true,

    listeners: {
        change: 'onLangChange',
        scope: 'controller'
    },

    initComponent: function () {
        var locale = this.controller.getLocale();
        Ext.apply(this, {
            menu: {
                id: 'lang-menu',
                items: [
                    {
                        iconCls: 'en',
                        text: 'English',
                        locale: 'en',
                        checked: (locale == 'us')
                    },
                    {
                        iconCls: 'ru',
                        text: 'Русский',
                        locale: 'ru',
                        checked: (locale == 'ru')
                    }
                ]
            }
        });
        this.callParent(arguments);
    }

});