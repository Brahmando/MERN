const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/rootDir');
//Fake Database
// This is a simple in-memory array to simulate a database
const names=[];

const userContact = class Forms {
    constructor(name,email,age,address,imgUrl) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.address = address;
        this.imgUrl = imgUrl;
    }

    save(){
        // Here you would typically save the user contact to a database
        // For now, we will just log it to the console
        console.log(`Saving user contact: ${this.name}, ${this.email}, ${this.age}, ${this.address}, ${this.imgUrl}`);
        names.push(this);
        console.log(path.join(__dirname, '../data', 'contacts.json'))
        console.log(path.join(rootDir, 'data', 'contacts.json'))
        fs.writeFile(path.join(rootDir, 'data', 'contacts.json'), JSON.stringify(names), (err) => {
            if (err) {
                console.error('Error saving contacts:', err);
            } else {
                console.log('Contacts saved successfully.');
            }
        });
        console.log(names)
    }

    static getForm(){
        names.length==1 && fs.readFile(path.join(rootDir, 'data', 'contacts.json'), (err, data) => {
            if (err) {
                console.error('Error reading contacts:', err);
            } else {
              const contactData=JSON.parse(data);
              console.log('contactData-',contactData)
                contactData.forEach(contact => {
                    names.push(contact);
                });
            }
        });
        return names;
    }
}

module.exports = userContact;