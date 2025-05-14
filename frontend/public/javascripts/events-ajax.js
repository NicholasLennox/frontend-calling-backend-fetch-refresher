// Load events with jQuery AJAX
function getEvents() {
    const API_URL = 'http://localhost:5000/events?mode=success';

    $.ajax({
        url: API_URL,
        method: 'GET',
        dataType: 'json',
        success: function (json) {
            if (json.status === 'success') {
                renderEventsTable(json.data);
            } else if (json.status === 'fail') {
                console.error(`There was a failure: ${json.message}`);
            } else {
                console.error(`An error occurred: ${json.message}`);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // This block handles network errors, unreachable server, etc.
            console.error('AJAX request failed:', textStatus, errorThrown);
        }
    });
}

function renderEventsTable(events) {
    const $tableBody = $('#eventTable tbody');
    $tableBody.empty(); // Clear existing rows

    events.forEach(event => {
        const $row = $(`
            <tr>
                <td>${event.name}</td>
                <td>${event.date}</td>
                <td><button id="action-btn" data-id="${event.id}">Action</button></td>
            </tr>
        `);
        $tableBody.append($row);
    });
}

// Can use a class or id to identify our button, we are using id
$(document).on('click', '#action-btn', function () {
    const eventId = $(this).data('id');
    alert(`You clicked on event ID: ${eventId}`);
});

/*
    We use jQuery's document ready instead of DOMContentLoaded.
    It ensures the DOM is fully parsed before running our code.
*/
$(document).ready(function () {
    getEvents();
});
