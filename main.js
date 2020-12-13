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

        // search user login name
        var elems = document.querySelectorAll('[data-qa]');
        elems.forEach(function(elem) {
            if (elem.getAttribute('data-qa') === "user-name") {
                if (elem.textContent.length >= 1) {
                    console.log("Valid User");
                }
            }
        });


        // check if join/login button is available 
        var join = document.getElementsByClassName("join-log-in");
        // if found
        if (join.length >= 1) {
            // verify if the login name is a valid user name
            if (join[0].textContent === "Join/Log In") {
                console.log("Invalid User");
            }
        }

        // check if notify me is still visible
        var notifyBtn = document.getElementsByClassName("buttoncount-1");
        // if found
        if (notifyBtn.length >= 1) {
            if (notifyBtn[0].textContent === "Notify Me") {
                // check current time and reload the page
                // TODO: replace with (hour === 8 && minute === 0 && seconds <= 10)
                if (hour >= 8 && minute >= 0 && seconds <= 10) {
                    console.log("Notify Me");
                    // reload the page only in the first 10 seconds
                    window.location.reload();
                }
            }
        }
    }



    // console.debug(div[0].textContent);
    // for (i = 0; i < div.length; i++) {
    //     console.debug(div[i].textContent);
    // }

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