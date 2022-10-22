(function () {
    'use strict';

    chrome.runtime.onInstalled.addListener(() => {
        chrome.storage.sync.get({ count: 0 }, ({ count }) => {
            console.log(count);
        });
    });

})();
