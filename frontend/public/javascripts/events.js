async function getEvents() {
    try {
        const res = await fetch('http://localhost:5000/events?mode=success')

        // Extract the body by converting it to JSON
        const json = await res.json()
        
        if(json.status === 'success') {
            // Render table
            renderEventsTable(json.data)
            
        } else if(json.status === 'fail') {
            // Log that something failed
            console.error(`There was a failure: ${json.message}`)
        } else {
            // Log there was an error
            console.error(`An error occured: ${json.message}`)
        }
        
    } catch (err) {
        // This catch block handles unexpected errors like network issues or code bugs,
        // not the 'fail' or 'error' statuses returned inside a successful JSON response.
        console.error('Error fetching events:', err);
    }
}

function renderEventsTable(events) {
    // Get the body of the table to add rows
    // https://www.w3schools.com/jsref/met_document_queryselector.asp
    // https://www.w3schools.com/cssref/css_selectors.php
    const tableBody = document.querySelector('#eventTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    events.forEach(event => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>
                <button onclick="handleAction(${event.id})">Action</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function handleAction(eventId) {
    alert(`You clicked on event ID: ${eventId}`)
}

/* 
    Remember: Async is for things that take time to execute. Browser events aren't something that takes time.
    So, browsers don’t expect event listener callbacks (like DOMContentLoaded) to be async, 
    and there's no built-in way to handle promise rejections from them. 
    If an async function inside a listener throws an error and it isn't caught, it can fail silently. 
    By keeping the listener synchronous and calling an async function inside it, 
    we make error handling explicit and easier to control.
*/
document.addEventListener('DOMContentLoaded', () => { 
    getEvents();
})