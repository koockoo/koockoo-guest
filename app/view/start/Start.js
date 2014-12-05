Ext.define('GUEST.view.start.Start', {
    extend: 'Ext.window.Window',

    requires: [
        'GUEST.view.start.StartController',
        'GUEST.view.start.StartModel',
        'GUEST.view.lang.Lang',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox'
    ],

    viewModel: 'start',
    controller: 'start',
    closable: false,
    width: 400,

    formTitle: 'Chat Request',
    submitLabel: "Start",
    cancelLabel: "Cancel",
    nameLabel: 'Your Name',
    questionLabel: 'Your Question',


    initComponent: function (config) {
        var me = this;
        Ext.apply(me, {
            title: me.formTitle,
            items: {
                xtype: 'form',
                reference: 'form',
                bodyPadding: 15,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'displayName',
                        bind: '{displayName}',
                        fieldLabel: me.nameLabel,
                        allowBlank: false,
                        enableKeyEvents: true,
                        width: 350,
                        cls: 'login-name',
                        listeners: {
                            specialKey: 'onSpecialKey'
                        }
                    },
                    {
                        xtype: 'textarea',
                        name: 'question',
                        bind: '{question}',
                        fieldLabel: me.questionLabel,
                        allowBlank: true,
                        width: 350,
                        enableKeyEvents: true,
                        listeners: {
                            specialKey: 'onSpecialKey'
                        }
                    }
                ]
            },

            buttons: [
                {
                    xtype: 'lang',
                    listeners: {
                        localeChange: 'onLocaleChange'
                    }
                },
                "->",
                {
                    text: me.cancelLabel,
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    text: me.submitLabel,
                    listeners: {
                        click: 'onSubmitClick'
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});
