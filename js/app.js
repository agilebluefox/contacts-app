// Initialize Variables
var contacts = [],
form;

// Instill some dummy data to practice displaying stuff.
contacts = [
        {
           firstname: 'Poindexter',
           lastname: 'Brooks',
           address1: '101 Smart Lane',
           city: 'Inteligencia',
           state: 'AK',
           phone: '909-877-5645',
           email: 'poindexter@smartypants.edu'
        },

        {
            firstname: 'John',
            lastname: 'Smith',
            address1: '3570 Wonder Where Drive',
            city: 'Boston',
            state: 'MA',
            phone: '318-777-0923',
            email: 'johnsmith@nowhere.com'
        },

        {
            firstname: 'Ralph',
            lastname: 'Turner',
            address1: '3644 Open Road Ave.',
            city: 'Seattle',
            state: 'WA',
            phone: '734-227-7863',
            email: 'ralphthemouth@yahoo.com'
        },

        {
            firstname: 'Neal',
            lastname: 'Luck',
            address1: '666 Underworld Lane',
            city: 'Bad Place',
            state: 'TX',
            phone: '998-313-5003',
            email: 'eviltwin@wicked.com'
        },
];

$(document).ready(pageLoad);
// Run this when the page loads.
function pageLoad() {
    // Get the form element
    form = $('form');
    // Event handlers
    form.submit(function(event){
        event.preventDefault();
        var fields = $(this).serializeArray();
        addContact(fields);
    });
}
// Get the data from the form, create a new contact object and store it
// in the contacts array.
function addContact(fields) {
    var contact = new Person();
    // Get the values submitted.
    $.each(fields, function(i, fields) {
        contact[fields.name] = fields.value;
    });
    // Add the new contact object to the array of contacts.
    contacts.push(contact);
}

var Person = function() {};