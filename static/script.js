function downloadVideo() {
    const url = document.getElementById('videoURL').value;
    const status = document.getElementById('status');

    if (!url) {
        alert('Please enter a video URL');
        return;
    }

    status.innerHTML = "Downloading... Please wait ⏳";

    fetch('/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })  // Removed quality
    })
    .then(response => {
        if (response.ok) {
            return response.blob();
        } else {
            return response.json().then(data => { throw new Error(data.error); });
        }
    })
    .then(blob => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "downloaded_video.mp4";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        status.innerHTML = "✅ Download Complete!";
    })
    .catch(error => {
        status.innerHTML = "❌ Error: " + error.message;
    });
}
