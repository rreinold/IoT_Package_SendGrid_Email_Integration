
function ExampleSendEmailParameterized(req, resp){
    
    // `req` object contains useful information, check the logs to see its contents
    log(req)
    
    // `req` object contains the email of the user that invocated this service
    // so let's send an e-mail to the person who invoked this service
    var emailRecipient = req.userEmail
    
    var timestamp = new Date();
    var message = 
        "Hello!<br><br>We're sending this friendly reminder about your tags in your <b>Connected Job Site</b>." +
        "<br><br>" +
        "Our records show the time duration since the last tag position update has <b>exceeded</b> the allowed threshold.<br><br>" +
        "Time Since Last Update:<br><b>a few seconds ago</b><br>Tag ID:<br><b>E4956EFFFEA50869</b><br>Timestamp (UTC): <br><b>" + timestamp + "</b><br><br>" +
        "<i> Tip: If you build a Data Visualization Portal, you can put a link here to view a dashboard of your IoT Solution!</i><br><br>" + 
        "Thank you!<br>ClearBlade"
    
    var subject = "ClearBlade IoT Platform - Connected Job Site - Inactivity Alert"
    var sgEmail = SendGridEmail(SEND_GRID_TOKEN, ORIGIN_EMAIL)    
    sgEmail.SendEmailToList(message, subject, [emailRecipient], function(err, data){
        if(err){
            log(JSON.stringify(err))
            resp.error(err)
        }
        var message = "Successful email sent!"
        log(message); 
        resp.success(message);
    })
}