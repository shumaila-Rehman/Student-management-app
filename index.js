#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// define a student class.
class student {
    static counter = 10000; //    static counter jb use karte hain jb koi ek common element sb k liye rklhna ho..
    ID;
    name;
    courses;
    balance;
    constructor(name) {
        // ye initialize karne k liye use karte hain
        this.ID = student.counter++; // "this" is a key word.
        this.name = name;
        this.courses = []; // initialize an empty array for courses..
        this.balance = 100;
    }
    // Method to enroll a student in a course.
    enroll_course(course) {
        this.courses.push(course); // yaha ek method ban gya..
    }
    //Method to view a blance of student..
    viewBalance() {
        console.log(`Balance for ${this.name} : $${this.balance}`); // yaha dosra method bana dia.
    }
    // Method to pay tuition fees:
    payFees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}`); // yaha 3rd method ban gya.
        console.log(`Remaining balance is $${this.balance}`);
    }
    //  Method to display student status..
    show_status() {
        console.log(`ID: ${this.ID}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance:  $${this.balance}`); // yaha 4th step karlia.
    } // yaha tk sirf method bana hy.. baki sb students ka data manage karne k liye ek aur class
}
// defining a student class  manager to manage student..
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student..
    add_student(name) {
        let studentone = new student(name);
        this.students.push(studentone);
        console.log(`student: ${name} has added successfully. student ID: ${studentone.ID}`);
    }
    // Method to enroll a student in a course
    enroll_student(student_ID, course) {
        let studenT = this.find_student(student_ID);
        if (studenT) {
            studenT.enroll_course(course);
            console.log(`${studenT.name}  enrolled in ${course} successfully. `);
        }
    }
    //  Method to view a student balance
    view_student_balance(student_ID) {
        let studenT = this.find_student(student_ID);
        if (studenT) {
            studenT.viewBalance();
        }
        else {
            console.log("Student not found: ");
        }
    }
    // Method to pay student fees.
    pay_student_fees(student_ID, amount) {
        let student = this.find_student(student_ID);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log("student not found: ");
        }
    }
    // method to display student status:
    student_display_status(student_ID) {
        let student = this.find_student(student_ID);
        if (student) {
            student.show_status();
        }
    }
    // Method to find a student by student ID..
    find_student(student_ID) {
        return this.students.find(std => std.ID === student_ID);
    }
}
// makimg a main function to running the program.
async function main() {
    console.log(chalk.bgMagentaBright("\n\tWelcome to my student management sysytem\n\t"));
    console.log(chalk.magentaBright("-".repeat(60)));
    let student_manag = new student_manager();
    // loop for running program
    while (true) {
        let answers = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.green("Select an option"),
                choices: [
                    "Add student",
                    "Enroll Student",
                    "View student balance",
                    "Pay student fees",
                    "Show status",
                    "Exit",
                ],
            },
        ]);
        // using switch case to handle user  choics
        switch (answers.choice) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.yellow("Enter a Student Name: "),
                    },
                ]);
                student_manag.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.blueBright("Enter a Student ID: "),
                    },
                    {
                        name: "Course",
                        type: "input",
                        message: chalk.grey("Enter a Course Name: "),
                    },
                ]);
                student_manag.enroll_student(course_input.student_id, course_input.Course);
                break;
            case "View student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.green("Enter a Student ID: "),
                    },
                ]);
                student_manag.view_student_balance(balance_input.student_id);
                break;
            case "Pay student fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.yellowBright("Enter a Student ID: "),
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.blueBright("Enter the amount to pay: "),
                    },
                ]);
                student_manag.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.greenBright("Enter a Student ID: "),
                    },
                ]);
                student_manag.student_display_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.red.bold("Exiting..."));
                process.exit(); // its a new method to exit..
        }
    }
}
// calling a main function..
main();
