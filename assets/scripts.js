document.addEventListener("DOMContentLoaded", function () {
  const qrText = document.getElementById("qrText");
  const generateBtn = document.getElementById("generateBtn");
  const qrCodeContainer = document.getElementById("qrCodeContainer");
  const saveQrBtn = document.getElementById("saveQrBtn");
  const fullscreenModal = document.getElementById("fullscreenModal");
  const fullQrCodeDisplay = document.getElementById("fullQrCodeDisplay");
  const closeFullscreenBtn = document.getElementById("closeFullscreenBtn");
  const downloadFullQrBtn = document.getElementById("downloadFullQrBtn");

  let currentQrImage = null;

  generateBtn.addEventListener("click", function () {
    const text = qrText.value.trim();

    if (text) {
      qrCodeContainer.innerHTML = "";

      const qr = qrcode(0, "L");
      qr.addData(text);
      qr.make();
      const qrImage = qr.createImgTag(8);
      qrCodeContainer.innerHTML = qrImage;
      currentQrImage = qrCodeContainer.querySelector("img");

      const fullscreenBtn = document.createElement("button");
      fullscreenBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      `;
      fullscreenBtn.classList.add(
        "absolute",
        "top-2",
        "right-2",
        "bg-white",
        "p-1",
        "rounded-full",
        "shadow-md"
      );
      fullscreenBtn.addEventListener("click", openFullscreen);
      qrCodeContainer.style.position = "relative";
      qrCodeContainer.appendChild(fullscreenBtn);

      saveQrBtn.classList.remove("hidden");
    } else {
      alert("Please enter text to generate QR Code.");
    }
  });

  function openFullscreen() {
    if (currentQrImage) {
      fullQrCodeDisplay.innerHTML = "";
      const fullQrImage = currentQrImage.cloneNode(true);
      fullQrImage.classList.add("w-full", "max-w-md", "mx-auto");
      fullQrCodeDisplay.appendChild(fullQrImage);

      fullscreenModal.classList.remove("hidden");
      fullscreenModal.classList.add("flex");
    }
  }

  closeFullscreenBtn.addEventListener("click", function () {
    fullscreenModal.classList.add("hidden");
    fullscreenModal.classList.remove("flex");
  });

  downloadFullQrBtn.addEventListener("click", function () {
    if (currentQrImage) {
      const link = document.createElement("a");
      link.href = currentQrImage.src;
      link.download = "qr_code_fullscreen.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });

  saveQrBtn.addEventListener("click", function () {
    const qrImage = qrCodeContainer.querySelector("img");
    if (qrImage) {
      const link = document.createElement("a");
      link.href = qrImage.src;
      link.download = "qr_code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
});
