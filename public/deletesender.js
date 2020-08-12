function deleteSender(id){
    $.ajax({
        url: '/senders/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
