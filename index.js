/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */



function createEmployeeRecord(details) {
    return {
        firstName: details[0], 
        familyName: details[1], 
        title: details[2],
        payPerHour: details[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArray) {
    return employeeArray.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(time) {
    this.timeInEvents.push(
        {
           type: 'TimeIn',
           hour: parseInt(time.slice(-4), 10),
           date: time.slice(0, 10)
        }
    )
    return this
}


function createTimeOutEvent(time) {
    this.timeOutEvents.push(
        {
           type: 'TimeOut',
           hour: parseInt(time.slice(-4), 10),
           date: time.slice(0, 10)
        }
    )
    return this
}

function hoursWorkedOnDate(date) {
    let timeIn = (this.timeInEvents.find(workDay => workDay.date === date)).hour
    let timeOut = (this.timeOutEvents.find(workDay => workDay.date === date)).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(employeeRecords, name){
    return employeeRecords.find(element => element.firstName == name)
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(runningTotal, record) {
        return runningTotal + allWagesFor.call(record)
    }, 0)
}