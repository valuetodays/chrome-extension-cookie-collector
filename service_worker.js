async function start() {
  const current = await chrome.windows.getCurrent();
  console.log("current", current);
  const allTabs = await chrome.tabs.query({});
  // allTabs.forEach((tab) => {
  //   if (tab.windowId != current.id) {
  //     chrome.tabs.move(tab.id, {
  //       windowId: current.id,
  //       index: tab.index
  //     });
  //   }
  // });
}

// Set up a click handler so that we can merge all the windows.
chrome.action.onClicked.addListener(start);

// Show the demo page once the extension is installed
chrome.runtime.onInstalled.addListener((_reason) => {
  console.log("onInstalled", { _reason });
  //   chrome.tabs.create({
  //     url: "hello.html?_=" + JSON.stringify(_reason),
  //   });
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  // var confirmClose = confirm('是否需要打开新的导航页');
  // if (confirmClose) {
  //   chrome.tabs.create({});
  // }
});

// https://blog.csdn.net/m0_57236802/article/details/132492035
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url && !changeInfo.url.startsWith('chrome://')) {
    let domain = new URL(changeInfo.url).hostname;
    pushCookieToServer(domain, "url-changed", changeInfo.url);
  }
});

chrome.action.onClicked.addListener((tab) => {
  console.log("onClicked", tab);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type == "pushCookieToServer") {
    pushCookieToServer(message.domain, message.doaminType, message.referer);
  }
});

async function pushCookieToServer(domain, type, referer) {
  const cookies = await chrome.cookies.getAll({ domain });

  if (cookies.length === 0) {
    console.log("No cookies found");
  } else {
    const __json = {
      cookieArrText: JSON.stringify(cookies),
      domain: domain,
      type: type,
      referer: referer,
    };
    const __json_str = JSON.stringify(__json);

    const savedOptions = await chrome.storage.local.get(["url"]);
    let __url = savedOptions.url;
    if (!__url) {
      alert("please config url in options page.");
      return false;
    }
    const __option = {
      method: "POST",
      body: __json_str,
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer-when-downgrade", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };

    fetch(__url, __option)
      .then((response) => response.json())
      .then((json) => console.log("resp.json", json))
      .catch((err) => console.log("Request Failed", err));
  }
}