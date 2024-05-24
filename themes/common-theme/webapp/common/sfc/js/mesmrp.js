$(document).ready(function() {    
        // Setup - add a text input to each footer cell
    $('#tableMesMrpList tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');
    });
    
    // $(window).resize(setTimeout(respondCanvas, 500));
    // showMesMrpList();

} );

function showMesMrpList(){
    var myMML = $('#tableMesMrpList').DataTable({
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
                "url": "/manufacturing/control/ShowMesMrp",
                "dataSrc": function(d){
                    return d.listMesMrp;
                },
                "type": "POST"
            },
            "columns": [
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": '',
                    "render": function () {
                        return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
                    },
                    width:"10px"
                },
                { data: "ID" },
                { data: "PRODUCT_ID" },
                { data: "MRP_KEY" },
                { data: "MRP_ELEMENT" },
                {
                	"orderable": true,
		            "data": "REQ_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "ACTION_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "REQ_QTY" },
                { data: "REQ_QTY_EXT" },
                { data: "INV_UNIT" },
                { data: "ORDER_UNIT" },
                { data: "PRODUCT_NAME" },
                { data: "ITEM_GROUP_ID" },
                { data: "PRIMARY_VENDOR" },
                { data: "PLANNER" },
                { data: "POOL_ID" },
                { data: "LT" },
                { data: "MRP_MSG" },
                { data: "PRODUCT_TYPE_ID" },
                { data: "EXCEPTION_MSG" },
                
            ],
            "order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "createdRow": function( row, data, dataIndex ) {
                // add class to left fixed columns
                var tdId = $(row).children('td:eq(0)');
	           	var tdProductId = $(row).children('td:eq(1)');
	           	var tdMrpKey = $(row).children('td:eq(2)');
	           	var tdMrpElement = $(row).children('td:eq(3)');
	           	$(tdId).addClass('mesfixedcol');
                $(tdProductId).addClass('mesfixedcol');
                $(tdMrpKey).addClass('mesfixedcol');
                $(tdMrpElement).addClass('mesfixedcol');

                var today = new Date();
            	var reqDate = data["REQ_DATE"];
                var tdReqDate = $(row).children('td:eq(5)');
                var actionDate = data["ACTION_DATE"];
                var tdActionDate = $(row).children('td:eq(6)');
                var reqQtyExt = data["REQ_QTY_EXT"];
                var tdReqQtyExt = $(row).children('td:eq(8)');

                var dFuture = moment("2049-12-01").toDate();
                var dBlankDate = moment("2001-01-01").toDate();
                
                // if reqQtyExt < 0 then set brown
                if (reqQtyExt < 0) {
                    $(tdReqQtyExt).addClass('rowAttention');
                }

                if (Date.parse(reqDate) > dBlankDate && Date.parse(reqDate) < today) {
                    $(tdReqDate).addClass('rowDangerous');
                }

                if (Date.parse(actionDate) > dBlankDate && Date.parse(actionDate) < today) {
                    $(tdActionDate).addClass('rowDangerous');
                }
                
            },
            "initComplete": function () {
                // Apply the search
                this.api()
                    .columns()
                    .every(function () {
                        var that = this;
     
                        $('input', this.footer()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            },
            
        });

        $('div.toolbar').html('<b>Only Showing MRP Results in MES.</b>');

        $('#tableMesMrpList tbody').on('mouseenter', 'td', function () {
            var colIdx = myMML.cell(this).index().column;
     
            $(myMML.cells().nodes()).removeClass('highlight');
            $(myMML.column(colIdx).nodes()).addClass('highlight');
        });

        // Add event listener for opening and closing details
        $('#tableMesMrpList tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var tdi = tr.find("i.fa");
            var row = myMML.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
                tdi.first().removeClass('fa-minus-square');
                tdi.first().addClass('fa-plus-square');
            }
            else {
                // Open this row
                row.child(format(row.data())).show();     
                
                tr.addClass('shown');
                tdi.first().removeClass('fa-plus-square');
                tdi.first().addClass('fa-minus-square');
            }
        });

        myMML.on("user-select", function (e, dt, type, cell, originalEvent) {
            if ($(cell.node()).hasClass("details-control")) {
                e.preventDefault();
            }
        }); 

        // Row selection (multiple rows)
        $('#tableMesMrpList tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

};

function format(d){
    // `d` is the original data object for the row
    return '<table class="popout" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
            '<td><input type="hidden" id="myRowID" value="'+ d.ID +'"></td>' +
            '<td> <button id="btnEditWoDateAndNote" type="button" class="rowOk" onclick="">Reserved For Future Usage</button> </td>' +
        '</tr>' +	        
    '</table>';  
}
