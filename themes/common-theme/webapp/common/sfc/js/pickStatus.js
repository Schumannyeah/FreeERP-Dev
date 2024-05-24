var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {

} );

function showPickStatus(){
    var myVPA = $('#tablePickStatusList').DataTable({
            "destroy": true,
            "processing": true,
            // "serverSide": false,
            "ordering": true,
            // "scrollY": '50vh',
            // "scrollX": true,
            // "scrollCollapse": true,
            // "paging": false,
            "info": true,
            "searching": true,
            "dom": '<"top"lf>rt<"bottom"ip><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/planning/control/ShowPickStatus",
                // "data": function(d){
                //     d.startDate = $("#startDate").val(),
                //     d.endDate = $("#endDate").val()
                //     },
                "dataSrc": function(d){
                    return d.vendorPA;
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
                { data: "PRODUCTION_ORDER" },
                { data: "ORDER_STATUS" },
                { data: "ITEM_ID" },
                { data: "ITEM_NAME" },
                { data: "PROD_POOL_ID" },
                { data: "PLANNER" },
                { data: "ORDER_QTY" },
                { data: "UNPICKED_QTY" },
                { data: "PICKING_STATUS" },
                { data: "CURRENT_STOCK" },
                { data: "STOCK_STATUS" },
                { data: "SCHEDULED_BY_MES" },
                { data: "ORDER_START" },
                { data: "ORDER_END" }
            ],
            "order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ]

        });

        // Row selection (multiple rows)
        $('#tablePickStatusList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}
