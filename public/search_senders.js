//runs the select query for the senders table by passing the user inputted value to the /senders/search page
function search_senders() {
    //get the first name 
    var senders_search_string  = document.getElementById('senders_search_string').value
    //construct the URL and redirect to it
    window.location = '/senders/search/' + encodeURI(senders_search_string)
}
