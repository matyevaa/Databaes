function deletegiftcard(id){
    $.ajax({
        url: '/giftcards/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
