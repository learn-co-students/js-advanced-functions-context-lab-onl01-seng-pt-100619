/* Your Code Here */

function createEmployeeRecord(employeeArr) {
    return {
    firstName: employeeArr[0],
    familyName:employeeArr[1],
    title: employeeArr[2],
    payPerHour: employeeArr[3],
    timeInEvents: [],
    timeOutEvents: []
    };
};

function createEmployeeRecords(employees) {
    return employees.map(employeeArr => {
        return createEmployeeRecord(employeeArr);
    });
};

function createTimeInEvent(dateTime) {
    this.timeInEvents.push({
        type: "TimeIn",
        date: dateTime.split(" ")[0],
        hour: parseInt(dateTime.split(" ")[1])
    });
    return this;
}

function createTimeOutEvent(dateTime) {
    this.timeOutEvents.push({
        type: "TimeOut",
        date: dateTime.split(" ")[0],
        hour: parseInt(dateTime.split(" ")[1])
    });
    return this;
}

function hoursWorkedOnDate(date) {
    const timeInObj = this.timeInEvents.find(timeInEvent => {
        return timeInEvent.date === date;
    })
    const timeOutObj = this.timeOutEvents.find(timeOutEvent => {
        return timeOutEvent.date === date;
    })
    return (timeOutObj.hour - timeInObj.hour)/100
}

function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
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

function calculatePayroll(employees) {
    return employees
      .map(employee => {
        return allWagesFor.call(employee);
      })
      .reduce((acc, memo) => {
        return acc + memo;
      });
};
  
function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => {
      return employee.firstName === firstName;
    });
};