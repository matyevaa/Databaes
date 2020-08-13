//runs the delete query for the gift cards table by passing the id of the corresponding gift card to the /giftcards/id page
function deletegiftcard(id){
    $.ajax({
        url: '/giftcards/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

