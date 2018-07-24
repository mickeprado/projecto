export class GlobalFunctions {      
    public static StringConverter = (value: any) => {
      if (value === null || value === undefined || typeof value === "string") {
        return value;
      }
  
      return value.toString();
    }
  
    public static BooleanConverter = (value: any) => {
      if (value === null || value === undefined || typeof value === "boolean") {
        return value;
      }
  
      return value.toString().toLowerCase() === "true";
    }
  
    public static NumberConverter = (value: any) => {
      if (value === null || value === undefined || typeof value === "number") {
        return value;
      }
  
      return parseFloat(value.toString());
    }
  
    public static getMonthList() {
  
      let returnList = [];
      returnList.push({ "key": -1, "value": "<Month>" });
      returnList.push({ "key": 1, "value": "January" });
      returnList.push({ "key": 2, "value": "February" });
      returnList.push({ "key": 3, "value": "March" });
      returnList.push({ "key": 4, "value": "April" });
      returnList.push({ "key": 5, "value": "May" });
      returnList.push({ "key": 6, "value": "June" });
      returnList.push({ "key": 7, "value": "July" });
      returnList.push({ "key": 8, "value": "August" });
      returnList.push({ "key": 9, "value": "September" });
      returnList.push({ "key": 10, "value": "October" });
      returnList.push({ "key": 11, "value": "November" });
      returnList.push({ "key": 12, "value": "December" });
  
      return returnList;
    }

    public static getYearList(initialYear: number, finalYear: number) {
      
      let returnList = [];

      returnList.push({ "key": -1, "value": "<Year>" });
      for(var i=finalYear; i>=initialYear; i--){
        returnList.push({ "key": i, "value": i.toString() });
      }          
  
      return returnList;
    }

    public static getDaysInMonthList(year: number, month: number) {
      
      let returnList = [];

      returnList.push({ "key": -1, "value": "<Day>" });
      let finalDay = new Date(year, month, 0).getDate();
      for(var i=1; i<=finalDay; i++){
        returnList.push({ "key": i, "value": i.toString() });
      }          
  
      return returnList;
    }

    public static getAge(year:number, month: number, day: number) : number{
      let age : number;
      age = ((new Date()).getFullYear()) - year;
      
      if(month = ((new Date()).getMonth() +1) ){
        if(day > ((new Date()).getDate()))
          age = age-1;
      }
      else if(month > ((new Date()).getMonth() +1))
        age = age-1;
     
      return age;
    }
}