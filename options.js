
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
    saveOptions({ url: urlSendTo });
  },

  async showOptions() {
    const savedOptions = await chrome.storage.local.get(['url']);
    console.log({savedOptions})

    document.getElementById('url-send-to').value = savedOptions?.url||''
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  // await Settings.onLoaded();
  // DomUtils.injectUserCss();
  await OptionsPage.init();
});

//保存用户配置
function saveOptions(jsonValue) {
  chrome.storage.local.set(jsonValue);
}

