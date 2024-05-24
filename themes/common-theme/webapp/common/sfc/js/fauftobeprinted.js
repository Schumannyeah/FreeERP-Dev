var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function() {
    // showFaufToBePrintedList();
    // showPrintedFaufList();
} );

function showFaufToBePrintedList(){
    var myFTBPL = $('#tableFaufToBePrinted').DataTable({
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
                "url": "/manufacturing/control/ShowFaufToBePrintedList",
                // "data": function(d){
                //     d.codeNr = $("#codeNr").val();
                //     },
                "dataSrc": function(d){
                    return d.listFaufToBePrinted;
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
                { data: "WORK_EFFORT_ID" },
                { data: "PRODUCT_ID" },
                { data: "ITEM_NAME" },
                { data: "QUANTITY_TO_PRODUCE" },
                { data: "PRODUCTION_POOL" },
                {
                	"orderable": true,
		            "data": "AX_START_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "AX_END_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "MES_START_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "MES_END_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "PLANNING_MESSAGE" },
                { data: "ORDER_STATUS" },
                { data: "DWG_STATUS" },
                { data: "FAUF_CREATED_BY" },
                { data: "PRODUCTION_NOTE" },
                {
                	"orderable": true,
		            "data": "PRINT_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "ME_END_BY" }               
            ],
            "order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ],
            "createdRow": function( row, data, dataIndex ) {
            	var prtStatus = data["PLANNING_MESSAGE"];
	           	var tdPrintStatus = $(row).children('td:eq(10)');
	           	if(prtStatus == "PLANNED_BOTH_IN_AX_AND_MES"){
	           		$(tdPrintStatus).addClass('rowOk');
	           	}else if (prtStatus == "PLANNED_ONLY_IN_AX" || prtStatus == "PLANNED_ONLY_IN_MES") {
                    $(tdPrintStatus).addClass('rowWarning');
                }else {
                    $(tdPrintStatus).addClass('rowDangerous');
                }

                var dwgStatus = data["DWG_STATUS"];
	           	var tdDwgStatus = $(row).children('td:eq(12)');
	           	if(dwgStatus == "AVAILABLE"){
	           		$(tdDwgStatus).addClass('rowOk');
                }else {
                    $(tdDwgStatus).addClass('rowDangerous');
                }
              }
        });

        // Row selection (multiple rows)
        $('#tableFaufToBePrinted tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

}

function showPrintedFaufList(){
    var myPFL = $('#tablePrintedFauf').DataTable({
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
                "url": "/manufacturing/control/ShowPrintedFaufList",
                // "data": function(d){
                //     d.codeNr = $("#codeNr").val();
                //     },
                "dataSrc": function(d){
                    return d.listPrintedFauf;
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
                { data: "WORK_EFFORT_ID" },
                { data: "PRODUCT_ID" },
                { data: "ITEM_NAME" },
                {
                	"orderable": true,
		            "data": "PRINT_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD hh:mm");
		            }
                },
                { data: "PRINTED_BY_USER_LOGIN" },
                {
                	"orderable": true,
		            "data": "AX_START_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "AX_END_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "PRINTED_COUNTER" },
                { data: "REMARKS" }                
            ],
            "order": [[1, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'excel', 'pdf'
            ],
            "createdRow": function( row, data, dataIndex ) {
            	var prtStatus = data["PRINTED_COUNTER"];
	           	var tdPrintStatus = $(row).children('td:eq(8)');
	           	if(prtStatus == "1"){
	           		$(tdPrintStatus).addClass('rowOk');
	           	}else{
                    $(tdPrintStatus).addClass('rowDangerous');
                }         	
              }
        });

        // Row selection (multiple rows)
        $('#tablePrintedFauf tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

        $('#tablePrintedFauf tbody').on('dblclick', 'tr', function () {
            // var data = myWCL.row( this ).data();
            var tr = $(this).closest('tr');
            var row = myPFL.row(tr);
            // console.log(row);
            // console.log(row.data());
            // console.log(row.data().WORK_CENTER_NAME);

            //change modal title first
            $("#workEffortId").val(row.data().WORK_EFFORT_ID);
            $("wePrintModalTitle").val("Production Order Id - " + row.data().WORK_EFFORT_ID);

            $("#wePrintModal").modal("show");
        } );

}

function updatePrintedProductionOrder(){
    $("#wePrintModal").modal("hide");
    updateWEP();
}

function updateWEP(){
    var jsonData = $.ajax({
        method: "POST",
        url: "/manufacturing/control/updatePrintedWE",
        dataType: 'json',
        data: {
                "workEffortId": $("#workEffortId").val(),
                "subType": $("#subType").val(),
                "userLogin": $("#USERNAME").val()
        }, success: function (data) {
            
        }
    });
}
