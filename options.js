
const OptionsPage = {
  async init() {
    document
      .querySelector("#saveForm")
      .addEventListener("mousedown", () => this.onSaveForm(), true);
    document
      .querySelector("#saveFromJson")
      .addEventListener("mousedown", () => this.onSaveFromJson(), true);
    document
      .querySelector("#showOptionsAsJson")
      .addEventListener("mousedown", () => this.onShowOptionsAsJson(), true);
    this.showOptions();
  },

  onSaveForm() {
    var obj = this._getAllOptons();
    saveOptions(obj);
  },

  _getAllOptons() {
    let urlSendTo = document.getElementById("url-send-to").value;
    if (!urlSendTo || urlSendTo == "") {
      alert("url should not be empty");
      return false;
    }
    let urlGetRsaPublicKey = document.getElementById("url-get-rsa-public-key").value;
    let domainsToExclude = document.getElementById("domains-to-exclude").value;
    return { url: urlSendTo, publickeyUrl: urlGetRsaPublicKey, excludeDomains: domainsToExclude };
  },

  onSaveFromJson() {
    let allOptions = document.getElementById("all-options-in-json").value;
    if (!allOptions || allOptions == "") {
      alert("allOptions should not be empty");
      return false;
    }
    saveOptions(JSON.parse(allOptions));
  },
  
  onShowOptionsAsJson() {
    var obj = this._getAllOptons();
    document.getElementById("all-options-in-json").value = JSON.stringify(obj);
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

