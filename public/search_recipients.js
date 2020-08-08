function search_recipients() {
    //get the first name 
    var recipients_search_string  = document.getElementById('recipients_search_string').value
    //construct the URL and redirect to it
    window.location = '/recipients/search/' + encodeURI(recipients_search_string)
}
