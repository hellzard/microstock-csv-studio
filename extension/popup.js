document.addEventListener('DOMContentLoaded', async () => {
  const statusText = document.getElementById('statusText');
  const injectBtn = document.getElementById('injectBtn');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab.url.includes("submit.shutterstock.com") || tab.url.includes("contributor.stock.adobe.com")) {
      statusText.textContent = "Supported platform detected.";
      statusText.style.color = "#22c55e";
      injectBtn.disabled = false;
      
      injectBtn.addEventListener('click', async () => {
        injectBtn.disabled = true;
        injectBtn.textContent = "Injecting...";
        
        try {
          await chrome.tabs.sendMessage(tab.id, { action: "inject_metadata" });
          injectBtn.textContent = "Success!";
          injectBtn.style.background = "#22c55e";
        } catch (err) {
          statusText.textContent = "Error: Could not connect to page script.";
          statusText.style.color = "#ef4444";
          injectBtn.textContent = "Try Again";
          injectBtn.disabled = false;
        }
      });
    } else {
      statusText.textContent = "Open Shutterstock or Adobe Stock to use this.";
      statusText.style.color = "#f59e0b";
    }
  } catch (error) {
    statusText.textContent = "Error querying tabs.";
    statusText.style.color = "#ef4444";
  }
});
