Ext.define('GUEST.view.lang.LangController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.lang',

    onLangChange: function (cycle, activeItem) {
        var newLocale = activeItem.locale;
        console.log("new locale:" + newLocale);
        if (koockoo.userLocale != newLocale) {
            koockoo.userLocale = newLocale;
            if (localStorage) {
                console.log("locale persisted:" + newLocale);
                localStorage.setItem("user-locale", newLocale);
            }
            this.fireViewEvent('localeChange');
        }
    },

    getLocale: function () {
        return koockoo.userLocale ? koockoo.userLocale : 'en';
    }
});