/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 function createEmployeeRecord(record){
     return {
         firstName: record[0],
         familyName: record[1],
         title: record[2],
         payPerHour: record[3],
         timeInEvents: [],
         timeOutEvents: []
     }
 }

 function createEmployeeRecords(records){
    return records.map(function(record){
        return createEmployeeRecord(record);
    })
}

let createTimeInEvent = function(timeIn){
    let [date, time] = timeIn.split(' ');

    this.timeInEvents.push(
        {type: "TimeIn",
         hour: parseInt(time, 10),
         date}
    )

    return this;
    
}

let createTimeOutEvent = function(timeOut){
    let [date, time] = timeOut.split(' ')

    this.timeOutEvents.push(
        {type: "TimeOut",
        hour: parseInt(time, 10),
        date}
    )

    return this;
}

let hoursWorkedOnDate = function(desiredDate){
    let clockedIn = 
        this.timeInEvents.find(function(event){
            return event.date === desiredDate;
        })

    let clockedOut = 
        this.timeOutEvents.find(function(event){
            return event.date === desiredDate;
        })

    return (clockedOut.hour - clockedIn.hour)/100
}

function wagesEarnedOnDate(desiredDate){
    let employeeWage = hoursWorkedOnDate.call(this, desiredDate) * this.payPerHour
    return employeeWage
}


let allWagesFor = function () {
    let initialValue = 0

    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let allWagesPayable = eligibleDates.reduce(function (accumulator, date) {
        return accumulator + wagesEarnedOnDate.call(this, date)
    }.bind(this), initialValue) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return allWagesPayable
}



let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(employeeRecord){
        return employeeRecord.firstName === firstName;
    })
}

let calculatePayroll = function(arrayofEmployeeRecords){
    let initialValue = 0;
    return arrayofEmployeeRecords.reduce(function(accumulator, record){
        return accumulator + allWagesFor.call(record);
    }, initialValue)
}