var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {
    //automatic load work center list when loaded
    showInactiveCheckPoint();

    // bind the datetimepicker
    $('#txtStartFrom').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });
    
    $('#txtEndTo').datetimepicker({
        timepicker:false,
        format:'m/d/Y'
      });
} );

function showInactiveCheckPoint(){
    var myWCL = $('#tableInactiveCheckPointList').DataTable({
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
                "url": "/quality/control/ShowInactiveCheckPoint",
                // "data": function(d){
                //     d.codeNr = $("#codeNr").val();
                //     },
                "dataSrc": function(d){
                    return d.listInactiveCheckPoint;
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
                { data: "ORDER_ID" },
                { data: "ORDER_TYPE" },
                { data: "STATUS_ID" },
                { data: "PRODUCT_ID" },
                { data: "ITEM_DESCRIPTION" },
                { data: "QUANTITY" },
                {
                	"orderable": true,
		            "data": "ORDER_START",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "ORDER_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "SCHEDULE_KEY" },
                { data: "MODEL_GROUP_ID" }
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
        $('#tableInactiveCheckPointList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}


