// Initialize global contact variables.
var id, firstname, lastname, address1, city, state, phone, email;
// Get the DOM elements
var form = $('form');

// Include some dummy data to practice displaying stuff.
var contacts = [
        {
           id: 0,
           firstname: 'Poindexter',
           lastname: 'Brooks',
           address1: '101 Smart Lane',
           city: 'Inteligencia',
           state: 'AK',
           phone: '909-877-5645',
           email: 'poindexter@smartypants.edu'
        },

        {
            id: 1,
            firstname: 'John',
            lastname: 'Smith',
            address1: '3570 Wonder Where Drive',
            city: 'Boston',
            state: 'MA',
            phone: '318-777-0923',
            email: 'johnsmith@nowhere.com'
        },

        {
            id: 2,
            firstname: 'Ralph',
            lastname: 'Turner',
            address1: '3644 Open Road Ave.',
            city: 'Seattle',
            state: 'WA',
            phone: '734-227-7863',
            email: 'ralphthemouth@yahoo.com'
        },

        {
            id: 3,
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
    buildList();

    // Event handlers
    form.submit(function(event){
        event.preventDefault();
        // Put the form fields in a JSON object.
        var fields = $(this).serializeArray();
        addContact(fields);
        this.reset();
    });
    $('ul.contact-list').on('click', 'li a', function(event){
        event.preventDefault();
        id = $(this).attr('href');
        console.log("The id value is: " + id);
        showContact(id);
    });
}

// Function to load the selected contact's information.
function showContact(id) {
    var selectedContact = $.grep(contacts, function(contact) {return(contact.id === 3);
    var info = $('ul.contact-info');
    info.html('<li class="first-name">First Name: Some</li><li class="last-name">Last Name: Friend</li><li class="phone-number">Phone Number: 555-555-5555</li><li>Address:</li><ul><li class="address">123 No Way Lane, Wild Town, State</li></ul>');
}

// Get the data from the form, create a new contact object and store it
// in the contacts array.
function addContact(fields) {
    // Constructor for the Person object.
    var Person = function() {
        this.id = contacts.length;
    };
    // Make a new contact object.
    var contact = new Person();
    // Get the values submitted and insert them into the object.
    $.each(fields, function(i, fields) {
        contact[fields.name] = fields.value;
    });
    // Add the new contact object to the array of contacts.
    contacts.push(contact);
    addToList(contact);
}

// Render the names to the list of contacts.
function buildList() {
    for (var i = 0; i < contacts.length; i++)
    {
        id = contacts[i].id;
        firstname = contacts[i].firstname;
        lastname = contacts[i].lastname;
        renderListItem(id, firstname, lastname);
    }
}

// Add the newly added name to the contacts list.
function addToList(contact) {
    id = contact.id;
    firstname = contact.firstname;
    lastname = contact.lastname;
    renderListItem(id, firstname, lastname);
}

function renderListItem(id, first, last) {
    $('ul.contact-list').append('<li><a href="' + id + '">' + first + " " + last + '</a></li>');
}