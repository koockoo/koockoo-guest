Ext.define('GUEST.view.chat.Chat', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.ux.PreviewPlugin',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.HtmlEditor',
        'Ext.grid.Panel'
    ],

    viewModel: 'chat',
    controller: 'chat',
    width: 800,
    height: 500,

    columnAuthor: 'Author',
    columnDate: 'Date',
    buttonSend: 'Send',

    bodyPadding: 0,
    bind: '{title}',

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },

    margins: '5 5 5 5',

    tools: [
        {
            type: 'print'
        },
        {
            type: 'save'
        }
    ],

    initComponent: function (config) {
        var me = this;
        Ext.apply(me, {
            items: [
                {

                    xtype: 'grid',
                    reference: 'chat-grid',
                    flex: 4,
                    border: false,
                    hideHeaders: true,
                    cls: 'feed-grid',
                    store: Ext.getStore('Message'),
                    viewConfig: {
                        stripeRows: false,
                        enableTextSelection: true,
                        autoScroll: true,
                        plugins: [
                            {
                                pluginId: 'preview',
                                ptype: 'preview',
                                bodyField: 'text',
                                expanded: true
                            }
                        ]
                    },

                    columns: [
                        {
                            text: me.columnAuthor,
                            dataIndex: 'authorName',
                            renderer: function (value, p, record) {
                                return Ext.String.format('<span class="author">{0}</span>', value || "|_|");
                            },
                            flex: 1
                        },
                        {
                            text: me.columnDate,
                            dataIndex: 'utcDateTime',
                            renderer: me.formatDate,
                            width: 200
                        }
                    ]
                },
                {
                    xtype: 'form',
                    layout: 'fit',
                    border: true,
                    height: 150,
                    items: [
                        {
                            xtype: 'htmleditor',
                            reference: 'chat-textarea',
                            flex: 1,
                            enableLinks: true,
                            enableLists: false,
                            enableSourceEdit: false,
                            enableAlignments: false,
                            enableColors: true,
                            enableFontSize: false,
                            enableFormat: true,
                            //                    enableFont		 : false
                            listeners: {
                                keyup: 'onMessageKeyPress'
                            }
                        }
                    ],
                    buttons: [
                        {
                            text: me.buttonSend,
                            width: 150,
                            height: 30,
                            listeners: {
                                click: 'onSendClick'
                            }
                        }
                    ]

                }
            ]
        });

        me.callParent(arguments);
    },

    formatDate: function (utcDateTime) {
        var date = Ext.Date.parse(utcDateTime, "c");
        var now = new Date();
        var d = Ext.Date.clearTime(now, true);
        var notime = Ext.Date.clearTime(date, true).getTime();

        if (notime === d.getTime()) {
            return Ext.Date.format(date, 'H:i');
        }
        return Ext.Date.format(date, 'Y/m/d H:i');
    }

});
