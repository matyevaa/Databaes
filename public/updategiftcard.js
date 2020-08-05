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