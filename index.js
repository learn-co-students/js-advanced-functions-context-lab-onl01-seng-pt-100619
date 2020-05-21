function createEmployeeRecord(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(dateTime){
    const [date, time] = dateTime.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    })

    return this
}

function createTimeOutEvent(dateTime){
    const [date, time] = dateTime.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    })

    return this 
}

function hoursWorkedOnDate(formattedDate){
    const timeIn = this.timeInEvents.find(workDate => workDate.date === formattedDate)
    const timeOut = this.timeOutEvents.find(workDate => workDate.date === formattedDate)

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(formattedDate){
    const hoursWorked = hoursWorkedOnDate.call(this, formattedDate)     
    const payOwed = hoursWorked * this.payPerHour
    return payOwed
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

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(empRecordsArray){
    const allWages = empRecordsArray.map(emp => allWagesFor.call(emp))
    return allWages.reduce((wage, total) => wage + total)
}
