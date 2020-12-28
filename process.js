'use strict';

let LOG_PREFIX = "SH:";

// debug function
// 0 1608759842 SH: msg
// ...
// N 1608759842+N SH: msg
function debug_log(msg) {
    let current_timestamp = parseInt(new Date().getTime());
    let debug_counter = parseInt(localStorage["debug-counter"]);
    let header = debug_counter.toString() + ' ' +
        current_timestamp.toString() + ' ' + LOG_PREFIX + ' ';
    console.log(header + msg);
    localStorage["debug-counter"] = debug_counter + 1;
}

//init debug structure if is first time or if more than 5 minutes elapsed
if ((typeof localStorage["timestamp"] === 'undefined') ||
    (new Date().getTime() - localStorage["timestamp"]) > (5 * 60 * 1000)) {
    localStorage["debug-counter"] = 0;
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

// runs every 1 second
window.setInterval(function() {
    // wait page ready
    if (document.readyState === 'complete') {
        // get current time
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let seconds = date.getSeconds();

        // get all 'data-qa' 
        let elems = document.querySelectorAll('[data-qa]');
        elems.forEach(function(elem) {
            if (localStorage["user-name"] == 'false') {
                // search user name
                if (elem.getAttribute('data-qa') === "user-name") {
                    if (elem.textContent.length >= 1) {
                        debug_log("user-name");
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
                    if (elem.textContent === "Confirm") {
                        debug_log("confirm-btn");
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
                        debug_log("save-continue-btn");
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
                        debug_log("submit-order");
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
                    debug_log("invalid-user");
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
                debug_log("error-refresh");
                // reload the page
                window.location.reload();
                // go to the next iteration
                return;
            }

            if (localStorage["type-cvc"] == 'false') {
                // search cvc field
                if (error.textContent.includes("security code")) {
                    debug_log("type-cvc");
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
                        debug_log("notify-me");
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
                    debug_log("purchased!");
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
                        debug_log("sizes-available");
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

        // what is the draw, search An error occurred message
        // Got Em', entry is in
        let headline_3 = document.getElementsByClassName("headline-3");
        // if found
        Array.prototype.forEach.call(headline_3, function(line) {
            // search what is the draw 
            if (localStorage["what-is-draw"] == 'false') {
                if (line.textContent === "WHAT IS THE DRAW?") {
                    debug_log("what-is-draw");
                    // update localStorage
                    localStorage["what-is-draw"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search An error occurred message
            if (localStorage["an-error-occurred"] == 'false') {
                if (line.textContent === "An error occurred.") {
                    debug_log("an-error-occurred");
                    // update localStorage
                    localStorage["an-error-occurred"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search Got Em'
            if (localStorage["got-em"] == 'false') {
                if (line.textContent === "Got 'em") {
                    debug_log("got-em");
                    // update localStorage
                    localStorage["got-em"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search your entry is in
            if (localStorage["entry-in"] == 'false') {
                if (line.textContent === "Your entry is in") {
                    debug_log("entry-in");
                    // update localStorage
                    localStorage["entry-in"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
        });

        // are you sure ?
        if (localStorage["are-you-sure"] == 'false') {
            let headline_1 = document.getElementsByClassName("headline-1");
            // if found
            Array.prototype.forEach.call(headline_1, function(line) {
                // search Are You Sure Button
                if (line.textContent === "ARE YOU SURE?") {
                    debug_log("are-you-sure");
                    // update localStorage
                    localStorage["are-you-sure"] = 'true';
                    // go to the next iteration
                    return;
                }
            });
        }

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
                    debug_log("enter-draw");
                    // update localStorage
                    localStorage["enter-draw"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search refresh button
            if (localStorage["refresh-btn"] == 'false') {
                if (btn.textContent === "refresh") {
                    debug_log("refresh-btn");
                    // reload the page, try only once
                    window.location.reload();
                    // update localStorage
                    localStorage["refresh-btn"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
            // search continue shopping
            if (localStorage["continue-shop"] == 'false') {
                if (btn.textContent === "Continue Shopping") {
                    debug_log("continue-shop");
                    // update localStorage
                    localStorage["continue-shop"] = 'true';
                    // go to the next iteration
                    return;
                }
            }
        });

        // check if OK banner cookies button is visible
        if (localStorage["cookies"] == 'false') {
            let cookieBtn = document.querySelector("div[data-qa='cookie-banner']").classList.contains("d-sm-h");
            // if false, cookieBtn is present
            if (cookieBtn === false) {
                debug_log("cookies");
                // update locaStorage
                localStorage["cookies"] = 'true';
            }
        }
    }
}, 1000);