// Initialize global contact variables.
var id, firstname, lastname, address1, city, state, phone, email, pk;

// Include some dummy data to practice displaying stuff.
var contacts = {
        0: {
           id: 0,
           firstname: 'Poindexter',
           lastname: 'Brooks',
           address1: '101 Smart Lane',
           city: 'Inteligencia',
           state: 'AK',
           phone: '909-877-5645',
           email: 'poindexter@smartypants.edu'
        },

        1: {
            id: 1,
            firstname: 'John',
            lastname: 'Smith',
            address1: '3570 Wonder Where Drive',
            city: 'Boston',
            state: 'MA',
            phone: '318-777-0923',
            email: 'johnsmith@nowhere.com'
        },

        2: {
            id: 2,
            firstname: 'Ralph',
            lastname: 'Turner',
            address1: '3644 Open Road Ave.',
            city: 'Seattle',
            state: 'WA',
            phone: '734-227-7863',
            email: 'ralphthemouth@yahoo.com'
        },

        3: {
            id: 3,
            firstname: 'Neal',
            lastname: 'Luck',
            address1: '666 Underworld Lane',
            city: 'Bad Place',
            state: 'TX',
            phone: '998-313-5003',
            email: 'eviltwin@wicked.com'
        }
}


$(document).ready(pageLoad);
// Run this when the page loads.
function pageLoad() {
    buildList();
    pk = 5;

    // Get the DOM elements
    var form = $('form');
    var add = $('button#add');

    // Event handlers
    form.on('submit', add, function(event){
        event.preventDefault();
        // Put the form fields in a JSON object.
        var fields = $(this).serializeArray();
        addContact(fields);
        this.reset();
    });
    $('ul.contact-list').on('click', 'li a', function(event){
        event.preventDefault();
        id = $(this).attr('href');
        id = +id;
        console.log("The id value is: " + id);
        showContact(id);
    });
}

// Function to load the selected contact's information.
function showContact(id) {
    console.log("This id is: " + id);
    var selectedContact = getContact(id);
    console.log('The contact selected is: ' + selectedContact);
    var info = $('ul.contact-info');

    info.html('<li class="firstname">First Name: ' + selectedContact.firstname + '</li><li class="lastname">Last Name: ' + selectedContact.lastname + '</li><li class="phone-number">Phone Number: ' + selectedContact.phone + '</li><li>Address:</li><ul><li class="address">' + selectedContact.address1 + ', ' + selectedContact.city + ', ' + selectedContact.state + '</li></ul>');
}

function getContact(id) {
    console.log("This id is still: " + id);
    return contacts[id];
}

// Get the data from the form, create a new contact object and store it
// in the contacts array.
function addContact(fields) {
    // Constructor for the Person object.
    var Person = function() {
        this.id = pk;
    };
    // Make a new contact object.
    var contact = new Person();
    // Get the values submitted and insert them into the object.
    $.each(fields, function(i, fields) {
        contact[fields.name] = fields.value;
    });
    // Add the new contact object to the array of contacts.
    contacts[pk] = contact;
    addToList(contact);
    pk += 1;
}

// Render the names to the list of contacts.
function buildList() {
    for (var prop in contacts)
    {
        id = contacts[prop].id;
        firstname = contacts[prop].firstname;
        lastname = contacts[prop].lastname;
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