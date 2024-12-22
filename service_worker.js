importScripts('./jsencrypt_utils.js')
importScripts('./js/index.umd.js')


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

function shouldExclude(excludeDomains, domain) {
  if (!excludeDomains) {
    return false;
  }
  const domainArr = excludeDomains.split(';')
  for (let i = 0; i < domainArr.length; i++) {
    const v = domainArr[i].trim()
    const isMatch = wcmatch(v)
    if (isMatch(domain)) {
      console.log("exclude ", domain, excludeDomains);
      return true;
    }
  }

  return false;
}

async function pushCookieToServer(domain, type, referer) {
  const savedOptions = await chrome.storage.local.get(["url", 'publickeyUrl', 'excludeDomains']);
  const excludeDomains = savedOptions?.excludeDomains
  if (shouldExclude(excludeDomains, domain)) {
    return;
  }
  const cookies = await chrome.cookies.getAll({ domain });

  if (cookies.length === 0) {
    return;
  } else {
    let __json = {
      domain: domain,
      type: type,
      referer: referer,
    };
    const cookieArrText = JSON.stringify(cookies)

    const __publickeyUrl = savedOptions.publickeyUrl;
    if (__publickeyUrl) {
      const respData = await fetchPublicKey(__publickeyUrl)
      const key = respData.data;
      const encryptTextArr = encryptPartitons(key, cookieArrText, 128)
      __json['cookieTextArr'] = encryptTextArr
    }
    let __url = savedOptions.url;
    if (!__url) {
      alert("please config url in options page.");
      return false;
    }
    const __option = {
      method: "POST",
      body: JSON.stringify(__json),
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

function encryptPartitons(key, long_text, chunkLength) {
  var arr = []
  for (let i = 0; i < long_text.length; i += chunkLength) {
    const sub_text = long_text.slice(i, i + chunkLength)
    arr.push(encrypt(key, sub_text))
  }
  return arr;
}

function splitByLength(str, chunkLength) {
  const result = [];
  for (let i = 0; i < str.length; i += chunkLength) {
    result.push(str.slice(i, i + chunkLength));
  }
  return result;
}

async function fetchPublicKey(url) {
  const __option = {
    method: "POST",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
    cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer-when-downgrade", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  };

  const response = await fetch(url, __option)
  const data = await response.json()
  return data;
}
