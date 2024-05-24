$(document).ready(function() {    
    // Setup - add a text input to each footer cell
    $('#txtStartFromSDS').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() - 30)
      });
    
    $('#txtEndToSDE').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 7)
      });
    
    $('#tableMesSalesLines tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');
    });
    
    // $(window).resize(setTimeout(respondCanvas, 500));
    // showMesSalesLines();
    
} );

function showMesSalesLines(){
    var myMSL = $('#tableMesSalesLines').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '55vh',
            "scrollCollapse": true,
            "fixedColumns":   {
                left: 7
            },
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/ordermgr/control/ShowMesSalesLines",
                "dataType": 'json',
                "data": {
                    "soId": $("#txtSoId").val(),
                    "startDate": $("#txtStartFromSDS").val(),
                    "endDate": $("#txtEndToSDE").val(),
                },
                "dataSrc": function(d){
                    return d.listSalesLines;
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
                { data: "SALES_ID" },
                { data: "LINE_NUM" },
                { data: "SALES_LINE_STATUS" },
                { data: "PRODUCT_CATEGORY_ID" },
                { data: "ITEM_ID" },
                { data: "LINE_NAME" },
                { data: "ITEM_GROUP_ID" },
                { data: "PRIMARY_VENDOR" },
                { data: "INVOICE_ACCOUNT" },
                { data: "CUSTOMER_NAME" },
                { data: "DELIVERY_NAME" },
                { data: "SALES_QTY" },
                { data: "REMAIN_SALES_PHYSICAL" },
                { data: "UNIT_PRICE" },
                { data: "LINE_AMOUNT" },
                { data: "CURRENCY_CODE" },
                {
                	"orderable": true,
		            "data": "CREATED_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "AX_REQUESTED_REQUIREMENT_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "AX_CONFIRMED_REQUIREMENT_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "DLV_MODE" },
                { data: "DLV_TERM" },
                { data: "CUSTOMERS_ORDER" },
                { data: "CUSTOMERS_REF" },
                { data: "PROJECT_ID" },
                { data: "PROJECT" },
                { data: "LT_SITE_SAL" },
                {
                	"orderable": true,
		            "data": "MES_SUGGESTED_CONF_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "INCOTERMS" },
                {
                	"orderable": true,
		            "data": "FIRST_CONF_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "LAST_CONF_DATE",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "INCOTERMS_OTHER" },
                {
                	"orderable": true,
		            "data": "FIRST_CONF_DATE_OTHER",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "LAST_CONF_DATE_OTHER",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "WO_QTY" },
                { data: "SLAVE_ORDER_ID" },
                {
                	"orderable": true,
		            "data": "AX_START",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "AX_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "MES_START",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "MES_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "MES_ACTUAL_START",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "MES_ACTUAL_END",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "COMMENTS" },
                { data: "LINE_CONF_STATUS" },
                { data: "REQ_CONF_DATE_DIRTY" },
                { data: "DELIVERY_STATUS" }
            ],
            "order": [[1, 'asc'],[2, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "createdRow": function( row, data, dataIndex ) {
                // add class to left fixed columns so as to avoid overlappinng when moving right
                var tdPluss = $(row).children('td:eq(0)');
	           	var tdSalesId = $(row).children('td:eq(1)');
	           	var tdLineNum = $(row).children('td:eq(2)');
	           	var tdLineStatus = $(row).children('td:eq(3)');
                var tdProdCat = $(row).children('td:eq(4)');
	           	var tdItemId = $(row).children('td:eq(5)');
	           	var tdLineName = $(row).children('td:eq(6)');
	           	$(tdPluss).addClass('mesfixedcol');
                $(tdSalesId).addClass('mesfixedcol');
                $(tdLineNum).addClass('mesfixedcol');
                $(tdLineStatus).addClass('mesfixedcol');
                $(tdProdCat).addClass('mesfixedcol');
                $(tdItemId).addClass('mesfixedcol');
                $(tdLineName).addClass('mesfixedcol');

                var salesLineStatus = data["SALES_LINE_STATUS"];
                var tdSalesLineStatus = $(row).children('td:eq(3)');
                // set Sales Line Status color, but could have been override by the class mesfixedcol
                if (salesLineStatus == "2 Delivered") {
                    $(tdSalesLineStatus).addClass('rowOk');
                }

                var today = new Date();
            	var axReqReqDate = data["AX_REQUESTED_REQUIREMENT_DATE"];
                var tdAxReqReqDate = $(row).children('td:eq(18)');
                // if tdAxReqReqDate is over today then yellow
                if(Date.parse(axReqReqDate) < today && salesLineStatus != "2 Delivered"){
                    $(tdAxReqReqDate).addClass('rowAttention');
                } else {
                    if(Date.parse(axReqReqDate) < today && salesLineStatus == "2 Delivered"){
                        $(tdAxReqReqDate).addClass('rowOk');
                    } 
                }

                var axConReqDate = data["AX_CONFIRMED_REQUIREMENT_DATE"];
                var tdAxConReqDate = $(row).children('td:eq(19)');
                var dFuture = moment("2049-12-01").toDate();
                var dBlankDate = moment("2000-01-01").toDate();

                // if not filling a date then red
                if (salesLineStatus == "2 Delivered") {
                    $(tdAxConReqDate).addClass('rowOk');
                } else {
                    if(Date.parse(axConReqDate) <= dBlankDate){
                        $(tdAxConReqDate).addClass('rowAttention');
                    } else {
                        if(Date.parse(axConReqDate) >= dFuture){
                            $(tdAxConReqDate).addClass('rowAttention');
                        }else {
                            if (Date.parse(axConReqDate) < today) {
                                $(tdAxConReqDate).addClass('rowDangerous');
                            }
                        }
                    }
                }

                var slaveOrderId = data["SLAVE_ORDER_ID"];
                var tdSlaveOrderId = $(row).children('td:eq(35)');
                // set Slave Order Id color
                if (slaveOrderId != "NA") {
                    $(tdSlaveOrderId).addClass('rowAttention');
                }

                var comments = data["COMMENTS"];
                var tdComments = $(row).children('td:eq(42)');
                // set Comments color
                if (comments != "NA") {
                    $(tdComments).addClass('rowAttention');
                }
                
                var lineConfStatus = data["LINE_CONF_STATUS"];
                var tdLineConfStatus = $(row).children('td:eq(43)');
                // set Line Conf Status color
                if (lineConfStatus == "OK") {
                    $(tdLineConfStatus).addClass('rowOk');
                } else {
                    if (lineConfStatus == "Planner_Confirming_Late") {
                        $(tdLineConfStatus).addClass('rowAttention');
                    } else {
                        if (lineConfStatus == "Conf_Delivery_Date_CANNOT_Meet_Req_Delv_Date") {
                            $(tdLineConfStatus).addClass('rowDangerous');
                        }
                    }
                }

                var reqConfDateDirty = data["REQ_CONF_DATE_DIRTY"];
                var tdReqConfDateDirty = $(row).children('td:eq(44)');
                // set Req Conf Date Dirty color
                if (reqConfDateDirty == "CLEAN") {
                    $(tdReqConfDateDirty).addClass('rowOk');
                } else {
                    $(tdReqConfDateDirty).addClass('rowAttention');
                }

                var delStatus = data["DELIVERY_STATUS"];
                var tdDelStatus = $(row).children('td:eq(45)');
                // set Delivery status color
                if (delStatus == "Delivery_Complete") {
                    $(tdDelStatus).addClass('rowOk');
                } else {
                    $(tdDelStatus).addClass('rowAttention');
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

        $('div.toolbar').html('<b>Only Showing Open and Delivery Sales Lines.</b>');

        $('#tableMesSalesLines tbody').on('mouseenter', 'td', function () {
            var colIdx = myMSL.cell(this).index().column;
     
            $(myMSL.cells().nodes()).removeClass('highlight');
            $(myMSL.column(colIdx).nodes()).addClass('highlight');
        });

        // Add event listener for opening and closing details
        $('#tableMesSalesLines tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var tdi = tr.find("i.fa");
            var row = myMSL.row(tr);

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
                var woSelected = row.data().SLAVE_ORDER_ID;
                var poolIdSelected = row.data().POOL_ID;
                var prodPoolIdSelected = row.data().PROD_POOL_ID;
                var prodCommittedDateSelected = row.data().PROD_COMMITTED_DATE;
                var mesNotesSelected = row.data().MES_NOTES;
             
                $("#faufId").val(woSelected);
                $("#faufIdForWoGantt").val(woSelected);   
                $("#faufIdConfDate").val(woSelected);              

                $("#productionRunId").val(woSelected);
                $("#faufCommittedDate").val(moment((moment(prodCommittedDateSelected).toDate())).format("MM/DD/YYYY"));
                $("#faufMesNotes").val(mesNotesSelected);

                $("#poolNameForPoolGantt").val(prodPoolIdSelected);
                $("#poolIdForPoolGantt").val(poolIdSelected);
                
                tr.addClass('shown');
                tdi.first().removeClass('fa-plus-square');
                tdi.first().addClass('fa-minus-square');
            }
        });

        myMSL.on("user-select", function (e, dt, type, cell, originalEvent) {
            if ($(cell.node()).hasClass("details-control")) {
                e.preventDefault();
            }
        }); 

        // Row selection (multiple rows)
        $('#tableMesSalesLines tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );


};

function format(d){
    // `d` is the original data object for the row
    return '<table class="popout" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
            '<td><input type="hidden" id="myRowID" value="'+ d.ID +'"></td>' +
            '<td><input type="hidden" id="mySalesId" value="'+ d.SALES_ID + '-AXS' +'"></td>' +
            '<td><input type="hidden" id="myLineNum" value="'+ d.LINE_NUM + '"></td>' +
            '<td> <button id="btnEditWoDateAndNote" type="button" class="rowOk" onclick="editOrderNotes()">Edit Order Notes</button> </td>' +
        '</tr>' +	        
    '</table>';  
}

function editOrderNotes(){
    $("#soOrderNoteModal").modal("show");
}

function branchToSoItemNotes() {
    // var myRowID = $("#myRowID").val();
    var salesId = $("#mySalesId").val();
    var myLineNum = $("#myLineNum").val();
    var myLineNumInMes = myLineNum*10000;
    // be careful!!!
    // Remember to close the + sign before clicking the next one

    $("#soOrderNoteModal").modal("hide");
    window.open("/ordermgr/control/EditOrderItemComments?orderId=" + salesId + "&orderItemSeqId=" + myLineNumInMes);
}

function updateNotesForSoAllLines(){
    var salesId = $("#mySalesId").val();
	var notesForSo = $("#notesForAllSoLines").val();
    var currentUser = getCookie("mesUser");
  
	var url= "/ordermgr/control/UpdateNoteForSoAllLines";
  	var args = {
                "salesId":salesId,
                "notesForSo":notesForSo,
                "currentUser":currentUser
            };

  	$.post(url, args,
            function(data){
                $("#soOrderNoteModal").modal("hide");
          });
    return false;
}