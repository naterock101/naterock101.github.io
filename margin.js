/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    "use strict";

	
    //make your label variables
    var manuCost, manPercent, distroCost, distroPercent, wholeCost, wholePercent, retailCost, retailPercent, customerCost, number, newNumber;
    manuCost = "";
    manPercent = "";
    distroCost = $("#distroCost");
    distroPercent = "";
    wholeCost = $("#wholeCost");
    wholePercent = "";
    retailCost = $("#retailCost");
    retailPercent = $("#retailPercent").val();
    customerCost = $("#customerInput");
    //for use in the maths
    number = "";
    newNumber = "";

    //we will either have a known price for customers or
    //or we will have a known sale price for manufactures
    //on top of knowing the marin % for each middleman
    //knowing this the formula become x=cost/(1-margin%)
        
    //limit the margin percentages to 2 digits so we dont brake the maths.
    $("#manPercent, #distroPercent, #wholePercent, #retailPercent").on("input", function () {
        if (this.value.length > 2) {
            this.value = this.value.slice(0, 2);
        }
    });
    
    //start with when user enters a known manufacturers cost, cause thats what we are :)
    $("#manCost, #manPercent, #distroPercent, #wholePercent, #retailPercent").on("input", function () {
        //first convert the cost and margin percent into numbers.
        manuCost = parseInt($("#manCost").val(), 10);
        manPercent = parseInt($("#manPercent").val(), 10);
        
        //for the distro cost
        //to get the distro cost you use X = cost/(1-margin%)
        number = manuCost / (1 - (manPercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //save this for later use
        newNumber = number;
        //convert it back to a string and set its text
        distroCost.text("$" + number.toString(10));
        //repeat this for all the other variables :)
        
        //for the wholesale cost
        //you will need to convert the distro margin percent into a number
        distroPercent = parseInt($("#distroPercent").val(), 10);
        //to get the wholesale cost you use X = distrocost/(1-margin%)
        number = newNumber / (1 - (distroPercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //save this for later use
        newNumber = number;
        //convert it back to a string and set its text
        wholeCost.text("$" + number.toString(10));
        
        //for the retail cost
        //you will need to convert the wholesale margin percent into a number
        wholePercent = parseInt($("#wholePercent").val(), 10);
        //to get the retail cost you use X = wholesalecost/(1-margin%)
        number = newNumber / (1 - (wholePercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //save this for later use
        newNumber = number;
        //convert it back to a string and set its text
        retailCost.text("$" + number.toString(10));
        
        //for the customer cost
        //you will need to convert the retail margin percent into a number
        retailPercent = parseInt($("#retailPercent").val(), 10);
        //to get the customer cost you use X = retailcost/(1-margin%)
        number = newNumber / (1 - (retailPercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //set its value
        customerCost.val(number);
    });
    
        //make changing the cost also do maths
    
});