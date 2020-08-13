//runs the update query for the gift cards table by passing the id of the corresponding gift card to the /giftcards/id page
function updategiftcard(id){
    $.ajax({
        url: '/giftcards/' + id,
        type: 'PUT',
        data: $('#update-giftcard').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
