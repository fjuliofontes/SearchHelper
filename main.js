// var NOTIFICATION_ID = 'snkrs';
// var DEFAULT_RETRY_ATTEMPTS = 10;

// var calls = {};

// var proxyUser = '',
//     proxyPwd = '';

// chrome.bookmarks.search('credentials', function(results) {
//     if (typeof results !== 'undefined') {
//         var crede = (new URL(results[0].url)).searchParams;
//         if ((crede.get('user') !== null) && (crede.get('pwd') !== null)) {
//             proxyUser = crede.get('user');
//             proxyPwd = crede.get('pwd');
//         }
//     }
// });

window.setInterval(function() {
    //var div = document.getElementById("theDiv");
    // var div = document.getElementsByClassName("sheet-data__price--actual notranslate");
    // wait until page ready

    if (document.readyState === 'complete') {

        // get current time
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var seconds = date.getSeconds();

        // search stuff
        var elems = document.querySelectorAll('[data-qa]');
        elems.forEach(function(elem) {
            // search user name
            if (elem.getAttribute('data-qa') === "user-name") {
                if (elem.textContent.length >= 1) {
                    console.log("Valid User");
                }
            }
            // search Confirm Button 
            if (elem.getAttribute('data-qa') === "presubmit-confirm") {
                if (elem.textContent === "Confirm ") {
                    console.log("Confirm Button!");
                }
            }
            // search save & continue button 
            if (elem.getAttribute('data-qa') === "save-button") {
                if (elem.textContent === "Save & Continue") {
                    console.log("Save & Continue!");
                }
            }
            // search submit order button
            if (elem.getAttribute('data-qa') === "save-button") {
                if (elem.textContent === "Submit Order") {
                    console.log("Submit Order!");
                }
            }
        });


        // check if join/login button is available 
        var joinBtn = document.getElementsByClassName("join-log-in");
        // if found
        Array.prototype.forEach.call(joinBtn, function(btn) {
            // verify if the login name is a valid user name
            if (btn.textContent === "Join/Log In") {
                console.log("Invalid User");
            }
        });

        // check for errors
        var errors = document.getElementsByClassName("text-color-error");
        // if found
        Array.prototype.forEach.call(errors, function(error) {
            // verify if we got an error
            if (error.textContent.includes("Please refresh")) {
                console.log("Error, refreshing...");
                // reload the page
                window.location.reload();
            }
            // search cvc field
            if (error.textContent.includes("security code")) {
                console.log("Type CVC!");
            }
        });

        // check if notify me is still visible
        var buttonCount = document.getElementsByClassName("buttoncount-1");
        // if found
        Array.prototype.forEach.call(buttonCount, function(btn) {
            if (btn.textContent === "Notify Me") {
                // check current time and reload the page
                // TODO: replace with (hour === 8 && minute === 0 && seconds <= 10)
                if (hour >= 8 && minute >= 0 && seconds <= 10) {
                    console.log("Notify Me");
                    // reload the page only in the first 10 seconds
                    window.location.reload();
                }
            }
        });

        // check for table of sizes 
        var sizeTable = document.getElementsByClassName("size-layout");
        // if found
        Array.prototype.forEach.call(sizeTable, function(table) {
            // if childNodes not null, means that table of sizes is ready
            for (var i = 0; i < table.childNodes.length; i++) {
                // check if there is at least one size available
                if (table.childNodes[i].getAttribute('data-qa') === "size-available") {
                    console.log("Sizes available");
                    break;
                }
                // TODO: reload page ?? 
            }
            // table[0].childNodes.forEach(function(node) {
            //     console.log(node.textContent);
            // });
        });

        // what is the draw ?
        var whatIsTheDraw = document.getElementsByClassName("headline");
        // if found
        Array.prototype.forEach.call(whatIsTheDraw, function(line) {
            // search what is the draw 
            if (line.textContent === "WHAT IS THE DRAW?") {
                console.log("What is the draw ?");
            }
            // search Are You Sure Button
            if (line.textContent === "ARE YOU SURE?") {
                console.log("Are you sure ?");
            }
        });

        // search buttons - Buttons Available:
        // Enter Draw
        // Notify Me
        // Join / Log In
        // Sizes 
        // e.t.c ... 
        var buttons = document.querySelectorAll("button");
        buttons.forEach(function(btn) {
            // search enter draw button
            if (btn.textContent.includes("Enter Draw")) {
                console.log("Enter Draw Button!");
            }
        });
    }

    // var num = parseInt(div.innerText);
    // if (num > THRESHOLD) {
    //     alert('The number is: ' + num);
    // }
    // If you need to reload the page itself to check the number
    // then just reload the page on a regular interval
    // window.location.reload();  
}, 1000);


// // Remove saved credentials on firts start
// chrome.runtime.onStartup.addListener(function() {});

// // Shows settings on install.
// chrome.runtime.onInstalled.addListener(function(details) {
//     if (details.reason && (details.reason === 'install') || (details.reason === 'update')) {}
// });

// // Show settings when clicking on the icon.
// chrome.browserAction.onClicked.addListener(function() {});

/* Core */