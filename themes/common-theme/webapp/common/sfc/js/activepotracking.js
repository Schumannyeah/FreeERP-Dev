$(document).ready(function() {

    $('#txtStartFromPDS').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date().setDate(new Date().getDate() + 30)
      });
    
    $('#txtEndToPDE').datetimepicker({
        timepicker:false,
        format:'m/d/Y',
        defaultDate: new Date()
      });

    // Setup - add a text input to each footer cell
    $('#tableActivePoTracking tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="' + title + '" />');
    });

} );

function showActivePoTracking() {
    var myAPT = $('#tableActivePoTracking').DataTable({
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
            "url": "/ordermgr/control/ShowActivePoTracking",
            "dataType": 'json',
            "data": {
                "purchId": $("#txtPurchId").val(),
                "startDate": $("#txtStartFromPDS").val(),
                "endDate": $("#txtEndToPDE").val(),
            },
            "dataSrc": function(d){
                return d.listActivePo;
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
            { data: "PURCH_ID" },
            { data: "LINE_NUM" },
            { data: "ITEM_ID" },
            { data: "LINE_TEXT" },
            { data: "SOURCING" },
            { data: "BUYER" },
            { data: "PURCH_QTY" },
            { data: "PURCH_RECEIVED_NOW" },
            { data: "CONFIRMATION_KEY" },
            {
                "orderable": true,
                "data": "CREATED_DATE",
                "render": function (date) {
                    return moment(date).format("YYYY-MM-DD");
                }
            },
            {
                "orderable": true,
                "data": "DELIVERY_DATE",
                "render": function (date) {
                    return moment(date).format("YYYY-MM-DD");
                }
            },
            {
                "orderable": true,
                "data": "CONFIRMED_DLV",
                "render": function (date) {
                    return moment(date).format("YYYY-MM-DD");
                }
            },
            {
                "orderable": true,
                "data": "FOLLOW_UP_DATE",
                "render": function (date) {
                    return moment(date).format("YYYY-MM-DD");
                }
            },
            { data: "VENDOR" },
            { data: "DLV_RISK" },
            { data: "LAST_MODIFIER" },
            { data: "MES_REMARK" },
            { data: "AX_CREATOR" },
            { data: "AX_MODIFIER" }
        ],
        "order": [[10, 'asc'],[11, 'asc']],
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
            var tdPurchId = $(row).children('td:eq(1)');
            var tdLineNum = $(row).children('td:eq(2)');
            var tdItemId = $(row).children('td:eq(3)');
            var tdLineText = $(row).children('td:eq(4)');

            $(tdPluss).addClass('mesfixedcol');
            $(tdPurchId).addClass('mesfixedcol');
            $(tdLineNum).addClass('mesfixedcol');
            $(tdItemId).addClass('mesfixedcol');
            $(tdLineText).addClass('mesfixedcol');

            var purchQty = data["PURCH_QTY"];
            var tdPurchQty = $(row).children('td:eq(7)');
            if (purchQty == 0) {
                $(tdPurchQty).addClass('rowDangerous');
            }

            var confKey = data["CONFIRMATION_KEY"];
            var tdConfKey = $(row).children('td:eq(9)');
            // set Sales Line Status color, but could have been override by the class mesfixedcol
            if (confKey == "AS_PROMISED") {
                $(tdConfKey).addClass('rowOk');
            } else {
                if (confKey == "LATE_PROMISED") {
                    $(tdConfKey).addClass('rowAttention');
                } else {
                    $(tdConfKey).addClass('rowDangerous'); 
                }
            }

            var today = new Date();
            var dFuture = moment("2049-12-01").toDate();
            var dBlankDate = moment("2000-01-01").toDate();
            var delDate = data["DELIVERY_DATE"];
            var tdDelDate = $(row).children('td:eq(11)');
            if(Date.parse(delDate) < dBlankDate){
                $(tdDelDate).addClass('rowDangerous');
            }

            var confDlv = data["CONFIRMED_DLV"];
            var tdConfDel = $(row).children('td:eq(12)');
            if(Date.parse(confDlv) < dBlankDate){
                $(tdConfDel).addClass('rowAttention');
            } else {
                if(Date.parse(confDlv) > Date.parse(delDate)){
                    $(tdConfDel).addClass('rowDangerous');
                } else {
                    $(tdConfDel).addClass('rowOk');
                }
            }

            var followUpDate = data["FOLLOW_UP_DATE"];
            var tdFollowUpDate = $(row).children('td:eq(13)');
            if(Date.parse(followUpDate) >= dFuture){
                // meaning not needed or suggested to be cancelled
                $(tdConfDel).addClass('rowOk');
            } else {
                if(Date.parse(followUpDate) > Date.parse(confDlv)){
                    $(tdFollowUpDate).addClass('rowAttention');
                } else {
                    $(tdFollowUpDate).addClass('rowDangerous'); 
                }
            }

            var dlvRisk = data["DLV_RISK"];
            var tdDlvRisk = $(row).children('td:eq(15)');
            if (dlvRisk == "H") {
                $(tdDlvRisk).addClass('rowDangerous');
            } else {
                if (dlvRisk == "M") {
                    $(tdDlvRisk).addClass('rowAttention');
                } else {
                    $(tdDlvRisk).addClass('rowOk'); 
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

    $('div.toolbar').html('<b>Only Showing Active PO Lines.</b>');

    $('#tableActivePoTracking tbody').on('mouseenter', 'td', function () {
        var colIdx = myAPT.cell(this).index().column;
 
        $(myAPT.cells().nodes()).removeClass('highlight');
        $(myAPT.column(colIdx).nodes()).addClass('highlight');
    });

    // Add event listener for opening and closing details
    $('#tableActivePoTracking tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = myAPT.row(tr);

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

    myAPT.on("user-select", function (e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
    }); 

    // Row selection (multiple rows)
    $('#tableActivePoTracking tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );
}

function format(d){
    // `d` is the original data object for the row
    return '<table class="popout" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
            '<td><input type="hidden" id="myRowID" value="'+ d.ID +'"></td>' +
            '<td><input type="hidden" id="myPurchId" value="'+ d.PURCH_ID +'"></td>' +
            '<td><input type="hidden" id="myLineNum" value="'+ d.LINE_NUM + '"></td>' +
            '<td> <button id="btnFollowUpPoLine" type="button" class="rowOk" onclick="followUpPoLine()">Follow up PO Line</button> </td>' +
            '<td> <button id="btnPoLineInv" type="button" class="rowWarning" onclick="registerPoLineInv()">Register invoice for PO Line</button> </td>' +
        '</tr>' +	        
    '</table>';  
}

function followUpPoLine(){
    // $("#soOrderNoteModal").modal("show");
    var myPurchId = $("#myPurchId").val();
    // var myLineNum = $("#myLineNum").val();  
    var myLineNum = $("#myLineNum").val();
    var newLineNum = parseFloat(myLineNum).toFixed(3);

    // console.log(newLineNum);
    // be careful!!!
    // Remember to close the + sign before clicking the next one

    // $("#soOrderNoteModal").modal("hide");
    window.open("/ordermgr/control/FollowUpPoLine?purchId=" + myPurchId + "&lineNum=" + newLineNum);
}

function registerPoLineInv(){
    var myPurchId = $("#myPurchId").val();
    var myLineNum = $("#myLineNum").val();
    var newLineNum = parseFloat(myLineNum).toFixed(3);

    // console.log(newLineNum);
    // be careful!!!
    // Remember to close the + sign before clicking the next one

    // $("#soOrderNoteModal").modal("hide");
    window.open("/ordermgr/control/RegisterPoLineInv?purchId=" + myPurchId + "&lineNum=" + newLineNum);
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