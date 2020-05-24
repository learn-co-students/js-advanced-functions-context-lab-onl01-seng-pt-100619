/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = function(employeeArray) {
    return {
        firstName: employeeArray[0], 
        familyName: employeeArray[1], 
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeData){
    return employeeData.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push(
        {
            type: 'TimeOut',
            hour: parseInt(hour, 10),
            date
        }
    )
    return this
}

let hoursWorkedOnDate = function(dateStamp){
    let timeIn = this.timeInEvents.find(function(event) {return event.date === dateStamp})
    let timeOut = this.timeOutEvents.find(function(event) {return event.date === dateStamp})
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(date){
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

let findEmployeeByFirstName = function(employeeRecords, name){
    return employeeRecords.find(element => element.firstName == name)
}

let calculatePayroll = function(employeeRecords){
    return employeeRecords.reduce(function(runningTotal, record) {
        return runningTotal + allWagesFor.call(record)
    }, 0)
}

// let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
// createTimeInEvent.call(testEmployee, "44-03-15 0900")
// createTimeOutEvent.call(testEmployee, "44-03-15 1100")
// console.log(hoursWorkedOnDate.call(testEmployee, "44-03-15"))