$(function () {
    //Json data by api call for order table
    $.get(orderListApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, order) {
                totalCost += parseFloat(order.total);
                table += '<tr>' +
                    '<td>' + order.datetime + '</td>' +
                    '<td>' + order.order_id + '</td>' +
                    '<td>' + order.customer_name + '</td>' +
                    '<td>' + order.total.toFixed(2) + ' Rs</td>' +
                    '<td>' +
                        '<button class="btn btn-info btn-sm" onclick="viewDetails(' + order.order_id + ')">Details</button> ' +
                        '<button class="btn btn-danger btn-sm" onclick="deleteOrder(' + order.order_id + ')">Delete</button>' +
                    '</td>' +
                '</tr>';
            });
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});

function viewDetails(orderId) {
    $.get('/getOrderDetails/' + orderId, function (data) {
        alert(JSON.stringify(data));
    });
}

function deleteOrder(orderId) {
    if (confirm("Are you sure you want to delete this order?")) {
        $.ajax({
            url: '/deleteOrder/' + orderId,
            type: 'DELETE',
            success: function () {
                alert("Order deleted successfully");
                location.reload();
            }
        });
    }
}