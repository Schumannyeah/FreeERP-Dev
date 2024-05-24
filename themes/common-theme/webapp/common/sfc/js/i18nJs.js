


  function dateToRelative(localTime){
    var diff=new Date().getTime()-localTime;
    var ret="";

    var min=60000;
    var hour=3600000;
    var day=86400000;
    var wee=604800000;
    var mon=2629800000;
    var yea=31557600000;

    if (diff<-yea*2)
      ret ="in ## years".replace("##",(-diff/yea).toFixed(0));

    else if (diff<-mon*9)
      ret ="in ## months".replace("##",(-diff/mon).toFixed(0));

    else if (diff<-wee*5)
      ret ="in ## weeks".replace("##",(-diff/wee).toFixed(0));

    else if (diff<-day*2)
      ret ="in ## days".replace("##",(-diff/day).toFixed(0));

    else if (diff<-hour)
      ret ="in ## hours".replace("##",(-diff/hour).toFixed(0));

    else if (diff<-min*35)
      ret ="in about one hour";

    else if (diff<-min*25)
      ret ="in about half hour";

    else if (diff<-min*10)
      ret ="in some minutes";

    else if (diff<-min*2)
      ret ="in few minutes";

    else if (diff<=min)
      ret ="just now";

    else if (diff<=min*5)
      ret ="few minutes ago";

    else if (diff<=min*15)
      ret ="some minutes ago";

    else if (diff<=min*35)
      ret ="about half hour ago";

    else if (diff<=min*75)
      ret ="about an hour ago";

    else if (diff<=hour*5)
      ret ="few hours ago";

    else if (diff<=hour*24)
      ret ="## hours ago".replace("##",(diff/hour).toFixed(0));

    else if (diff<=day*7)
      ret ="## days ago".replace("##",(diff/day).toFixed(0));

    else if (diff<=wee*5)
      ret ="## weeks ago".replace("##",(diff/wee).toFixed(0));

    else if (diff<=mon*12)
      ret ="## months ago".replace("##",(diff/mon).toFixed(0));

    else
      ret ="## years ago".replace("##",(diff/yea).toFixed(0));

    return ret;
  }

  //override date format i18n
  
  Date.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  // Month abbreviations. Change this for local month names
  Date.monthAbbreviations = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  // Full day names. Change this for local month names
  Date.dayNames =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  // Day abbreviations. Change this for local month names
  Date.dayAbbreviations = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  // Used for parsing ambiguous dates like 1/2/2000 - default to preferring 'American' format meaning Jan 2.
  // Set to false to prefer 'European' format meaning Feb 1
  Date.preferAmericanFormat = false;

  Date.firstDayOfWeek =1;
  Date.defaultFormat = "dd/MM/yyyy";


  Number.decimalSeparator = ".";
  Number.groupingSeparator = ",";
  Number.minusSign = "-";
  Number.currencyFormat = "##0.00";



  var millisInWorkingDay =36000000;
  var workingDaysPerWeek =7;

  //--------------------------Here Below is added by Schumi on 31.07.2019------------------------------------------------------
  //--------------------------To use Sat & Sun as Weekend that would be considered in calculation------------------------------

  
  function isHoliday(date) {
    var friIsHoly =false;
    var satIsHoly =true;
    var sunIsHoly =true;

    pad = function (val) {
      val = "0" + val;
      return val.substr(val.length - 2);
    };
    // added by Schumi on 20191004
    // to add non working day below in holidays so to avoid calculation
    var holidays = "#01_01#04_05#05_01#10_01#10_02#10_03#2010_04_05#2017_01_01#2017_01_26#2017_01_27#2017_01_28#2017_01_29#2017_01_30#2017_01_31#2017_02_01#2017_02_02#2017_02_03#2019_10_04#2019_10_07#2020_01_02#2020_01_03#2020_01_24#2020_01_27#2020_01_28#2020_01_29#2020_01_30#2020_04_06#2020_05_04#2020_05_05#2020_06_25#2020_06_26#2020_06_27#2020_10_04#2020_10_05#2020_10_06#2020_10_07#2020_10_08#2021_02_10#2021_02_11#2021_02_12#2021_02_13#2021_02_14#2021_02_15#2021_02_16#2021_02_17#2021_02_18#2021_04_03#2021_04_04#2021_05_02#2021_05_03#2021_05_04#2021_05_05#2021_06_12#2021_06_13#2021_06_14#2021_09_19#2021_09_20#2021_09_21#2021_10_04#2021_10_05#2021_10_06#2021_10_07#2022_01_03#2022_01_31#2022_02_01#2022_02_02#2022_02_03#2022_02_04#2022_04_04#2022_05_02#2022_05_03#2022_05_04#2022_06_03#2022_09_12#2022_10_04#2022_10_05#2022_10_06#2022_10_07#2023_01_02#2023_01_23#2023_01_24#2023_01_25#2023_01_26#2023_01_27#2023_04_05#2023_05_01#2023_05_02#2023_05_03#2023_06_22#2023_06_23#2023_09_29#2023_10_02#2023_10_03#2023_10_04#2023_10_05#2023_10_06#2024_01_01#2024_02_12#2024_02_13#2024_02_14#2024_02_15#2024_02_16#2024_04_04#2024_04_05#2024_05_02#2024_05_03#2024_06_10#2024_09_16#2024_09_17#2024_10_02#2024_10_03#2024_10_04#2024_10_07#";
    var nonHolidays = "#2020_01_05#2020_01_19#2020_02_01#2020_04_19#2020_06_28#2020_09_27#2020_10_10#2021_02_07#2021_02_20#2021_04_25#2021_05_08#2021_09_18#2021_09_26#2021_10_09#2022_01_29#2022_01_30#2022_04_02#2022_04_24#2022_05_07#2022_10_08#2022_10_09#2023_01_28#2023_01_29#2023_04_23#2023_04_29#2023_04_30#2023_05_06#2023_06_25#2023_10_07#2023_10_08#2024_02_04#2024_02_18#2024_04_07#2024_04_28#2024_05_11#2024_09_14#2024_09_29#2024_10_12#";
    var ymd = "#" + date.getFullYear() + "_" + pad(date.getMonth() + 1) + "_" + pad(date.getDate()) + "#";
    var md = "#" + pad(date.getMonth() + 1) + "_" + pad(date.getDate()) + "#";
    var day = date.getDay();
    
    // ---SSI--- updated on
    // Check if the date is in nonHolidays first, if yes then skip the next
    // if (nonHolidays.indexOf(ymd) > -1 || nonHolidays.indexOf(md) > -1) {
    //   return false;
    // }

    // if date is Sat or Sun but also listed in the NonHolidays, below will still set it as a Holiday
    return  ((day == 5 && friIsHoly) || (day == 6 && satIsHoly) || (day == 0 && sunIsHoly) || holidays.indexOf(ymd) > -1 || holidays.indexOf(md) > -1) && !(nonHolidays.indexOf(ymd)>-1);
  }

  //--------------------------End of this change-------------------------------------------------------------------------------
  
  var i18n = {
    FORM_IS_CHANGED:"You have some unsaved data on the page!",
    YES:"yes",
    NO:"no",
    FLD_CONFIRM_DELETE:"confirm the deletion?",
    INVALID_DATA:"The data inserted are invalid for the field format.",
    ERROR_ON_FIELD:"Error on field",
    CLOSE_ALL_CONTAINERS:"close all?",



    DO_YOU_CONFIRM:"Do you confirm?"
  };

  