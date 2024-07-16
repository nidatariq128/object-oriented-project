#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"


class Student {
    name: string
    constructor(n:string){
        this.name = n
    }
}

class Person{
    students:Student[] = []
    addStudent(obj:Student){
        this.students.push(obj)
    }
}

const Persons = new Person()

const programStart = async(Persons: Person)=>{
    console.log(chalk.magenta(`WELCOME`));
    
    do{
    const ans = await inquirer.prompt({
        name: "select",
        type: "list",
        message: chalk.yellowBright("\n Whom would you like to interact with?..>>"),
        choices: ["Staff","Student","Exit"],
    });
    if(ans.select == "Staff"){
        console.log(chalk.greenBright(`\n You approach the staff room.Please feel free to ask any question.! \n`));
    }
    else if(ans.select == "Student"){
        const ans = await inquirer.prompt({
            name: "student",
            type: "input",
            message: chalk.yellowBright("\n Enter the Name of Student\n"),
        });
        const student = Persons.students.find(val => val.name == ans.student)
        if(!student){
            const name = new Student(ans.student)
            Persons.addStudent(name)
            console.log(chalk.greenBright(`Hello  ${name.name}`));
                console.log(chalk.magentaBright("\nNew Student Added\n"));
            console.log(chalk.redBright("Current student list:"));
            console.log(Persons.students);
        }else {
            console.log(`Hello i am ${student.name}. Nice to see you again!`);
            console.log(chalk.blackBright("Existing student list:"));
            console.log(Persons.students);
        }
    }else if (ans.select == "Exit"){
        console.log(chalk.bgBlueBright("\n Program Exit \n"));
        process.exit()
        
    }
}while(true)
}

programStart(Persons)
    