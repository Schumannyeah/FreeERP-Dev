var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {

} );

function showPriceVeriOpenExpensive(){
    var myPVI = $('#tablePriceVeriOpenExpensiveList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '55vh',
            "scrollCollapse": true,
            "fixedColumns":   {
                left: 4
            },
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/scm/control/ShowBuySmartOpenExpensive",
                // "data": function(d){
                //     d.purchId = $("#purchId").val();
                //     },
                "dataSrc": function(d){
                    return d.ccByOpenExp;
                },
                "type": "POST"
            },
            // select:"single",
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "PURCH_ID" },
                { data: "LINE_NUM" },
                { data: "PURCH_LINE_STATUS" },
                { data: "PRODUCT_ID" },
                { data: "PRODUCT_NAME" },
                { data: "ORG_VENDOR_ID" },
                { data: "ORG_VENDOR_NAME" },
                {
                	"orderable": true,
		            "data": "PO_CREATED_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "ORG_PRICE" },
                { data: "ORG_CURRENCY_UOM" },
                { data: "ORG_RATE" },
                { data: "ORG_PRICE_CNY" },
                { data: "LAST_PRICE_CNY_MAX_CURRENT" },
                { data: "LAST_PRICE_CNY_MIN_CURRENT" },
                { data: "VENDOR_MIN_CURRENT" },
                { data: "PRICE_GAP_CURRENT" },
                { data: "KEY_CURRENT" },
                { data: "LAST_PRICE_CNY_MAX_HISTORY" },
                { data: "LAST_PRICE_CNY_MIN_HISTORY" },
                { data: "VENDOR_MIN_HISTORY" },
                { data: "PRICE_GAP_HISTORY" },
                { data: "KEY_HISTORY" }
            ],
            "order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]

        });

        // Row selection (multiple rows)
        $('#tablePriceVeriOpenExpensiveList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}

function showPriceVeriByPurchId(){
    var myPVI = $('#tablePriceVeriByPurchIdList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '55vh',
            "scrollCollapse": true,
            "fixedColumns":   {
                left: 4
            },
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/scm/control/ShowBuySmartByPurchId",
                "data": function(d){
                    d.purchId = $("#purchId").val();
                    },
                "dataSrc": function(d){
                    return d.ccByPurchId;
                },
                "type": "POST"
            },
            // select:"single",
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "PURCH_ID" },
                { data: "LINE_NUM" },
                { data: "PURCH_LINE_STATUS" },
                { data: "PRODUCT_ID" },
                { data: "PRODUCT_NAME" },
                { data: "ORG_VENDOR_ID" },
                { data: "ORG_VENDOR_NAME" },
                {
                	"orderable": true,
		            "data": "PO_CREATED_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "ORG_PRICE" },
                { data: "ORG_CURRENCY_UOM" },
                { data: "ORG_RATE" },
                { data: "ORG_PRICE_CNY" },
                { data: "LAST_PRICE_CNY_MAX_CURRENT" },
                { data: "LAST_PRICE_CNY_MIN_CURRENT" },
                { data: "VENDOR_MIN_CURRENT" },
                { data: "PRICE_GAP_CURRENT" },
                { data: "KEY_CURRENT" },
                { data: "LAST_PRICE_CNY_MAX_HISTORY" },
                { data: "LAST_PRICE_CNY_MIN_HISTORY" },
                { data: "VENDOR_MIN_HISTORY" },
                { data: "PRICE_GAP_HISTORY" },
                { data: "KEY_HISTORY" }
            ],
            "order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]

        });

        // Row selection (multiple rows)
        $('#tablePriceVeriByPurchIdList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}

function showPriceVeriByItem(){
    var myPVI = $('#tablePriceVeriByItemList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '55vh',
            "scrollCollapse": true,
            "fixedColumns":   {
                left: 4
            },
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/scm/control/ShowBuySmartByItem",
                "data": function(d){
                    d.itemId = $("#itemId").val();
                    },
                "dataSrc": function(d){
                    return d.ccByItem;
                },
                "type": "POST"
            },
            // select:"single",
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "PURCH_ID" },
                { data: "LINE_NUM" },
                { data: "PURCH_LINE_STATUS" },
                { data: "PRODUCT_ID" },
                { data: "PRODUCT_NAME" },
                { data: "ORG_VENDOR_ID" },
                { data: "ORG_VENDOR_NAME" },
                {
                	"orderable": true,
		            "data": "PO_CREATED_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "ORG_PRICE" },
                { data: "ORG_CURRENCY_UOM" },
                { data: "ORG_RATE" },
                { data: "ORG_PRICE_CNY" },
                { data: "LAST_PRICE_CNY_MAX_CURRENT" },
                { data: "LAST_PRICE_CNY_MIN_CURRENT" },
                { data: "VENDOR_MIN_CURRENT" },
                { data: "PRICE_GAP_CURRENT" },
                { data: "KEY_CURRENT" },
                { data: "LAST_PRICE_CNY_MAX_HISTORY" },
                { data: "LAST_PRICE_CNY_MIN_HISTORY" },
                { data: "VENDOR_MIN_HISTORY" },
                { data: "PRICE_GAP_HISTORY" },
                { data: "KEY_HISTORY" }
            ],
            "order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]

        });

        // Row selection (multiple rows)
        $('#tablePriceVeriByItemList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}

function showPriceVeriByVendor(){
    var myPVV = $('#tablePriceVeriByVendorList').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '55vh',
            "scrollCollapse": true,
            "fixedColumns":   {
                left: 4
            },
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/scm/control/ShowBuySmartByVendor",
                "data": function(d){
                    d.vendorAccount = $("#vendorAccount").val();
                    },
                "dataSrc": function(d){
                    return d.ccByVendor;
                },
                "type": "POST"
            },
            // select:"single",
            "columns": [
                {
                    data: null,
                    defaultContent: '',
                    className: 'select-checkbox',
                    orderable: false
                },
                { data: "PURCH_ID" },
                { data: "LINE_NUM" },
                { data: "PURCH_LINE_STATUS" },
                { data: "PRODUCT_ID" },
                { data: "PRODUCT_NAME" },
                { data: "ORG_VENDOR_ID" },
                { data: "ORG_VENDOR_NAME" },
                {
                	"orderable": true,
		            "data": "PO_CREATED_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "ORG_PRICE" },
                { data: "ORG_CURRENCY_UOM" },
                { data: "ORG_RATE" },
                { data: "ORG_PRICE_CNY" },
                { data: "LAST_PRICE_CNY_MAX_CURRENT" },
                { data: "LAST_PRICE_CNY_MIN_CURRENT" },
                { data: "VENDOR_MIN_CURRENT" },
                { data: "PRICE_GAP_CURRENT" },
                { data: "KEY_CURRENT" },
                { data: "LAST_PRICE_CNY_MAX_HISTORY" },
                { data: "LAST_PRICE_CNY_MIN_HISTORY" },
                { data: "VENDOR_MIN_HISTORY" },
                { data: "PRICE_GAP_HISTORY" },
                { data: "KEY_HISTORY" }
            ],
            "order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]

        });

        // Row selection (multiple rows)
        $('#tablePriceVeriByVendorList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}
