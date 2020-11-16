{
    const IS_ABSENT = 0
    let empCheck = Math.floor(Math.random() * 10) % 2;
    if (empCheck == IS_ABSENT) {
        console.log("Employee is Absent");
    } else {
        console.log("Employee is Present");
    }
}

const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HRS = 4;
const FULL_TIME_HRS = 8;
const WAGE_PER_HOUR = 20;
const NUM_OF_WORKING_DAYS = 20;
const MAX_WORKING_HRS = 160;

function getWorkingHrs(empCheck) {
    switch (empCheck) {
        case IS_PART_TIME:
            return PART_TIME_HRS;
        case IS_FULL_TIME:
            return FULL_TIME_HRS;
        default:
            return 0;
    }
}

// calculating working hours for month
let empHrs = 0;
for (var i = 0; i < NUM_OF_WORKING_DAYS; i++) {
    let empCheck = Math.floor(Math.random() * 10) % 3;
    empHrs += getWorkingHrs(empCheck);
}
let empWage = empHrs * WAGE_PER_HOUR;
console.log("Total hrs: " + empHrs + " Emp wage : " + empWage);

// storing daily wages in an array
function calcDailyWage(empHrs) {
    return empHrs * WAGE_PER_HOUR;
}
// calculating working hours till max working days and hours
let totalEmpHrs = 0;
let totalWorkingDays = 0;
let empWageArr = new Array(); // daily wage array
let empDailyWageMap = new Map();   // daily wage map
let empHrsMap = new Map();  // daily hours map
let empDailyHrsAndWageArr = new Array();
while (totalEmpHrs < MAX_WORKING_HRS && totalWorkingDays < NUM_OF_WORKING_DAYS) {
    totalWorkingDays++;
    let empCheck = Math.floor(Math.random() * 10) % 3;
    let empHrs = getWorkingHrs(empCheck);
    totalEmpHrs += empHrs;
    empWageArr.push(calcDailyWage(empHrs));
    empDailyWageMap.set(totalWorkingDays, calcDailyWage(empHrs));
    empHrsMap.set(totalWorkingDays, empHrs);
    empDailyHrsAndWageArr.push({
        dayNum: totalWorkingDays,
        dailyHours: empHrs,
        dailyWage: calcDailyWage(empHrs),
        toString() {
            return "\nDay " + this.dayNum + " => Working Hours is " +
                this.dailyHours + " And Wage Earned = " + this.dailyWage;
        }
    });
}
let employeeWage = calcDailyWage(totalEmpHrs);
console.log("Total days : " + totalWorkingDays + " Total hrs : " + totalEmpHrs + " Total Employee Wage : " + employeeWage);
console.log("Employee wages array : " + empWageArr);


let totalEmpWage = 0;
function sum(dailyWage) {
    totalEmpWage += dailyWage;
}
empWageArr.forEach(sum);
console.log("UC 7A Total employee wage using forEach : " + totalEmpWage);

function totalWages(totalWage, dailyWage) {
    console.log("Total Wages function : " + totalWage);
    return totalWage + dailyWage;
}
console.log("UC 7A Total employee wage using reduce " + empWageArr.reduce(totalWages, 0));
let dailyCounter = 0;
function dayAlongWithWage(dailyWage) {
    dailyCounter++;
    return dailyCounter + " = " + dailyWage;
}
let mapDayWithWage = empWageArr.map(dayAlongWithWage);
console.log("UC 7B Day along with daily wage ");
console.log(mapDayWithWage);

function fullTimeWage(dailyWage) {
    return dailyWage.includes("160");
}
let fullDayWageArr = mapDayWithWage.filter(fullTimeWage);
console.log("UC 7C Full Time wage : ");
console.log(fullDayWageArr);

console.log("UC 7D Find first occurence of full time wage: " + mapDayWithWage.find(fullTimeWage));

function isAllFullTimeWage(dailyWage) {
    return dailyWage.includes("160");
}
console.log("UC 7E Check all elements have full time wage: " + fullDayWageArr.every(isAllFullTimeWage));

function isAnyPartTimeWage(dailyWage) {
    return dailyWage.includes("80");
}
console.log("UC 7F Check if any part time wage: " + mapDayWithWage.some(isAnyPartTimeWage));
function totalDaysWorked(numOfDays, dailyWage) {
    if (dailyWage > 0) return numOfDays + 1;
    return numOfDays;
}
console.log("UC 7G Number of days emp worked: " + empWageArr.reduce(totalDaysWorked, 0));

console.log("UC8 Emp wage map totalHrs: " + Array.from(empDailyWageMap.values()).reduce(totalWages, 0));

const findTotal = (totalVal, dailyVal) => {
    console.log("Findtotal: " + totalVal);
    return totalVal + dailyVal;
}

let totalHours = Array.from(empHrsMap.values()).reduce(findTotal, 0);
let totalSalary = empWageArr.filter(dailyWage => dailyWage > 0).reduce(findTotal, 0);
console.log("UC9 Total hours: " + totalHours + " Total Salary: " + totalSalary);

let nonWorkingDays = new Array();
let partWorkingDays = new Array();
let fullWorkingDays = new Array();

empHrsMap.forEach((value, key) => {
    if (value == 8) fullWorkingDays.push(key);
    else if (value == 4) partWorkingDays.push(key);
    else nonWorkingDays.push(key);
});

console.log("Full working days: " + fullWorkingDays);
console.log("Part working days: " + partWorkingDays);
console.log("Non working days: " + nonWorkingDays);
console.log("UC 10 Array of objects with daily hours and wage : " + empDailyHrsAndWageArr);

let totalwages = empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage > 0)
    .reduce((totalWage, dailyHrsAndWage) => totalWage += dailyHrsAndWage.dailyWage, 0);

let totalhours = empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage > 0)
    .reduce((totalHours, dailyHrsAndWage) => totalHours += dailyHrsAndWage.dailyHours, 0);

console.log("UC 11A Total hours : " + totalhours + " total wage : " + totalwages);

console.log("UC 11B Logging full work days");
empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage == 8)
    .forEach(dailyHrsAndWage => console.log(dailyHrsAndWage.toString()));

let partWorkingDaysArr = empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 4)
    .map(dailyHrsAndWage => dailyHrsAndWage.toString());
console.log("UC 11C Part working days: " + partWorkingDaysArr);

let nonWorkingDayNums = empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 0)
    .map(dailyHrsAndWage => dailyHrsAndWage.dayNum);
console.log("UC 11D nonWorkingDayNums : " + nonWorkingDayNums);  

class EmployeePayrollData {
    id;
    salary;
    name;

    constructor(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    get name() { return this.name; }
    set name(name) { this.name = name; }

    toString() {
        return "id = " + this.id + ", name = " + this.name + ", salary = " + this.salary;
    }
}

let employee = new EmployeePayrollData(1, "Mark", 30000);
console.log(employee.toString());
employee.name = "John";
console.log(employee.toString());