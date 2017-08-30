/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/log','N/email'],
/**
 * @param {record} record
 */
function(record,log,email) {
    

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function checkFinanceChange(scriptContext) {
    	var currentRecord = scriptContext.newRecord;
    	var oldRecord = scriptContext.oldRecord;
    	
    	/* Read fields NetSuite Customer */
    	var financeEmailOld = oldRecord.getValue({fieldId:'custentity_financeemails'});
    	var financeEmailNew = currentRecord.getValue({fieldId:'custentity_financeemails'});
    	
    	system.out.println("HET WERK!!!!");
    	
    	/* Check if email has been changed */
    	if (financeEmailOld !== financeEmailNew){
    		    		
    		var customerId = oldRecord.getValue({fieldId: 'entityid'});
    		var internalId = oldRecord.id;
    		
    		/* Roep functie aan */
    		sendEmailToFinance(customerId,internalId);
    	}
    	
    }
    
    function sendEmailToFinance(customerData,internalId){
    	var recipientEmail = 'finance@secrid.com';
    	
    	/* Body email text in HTML */
    	var bodyMail = '<HTML>Beste Finance afdeling, <br /><br />Vandaag is het finance email adres van <a href="https://system.eu1.netsuite.com/app/common/entity/custjob.nl?id=';
    	bodyMail += internalId;
    	bodyMail += '">';
    	bodyMail += customerData;
    	bodyMail += '</a> veranderd.<br /><br />Met vriendelijke groetjes,<br />Team NetSuite</HTML>';
    	
    
    	/* Send email to finance about change */
    	email.send({
    		author: 32902,
    		recipients: recipientEmail,
    		subject: 'Finance email customer has been changed.',
    		body: bodyMail
    	});   	
    }


    return {
        beforeSubmit: checkFinanceChange
    };
    
});
