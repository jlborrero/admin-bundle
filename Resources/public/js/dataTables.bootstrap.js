/**
 * Created with JetBrains PhpStorm.
 * User: joe
 * Date: 5/11/13
 * Time: 17:14
 * To change this template use File | Settings | File Templates.
 */
$.extend( true, $.fn.DataTable.TableTools.classes, {
    "container": "btn-group pull-right",
    "buttons": {
        "normal": "btn btn-default",
        "disabled": "btn disabled"
    },
    "collection": {
        "container": "DTTT_dropdown dropdown-menu",
        "buttons": {
            "normal": "",
            "disabled": "disabled"
        }
    }
} );

// Have the collection use a bootstrap compatible dropdown
$.extend( true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
    "collection": {
        "container": "ul",
        "button": "li",
        "liner": "a"
    }
} );