'use strict';
// let NOTIFICATION_ID = 'snkrs';
// let DEFAULT_RETRY_ATTEMPTS = 10;

// let calls = {};

// let proxyUser = '',
//     proxyPwd = '';

// chrome.bookmarks.search('credentials', function(results) {
//     if (typeof results !== 'undefined') {
//         let crede = (new URL(results[0].url)).searchParams;
//         if ((crede.get('user') !== null) && (crede.get('pwd') !== null)) {
//             proxyUser = crede.get('user');
//             proxyPwd = crede.get('pwd');
//         }
//     }
// });

//init debug structure if is first time or if more than 30 minutes elapsed
if ((typeof localStorage["timestamp"] === 'undefined') ||
    (new Date().getTime() - localStorage["timestamp"]) > (30 * 60 * 1000)) {
    localStorage["user-name"] = 'false';
    localStorage["confirm-btn"] = 'false';
    localStorage["save-continue-btn"] = 'false';
    localStorage["submit-order"] = 'false';
    localStorage["invalid-user"] = 'false';
    localStorage["type-cvc"] = 'false';
    localStorage["error-refresh"] = 'false';
    localStorage["refresh-btn"] = 'false';
    localStorage["notify-me"] = 'false';
    localStorage["purchased"] = 'false';
    localStorage["sizes-available"] = 'false';
    localStorage["enter-draw"] = 'false';
    localStorage["what-is-draw"] = 'false';
    localStorage["are-you-sure"] = 'false';
    localStorage["an-error-occurred"] = 'false';
    localStorage["got-em"] = 'false';
    localStorage["entry-in"] = 'false';
    localStorage["continue-shop"] = 'false';
    localStorage["cookies"] = 'false';
    localStorage["timestamp"] = new Date().getTime();
}

