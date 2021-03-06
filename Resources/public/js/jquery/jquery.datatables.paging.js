$.extend($.fn.dataTableExt.oStdClasses, {
    "sWrapper":"dataTables_wrapper form-inline"
});


/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
    return {
        "iStart":oSettings._iDisplayStart,
        "iEnd":oSettings.fnDisplayEnd(),
        "iLength":oSettings._iDisplayLength,
        "iTotal":oSettings.fnRecordsTotal(),
        "iFilteredTotal":oSettings.fnRecordsDisplay(),
        "iPage":Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages":Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
    };
}

/* Bootstrap style pagination control */
$.extend($.fn.dataTableExt.oPagination, {
    "bootstrap":{
        "fnInit":function (oSettings, nPaging, fnDraw) {
            var oLang = oSettings.oLanguage.oPaginate;
            var nInput = document.createElement('select');
            if (oSettings.sTableId !== '') {
                nPaging.setAttribute('id', oSettings.sTableId + '_paginate');
            }
            var fnClickHandler = function (e) {
                e.preventDefault();
                if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                    fnDraw(oSettings);
                }
            };

            $(nPaging).addClass('pagination').append(
                '<ul class="pagination">' +
                    '<li class="prev disabled"><a href="#">&larr; ' + oLang.sPrevious + '</a></li>' +
                    '<li class="next disabled"><a href="#">' + oLang.sNext + ' &rarr; </a></li>' +
                    '</ul>'
            );
            $(nInput).addClass('pull-right');
            nPaging.appendChild(nInput);
            var els = $('a', nPaging);
            $(els[0]).bind('click.DT', { action:"previous" }, fnClickHandler);
            $(els[1]).bind('click.DT', { action:"next" }, fnClickHandler);
            $(nInput).change(function (e) { // Set DataTables page property and redraw the grid on listbox change event.
                window.scroll(0, 0); //scroll to top of page
                if (this.value === "" || this.value.match(/[^0-9]/)) { /* Nothing entered or non-numeric character */
                    return;
                }
                var iNewStart = oSettings._iDisplayLength * (this.value - 1);
                if (iNewStart > oSettings.fnRecordsDisplay()) { /* Display overrun */
                    oSettings._iDisplayStart = (Math.ceil((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength) - 1) * oSettings._iDisplayLength;
                    fnDraw(oSettings);
                    return;
                }
                oSettings._iDisplayStart = iNewStart;
                fnDraw(oSettings);
            });

        },

        //


        //
        "fnUpdate":function (oSettings, fnDraw) {
            var iListLength = 5;
            var oPaging = oSettings.oInstance.fnPagingInfo();
            var an = oSettings.aanFeatures.p;
            var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

            if (oPaging.iTotalPages < iListLength) {
                iStart = 1;
                iEnd = oPaging.iTotalPages;
            }
            else if (oPaging.iPage <= iHalf) {
                iStart = 1;
                iEnd = iListLength;
            } else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
                iStart = oPaging.iTotalPages - iListLength + 1;
                iEnd = oPaging.iTotalPages;
            } else {
                iStart = oPaging.iPage - iHalf + 1;
                iEnd = iStart + iListLength - 1;
            }

            for (i = 0, iLen = an.length; i < iLen; i++) {
                // Remove the middle elements
                $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                // Add the new list items and their event handlers
                for (j = iStart; j <= iEnd; j++) {
                    sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
                    $('<li ' + sClass + '><a href="#">' + j + '</a></li>')
                        .insertBefore($('li:last', an[i])[0])
                        .bind('click', function (e) {
                            e.preventDefault();
                            oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
                            fnDraw(oSettings);
                        });
                }

                // Add / remove disabled classes from the static elements
                if (oPaging.iPage === 0) {
                    $('li:first', an[i]).addClass('disabled');
                } else {
                    $('li:first', an[i]).removeClass('disabled');
                }

                if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
                    $('li:last', an[i]).addClass('disabled');
                } else {
                    $('li:last', an[i]).removeClass('disabled');
                }
            }


            if (!oSettings.aanFeatures.p) {
                return;
            }
            var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
            var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
            /* Loop over each instance of the pager */
            var an = oSettings.aanFeatures.p;
            for (var i = 0, iLen = an.length; i < iLen; i++) {
                //    var spans = an[i].getElementsByTagName('span');
                var inputs = an[i].getElementsByTagName('select');
                var elSel = inputs[0];
                if (elSel.options.length != iPages) {
                    elSel.options.length = 0; //clear the listbox contents
                    for (var j = 0; j < iPages; j++) { //add the pages
                        var oOption = document.createElement('option');
                        oOption.text = j + 1;
                        oOption.value = j + 1;
                        try {
                            elSel.add(oOption, null); // standards compliant; doesn't work in IE
                        } catch (ex) {
                            elSel.add(oOption); // IE only
                        }
                    }
                    //      spans[1].innerHTML = " nbsp;of nbsp;" + iPages;
                }
                elSel.value = iCurrentPage;
            }
        }
    },
    "listbox":{
        "fnInit":function (oSettings, nPaging, fnCallbackDraw) {
            var nInput = document.createElement('select');
            var nPage = document.createElement('span');
            var nOf = document.createElement('span');
            nOf.className = "paginate_of";
            nPage.className = "paginate_page";
            if (oSettings.sTableId !== '') {
                nPaging.setAttribute('id', oSettings.sTableId + '_paginate');
            }
            nInput.style.display = "inline";
            nPage.innerHTML = "Page ";
            nPaging.appendChild(nPage);
            nPaging.appendChild(nInput);
            nPaging.appendChild(nOf);
            $(nInput).change(function (e) { // Set DataTables page property and redraw the grid on listbox change event.
                window.scroll(0, 0); //scroll to top of page
                if (this.value === "" || this.value.match(/[^0-9]/)) { /* Nothing entered or non-numeric character */
                    return;
                }
                var iNewStart = oSettings._iDisplayLength * (this.value - 1);
                if (iNewStart > oSettings.fnRecordsDisplay()) { /* Display overrun */
                    oSettings._iDisplayStart = (Math.ceil((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength) - 1) * oSettings._iDisplayLength;
                    fnCallbackDraw(oSettings);
                    return;
                }
                oSettings._iDisplayStart = iNewStart;
                fnCallbackDraw(oSettings);
            });
            /* Take the brutal approach to cancelling text selection */
            $('span', nPaging).bind('mousedown', function () {
                return false;
            });
            $('span', nPaging).bind('selectstart', function () {
                return false;
            });
        },

        /*
         * Function: oPagination.listbox.fnUpdate
         * Purpose:  Update the listbox element
         * Returns:  -
         * Inputs:   object:oSettings - dataTables settings object
         *             function:fnCallbackDraw - draw function which must be called on update
         */
        "fnUpdate":function (oSettings, fnCallbackDraw) {
            if (!oSettings.aanFeatures.p) {
                return;
            }
            var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
            var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
            /* Loop over each instance of the pager */
            var an = oSettings.aanFeatures.p;
            for (var i = 0, iLen = an.length; i < iLen; i++) {
                var spans = an[i].getElementsByTagName('span');
                var inputs = an[i].getElementsByTagName('select');
                var elSel = inputs[0];
                if (elSel.options.length != iPages) {
                    elSel.options.length = 0; //clear the listbox contents
                    for (var j = 0; j < iPages; j++) { //add the pages
                        var oOption = document.createElement('option');
                        oOption.text = j + 1;
                        oOption.value = j + 1;
                        try {
                            elSel.add(oOption, null); // standards compliant; doesn't work in IE
                        } catch (ex) {
                            elSel.add(oOption); // IE only
                        }
                    }
                    spans[1].innerHTML = " nbsp;of nbsp;" + iPages;
                }
                elSel.value = iCurrentPage;
            }
        }
    }
})
;
