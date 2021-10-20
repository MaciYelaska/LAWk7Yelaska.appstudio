customerUpdate.onshow=function(){
    query = "SELECT * FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)

        if (req.status == 200) { //transit worked.
            allCustomerData = JSON.parse(req.responseText)  // parse data in an array
            let message = ""
               for (i = 0; i < allCustomerData.length; i++)
                   message = message + allCustomerData[i][1] + "\n"
               txtaCustList.value = message
        } else {
            // transit error
            lblUpdateMessage.value = `Error: ${req.status}`
        }  
}

btnUpdate.onclick=function(){
    let newName = inptNewName.value
    let oldName = inptOldName.value
    query = "SELECT * FROM customer WHERE `name` = '" + oldName + "'"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)
    if (req.status == 200) {
        allPetData = JSON.parse(req.responseText)
        if (allCustomerData.length > 0) {
            query = "UPDATE customer SET `name` ='" + newName + "' WHERE `name` = '" + oldName + "'"
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)
            if (req.status ==  200)  
                if (req.responseText == 500)   
                    lblUpdateMessage.value = `You have successfully updated ${oldName} to ${newName}.`
                else
                    lblUpdateMessage.value = `There was a problem updating ${oldName} to ${newName}.`
            else   
                lblUpdateMessage.value = `Error: ${req.status}`
        }
    } 
}