window.setInterval(function() {
    //let div = document.getElementById("theDiv");
    // let div = document.getElementsByClassName("sheet-data__price--actual notranslate");
    // wait until page ready

    if (document.readyState === 'complete') {



        // get current time
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let seconds = date.getSeconds();

        // search stuff
        let elems = document.querySelectorAll('[data-qa]');
        elems.forEach(function(elem) {
            if (localStorage["user-name"] == 'false') {
                // search user name
                if (elem.getAttribute('data-qa') === "user-name") {
                    if (elem.textContent.length >= 1) {
                        console.log("SNKRS: Valid User");
                        // update localStorage
                        localStorage["user-name"] = 'true';
                        // go to the next iteration
                        return;
                    }
                }
            }

            if (localStorage["confirm-btn"] == 'false') {
                // search Confirm Button 
                if (elem.getAttribute('data-qa') === "presubmit-confirm") {
                    if (elem.textContent === "Confirm ") {
                        console.log("SNKRS: Confirm Button!");
                        // update localStorage
                        localStorage["confirm-btn"] = 'true';
                        // go to the next iteration
                        return;
                    }
                }
            }

            if (localStorage["save-continue-btn"] == 'false') {
                // search save & continue button 
                if (elem.getAttribute('data-qa') === "save-button") {
                    if (elem.textContent === "Save & Continue") {
                        console.log("SNKRS: Save & Continue!");
                        // update localStorage
                        localStorage["save-continue-btn"] = 'true';
                        // go to the next iteration
                        return;
                    }
                }
            }

            if (localStorage["submit-order"] == 'false') {
                // search submit order button
                if (elem.getAttribute('data-qa') === "save-button") {
                    if (elem.textContent === "Submit Order") {
                        console.log("SNKRS: Submit Order!");
                        // update localStorage
                        localStorage["submit-order"] = 'true';
                        // go to the next iteration
                        return;
                    }
                }
            }
        });

        // check if join/login button is available 
        if (localStorage["invalid-user"] == 'false') {
            let joinBtn = document.getElementsByClassName("join-log-in");
            // if found
            Array.prototype.forEach.call(joinBtn, function(btn) {
                // verify if the login name is a valid user name
                if (btn.textContent === "Join/Log In") {
                    console.log("SNKRS: Invalid User");
                    // update locaStorage
                    localStorage["invalid-user"] = 'true';
                }
            });
        }

        // check for errors
        let errors = document.getElementsByClassName("text-color-error");
        // if found
        Array.prototype.forEach.call(errors, function(error) {

            // verify if we got an error
            if (error.textContent.includes("Please refresh")) {
                console.log("SNKRS: Error, refreshing...");
                // reload the page
                window.location.reload();
                // go to the next iteration
                return;
            }

            if (localStorage["type-cvc"] == 'false') {
                // search cvc field
                if (error.textContent.includes("security code")) {
                    console.log("SNKRS: Type CVC!");
                    // update localStorage
                    localStorage["type-cvc"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
        });

        // search notify me and purchased
        let buttonCount = document.getElementsByClassName("buttoncount-1");
        // if found
        Array.prototype.forEach.call(buttonCount, function(btn) {
            // check if notify me is still visible at 8:00
            if (btn.textContent === "Notify Me") {
                // check current time and reload the page
                if (hour === 8 && minute === 0 && seconds <= 10) {
                    if (localStorage["notify-me"] == 'false') {
                        console.log("SNKRS: Notify Me");
                        // update localStorage
                        localStorage["notify-me"] = 'true';
                    }
                    // reload the page only in the first 10 seconds
                    window.location.reload();
                    // go to the next iteration
                    return;
                }
            }
            // check if we found the Purchased Button
            if (localStorage["purchased"] == 'false') {
                if (btn.textContent === "Purchased") {
                    console.log("SNKRS: Purchased");
                    // update localStorage
                    localStorage["purchased"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
        });

        // check for table of sizes 
        if (localStorage["sizes-available"] == 'false') {
            let sizeTable = document.getElementsByClassName("size-layout");
            // if found
            Array.prototype.forEach.call(sizeTable, function(table) {
                // if childNodes not null, means that table of sizes is ready
                for (let i = 0; i < table.childNodes.length; i++) {
                    // check if there is at least one size available
                    if (table.childNodes[i].getAttribute('data-qa') === "size-available") {
                        console.log("SNKRS: Sizes available");
                        // update localStorage
                        localStorage["sizes-available"] = 'true';
                        break;
                    }
                    // TODO: reload page ?? 
                }
                // table[0].childNodes.forEach(function(node) {
                //     console.log(node.textContent);
                // });
            });
        }

        // what is the draw ?
        let whatIsTheDraw = document.getElementsByClassName("headline");
        // if found
        Array.prototype.forEach.call(whatIsTheDraw, function(line) {
            // search what is the draw 
            if (localStorage["what-is-draw"] == 'false') {
                if (line.textContent === "WHAT IS THE DRAW?") {
                    console.log("SNKRS: What is the draw ?");
                    // update localStorage
                    localStorage["what-is-draw"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search Are You Sure Button
            if (localStorage["are-you-sure"] == 'false') {
                if (line.textContent === "ARE YOU SURE?") {
                    console.log("SNKRS: Are you sure ?");
                    // update localStorage
                    localStorage["are-you-sure"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search An error occurred message
            if (localStorage["an-error-occurred"] == 'false') {
                if (line.textContent === "An error occurred.") {
                    console.log("SNKRS: An error occurred.");
                    // update localStorage
                    localStorage["an-error-occurred"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search Got Em'
            if (localStorage["got-em"] == 'false') {
                if (line.textContent === "Got 'em") {
                    console.log("SNKRS: Got 'em");
                    // update localStorage
                    localStorage["got-em"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search your entry is in
            if (localStorage["entry-in"] == 'false') {
                if (line.textContent === "Your entry is in") {
                    console.log("SNKRS: Your entry is in!");
                    // update localStorage
                    localStorage["entry-in"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
        });

        // search buttons - Buttons Available:
        // Enter Draw
        // Notify Me
        // Join / Log In
        // Sizes 
        // e.t.c ... 
        let buttons = document.querySelectorAll("button");
        buttons.forEach(function(btn) {
            // search enter draw button
            if (localStorage["enter-draw"] == 'false') {
                if (btn.textContent.includes("Enter Draw")) {
                    console.log("SNKRS: Enter Draw Button!");
                    // update localStorage
                    localStorage["enter-draw"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search refresh button
            if (localStorage["refresh-btn"] == 'false') {
                if (btn.textContent === "refresh") {
                    console.log("SNKRS: Refresh Button!");
                    // update localStorage
                    localStorage["refresh-btn"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search continue shopping
            if (localStorage["continue-shop"] == 'false') {
                if (btn.textContent === "Continue Shopping") {
                    console.log("SNKRS: Continue Shopping!");
                    // update localStorage
                    localStorage["continue-shop"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
        });

        // check if OK banner cookies button is visible
        if (localStorage["cookies"] == 'false') {
            let cookieBtn = document.getElementsByClassName("banner-cookie");
            // if found
            Array.prototype.forEach.call(cookieBtn, function(btn) {
                // verify if the login name is a valid user name
                if (btn.textContent === "OK") {
                    console.log("SNKRS: Banner Cookie Button!");
                    // update locaStorage
                    localStorage["cookies"] = 'true';
                }
            });
        }
    }

    // let num = parseInt(div.innerText);
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