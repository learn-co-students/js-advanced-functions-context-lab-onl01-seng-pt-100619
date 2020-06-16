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

function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays){
    //Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
    return arrayOfArrays.map(createEmployeeRecord)
}

function createTimeInEvent(time){           //(employeeRecord, dateStamp)
    let [date, hour] = time.split(' ')
    this.timeInEvents.push({type: "TimeIn", hour: parseInt(hour, 10), date: date})
    return this
    
    //let date = dateStamp.split(' ')[0]
    //let time = parseInt(dateStamp.split(' ')[1])
    //employeeRecord.timeInEvents.push({type: 'TimeIn', hour: time, date: date})
    //return employeeRecord
}

function createTimeOutEvent(time){          //(employeeRecord, dateStamp)
    let [date, hour] = time.split(' ')
    this.timeOutEvents.push({type: "TimeOut", hour: parseInt(hour, 10), date: date})
    return this
    //let date = dateStamp.split(' ')[0]
    //let time = parseInt(dateStamp.split(' ')[1])
    //employeeRecord.timeOutEvents.push({type: 'TimeOut', hour: time, date: date})
    //return employeeRecord
}

function hoursWorkedOnDate(date){           //(employeeRecord, date)
    let timeIn = this.timeInEvents.find(dayWorked => dayWorked.date === date)
    let timeOut = this.timeOutEvents.find(dayWorked => dayWorked.date === date)
    return (timeOut.hour - timeIn.hour) / 100
    //let timeIn = employeeRecord.timeInEvents.find(dayWorked => dayWorked.date === date)
    //let timeOut = employeeRecord.timeOutEvents.find(dayWorked => dayWorked.date === date)
    //return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(date){           //(employeeRecord, payDay)
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
    //return hoursWorkedOnDate(employeeRecord, payDay) * employeeRecord.payPerHour
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(name => {return name.firstName === firstName})
}

function calculatePayroll(arrayOfRecords){ 
    let sum = arrayOfRecords.map(e => allWagesFor.call(e))
    return sum.reduce((num, sum) => num + sum)
}
