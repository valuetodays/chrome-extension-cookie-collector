
const OptionsPage = {
  async init() {
    document
      .querySelector("#saveForm")
      .addEventListener("mousedown", () => this.onSaveForm(), true);
    this.showOptions();
  },

  onSaveForm() {
    let urlSendTo = document.getElementById("url-send-to").value;
    if (!urlSendTo || urlSendTo == "") {
      alert("url should not be empty");
      return false;
    }
    let urlGetRsaPublicKey = document.getElementById("url-get-rsa-public-key").value;
    let domainsToExclude = document.getElementById("domains-to-exclude").value;
    
    saveOptions({ url: urlSendTo, publickeyUrl: urlGetRsaPublicKey, excludeDomains: domainsToExclude });
  },

  async showOptions() {
    const savedOptions = await chrome.storage.local.get(['url', 'publickeyUrl', 'excludeDomains']);

    document.getElementById('url-send-to').value = savedOptions?.url||''
    document.getElementById('url-get-rsa-public-key').value = savedOptions?.publickeyUrl||''
    document.getElementById('domains-to-exclude').value = savedOptions?.excludeDomains||''
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  await OptionsPage.init();
});

//保存用户配置
function saveOptions(jsonValue) {
  chrome.storage.local.set(jsonValue);
}

