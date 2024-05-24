
$(document).ready(function () {
    $("#ta").hide();
    $("#originLoad").hide();
    $("#ndo").hide();

    if (getCookie("directOpenAxNotes") === "Yes") {
        ajaxLoadAxNotesGantt();
    } else {
        // check if there is key set in localStorage
        if (localStorage.getItem("directOpenAxNotes") === "Yes") {
            setCookie("directOpenAxNotes",localStorage.getItem("directOpenAxNotes"),"","");
            setCookie("directOpenFauf",localStorage.getItem("directOpenFauf"),"","");
            setCookie("directOpenPool",localStorage.getItem("directOpenPool"),"","");
            setCookie("directOpenResource",localStorage.getItem("directOpenResource"),"","");
            setCookie("schType",localStorage.getItem("schType"),"","");
            setCookie("faufActiveForAxNotes",localStorage.getItem("faufActiveForAxNotes"),"","");
            setCookie("axNotes",localStorage.getItem("axNotes"),"","");
            
            setCookie("startForAxNotes",localStorage.getItem("startForAxNotes"),"","");
            setCookie("endForAxNotes",localStorage.getItem("endForAxNotes"),"","");

            // to remove all items from localStorage
            // so that it won't interfere with Ofbiz function
            //localStorage.clear();
            localStorage.removeItem("directOpenAxNotes");
            localStorage.removeItem("directOpenFauf");
            localStorage.removeItem("directOpenPool");
            localStorage.removeItem("directOpenResource");
            localStorage.removeItem("schType");
            localStorage.removeItem("faufActiveForAxNotes");
            localStorage.removeItem("axNotes");
            localStorage.removeItem("startForAxNotes");
            localStorage.removeItem("endForAxNotes");

            setCookie("directOpenAxNotes","No","","");

            ajaxLoadAxNotesGantt();
        } else {

            if (getCookie("directOpenFauf") === "Yes" && getCookie("faufNrForGantt") != "" && getCookie("faufNrForGantt") !== null) {
                ajaxLoadFaufGantt();
            } else {
                // check if there is key set in localStorage
                if (localStorage.getItem("directOpenFauf") === "Yes") {
                    setCookie("faufNrForGantt",localStorage.getItem("faufNrForGantt"),"","");
                    setCookie("directOpenFauf",localStorage.getItem("directOpenFauf"),"","");
                    setCookie("directOpenPool",localStorage.getItem("directOpenPool"),"","");
                    setCookie("directOpenResource",localStorage.getItem("directOpenResource"),"","");
                    setCookie("schType",localStorage.getItem("schType"),"","");

                    // to remove all items from localStorage
                    // so that it won't interfere with Ofbiz function
                    //localStorage.clear();
                    localStorage.removeItem("faufNrForGantt");
                    localStorage.removeItem("directOpenFauf");
                    localStorage.removeItem("directOpenPool");
                    localStorage.removeItem("directOpenResource");
                    localStorage.removeItem("schType");

                    ajaxLoadFaufGantt();
                } else {
                    if (getCookie("directOpenResource") === "Yes"  && getCookie("resourceForGantt") != "" && getCookie("resourceForGantt") !== null) {
                        ajaxLoadResourceGantt();
                    } else {
                        // check if there is key set in localStorage
                        if (localStorage.getItem("directOpenResource") === "Yes") {
                            setCookie("resourceForGantt",localStorage.getItem("resourceForGantt"),"","");
                            setCookie("directOpenFauf",localStorage.getItem("directOpenFauf"),"","");
                            setCookie("directOpenPool",localStorage.getItem("directOpenPool"),"","");
                            setCookie("directOpenResource",localStorage.getItem("directOpenResource"),"","");
                            setCookie("schType",localStorage.getItem("schType"),"","");
                            setCookie("resourceStartForGantt",localStorage.getItem("resourceStartForGantt"),"","");
                            setCookie("resourceEndForGantt",localStorage.getItem("resourceEndForGantt"),"","");
                            setCookie("faufActiveForResource",localStorage.getItem("faufActiveForResource"),"","");

                            // to remove all items from localStorage
                            // so that it won't interfere with Ofbiz function
                            //localStorage.clear();
                            localStorage.removeItem("resourceForGantt");
                            localStorage.removeItem("directOpenFauf");
                            localStorage.removeItem("directOpenPool");
                            localStorage.removeItem("directOpenResource");
                            localStorage.removeItem("schType");
                            localStorage.removeItem("resourceStartForGantt");
                            localStorage.removeItem("resourceEndForGantt");
                            localStorage.removeItem("faufActiveForResource");

                            ajaxLoadResourceGantt();
                        }
                        else {
                            if (getCookie("directOpenPool") === "Yes" && getCookie("poolForGantt") != "" && getCookie("poolForGantt") !== null) {
                                ajaxLoadPoolGantt();
                            } else {
                                // check if there is key set in localStorage
                                if (localStorage.getItem("directOpenPool") === "Yes") {
                                    setCookie("poolForGantt",localStorage.getItem("poolForGantt"),"","");
                                    setCookie("directOpenFauf",localStorage.getItem("directOpenFauf"),"","");
                                    setCookie("directOpenPool",localStorage.getItem("directOpenPool"),"","");
                                    setCookie("directOpenResource",localStorage.getItem("directOpenResource"),"","");
                                    setCookie("schType",localStorage.getItem("schType"),"","");
                                    setCookie("poolStartForGantt",localStorage.getItem("poolStartForGantt"),"","");
                                    setCookie("poolEndForGantt",localStorage.getItem("poolEndForGantt"),"","");
                                    setCookie("faufActiveForPool",localStorage.getItem("faufActiveForPool"),"","");

                                    // to remove all items from localStorage
                                    // so that it won't interfere with Ofbiz function
                                    //localStorage.clear();
                                    localStorage.removeItem("poolForGantt");
                                    localStorage.removeItem("directOpenFauf");
                                    localStorage.removeItem("directOpenPool");
                                    localStorage.removeItem("directOpenResource");
                                    localStorage.removeItem("schType");
                                    localStorage.removeItem("poolStartForGantt");
                                    localStorage.removeItem("poolEndForGantt");
                                    localStorage.removeItem("faufActiveForPool");

                                    ajaxLoadPoolGantt();
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // then set cookie directOpen to "No" so that auto ajaxLoadFaufGantt() won't activate
    //setCookie("directOpen","No","","");
});

// format date function dated on 20221008 by Schumann
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

//jQuery by Schumi 20160909
function toggleProjects() {
    $("#ndo").toggle();
}
;

function loadProjectsWoDependsPrj() {
    var prj = $("#ddlList").val();
    //var url= "/kmcj/ganttServlet";
    var url = "/kmcj/planDatewoDepends.gantt";
    var args = {"time": new Date(), "projectName": prj, "tableName": "gantt"};

    $.post(url, args,
            function (data) {
                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();
            });
    return false;
}
;

function loadProjectsWDependsPrj() {
    var prj = $("#ddlList").val();
    //var url= "/kmcj/ganttServlet";
    var url = "/kmcj/planDatewDepends.gantt";
    var args = {"time": new Date(), "projectName": prj, "tableName": "gantt"};

    $.post(url, args,
            function (data) {
                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();
            });
    return false;
}
;

function loadProjectsWoDependsLog() {
    var prj = $("#ddlList").val();
    //var url= "/kmcj/ganttServlet";
    var url = "/kmcj/planDatewoDepends.gantt";
    var args = {"time": new Date(), "projectName": prj, "tableName": "gantt_logistic"};

    $.post(url, args,
            function (data) {
                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();
            });
    return false;
}
;

function loadProjectsWDependsPrd() {
    var prj = $("#ddlList").val();
    //var url= "/kmcj/ganttServlet";
    var url = "/kmcj/planDatewDepends.gantt";
    var args = {"time": new Date(), "projectName": prj, "tableName": "gantt_prod"};

    $.post(url, args,
            function (data) {
                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();
            });
    return false;
}
;

function loadProjectsWoDependsPrd() {
    var prj = $("#ddlList").val();
    //var url= "/kmcj/ganttServlet";
    var url = "/kmcj/planDatewoDepends.gantt";
    var args = {"time": new Date(), "projectName": prj, "tableName": "gantt_prod"};

    $.post(url, args,
            function (data) {
                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();
            });
    return false;
}
;

function loadProjectsWDependsLog() {
    var prj = $("#ddlList").val();
    //var url= "/kmcj/ganttServlet";
    var url = "/kmcj/planDatewDepends.gantt";
    var args = {"time": new Date(), "projectName": prj, "tableName": "gantt_logistic"};

    $.post(url, args,
            function (data) {
                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();
            });
    return false;
}
;

function sendEmail() {
    alert("you got me");
}
;


function ajaxPost() {
    // Using the core $.ajax() method
    var url = "/kmcj/ganttServlet";
    var args = {"time": new Date(), "projectName": $("#projectName").val()};

    $.post(url, args,
            function (data) {
                //Option 1: need Conversion
                //var jsonObj = eval("(" + data + ")");
                //$.each(jsonObj,function(idx,item){
                //	alert(item.ID + " - " + item.UserID);
                //})

                //Option 2: Original Ajax
                //var result = request.responseText;
                //var jsonObj = eval("(" + result + ")");
                //var name = result.UserID;
                //alert(name);

                //Option 3: looping
                //$.each(data,function(idx,item){
                //  	alertt(item.ID + " - " + item.UserID);
                //});

                //Option 4: looping
                //for(var key in Data){
                //alert(key);
                //alert(data[key].ID);

                //} 

                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();

            });
    return false;
}
;




var ge;  //this is the hugly but very friendly global var for the gantt editor
$(function () {

    //load templates
    //Schumi Step 1:The id "ganttemplates" could not be found in the gantt.html
    $("#ganttemplates").loadTemplates();

    // here starts gantt initialization
    //Schumi Step 2: call ganttMaster.js
    ge = new GanttMaster();
    var workSpace = $("#workSpace");
    workSpace.css({width: $(window).width() - 20, height: $(window).height() - 100});
    ge.init(workSpace);

    //inject some buttons (for this demo only)
    $(".ganttButtonBar div").append("<button onclick='clearGantt();' class='button btn-group pull-right theme-container animated tada'>Clear</button>")
            .append("<span class='ganttButtonSeparator'></span>")
            .append("<button onclick='savePlanInFileDirectory();' class='button btn-group pull-right theme-container animated tada'>Export</button>")
            .append("&nbsp;")
            .append("<button onclick='importFileFromServerDirectory();' class='button btn-group pull-right theme-container animated tada'>Import</button>")
            .append("<span class='ganttButtonSeparator'></span>")
            //.append("<button onclick='importFromSQLDatabase();' class='button btn-group pull-right theme-container animated tada' style='background-color: #42c10a'>Import From DB</button>")
            //.append("<button onclick='remindingFunc();' class='button btn-group pull-right theme-container animated tada' style='background-color: red' title='批�?�?��?项目�??醒邮件'>Reminder</button>")
            .append("<button onclick='popoutProjectGanttSelector();' class='button btn-group pull-right theme-container animated tada' style='background-color: #42c10a' title='Filtered by Ax Notes'>Project Gantt</button>")
            .append("<button onclick='popoutResourceGanttSelector();' class='button btn-group pull-right theme-container animated tada' style='background-color: red' title='Select Work Center to Schedule'>Resource Gantt</button>")
            .append("<button onclick='popoutPoolGanttSelector();' class='button btn-group pull-right theme-container animated tada' style='background-color: #FEA730' title='Select Pool to Schedule'>Pool Gantt</button>")
            .append("<button onclick='otherFunc();' class='button btn-group pull-right theme-container animated tada' style='background-color: blue'>WO Gantt</button>");
    $(".ganttButtonBar h1").html("<a href='https://10.204.41.13/manufacturing/control/GanttScheduling' title='Determined Innovative Collaberative Reliable' target='_blank'><img width='80%' src='/common/sfc/res/schumi_portrait.jpg'></a>");
    $(".ganttButtonBar div").addClass('buttons');
    //overwrite with localized ones
    loadI18n();

    //simulate a data load from a server.
//   loadGanttFromServer();

    $(function () {
        $(".select").bind("change", function () {
            if (this.value == "CZ")
                $(this).css("background-color", "red");
            else
                $(this).css("background-color", "green");
        });
    });

    //fill default Teamwork roles if any
    if (!ge.roles || ge.roles.length == 0) {
        setRoles();
    }

    //fill default Resources roles if any
    if (!ge.resources || ge.resources.length == 0) {
        setResource();
    }


    /*/debug time scale
     $(".splitBox2").mousemove(function(e){
     var x=e.clientX-$(this).offset().left;
     var mill=Math.round(x/(ge.gantt.fx) + ge.gantt.startMillis)
     $("#ndo").html(x+" "+new Date(mill))
     });*/

    $(window).resize(function () {
        workSpace.css({width: $(window).width() - 1, height: $(window).height() - workSpace.position().top});
        workSpace.trigger("resize.gantt");
    }).oneTime(150, "resize", function () {
        $(this).trigger("resize")
    });

});


function loadGanttFromServer(taskId, callback) {

    //this is a simulation: load data from the local storage if you have already played with the demo or a textarea with starting demo data
    //Original function, comment it out when showing the demo
    //loadFromLocalStorage();

    loadSchumisData();

    //this is the real implementation
    /*
     //var taskId = $("#taskSelector").val();
     var prof = new Profiler("loadServerSide");
     prof.reset();
     
     $.getJSON("ganttAjaxController.jsp", {CM:"LOADPROJECT",taskId:taskId}, function(response) {
     //console.debug(response);
     if (response.ok) {
     prof.stop();
     
     ge.loadProject(response.project);
     ge.checkpoint(); //empty the undo stack
     
     if (typeof(callback)=="function") {
     callback(response);
     }
     } else {
     jsonErrorHandling(response);
     }
     });
     */
}
;


function saveGanttOnServer() {
    if (!ge.canWrite)
        return;

    //this is a simulation: save data to the local storage or to the textarea
    saveInLocalStorage();

    //now call ajax to download file locally
    var url = "/kmcj/project.excl";
    //var args = {"time":new Date(),"downfilename":$("#ganttList").val()};
    var args = {"time": new Date(), "content": $("#ta").val()};

    //$("#ta").val(JSON.stringify(prj));
    $.post(url, args,
            function (data) {
// 	  			$("#ta").hide();
// 	  			$("#sendProjectName").hide();
// 	  			$("#originLoad").hide();
            });
    //return false;

    /*
     var prj = ge.saveProject();
     
     delete prj.resources;
     delete prj.roles;
     
     var prof = new Profiler("saveServerSide");
     prof.reset();
     
     if (ge.deletedTaskIds.length>0) {
     if (!confirm("TASK_THAT_WILL_BE_REMOVED\n"+ge.deletedTaskIds.length)) {
     return;
     }
     }
     
     $.ajax("ganttAjaxController.jsp", {
     dataType:"json",
     data: {CM:"SVPROJECT",prj:JSON.stringify(prj)},
     type:"POST",
     
     success: function(response) {
     if (response.ok) {
     prof.stop();
     if (response.project) {
     ge.loadProject(response.project); //must reload as "tmp_" ids are now the good ones
     } else {
     ge.reset();
     }
     } else {
     var errMsg="Errors saving project\n";
     if (response.message) {
     errMsg=errMsg+response.message+"\n";
     }
     
     if (response.errorMessages.length) {
     errMsg += response.errorMessages.join("\n");
     }
     
     alert(errMsg);
     }
     }
     
     });
     */
}
;


//-------------------------------------------  Create some demo data ------------------------------------------------------
function setRoles() {
    ge.roles = [
        {
            id: "tmp_1",
            name: "Project Manager"
        },
        {
            id: "tmp_2",
            name: "Worker"
        },
        {
            id: "tmp_3",
            name: "Stakeholder/Customer"
        }
    ];
}
;

function setResource() {
    var res = [];
    for (var i = 1; i <= 10; i++) {
        res.push({id: "tmp_" + i, name: "Resource " + i});
    }
    ge.resources = res;
}
;

function clearGantt() {
    ge.reset();
}
;

//Schumi: added for project selection
function reloadProject() {
    $("#trueSubmit").submit();
    //$("#sendProjectName").click();
}
;

function loadI18n() {
    GanttMaster.messages = {
        "CANNOT_WRITE": "CANNOT_WRITE",
        "CHANGE_OUT_OF_SCOPE": "NO_RIGHTS_FOR_UPDATE_PARENTS_OUT_OF_EDITOR_SCOPE",
        "START_IS_MILESTONE": "START_IS_MILESTONE",
        "END_IS_MILESTONE": "END_IS_MILESTONE",
        "TASK_HAS_CONSTRAINTS": "TASK_HAS_CONSTRAINTS",
        "GANTT_ERROR_DEPENDS_ON_OPEN_TASK": "GANTT_ERROR_DEPENDS_ON_OPEN_TASK",
        "GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK": "GANTT_ERROR_DESCENDANT_OF_CLOSED_TASK",
        "TASK_HAS_EXTERNAL_DEPS": "TASK_HAS_EXTERNAL_DEPS",
        "GANTT_ERROR_LOADING_DATA_TASK_REMOVED": "GANTT_ERROR_LOADING_DATA_TASK_REMOVED",
        "ERROR_SETTING_DATES": "ERROR_SETTING_DATES",
        "CIRCULAR_REFERENCE": "CIRCULAR_REFERENCE",
        "CANNOT_DEPENDS_ON_ANCESTORS": "CANNOT_DEPENDS_ON_ANCESTORS",
        "CANNOT_DEPENDS_ON_DESCENDANTS": "CANNOT_DEPENDS_ON_DESCENDANTS",
        "INVALID_DATE_FORMAT": "INVALID_DATE_FORMAT",
        "TASK_MOVE_INCONSISTENT_LEVEL": "TASK_MOVE_INCONSISTENT_LEVEL",

        "GANTT_QUARTER_SHORT": "trim.",
        "GANTT_SEMESTER_SHORT": "sem."
    };
}
;

//-------------------------------------------  Load project file as JSON  ------------------------------------------------------
function loadFile() {
    //this is the real implementation
    //var taskId = $("#taskSelector").val();

// 	  var prof = new Profiler("loadServerSide");
// 	  prof.reset();
// 	alert("Inside");
// 	  $.getJSON("/kmcj/gantt/ganttAjaxController.jsp?ppath=/project.json", function(response) {
// 	    console.debug(response);
// 	    if (response.ok) {
// 	      prof.stop();

// 	      ge.loadProject(response.project);
// 	      ge.checkpoint(); //empty the undo stack

// 	      if (typeof(callback)=="function") {
// 	        callback(response);
// 	      }
// 	    } else {
// 	      jsonErrorHandling(response);
// 	    }
// 	  });

    var url = "/kmcj/loadOwnProject.gantt";
    var args = {"time": new Date(), "projectName": $("#ganttList").val()};

    $.post(url, args,
            function (data) {
                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();

            });
    return false;

}
;

//-------------------------------------------  Get project file as JSON (used for migrate project from gantt to Teamwork) ------------------------------------------------------
//------------------------------------------- Schumi: Open a black popup for saving plan. ------------------------------------------------------
function savePlanInFileDirectory() {
    //make save Editor
    var saveEditor = $.JST.createFromTemplate({}, "SAVE_EDITOR");

    var ndo = createBlackPage(600, 400).append(saveEditor);
    //method 1
    //var orgPrj = document.getElementById("ddlList");
    //var myPrj = document.getElementById("curPrj");
    //myPrj.value = orgPrj.value;

    //method 2
// 	$("#curPrj").val($("#ddlList").val());

    rebindChosen();

    //bind save event
    saveEditor.find("#planSaveButton").click(function () {
        $("#prjName").val($("#ddlList").val());
        $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
        var planCat = $("input:radio[name='saveType']:checked").val();
        $("#planCategory").val(planCat);
        //$("#usernamecn").val(getCookie("kgusername"));
        $("#gimmeBack").submit();
        $("#gimBaPrj").val("");

        closeBlackPopup();
    });
}
;

//------------------------------------------- Schumi: Open a black popup for importing plan. ------------------------------------------------------
function importFileFromServerDirectory() {
    //make import Editor
    var importEditor = $.JST.createFromTemplate({}, "IMPORT_EDITOR");

    var ndo = createBlackPage(800, 400).append(importEditor);
    //method 1
    //var orgPrj = document.getElementById("ddlList");
    //var myPrj = document.getElementById("curPrj");
    //myPrj.value = orgPrj.value;

    //method 2
// 	$("#curPrj").val($("#ddlList").val());

    rebindChosen();

    //import gantt project files when opening the form
    $.getJSON("/manufacturing/control/returnAllDocFullName", {"directory": "D:\\ofbiz181205\\themes\\common-theme\\webapp\\ganttjson"}).done(
            function (data) {
                if (data.hasgantt == "yes") {
                    $.each(data.ganttlist, function (i, item) {
                        $("#ganttList").append("<option>" + item + "</option>");
                    });
                }
            });

    //bind import event
    importEditor.find("#genProjNameList").click(function () {
// 		// fill project name list
//    		$.getJSON("/kmcj/activeProjectsJSON.prjts", function(data) {
//    			console.log(data);
//    	        $.each(data.projectnamelist, function(i, item) {
//    	         	$("#ganttList").append("<option " + "value='" + item.project_name + "'" + ">" + item.project_name + "</option>");
//    	         	console.log(item.project_name);
//    	        });
//    	    });	
// 		$.getJSON("/kmcj/returnAllDocFullName.filel", {"directory": "C:\\ganttjson"}).done(
//  				function(data) {
// 		 			if(data.hasgantt == "yes"){
// 			 	        $.each(data.ganttlist, function(i, item) {
// 			 	            $("#ganttList").append("<option>" + item + "</option>");
// 			 	        });
// 		 			}
// 		 		});
    });

    //bind save event
    importEditor.find("#importButton").click(function () {
        $("#prjName").val($("#ganttList").val());
        var url = "/manufacturing/control/loadOwnProject";
        var args = {"time": new Date(), "projectName": $("#ganttList").val()};

        $.post(url, args,
                function (data) {
                    $("#ta").val(data);
                    loadGanttFromServer();
                    $("#ta").hide();
                    $("#sendProjectName").hide();
                    $("#originLoad").hide();

                });

        closeBlackPopup();
        return false;
    });
};

//------------------------------------------- Schumi: Open a black popup for Resource Gantt Start End Selector ------------------------------------------------------
function popoutResourceGanttSelector() {
    //make import Editor
    var rgSelector = $.JST.createFromTemplate({}, "RESOURCE_GANTT_SELECTOR");

    var ndo = createBlackPage(700, 400).append(rgSelector);
    rebindChosen();
    
    $("#workCenterForResGantt").empty();
    var prevWC = getCookie("resourceForGantt");
    $.getJSON("/manufacturing/control/resourcesJson", function(data) {
	        $.each(data.resources, function(i, item) {
	        	if(prevWC == item.resourceId){
	        		$("#workCenterForResGantt").append("<option value='" + item.resourceId + "' selected>" + item.resourceId + ' - ' + item.description + ' - ' + item.resType +  "</option>");
	        	}else{
	        		$("#workCenterForResGantt").append("<option value='" + item.resourceId + "'>" + item.resourceId + ' - ' + item.description + ' - ' + item.resType + "</option>");
	        	}
	        });
	    });
    
    //bind dateField on dates
    rgSelector.find("#fromDate").click(function () {
	  $(this).dateField({
	    inputField:$(this)
             });
        });
    rgSelector.find("#toDate").click(function () {
	  $(this).dateField({
	    inputField:$(this)
             });
        });

    rgSelector.find("#setUpdateKeyAllResource").click(function () {
        //save latest info to ge first
        $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
        // now traversing
        var updatedGantt = traverseJsonUpdateKey($("#gimBaPrj").val());
        $("#gimBaPrj").val(JSON.stringify(updatedGantt));

        closeBlackPopup();
        return false;
    });
    
    rgSelector.find("#setPlannerOnOffResource").click(function () {
        //save latest info to ge first
        $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
        // now traversing
        var updatedGantt = traverseJsonUpdatePlannerAndKey($("#gimBaPrj").val(), getCookie("thePlanner"));
        $("#gimBaPrj").val(JSON.stringify(updatedGantt));

        closeBlackPopup();
        return false;
    });

    // Schumann Newly added on 20221008 for default Start & End Date for Resource Scheduling
    var prevStart = getCookie("resourceStartForGantt");
    var prevEnd = getCookie("resourceEndForGantt");
    var dateResStart = new Date(prevStart);
    var dateResEnd = new Date(prevEnd);
    $("#fromDate").val(formatDate(dateResStart));
    $("#toDate").val(formatDate(dateResEnd));

    //bind save event
    rgSelector.find("#showResourceGantt").click(function () {
        var opActiveSelected = $("#opActive").is(':checked');
    	var faufActiveSelected = $("#faufActive").is(':checked');
        
        var startString = $("#fromDate").val();
        var dStart = startString.slice(0,2);
        var mStart = startString.slice(3,5);
        var yStart = startString.slice(6,10);
        var newStart = mStart + '/' + dStart + '/' + yStart;
        
        var endString = $("#toDate").val();
        var dEnd = endString.slice(0,2);
        var mEnd = endString.slice(3,5);
        var yEnd = endString.slice(6,10);
        var newEnd = mEnd + '/' + dEnd + '/' + yEnd;
        
        setCookie("resourceForGantt",$("#workCenterForResGantt").val(),"","");
        setCookie("resourceStartForGantt",newStart,"","");
        setCookie("resourceEndForGantt",newEnd,"","");
        
        if(opActiveSelected){
            setCookie("opActiveForResource","Yes","","");
        }else{
            setCookie("opActiveForResource","No","","");
        }
        if(faufActiveSelected){
            setCookie("faufActiveForResource","Yes","","");
        }else{
            setCookie("faufActiveForResource","No","","");
        }

        ajaxLoadResourceGantt();
        closeBlackPopup();
        return false;
    });

    // only update resource schedule
    rgSelector.find("#updateResourceSchedule").click(function () {
        setCookie("schType","byResource","","");
        updateGanttSchedule();
        closeBlackPopup();
        return false;
    });
};

//------------------------------------------- Schumi: Open a black popup for Project Gantt Start End Selector ------------------------------------------------------
function popoutProjectGanttSelector() {
    //make import Editor
    var rgSelector = $.JST.createFromTemplate({}, "AX_NOTES_PROJECT_GANTT_SELECTOR");

    var ndo = createBlackPage(700, 400).append(rgSelector);
    rebindChosen();
    
    $("#axProdNotes").val(getCookie("axNotes"));
    
    //bind dateField on dates
    rgSelector.find("#fromDateAxNotes").click(function () {
	  $(this).dateField({
	    inputField:$(this)
             });
        });
    rgSelector.find("#toDateAxNotes").click(function () {
	  $(this).dateField({
	    inputField:$(this)
             });
        });

    rgSelector.find("#setUpdateKeyAllPool").click(function () {
        //save latest info to ge first
        $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
        // now traversing
        var updatedGantt = traverseJsonUpdateKey($("#gimBaPrj").val());
        $("#gimBaPrj").val(JSON.stringify(updatedGantt));
        closeBlackPopup();
        return false;
    });
    
    rgSelector.find("#setPlannerOnOffPool").click(function () {
        //save latest info to ge first
        $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
        // now traversing
        var updatedGantt = traverseJsonUpdatePlannerAndKey($("#gimBaPrj").val(), getCookie("thePlanner"));
        $("#gimBaPrj").val(JSON.stringify(updatedGantt));
        
        closeBlackPopup();
        return false;
    });
    
    // Schumann Newly added on 20221230 for default Start & End Date for Pool Scheduling
    var prevStart = getCookie("startForAxNotes");
    var prevEnd = getCookie("endForAxNotes");
    var dateResStart = new Date(prevStart);
    var dateResEnd = new Date(prevEnd);
    $("#fromDateAxNotes").val(formatDate(dateResStart));
    $("#toDateAxNotes").val(formatDate(dateResEnd));

    //bind save event
    rgSelector.find("#showAxNotesProjectGantt").click(function () {
        var activeFauf = $("#faufActiveForAxNotes").val();
        
        var startString = $("#fromDateAxNotes").val();
        var dStart = startString.slice(0,2);
        var mStart = startString.slice(3,5);
        var yStart = startString.slice(6,10);
        var newStart = mStart + '/' + dStart + '/' + yStart;
        
        var endString = $("#toDateAxNotes").val();
        var dEnd = endString.slice(0,2);
        var mEnd = endString.slice(3,5);
        var yEnd = endString.slice(6,10);
        var newEnd = mEnd + '/' + dEnd + '/' + yEnd;
        
        setCookie("axNotes",$("#axProdNotes").val(),"","");
        setCookie("startForAxNotes",newStart,"","");
        setCookie("endForAxNotes",newEnd,"","");
        setCookie("faufActiveForAxNotes",activeFauf,"","");

        ajaxLoadAxNotesGantt();
        closeBlackPopup();
        return false;
    });

    // only update WO schedule by Ax Prod Notes
    rgSelector.find("#updateFaufScheduleByAxNotes").click(function () {
        // there is no need to set schType as "byAxNotes" 
        // because functionally it is the same to set it as "byPool"
        setCookie("schType","byAxNotes","","");
        updateGanttSchedule();
        closeBlackPopup();
        return false;
    });
};

//------------------------------------------- Schumi: Open a black popup for Pool Gantt Start End Selector ------------------------------------------------------
function popoutPoolGanttSelector() {
    //make import Editor
    var rgSelector = $.JST.createFromTemplate({}, "POOL_GANTT_SELECTOR");

    var ndo = createBlackPage(700, 400).append(rgSelector);
    rebindChosen();
    
    $("#poolForPoolGantt").empty();
    var prevPool = getCookie("poolForGantt");
    $.getJSON("/manufacturing/control/poolJson", function(data) {
	        $.each(data.pools, function(i, item) {
	        	if(prevPool == item.poolId){
	        		$("#poolForPoolGantt").append("<option value='" + item.poolId + "' selected>" + item.poolId + ' - ' + item.poolName + ' - ' + item.costCenter + "</option>");
	        	}else{
	        		$("#poolForPoolGantt").append("<option value='" + item.poolId + "'>" + item.poolId + ' - ' + item.poolName + ' - ' + item.costCenter + "</option>");
	        	}
	        });
	    });
    
    //bind dateField on dates
    rgSelector.find("#fromDate").click(function () {
	  $(this).dateField({
	    inputField:$(this)
             });
        });
    rgSelector.find("#toDate").click(function () {
	  $(this).dateField({
	    inputField:$(this)
             });
        });

    rgSelector.find("#setUpdateKeyAllPool").click(function () {
        //save latest info to ge first
        $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
        // now traversing
        var updatedGantt = traverseJsonUpdateKey($("#gimBaPrj").val());
        $("#gimBaPrj").val(JSON.stringify(updatedGantt));
        console.log("--- Welcome Schumann ---");
        console.log($("#gimBaPrj").val());
        closeBlackPopup();
        return false;
    });
    
    rgSelector.find("#setPlannerOnOffPool").click(function () {
        //save latest info to ge first
        $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
        // now traversing
        var updatedGantt = traverseJsonUpdatePlannerAndKey($("#gimBaPrj").val(), getCookie("thePlanner"));
        $("#gimBaPrj").val(JSON.stringify(updatedGantt));
        
        closeBlackPopup();
        return false;
    });
    
    // Schumann Newly added on 20221008 for default Start & End Date for Pool Scheduling
    var prevStart = getCookie("poolStartForGantt");
    var prevEnd = getCookie("poolEndForGantt");
    var dateResStart = new Date(prevStart);
    var dateResEnd = new Date(prevEnd);
    $("#fromDate").val(formatDate(dateResStart));
    $("#toDate").val(formatDate(dateResEnd));

    //bind save event
    rgSelector.find("#showPoolGantt").click(function () {
    	var faufActiveSelected = $("#faufActive").is(':checked');
        
        var startString = $("#fromDate").val();
        var dStart = startString.slice(0,2);
        var mStart = startString.slice(3,5);
        var yStart = startString.slice(6,10);
        var newStart = mStart + '/' + dStart + '/' + yStart;
        
        var endString = $("#toDate").val();
        var dEnd = endString.slice(0,2);
        var mEnd = endString.slice(3,5);
        var yEnd = endString.slice(6,10);
        var newEnd = mEnd + '/' + dEnd + '/' + yEnd;
        
        setCookie("poolForGantt",$("#poolForPoolGantt").val(),"","");
        setCookie("poolStartForGantt",newStart,"","");
        setCookie("poolEndForGantt",newEnd,"","");

        if(faufActiveSelected){
            setCookie("faufActiveForPool","Yes","","");
        }else{
            setCookie("faufActiveForPool","No","","");
        }

        ajaxLoadPoolGantt();
        closeBlackPopup();
        return false;
    });

    // only update pool schedule
    rgSelector.find("#updatePoolSchedule").click(function () {
        setCookie("schType","byPool","","");
        updateGanttSchedule();
        closeBlackPopup();
        return false;
    });
};

//------------------------------------------- Schumi: Open a black popup for importing SQL Database plan. ------------------------------------------------------
function importFromSQLDatabase() {
    //make import Editor
    var sqlEditor = $.JST.createFromTemplate({}, "SQL_EDITOR");

    var ndo = createBlackPage(600, 500).append(sqlEditor);

    rebindChosen();

    //bind save event
    sqlEditor.find("#sqlButton").click(function () {
        var prj = $("#ddlListSQL").val();
        var tableName = $("input:radio[name='sqlTable']:checked").val();
        var withRel = $("input:radio[name='relationship']:checked").val();
        var url;
        if (withRel == "Yes") {
            url = "/kmcj/planDatewDepends.gantt";
        } else {
            url = "/kmcj/planDatewoDepends.gantt";
        }

        var args = {"time": new Date(), "projectName": prj, "tableName": tableName};

        $.post(url, args,
                function (data) {
                    $("#ta").val(data);
                    loadGanttFromServer();
                    $("#ta").hide();
                    $("#sendProjectName").hide();
                    $("#originLoad").hide();
                });
        //sqlTable, relationship
        closeBlackPopup();
        return false;
    });
}
;

//------------------------------------------- Schumi: Reminding Function. ------------------------------------------------------
function remindingFunc() {
    //make import Editor
    var remindEditor = $.JST.createFromTemplate({}, "REMIND_EDITOR");

    var ndo = createBlackPage(600, 600).append(remindEditor);

    //bind save event
    remindEditor.find("#remindButton").click(function () {

        batchSendLateEmail();
        closeBlackPopup();
        return false;
    });
};

//------------------------------------------- Schumi: Other Function. ------------------------------------------------------
function otherFunc() {
    //make import Editor
    var otherEditor = $.JST.createFromTemplate({}, "OTHER_EDITOR");

    var ndo = createBlackPage(600, 400).append(otherEditor);

    //bind click event
    otherEditor.find("#expandAllButton").click(function () {
        expandAllTasks();
        closeBlackPopup();
        return false;
    });

    otherEditor.find("#foldAllButton").click(function () {
        foldAllTasks();
        closeBlackPopup();
        return false;
    });

    otherEditor.find("#setUpdateKeyAllFauf").click(function () {
        //save latest info to ge first
        $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
        // now traversing
        var updatedGantt = traverseJsonUpdateKey($("#gimBaPrj").val());

// 		console.log("Before");
// 		console.log(updatedGantt);
        $("#gimBaPrj").val(JSON.stringify(updatedGantt));
// 		console.log("After");
// 		var tmp = JSON.stringify(updatedGantt);
// 		console.log(tmp);
// 		console.log("Final");
// 		$("#gimBaPrj").val(tmp);

        closeBlackPopup();
        return false;
    });

    otherEditor.find("#setPlannerOnOffFauf").click(function () {
        //save latest info to ge first
        $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));
        // now traversing
        var updatedGantt = traverseJsonUpdatePlannerAndKey($("#gimBaPrj").val(), getCookie("thePlanner"));

        $("#gimBaPrj").val(JSON.stringify(updatedGantt));

        closeBlackPopup();
        return false;
    });

    otherEditor.find("#updateGanttSchDateButton").click(function () {
        setCookie("schType","byFAUF","","");
        updateGanttSchedule();
        closeBlackPopup();
        return false;
    });

    otherEditor.find("#loadFaufGantt").click(function () {
        ajaxLoadFaufGantt();
        closeBlackPopup();
        return false;
    });

    otherEditor.find("#loadResourceGantt").click(function () {
        ajaxLoadResourceGantt();
        closeBlackPopup();
        return false;
    });
}
;

//------------------------------------------- Schumi: Set Update-Key for all Gantt one-off ------------------------------------------
//------------------------------------------- Javascript traverse json and update key value ------------------------------------------

function traverseJsonUpdateKey(jsonObj) {
    var myGanttJson = JSON.parse(jsonObj);
    if (typeof myGanttJson == "object") {
        $.each(myGanttJson, function (key, value) {
            // key is either an array index or object key
//			console.log("key: ", key);
            if (key == "tasks") {
// 				console.log(value);
                for (var i = 0; i < value.length; i++) {
                    value[i].schupdate = true;
                }
            }
        });
    } else {
        console.log("The claimed jsonObj is not a json.");
    }
	// console.log(myGanttJson);
    return myGanttJson;
}

//------------------------------------------- Schumi: Set Planner for all Gantt one-off ------------------------------------------
//------------------------------------------- Javascript traverse json and update planner value ------------------------------------------

function traverseJsonUpdatePlannerAndKey(jsonObj, thePlanner) {
// 	console.log(jsonObj);
// 	console.log(thePlanner);
    var myGanttJson = JSON.parse(jsonObj);
    if (typeof myGanttJson == "object") {
        $.each(myGanttJson, function (key, value) {
            // key is either an array index or object key
//			console.log("key: ", key);
            if (key == "tasks") {
//				console.log(value);
                for (var i = 0; i < value.length; i++) {
                    value[i].planner = thePlanner;
                    value[i].schupdate = true;
                }
            }
        });
    } else {
        console.log("The claimed jsonObj is not a json.");
    }
	// console.log(myGanttJson);
    return myGanttJson;
}

//------------------------------------------- Schumi: Expand All Tasks. ------------------------------------------------------
function expandAllTasks() {
    var myData = $("#ta").val();
    var iDataLength = myData.length;
//  	console.debug("Original Data is ",myData);

    //first to remove all false
    while (myData.length > 0) {
        if (myData.indexOf(',"collapsed":false') !== -1) {
            myData = myData.replace(',"collapsed":false', '');
        } else {
            break;
        }
    }

    //then to remove all true
    while (myData.length > 0) {
        if (myData.indexOf(',"collapsed":true') !== -1) {
            myData = myData.replace(',"collapsed":true', '');
        } else {
            break;
        }
    }

    var finalData = "";
    var tempData = "";
    var iCounter = 0;
    while (myData.length > 0)
    {
        if (myData.indexOf('"hasChild":true') != -1)
        {
            var iStart = myData.indexOf('"hasChild":true');
            iCounter++;
            myData = myData.replace('"hasChild":true', '"collapsed":false,"hasChild":true');
//             console.debug("########## My Attempt Number " + iCounter + " ################");
            finalData = finalData + myData.substring(0, iStart) + '"collapsed":false,"hasChild":true';
            tempData = myData.substring(iStart + 33);
//             console.debug("********** Leading Part " + finalData + " ****************");
//             console.debug("&&&&&&&&&& following Part " + tempData + " &&&&&&&&&&&&&&&&");
            myData = tempData;
        } else
        {
            finalData = finalData + tempData;
            break;
        }
    }

    $("#ta").val(finalData);
// 	console.debug("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Final Data is ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",finalData);
    loadSchumisData();
}
;

//------------------------------------------- Schumi: Update Gantt Schdule for Productoin Orders------------------------------------------
function updateGanttSchedule() {
    // added by Schumi on 24.09.2019
    // Save modified FAUF scheduling dates into json 
    // to update the KM MES table ust_SFC_SchDate
//     $("#gimBaPrj").val(JSON.stringify(ge.saveProject()));

// 	var url= "/kmcj/updateGanttSchDateByFaufNr.gantt";
//   	var args = {ganttJson: $("#gimBaPrj").val()};

//   	$.post(url, args,
//             function(data){
//   				popout("Congratulations","Scheduling done & saved!");
//           });

    $.ajax({
        method: "POST",
        url: "/manufacturing/control/updateGanttSchDateByFaufNr",
        dataType: 'json',
        data: {
            "ganttJson": $("#gimBaPrj").val(),
            "schType": getCookie("schType"),
            "thePlanner": getCookie("thePlanner")
        }, success: function (data) {
            // console.log("here is testing starting point ...");
            if (data.OpUpdated == "Yes") {
                $("#sysMessage").val("Scheduling done & saved!");
                var messageEditor = $.JST.createFromTemplate({}, "MESSAGE_NOTIFIER");
                var ndo = createBlackPage(600, 300).append(messageEditor);
                rebindChosen();
//             	popout("Congratulations","Scheduling done & saved!");
            }
        }
    });

}
;

//------------------------------------------- Schumi: Load Production Order Gantt ------------------------------------------
function ajaxLoadFaufGantt() {
    var url = "/manufacturing/control/loadGanttByFaufNr";
    var args = {
        "faufNr": getCookie("faufNrForGantt")
    };

    $.post(url, args,
            function (data) {
                // console.log("--Schumann Data--");
                // console.log(data);

                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();
            });
    return false;
}
;

//------------------------------------------- Schumi: Load Resource Gantt ------------------------------------------
function ajaxLoadResourceGantt() {
    var url = "/manufacturing/control/loadGanttByResource";
    var args = {
        "resourceForGantt": getCookie("resourceForGantt"),
        "resourceStartForGantt": getCookie("resourceStartForGantt"),
        "resourceEndForGantt": getCookie("resourceEndForGantt"),
        "opActiveForResource": getCookie("opActiveForResource"),
        "faufActiveForResource": getCookie("faufActiveForResource")
    };

    $.post(url, args,
            function (data) {
                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();
            });
    return false;
};

//------------------------------------------- Schumi: Load Ax Notes Gantt ------------------------------------------
function ajaxLoadAxNotesGantt() {
    var url = "/manufacturing/control/loadGanttByAxNotes";
    var args = {
        "axNotes": getCookie("axNotes"),
        "startForAxNotes": getCookie("startForAxNotes"),
        "endForAxNotes": getCookie("endForAxNotes"),
        "faufActiveForAxNotes": getCookie("faufActiveForAxNotes")
    };

    $.post(url, args,
            function (data) {
                $("#ta").val(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();
            });
    return false;
};

//------------------------------------------- Schumi: Load Pool Gantt ------------------------------------------
function ajaxLoadPoolGantt() {
    var url = "/manufacturing/control/loadGanttByPool";
    var args = {
        "poolForGantt": getCookie("poolForGantt"),
        "poolStartForGantt": getCookie("poolStartForGantt"),
        "poolEndForGantt": getCookie("poolEndForGantt"),
        "faufActiveForPool": getCookie("faufActiveForPool")
    };

    $.post(url, args,
            function (data) {
                $("#ta").val(data);
                // console.log("------Pool Gantt Date-------");
                // console.log(data);
                loadGanttFromServer();
                $("#ta").hide();
                $("#sendProjectName").hide();
                $("#originLoad").hide();
            });
    return false;
};

//------------------------------------------- Schumi: Fold All Tasks. ------------------------------------------------------
function foldAllTasks() {
    var myData = $("#ta").val();
    var iDataLength = myData.length;

    //first to remove all false
    while (myData.length > 0) {
        if (myData.indexOf(',"collapsed":false') !== -1) {
            myData = myData.replace(',"collapsed":false', '');
        } else {
            break;
        }
    }

    //then to remove all true
    while (myData.length > 0) {
        if (myData.indexOf(',"collapsed":true') !== -1) {
            myData = myData.replace(',"collapsed":true', '');
        } else {
            break;
        }
    }

    var finalData = "";
    var tempData = "";
    var iCounter = 0;
    while (myData.length > 0)
    {
        if (myData.indexOf('"hasChild":true') != -1)
        {
            var iStart = myData.indexOf('"hasChild":true');
            iCounter++;
            myData = myData.replace('"hasChild":true', '"collapsed":true,"hasChild":true');
//             console.debug("########## My Attempt Number " + iCounter + " ################");
            finalData = finalData + myData.substring(0, iStart) + '"collapsed":true,"hasChild":true';
            tempData = myData.substring(iStart + 32);
//             console.debug("********** Leading Part " + finalData + " ****************");
//             console.debug("&&&&&&&&&& following Part " + tempData + " &&&&&&&&&&&&&&&&");
            myData = tempData;
        } else
        {
            finalData = finalData + tempData;
            break;
        }
    }

    $("#ta").val(finalData);
// 	console.debug("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Final Data is ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",finalData);
    loadSchumisData();
}
;

//-------------------------------------------Schumi: batch send project late reminding emails------------------------------------------------------
function batchSendLateEmail() {
    var projectname;
    var lateCounter = 0;
    this.unassigsTasks = [];
    var unassigsTasksString = "";

    this.DelayTasksGroup = [];
    this.IncomingTasksGroup = [];

    for (var i = 0; i < ge.tasks.length; i++) {
        var task = ge.tasks[i];
        //---------if start + period * progress less than today----------------
        //---------paint the box in red----------------------------------------
        if (task.progress < 100) {
            if ((task.start + (task.end - task.start) * task.progress / 100) < new Date().getTime()) {
                projectname = ge.tasks[0].code;
                //console.debug("Project Name is ",projectname);

                if (task.assigs.length < 1) {
                    var unassigtask = new Unassignedtask(task.id, task.name);
                    this.unassigsTasks.push(unassigtask);
                    lateCounter = parseInt(lateCounter) + 1;
                    unassigsTasksString = unassigsTasksString + task.id.toString() + ",";
                }

// 		    	console.debug("----------",unassigtask.id, unassigtask.name);
// 		    	console.debug("**********",unassigsTasksString);

                var delayTask = new DelayTask(task.id, task.name, task.assigs, task.description, task.progress, task.start, task.end);
                this.DelayTasksGroup.push(delayTask);

            } else {
                //console.debug("You are Ok ",task.name);
            }

            //For incoming tasks within 3 days
            if ((task.start - new Date().getTime()) > 0 && (task.start - new Date().getTime()) < 259200000) {
                var incomingTask = new IncomingTask(task.id, task.name, task.assigs, task.description, task.progress, task.start, task.end);
                this.IncomingTasksGroup.push(incomingTask);
            }
        }
    }
// 	console.debug("Total late item qty is ",lateCounter);

    for (var i = 0; i < DelayTasksGroup.length; i++) {
// 		console.debug("@@@@@@Delay tasks@@@@@@",DelayTasksGroup[i].id, DelayTasksGroup[i].name);
// 		console.debug("@@@@@@Test Ge****",);
    }

// 	for(var i=0;i<IncomingTasksGroup.length;i++){
// 		console.debug("^^^^^^^Incoming tasks^^^^^^^",IncomingTasksGroup[i].id, ge.getResource(IncomingTasksGroup[i].assigs[0].resourceId).name);
// 		batchEmail(IncomingTasksGroup[i].id, ge.getResource(IncomingTasksGroup[i].assigs[0].resourceId).name,projectname + " - �?�将�?�生的任务",
// 				IncomingTasksGroup[i].name,IncomingTasksGroup[i].description,IncomingTasksGroup[i].progress,
// 				IncomingTasksGroup[i].start,IncomingTasksGroup[i].end);
// 	}

// 	console.debug("^^^^^^^Incoming tasks^^^^^^^",IncomingTasksGroup);
    futureEmail($("#ta").val());

// 	for(var i=0;i<IncomingTasksGroup.length;i++){
// 		console.debug("^^^^^^^Incoming tasks^^^^^^^",IncomingTasksGroup[i].id, ge.getResource(IncomingTasksGroup[i].assigs[0].resourceId).name);
// 		var taskId = IncomingTasksGroup[i].id;
// 		var strName = ge.getResource(IncomingTasksGroup[i].assigs[0].resourceId).name;
// 		var strCode = projectname + " - �?�将�?�生的任务";
// 		var strTask = IncomingTasksGroup[i].name;
// 		var strDesc = IncomingTasksGroup[i].description;
// 		var strProgress = IncomingTasksGroup[i].progress;
// 		var dStart = IncomingTasksGroup[i].start;
// 		var dEnd = IncomingTasksGroup[i].end;
// 		setTimeout("batchEmail(" + taskId + "," + strName + "," + strCode + "," +strTask + "," + strDesc + "," + strProgress + "," + dStart + "," + dEnd + ");",60000);
// 	}
}
;

//-------------------------------------Schumi: batchEmail Function--------------------------------------------------
function batchEmail(taskId, strName, strCode, strTask, strDesc, strProgress, dStart, dEnd) {
    var url = "/kmcj/remind.mail";
    var args = {"time": new Date(), "ToName": strName, "Subject": strCode,
        "Body": strTask, "Desc": strDesc, "Progress": strProgress,
        "Start": Date.parse(dStart), "End": Date.parse(dEnd), "taskId": taskId};

    $.post(url, args,
            function (data) {
                alert(data);
            });
    return false;
}
;

function futureEmail(IncomingTasksGroup) {
    var url = "/kmcj/futureEmail.mail";
    var args = {"time": new Date(), "IncomingTasksGroup": IncomingTasksGroup};

    $.post(url, args,
            function (data) {
                alert(data);
            });
    return false;
}
;

// -------------------------------- Schumi: Loop Through Gantt File and Convert it for Exportation -------------------------------
var ganttJsonXlsx = '';
// var tasksCountXlsx = 0;
var ganttDate;
function buildGanttJsonForXlsxExportOne(){
    ganttJsonXlsx = '{' + '"options":' + '{' + '"fileName":"' + $("#localList").val() + '"},';
    ganttJsonXlsx += '"tableData":[{"sheetName":"Gantt","data":[[';
    ganttJsonXlsx += '{"text":"id"},{"text":"name"},{"text":"progress"},{"text":"description"},{"text":"code"},';
    ganttJsonXlsx += '{"text":"level"},{"text":"status"},{"text":"depends"},{"text":"start"},{"text":"duration"},';
    ganttJsonXlsx += '{"text":"end"},{"text":"startIsMilestone"},{"text":"endIsMilestone"},{"text":"assigs"},';
    ganttJsonXlsx += '{"text":"earlyStart"},{"text":"earlyFinish"},{"text":"latestStart"},{"text":"latestFinish"},';
    ganttJsonXlsx += '{"text":"criticalCost"},{"text":"isCritical"},{"text":"prodid"},{"text":"oprnum"},';
    ganttJsonXlsx += '{"text":"oppriority"},{"text":"workcenter"},{"text":"planner"},{"text":"opnotes"}],';
}

function buildGanttJsonForXlsxExportTwo(){
    ganttJsonXlsx += ']},{"sheetName":"Resource","data":[';
    ganttJsonXlsx += '[{"text":"id"},{"text":"name"}],';
}

function buildGanttJsonForXlsxExportThree(){
    ganttJsonXlsx += ']},{"sheetName":"Role","data":[';
    ganttJsonXlsx += '[{"text":"id"},{"text":"name"}],';
}

function escapeNewLine(obj){
    return String(obj).replace(/\n/g, "");
}

function escapeDblQuoteMark(obj){
    return String(obj).replace(/"/g, "");
}

function returnDate(obj){
    if (typeof obj === 'number') {
        return new Date(obj).toLocaleDateString("en-US");
    }
}

function traverseGanttTasks(objGantt,func) {
    for (var i in objGantt) {
        func.apply(this,[i,objGantt[i]]);  
        if (i == 'tasks') {
            // continue to format worksheet gantt/tasks
            // tasksCountXlsx = objGantt['tasks'].length;
            for (var value in objGantt['tasks']) {
                var myMap = objGantt['tasks'][value];
                ganttJsonXlsx += '[{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['id']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeDblQuoteMark(escapeNewLine(myMap['name']));
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['progress']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeDblQuoteMark(escapeNewLine(myMap['description']));
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeDblQuoteMark(escapeNewLine(myMap['code']));
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['level']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['status']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['depends']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += returnDate(myMap['start']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['duration']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += returnDate(myMap['end']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['startIsMilestone']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['endIsMilestone']);
                ganttJsonXlsx += '"},';
                for (var myAssig in myMap) {
                    if (myAssig == 'assigs') {
                        if (myMap['assigs'].length > 0){
                            var strRes = '';
                            for (var iResCounter = 0; iResCounter < myMap['assigs'].length; iResCounter++){
                                strRes += myMap['assigs'][iResCounter]['resourceId'];
                                strRes += ',';
                            }
                            strRes = strRes.substring(0, strRes.length - 1);
                            ganttJsonXlsx += '{"text":"';
                            ganttJsonXlsx += strRes;
                            ganttJsonXlsx += '"},';
                        }else{
                            // when no assig
                            ganttJsonXlsx += '{"text":""},';
                        }
                    }
                }
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += returnDate(myMap['earlyStart']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += returnDate(myMap['earlyFinish']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += returnDate(myMap['latestStart']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += returnDate(myMap['latestFinish']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['criticalCost']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['isCritical']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['prodid']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['oprnum']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['oppriority']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['workcenter']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['planner']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeDblQuoteMark(escapeNewLine(myMap['opnotes']));
                ganttJsonXlsx += '"}],';
            }
        } 
        if (objGantt[i] !== null && typeof(objGantt[i])=="object") {
            traverseGanttTasks(objGantt[i],func);
        }
    }
}

function traverseGanttResources(objGantt,func) {
    for (var i in objGantt) {
        func.apply(this,[i,objGantt[i]]);  
        if (i == 'resources') {
            for (var value in objGantt['resources']) {
                var myMap = objGantt['resources'][value];
                ganttJsonXlsx += '[{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['id']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['name']);
                ganttJsonXlsx += '"}],';
            }
        }
        if (objGantt[i] !== null && typeof(objGantt[i])=="object") {
            traverseGanttResources(objGantt[i],func);
        }
    }
}

function traverseGanttRoles(objGantt,func) {
    for (var i in objGantt) {
        func.apply(this,[i,objGantt[i]]);  
        if (i == 'roles') {
            for (var value in objGantt['roles']) {
                var myMap = objGantt['roles'][value];
                ganttJsonXlsx += '[{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['id']);
                ganttJsonXlsx += '"},';
                ganttJsonXlsx += '{"text":"';
                ganttJsonXlsx += escapeNewLine(myMap['name']);
                ganttJsonXlsx += '"}],';
            }
        }
        if (objGantt[i] !== null && typeof(objGantt[i])=="object") {
            traverseGanttRoles(objGantt[i],func);
        }
    }
}

//called with every property and its value
function process(key,value) {
    // console.log(key + " : "+value);
}


//------------------------------------------- Schumi: Open a black popup for save project locally in Excel Format. ------------------------------------------------------
function savePlanLocally() {
    //make local Editor
    var localEditor = $.JST.createFromTemplate({}, "LOCAL_EDITOR");

    var ndo = createBlackPage(600, 400).append(localEditor);

    rebindChosen();

    //bind save event
    localEditor.find("#localSaveButton").click(function () {
        // $("#excelName").val($("#localList").val());
        // $("#excelPrj").val(JSON.stringify(ge.saveProject()));
        // var planCat = $("input:radio[name='localType']:checked").val();
        // $("#excelCategory").val(planCat);
        // $("#excelBack").submit();
        // $("#excelPrj").val("");

        buildGanttJsonForXlsxExportOne();
        traverseGanttTasks(ge.saveProject(), process);  
        // continue to wrap up the formatted text
        // remove the last comma from string
        ganttJsonXlsx = ganttJsonXlsx.substring(0, ganttJsonXlsx.length - 1);

        buildGanttJsonForXlsxExportTwo();
        traverseGanttResources(ge.saveProject(), process);  
        ganttJsonXlsx = ganttJsonXlsx.substring(0, ganttJsonXlsx.length - 1);

        buildGanttJsonForXlsxExportThree();
        traverseGanttRoles(ge.saveProject(), process);  
        ganttJsonXlsx = ganttJsonXlsx.substring(0, ganttJsonXlsx.length - 1);

        ganttJsonXlsx += ']}]}';
        ganttJsonXlsx = JSON.parse(ganttJsonXlsx);

        // Save gantt in excel
        Jhxlsx.export(ganttJsonXlsx.tableData, ganttJsonXlsx.options);

        closeBlackPopup();
    });

}
;

//--------------------------------------Schumi: UnassignedResourcesTasks--------------------------------------------
function Unassignedtask(id, name) {
    this.id = id;
    this.name = name;
}
;

//--------------------------------------Schumi: DelayTasksGroup--------------------------------------------
function DelayTask(id, name, assigs, description, progress, start, end) {
    this.id = id;
    this.name = name;
    this.assigs = assigs;
    this.description = description;
    this.progress = progress;
    this.start = start;
    this.end = end;
}
;

//--------------------------------------Schumi: IncomingTasksGroup--------------------------------------------
function IncomingTask(id, name, assigs, description, progress, start, end) {
    this.id = id;
    this.name = name;
    this.assigs = assigs;
    this.description = description;
    this.progress = progress;
    this.start = start;
    this.end = end;
}
;

//-------------------------------------------  LOCAL STORAGE MANAGEMENT (for this demo only) ------------------------------------------------------
Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};


Storage.prototype.getObject = function (key) {
    return this.getItem(key) && JSON.parse(this.getItem(key));
};

//Here below is created by Schumi
function loadSchumisData() {
    var ret;
    $("#taZone").show();

    if (!ret || !ret.tasks || ret.tasks.length == 0) {
        ret = JSON.parse($("#ta").val());

        //actualize data, to get the latest date
        var offset = new Date().getTime() - ret.tasks[0].start;
        for (var i = 0; i < ret.tasks.length; i++)
            ret.tasks[i].start = ret.tasks[i].start;
    }

    // console.log("------Pool Gantt Date Json-------");
    // console.log(ret);
    ge.loadProject(ret);
    ge.checkpoint(); //empty the undo stack
}
;

function loadFromLocalStorage() {
    var ret;
    if (localStorage) {
        if (localStorage.getObject("teamworkGantDemo")) {
            ret = localStorage.getObject("teamworkGantDemo");
        }
    } else {
        $("#taZone").show();
    }
    if (!ret || !ret.tasks || ret.tasks.length == 0) {
        ret = JSON.parse($("#ta").val());


        //actualiza data
        var offset = new Date().getTime() - ret.tasks[0].start;
        for (var i = 0; i < ret.tasks.length; i++)
            ret.tasks[i].start = ret.tasks[i].start + offset;


    }
    ge.loadProject(ret);
    ge.checkpoint(); //empty the undo stack
}
;


function saveInLocalStorage() {
    var prj = ge.saveProject();
    if (localStorage) {
        localStorage.setObject("teamworkGantDemo", prj);
    } else {
        $("#ta").val(JSON.stringify(prj));
    }
}
;


//-------------------------------------------  Open a black popup for managing resources. This is only an axample of implementation (usually resources come from server) ------------------------------------------------------

function editResources() {

    //make resource editor
    var resourceEditor = $.JST.createFromTemplate({}, "RESOURCE_EDITOR");
    var resTbl = resourceEditor.find("#resourcesTable");

    for (var i = 0; i < ge.resources.length; i++) {
        var res = ge.resources[i];
        resTbl.append($.JST.createFromTemplate(res, "RESOURCE_ROW"))
    }


    //bind add resource
    resourceEditor.find("#addResource").click(function () {
        resTbl.append($.JST.createFromTemplate({id: "new", name: "resource"}, "RESOURCE_ROW"))
    });

    //bind save event
    resourceEditor.find("#resSaveButton").click(function () {
        var newRes = [];
        //find for deleted res
        for (var i = 0; i < ge.resources.length; i++) {
            var res = ge.resources[i];
            var row = resourceEditor.find("[resId=" + res.id + "]");
            if (row.size() > 0) {
                //if still there save it
                var name = row.find("input[name]").val();
                if (name && name != "")
                    res.name = name;
                newRes.push(res);
            } else {
                //remove assignments
                for (var j = 0; j < ge.tasks.length; j++) {
                    var task = ge.tasks[j];
                    var newAss = [];
                    for (var k = 0; k < task.assigs.length; k++) {
                        var ass = task.assigs[k];
                        if (ass.resourceId != res.id)
                            newAss.push(ass);
                    }
                    task.assigs = newAss;
                }
            }
        }

        //loop on new rows
        resourceEditor.find("[resId=new]").each(function () {
            var row = $(this);
            var name = row.find("input[name]").val();
            if (name && name != "")
                newRes.push(new Resource("tmp_" + new Date().getTime(), name));
        });

        ge.resources = newRes;

        closeBlackPopup();
        ge.redraw();
    });


    var ndo = createBlackPage(400, 500).append(resourceEditor);
}
;
