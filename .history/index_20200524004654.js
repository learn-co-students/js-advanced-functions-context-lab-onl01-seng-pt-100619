/* Your Code Here */

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

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

 function createEmployeeRecords(employeeArrays){
    return employeeArrays.map(function(employee){
       return createEmployeeRecord(employee)
    })
}


function createTimeInEvent(dateStamp){
    // create and object
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
    hour: parseInt(hour, 10),
    date, 
    })
    return this 
}


function createTimeOutEvent(dateStamp){
    // create and object
    let [date, hour] = dateStamp.split(' ')
    debugger
    this.timeOutEvents.push({

    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
    })
    
    return this 
}

function hoursWorkedOnDate(date){
    const TimeIn = this.timeInEvents.find(function(TimeIn){
       return TimeIn.date === date
    })
    const timeOut = this.timeOutEvents.find(function(timeOut){
        return timeOut.date === date 
     })

    //using that, we can calc hours worked
   const hoursWorked = (timeOut.hour - TimeIn.hour) / 100
   return hoursWorked
}

function wagesEarnedOnDate(this, date){
    return hoursWorkedOnDate(this, date) * this.payPerHour

}


function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(employee){
        return employee.firstName === firstName
    })

}

function calculatePayroll(employeeRecords){ 
    return employeeRecords.reduce(function(accumulator, employee){
       return accumulator + allWagesFor(employee)
    }, 0)

}