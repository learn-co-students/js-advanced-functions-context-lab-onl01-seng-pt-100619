function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
   return arr.map(a => createEmployeeRecord(a))
}

function createTimeInEvent(date) {
    let dateArray = date.split(" ")
    let event = {}
    event.type = "TimeIn";
    event.hour = parseInt(dateArray[1], 10);
    event.date = dateArray[0]
    this.timeInEvents.push(event);

    return this
}

function createTimeOutEvent(date) {
    let dateArray = date.split(" ")
    let event = {}
    event.type = "TimeOut";
    event.hour = parseInt(dateArray[1], 10);
    event.date = dateArray[0]
    this.timeOutEvents.push(event);

    return this
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(d => d.date === date)
    let timeOut = this.timeOutEvents.find(d => d.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function calculatePayroll(arr) {
    return arr.reduce((total, emp) => total + allWagesFor.call(emp), 0)
}

function findEmployeeByFirstName (arr, name) {
    return arr.find(e => e.firstName === name)
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

