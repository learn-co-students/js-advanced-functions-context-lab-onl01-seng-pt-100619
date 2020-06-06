/* Your Code Here */
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        //firstName: firstName
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(function (employee) {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(datestamp) {

    // console.log(datestamp)
    const [date, hour] = datestamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date

    })
    return this
}


function createTimeOutEvent(datestamp) {

    const [date, hour] = datestamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date

    })
    return this
}

function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(function (timeInEvent) {
        return date === timeInEvent.date
    })
    let timeOutEvent = this.timeOutEvents.find(function (timeOutEvent) {
        return date === timeOutEvent.date
    })

    return (timeOutEvent.hour - timeInEvent.hour) / 100
}

function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date)
    return this.payPerHour * hours

}

function calculatePayroll(employeeRecords) {
    let payroll = employeeRecords.reduce(function (total, employee) {
        return total + allWagesFor.call(employee)
    }, 0)
    return payroll

}

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find(function (employee) {
        return employee.firstName === firstName

    })
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