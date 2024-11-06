document.getElementById('previewButton').addEventListener('click', async () => {
    const folderPath = document.getElementById('folderPath').value;
    const response = await fetch(`/preview?path=${encodeURIComponent(folderPath)}`);
    const files = await response.json();

    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    if (Array.isArray(files)) {
        files.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file;
            listItem.classList.add('py-1');
            fileList.appendChild(listItem);
        });
    } else {
        fileList.innerHTML = `<li class="text-red-500">${files.error}</li>`;
    }
});

document.getElementById('renameButton').addEventListener('click', async () => {
    const folderPath = document.getElementById('folderPath').value;
    const oldSubstring = document.getElementById('oldSubstring').value;
    const newSubstring = document.getElementById('newSubstring').value;

    const response = await fetch('/rename', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folderPath, oldSubstring, newSubstring })
    });

    const result = await response.json();
    alert(result.message || result.error);
});
