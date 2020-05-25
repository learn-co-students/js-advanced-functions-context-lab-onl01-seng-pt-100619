/* Your Code Here */
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0], 
        familyName: arr[1], 
        title: arr[2], 
        payPerHour: arr[3], 
        timeInEvents: [], 
        timeOutEvents: []
    };
}

function createEmployeeRecords(array){
    return array.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

function createTimeOutEvent(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

function hoursWorkedOnDate(dateStamp){
    let timeIn = this.timeInEvents.find(function(event) {return event.date === dateStamp})
    let timeOut = this.timeOutEvents.find(function(event) {return event.date === dateStamp})
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName (arr, name) {
    return arr.find(e => e.firstName === name)
}

function calculatePayroll(arr) {
    return arr.reduce((total, emp) => total + allWagesFor.call(emp), 0)
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