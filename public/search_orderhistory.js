function search_orderhistory() {
    //get the first name 
    var orderhistory_search_string  = document.getElementById('orderhistory_search_string').value
    //construct the URL and redirect to it
    window.location = '/orderhistory/search/' + encodeURI(orderhistory_search_string)
}
