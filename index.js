/* Your Code Here */


let createEmployeeRecord = function(a){ // set object to a variable and return it
    let employeeObject = {
        firstName: a[0],
        familyName: a[1],
        title: a[2],
        payPerHour: a[3],
        timeInEvents: [],
        timeOutEvents: []

    }
    return employeeObject;
}

let createEmployeeRecords = function(records){ // iterate over an array of employee arrays and create a record/object for each
    let results = []
    records.map(function(record){results.push(createEmployeeRecord(record))})
    return results;
}

let createTimeInEvent = function(timeIn){ // access the array of objects for clock ins/out and update the arguments with given date
    this.timeInEvents.push(
    {
        type: "TimeIn",
        date: timeIn.split(" ")[0],
        hour: parseInt(timeIn.split(" ")[1])
    })
    return this;
}

let createTimeOutEvent = function(timeOut){
    this.timeOutEvents.push(
    {
        type: "TimeOut",
        date: timeOut.split(" ")[0],
        hour: parseInt(timeOut.split(" ")[1])
    })
    return this;
}

let hoursWorkedOnDate = function(date){
    let inRecord = this.timeInEvents.find(timeInEvent => timeInEvent.date === date) // we access the timein array of events
    let outRecord = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date)// find the clock record for that day
    let hoursForDay =  (outRecord.hour - inRecord.hour) / 100
    return hoursForDay;
}

let wagesEarnedOnDate = function(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}


let payrollExpense = function(records){
    let wagesArr = [] // first make an array with all wages for each employee

    records.map(function(record){wagesArr.push(allWagesFor.call(record))}) // find each employee wages thourgh map

    let expense = wagesArr.reduce(function(memo, wage){return memo + wage}) // reduce by addition of the employee wages

    return expense;
}

 let calculatePayroll = function(records){

    let wagesArr = [] // first make an array with all wages for each employee

    records.map(function(record){wagesArr.push(allWagesFor.call(record))})

    let expense = wagesArr.reduce(function(memo, wage){return memo + wage})

    return expense;

 }

 let findEmployeeByFirstName = function(records, name){
    let employee = records.find(record => record.firstName === name) 
    return employee; // find using the arroy syntax for the first name in the array of employee objects
 }

 


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */





let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

