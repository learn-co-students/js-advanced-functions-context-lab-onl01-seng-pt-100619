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

function createEmployeeRecords(arrOfEmployees) {
    const employees = []; 
    arrOfEmployees.forEach( employee => {
        employees.push(createEmployeeRecord(employee))
    });
    return employees;
}

function createTimeInEvent(timeStamp) {
    let [date, hour] = timeStamp.split(' ');
    // debugger
    this.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

function createTimeOutEvent(timeStamp) {
    let [date, hour] = timeStamp.split(' ');
    // debugger
    this.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date).hour;
    const timeOut = this.timeOutEvents.find(event => event.date === date).hour;
    const time = (Math.abs(timeOut - timeIn)/100);
    return time;
}

function wagesEarnedOnDate(date) {
    debugger
    return (hoursWorkedOnDate.call(this, date) * this.payPerHour)
}

function findEmployeeByFirstName(employees, firstName) {
    // debugger
    return employees.find( employee => employee.firstName === firstName )
}

let allWagesFor = function () {
    debugger
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employees) {
    return employees.reduce( function(total, employee) {
        return total + allWagesFor.call(employee)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

