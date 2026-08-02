// This script runs on Shutterstock and Adobe Stock
console.log("BuatinCSV Auto-Submitter Content Script Loaded!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "inject_metadata") {
    // Determine which platform we are on
    const url = window.location.href;
    
    if (url.includes("submit.shutterstock.com")) {
      injectShutterstock();
      sendResponse({ status: "success" });
    } else if (url.includes("contributor.stock.adobe.com")) {
      injectAdobeStock();
      sendResponse({ status: "success" });
    }
  }
  return true;
});

function injectShutterstock() {
  // Mock logic to find DOM elements and fill them
  // A real implementation would fetch the active asset data from the user's clipboard, 
  // local storage (if synced), or directly via an API request to the BuatinCSV dashboard.
  
  const titleInput = document.querySelector('textarea[name="description"]') || document.querySelector('input[placeholder*="description"]');
  const keywordInput = document.querySelector('input[name="keywords"]') || document.querySelector('.token-input-list');
  
  if (titleInput) {
    // In a production scenario, we'd pull the actual data mapped to the current selected image
    (titleInput as HTMLInputElement).value = "Injected from BuatinCSV Auto-Submitter";
    titleInput.dispatchEvent(new Event('input', { bubbles: true }));
  }
  
  alert("BuatinCSV Extension: Successfully pinged Shutterstock DOM elements. (Mock injection complete)");
}

function injectAdobeStock() {
  // Adobe stock specific DOM traversal
  const titleInput = document.querySelector('.title-input') || document.querySelector('input[name="title"]');
  
  if (titleInput) {
    (titleInput as HTMLInputElement).value = "Injected from BuatinCSV Auto-Submitter";
    titleInput.dispatchEvent(new Event('input', { bubbles: true }));
  }
  
  alert("BuatinCSV Extension: Successfully pinged Adobe Stock DOM elements. (Mock injection complete)");
}
