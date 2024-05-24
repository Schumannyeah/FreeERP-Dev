$(document).ready(function() {    
    // Setup - add a text input to each footer cell
    $('#tableMesShipLines tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');
    });
    
    // $(window).resize(setTimeout(respondCanvas, 500));
    // showMesShipLines();

    hideSoNoShipLines();    
} );

function hideSoNoShipLines(){
    $("#mesSoNoShipLines").fadeOut("slow");
    $("#mesShipLines").fadeIn("slow");
}

function showMesSoNoShip(){
    showSoNoShipLineDiv();
    showMesSoNoShipLines();
}

function showSoNoShipLineDiv(){
    // Setup - add a text input to each footer cell
    $('#tableMesSoNoShipLines tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');
    });

    $("#mesShipLines").fadeOut("slow");
    $("#mesSoNoShipLines").fadeIn("slow");
}

function showMesShipLines(){
    hideSoNoShipLines();   

    var myMSL = $('#tableMesShipLines').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '55vh',
            "scrollCollapse": true,
            "fixedColumns":   {
                left: 5
            },
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/ordermgr/control/ShowMesShipLines",
                "data": function(d){
                    d.startDate = $("#startDate").val(),
                    d.endDate = $("#endDate").val()
                    },
                "dataSrc": function(d){
                    return d.listShipLines;
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
                { data: "LINE_TYPE" },
                { data: "SHIPMENT_ID" },
                { data: "SHIPMENT_NAME" },
                { data: "LINE_NUM" },
                { data: "DLV_LOCATION" },
                { data: "DLV_TERM" },
                { data: "DLV_MODE" },
                { data: "DESC_OF_GOODS" },
                { data: "MARKS_AND_NUM" },
                { data: "FREE_TEXT" },
                { data: "PROJECT" },
                { data: "DEPARTMENT" },
                { data: "WAYBILL_NO" },
                { data: "SHIPMENT_STATUS_LINE" },
                { data: "SALES_LINE_STATUS" },
                { data: "CUSTOMER" },
                { data: "DELIVERY_NAME" },
                { data: "CUSTOMERS_ORDER" },
                { data: "CUSTOMERS_REF" },
                { data: "SALES_ID_LINE" },
                { data: "SALES_ID_HEADER" },
                { data: "ITEM_ID" },
                { data: "ITEM_NAME" },
                { data: "SHIP_LINE_QTY" },
                { data: "SALES_QTY_INVCD" },
                { data: "SALES_QTY" },
                { data: "REMAIN_SALES_PHYSICAL" },
                { data: "WAREHOUSE" },
                { data: "NET_WEIGHT" },
                { data: "PACKAGE_ID_NUM" },
                { data: "SALES_UNIT_ID" },
                { data: "TAG_NUMBER" },

                {
                	"orderable": true,
		            "data": "SO_LINE_CREATED_DATE",
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
                {
                	"orderable": true,
		            "data": "SHIP_DATE_EXPECTED",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                {
                	"orderable": true,
		            "data": "SHIP_DATE_SENT",
		            "render": function (date) {
		            	return moment(date).format("YYYY-MM-DD");
		            }
                },
                { data: "COMMENTS" }
            ],
            "order": [[2, 'asc'],[4, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "createdRow": function( row, data, dataIndex ) {
                // add class to left fixed columns
                var tdPluss = $(row).children('td:eq(0)');
	           	var tdLineType = $(row).children('td:eq(1)');
	           	var tdShipmentId = $(row).children('td:eq(2)');
	           	var tdShipmentName = $(row).children('td:eq(3)');
	           	var tdLineNum = $(row).children('td:eq(4)');
	           	$(tdPluss).addClass('mesfixedcol');
                $(tdLineType).addClass('mesfixedcol');
                $(tdShipmentId).addClass('mesfixedcol');
                $(tdShipmentName).addClass('mesfixedcol');
                $(tdLineNum).addClass('mesfixedcol');

                var shipmentStatusLine = data["SHIPMENT_STATUS_LINE"];
                var salesLineStatus = data["SALES_LINE_STATUS"];
                var tdShipmentStatusLine = $(row).children('td:eq(14)');
	           	var tdSalesLineStatus = $(row).children('td:eq(15)');
                
                // set Shipment Line Status color
                if (shipmentStatusLine == "5 Sent") {
                    $(tdShipmentStatusLine).addClass('rowOk');
                }

                // set Sales Line Status color
                if (salesLineStatus == "3 Invoiced") {
                    $(tdSalesLineStatus).addClass('rowOk');
                } else {
                    $(tdSalesLineStatus).addClass('rowAttention');
                }

                var today = new Date();
            	var axReqReqDate = data["AX_REQUESTED_REQUIREMENT_DATE"];
                var tdAxReqReqDate = $(row).children('td:eq(34)');
                // if tdAxReqReqDate is over today then yellow
                if(Date.parse(axReqReqDate) < today && salesLineStatus != "2 Delivered"){
                    $(tdAxReqReqDate).addClass('rowAttention');
                } else {
                    if(Date.parse(axReqReqDate) < today && salesLineStatus == "2 Delivered"){
                        $(tdAxReqReqDate).addClass('rowOk');
                    } 
                }

                var axConReqDate = data["AX_CONFIRMED_REQUIREMENT_DATE"];
                var tdAxConReqDate = $(row).children('td:eq(35)');
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

                var shipDateSent = data["SHIP_DATE_SENT"];
                var tdShipDateSent = $(row).children('td:eq(37)');
                // if shipDateSent is over tdAxConReqDate, then red, otherwise green
                if (shipmentStatusLine == "5 Sent") {
                    if(Date.parse(axConReqDate) < Date.parse(shipDateSent)){
                        $(tdShipDateSent).addClass('rowDangerous');
                    } else {
                        $(tdShipDateSent).addClass('rowOk');
                    }
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

        $('div.toolbar').html('<b>Only Showing Ship Lines Status.</b>');

        $('#tableMesShipLines tbody').on('mouseenter', 'td', function () {
            var colIdx = myMSL.cell(this).index().column;
     
            $(myMSL.cells().nodes()).removeClass('highlight');
            $(myMSL.column(colIdx).nodes()).addClass('highlight');
        });

        // Add event listener for opening and closing details
        $('#tableMesShipLines tbody').on('click', 'td.details-control', function () {
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
        $('#tableMesShipLines tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );

};

function format(d){
    // `d` is the original data object for the row
    return '<table class="popout" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
            '<td><input type="hidden" id="myRowID" value="'+ d.id +'"></td>' +
            '<td colspan="9"><input type="hidden" id="myFaufNr' + d.id + '" value="'+ d.prodid +'">'+
            '<td> <button id="btnEditWoDateAndNote" type="button" class="rowOk" onclick="editFaufDateAndNote()">Edit Committed Date and Notes</button> </td>' +
            '<td> <button id="btnShowWoGantt" type="button" class="rowWarning" onclick="showFaufGantt()">Show WO Gantt</button> </td>' +
            '<td> <button id="btnShowAxNotesGantt" type="button" class="rowTeal" onclick="showAxNotesGanttModal()">Show Ax Notes Gantt</button> </td>' +
        '</tr>' +	        
    '</table>';  
}

function showMesSoNoShipLines(){
    var myMSNSL = $('#tableMesSoNoShipLines').DataTable({
            "destroy": true,
            "processing": true,
            "ordering": true,
            "info": true,
            "searching": true,
            "scrollX":   true,
            "scrollY": '55vh',
            "scrollCollapse": true,
            "fixedColumns":   {
                left: 5
            },
            "dom": '<"top"Bf>rt<"bottom"iflp><"clear">',
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "ajax": {
                "url": "/ordermgr/control/ShowMesSoNoShipLines",
                "data": function(d){
                    d.startDate = $("#startDate").val(),
                    d.endDate = $("#endDate").val()
                    },
                "dataSrc": function(d){
                    return d.listSoNoShipLines;
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
                { data: "LINE_TYPE" },
                { data: "SHIPMENT_STATUS_LINE" },
                { data: "SALES_ID_SO_LINE" },
                { data: "SO_LINE_NUM" },
                { data: "SALES_LINE_STATUS" },
                { data: "CUSTOMER" },
                { data: "DELIVERY_NAME" },
                { data: "CUSTOMERS_ORDER" },
                { data: "CUSTOMERS_REF" },               
                { data: "SALES_QTY" },
                { data: "REMAIN_SALES_PHYSICAL" },
                {
                	"orderable": true,
		            "data": "SO_LINE_CREATED_DATE",
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
                { data: "COMMENTS" }
            ],
            "order": [[3, 'asc'],[4, 'asc']],
            "select": {
                style:    'os',
                selector: 'td:first-child'
            },
            "buttons": [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            "createdRow": function( row, data, dataIndex ) {
                // add class to left fixed columns
                var tdPluss = $(row).children('td:eq(0)');
	           	var tdLineType = $(row).children('td:eq(1)');
	           	var tdShipmentStatusLine = $(row).children('td:eq(2)');
	           	var tdSalesIdSoLine = $(row).children('td:eq(3)');
	           	var tdSoLineNum = $(row).children('td:eq(4)');
	           	$(tdPluss).addClass('mesfixedcol');
                $(tdLineType).addClass('mesfixedcol');
                $(tdShipmentStatusLine).addClass('mesfixedcol');
                $(tdSalesIdSoLine).addClass('mesfixedcol');
                $(tdSoLineNum).addClass('mesfixedcol');

                var shipmentStatusLine = data["SHIPMENT_STATUS_LINE"];
                var salesLineStatus = data["SALES_LINE_STATUS"];
                var tdShipmentStatusLine = $(row).children('td:eq(2)');
	           	var tdSalesLineStatus = $(row).children('td:eq(5)');
                
                // set Shipment Line Status color
                if (shipmentStatusLine == "5 Sent") {
                    $(tdShipmentStatusLine).addClass('rowOk');
                }

                // set Sales Line Status color
                if (salesLineStatus == "2 Delivered" || salesLineStatus == "3 Invoiced") {
                    $(tdSalesLineStatus).addClass('rowOk');
                } else {
                    $(tdSalesLineStatus).addClass('rowAttention');
                }

                var today = new Date();
            	var axReqReqDate = data["AX_REQUESTED_REQUIREMENT_DATE"];
                var tdAxReqReqDate = $(row).children('td:eq(13)');
                // if tdAxReqReqDate is over today then yellow
                if(Date.parse(axReqReqDate) < today && salesLineStatus == "1 Open order"){
                    $(tdAxReqReqDate).addClass('rowAttention');
                } else {
                    if(Date.parse(axReqReqDate) < today){
                        if(salesLineStatus == "2 Delivered" || salesLineStatus == "3 Invoiced"){
                            $(tdAxReqReqDate).addClass('rowOk');
                        }
                    } 
                }

                var axConReqDate = data["AX_CONFIRMED_REQUIREMENT_DATE"];
                var tdAxConReqDate = $(row).children('td:eq(14)');
                var dFuture = moment("2049-12-01").toDate();
                var dBlankDate = moment("2000-01-01").toDate();

                // if not filling a date then red
                if (salesLineStatus == "2 Delivered" || salesLineStatus == "3 Invoiced") {
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

        $('div.toolbar').html('<b>Only Showing SO No Ship Lines Status.</b>');

        $('#tableMesSoNoShipLines tbody').on('mouseenter', 'td', function () {
            var colIdx = myMSNSL.cell(this).index().column;
     
            $(myMSNSL.cells().nodes()).removeClass('highlight');
            $(myMSNSL.column(colIdx).nodes()).addClass('highlight');
        });

        // Add event listener for opening and closing details
        $('#tableMesSoNoShipLines tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var tdi = tr.find("i.fa");
            var row = myMSNSL.row(tr);

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

        myMSNSL.on("user-select", function (e, dt, type, cell, originalEvent) {
            if ($(cell.node()).hasClass("details-control")) {
                e.preventDefault();
            }
        }); 

        // Row selection (multiple rows)
        $('#tableMesSoNoShipLines tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );


};