// Initialize global contact variables.
var id, firstname, lastname, selectedContact, pk;

// Include some dummy data to practice displaying stuff.
var contacts = {
        0: {
            id: 0,
            firstname: 'Poindexter',
            lastname: 'Brooks',
            address1: {
                street1: '101 Smart Lane',
                city1: 'Inteligencia',
                state1: 'AK',
            },
            address2: {
                street2: '101 Smart Lane',
                city2: 'Inteligencia',
                state2: 'AK',
            },
            phone1: '909-877-5645',
            phone2: '777-543-3367',
            email: 'poindexter@smartypants.edu'
        },

        1: {
            id: 1,
            firstname: 'John',
            lastname: 'Smith',
            address1: {
                street1: '3570 Wonder Where Drive',
                city1: 'Boston',
                state1: 'MA',
            },
            address2: {
                street2: '101 Smart Lane',
                city2: 'Inteligencia',
                state2: 'AK',
            },
            phone1: '318-777-0923',
            phone2: '',
            email: 'johnsmith@nowhere.com'
        },

        2: {
            id: 2,
            firstname: 'Ralph',
            lastname: 'Turner',
            address1: {
                street1: '3644 Open Road Ave.',
                city1: 'Seattle',
                state1: 'WA',
            },
            address2: {
                street2: '101 Smart Lane',
                city2: 'Inteligencia',
                state2: 'AK',
            },
            phone1: '734-227-7863',
            phone2: '',
            email: 'ralphthemouth@yahoo.com'
        },

        3: {
            id: 3,
            firstname: 'Neal',
            lastname: 'Luck',
            address1: {
                street1: '666 Underworld Lane',
                city1: 'Bad Place',
                state1: 'TX',
            },
            address2: {
                street2: '101 Smart Lane',
                city2: 'Inteligencia',
                state2: 'AK',
            },
            phone1: '998-313-5003',
            phone2: '',
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
    var numberOfPhones = 1;
    var numberofAddresses = 1;

    // Event handlers
    form.on('click', '#addPhone', function(event){
        numberOfPhones += 1;
        event.preventDefault();
        if (numberOfPhones % 2 == 0) {
             addPhone();
         } else {
            removePhone();
         }

    });
    form.on('click', '#addAddress', function(event){
        numberofAddresses += 1;
        event.preventDefault();
        if (numberofAddresses % 2 == 0) {
            addAddress();
        } else {
            removeAddress();
        }
    });
    form.on('click', 'button#add', function(event){
        event.preventDefault();
        // Put the form fields in a JSON object.
        var fields = $(form).serializeArray();
        addContact(fields);
        // Found this solution online
        // The get(0) allows you to access the underlying DOM element
        // instead of just the jQuery array object containing the form.
        form.get(0).reset();
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
    selectedContact = getContact(id);
    console.log('The contact selected is: ' + selectedContact);
    var info = $('ul.contact-info');
    var contactHTML = '<li class="firstname">First Name: ' + selectedContact.firstname + '</li><li class="lastname">Last Name: ' + selectedContact.lastname + '</li>';

    // Print the phone number.
    contactHTML += '<li class="phone1">Phone Number: ' + selectedContact.phone1 + '</li>';
    // Print the second phone number.
    contactHTML += '<li class="phone2">Phone Number 2: ' + selectedContact.phone2 + '</li>';
    // Print the email address.
    contactHTML += '<li class="email">Email Address: ' + selectedContact.email + '</li>';
    // Print the main address.
    contactHTML += '<li>Address 1:</li><ul><li class="address1">Street/Apt/PO: ' + selectedContact.address1.street1 + '</li><li>City: '  + selectedContact.address1.city1 + '</li><li>State: ' + selectedContact.address1.state1 + '</li></ul>';
    // Print the secondary address.
    contactHTML += '<li>Address 2:</li><ul><li class="address2">Street/Apt/PO: ' + selectedContact.address2.street2 + '</li><li>City: '  + selectedContact.address2.city2 + '</li><li>State: ' + selectedContact.address2.state2 + '</li></ul>';

    info.html(contactHTML);
}

function getContact(id) {
    console.log("This id is still: " + id);
    console.log(contacts[id]);
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
    // Get the values submitted and insert them into the contact object.
    // To move to variation #2 add the address fields to objects.
    var address1 = {};
    var address2 = {};
    $.each(fields, function(i, fields) {
        contact[fields.name] = fields.value;
        if (fields.name.match(/street1|city1|state1/)) {
            address1[fields.name] = fields.value;
        } else if (fields.name.match(/street2|city2|state2/)) {
            address2[fields.name] = fields.value;
        }
    });
    contact["address1"] = address1;
    contact["address2"] = address2;
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

function addPhone() {
    $('#phone2').show();
    $('#addPhone').text('Remove Phone Number');
}

function removePhone() {
    $('#phone2').hide();
    $('#addPhone').text('Add Phone Number');
}

function addAddress() {
    $('#address2').show();
    $('#addAddress').text('Remove Address');
}

function removeAddress() {
    $('#address2').hide();
    $('#addAddress').text('Add Address');

}