<html>
	<div style="margin-left: 185px;">
	    <img src="databaes.png" id=card3>
	    <img src="giftcard.png" id="card1">
    </div>

    <div class="nav" id="myNav">
    	<div style="align-items: center;">
    	    <ul>
    		    <li><a href="/">Home</a></li>
    		    <li><a href="/senders">Senders</a></li>
    		    <li><a href="/recipients" class="current">Recipients</a></li>
    		    <li><a href="/giftcards">GiftCards</a></li>
    		    <li><a href="/orders">Orders</a></li>
    	    	<li><a href="/orderhistory">Orders History</a></li>
    	    </ul>
    	</div>
	</div>
		
	<br/>
	<hr>
	<h3 style="font-size: 30px; text-align: center;">Recipients</h3>
	<hr>
	<br/>
	<p>Recipients can come to this page and search for orders by their name.  This will update
	the page with all the order lines associated with that particular name.</p>

	<div>
		<form id='search_recipients' action='' method=''>
			<!--- this form does not submit directly, the button handles all the interaction with backend -->
    		<label> Search people for first name starting with:</label>
    		<input id='recipients_search_string' type='text' name='recipients_search_string' value=''>
    		<input type="button" value="Search" onclick="search_recipients()">
		</form>
	</div>
	<h3>Orders for Recipient:</h3>
    <table>
        <thead> 
            <th>orderID</th> 
            <th>trackerID</th> 
            <th>email</th>
            <th>name</th>  
            <th>amount</th>  
        </thead> 
        <tbody>
            {{#each people}} 
            <tr> 
                <td>{{orderID}}</td> 
                <td>{{trackerID}}</td> 
                <td>{{email}}</td> 
                <td>{{name}}</td>
                <td>{{amount}}</td>
                <td><button onclick="deletePerson({{id}})">Delete</button></td>
                <td><a href="/people/{{id}}">Update</a></td>
            </tr> 
            {{/each}} 
        </tbody> 
</table> 
<!--a footer-->
<div class="footer">
	<p id="footer" style="padding-top: 22px;">Made by Databaes Team</p>
	<p id="footer">Oregon State University</p>
	<p id="footer">Summer 2020</p>
</div>
</html>
