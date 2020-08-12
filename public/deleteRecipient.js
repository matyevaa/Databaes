function deleteRecipient(id){
    $.ajax({
        url: '/recipients/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
