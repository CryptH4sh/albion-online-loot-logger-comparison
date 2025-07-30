const { ipcRenderer } = require('electron');

document.getElementById('analyzeBtn').addEventListener('click', async () => {
  const chestFile = document.getElementById('chestFile').files[0]?.path;
  const lootFile = document.getElementById('lootFile').files[0]?.path;

  if (!chestFile || !lootFile) {
    document.getElementById('result').innerHTML = '<p class="text-danger">⚠️ İki dosya da seçilmelidir!</p>';
    return;
  }

  
  const result = await ipcRenderer.invoke('compare-files', chestFile, lootFile);

  let html = '';
  for (const player in result) {
    html += `
      <div class="player-card">
        <h2>${player}</h2>
        <div class="loot-grid">
    `;

    result[player].forEach(item => {
      const statusClass = item.status === 'found' ? 'found' : 'missing';
      const borderColor = item.status === 'found' ? '#0f0' : '#f33';

      html += `
        <div class="loot-item ${statusClass}">
          <div class="loading-spinner" style="background-image:url('loading.gif');"></div>
          <img data-src="${item.icon}" class="lazy-img" style="border:2px solid ${borderColor};">
          <div class="item-name">${item.item} x${item.amount}</div>
          <div class="item-time text-success">${item.timestamp}</div>
          <div class="item-source text-info">${item.source}</div>
        </div>
      `;
    });

    html += `</div></div>`;
  }

  document.getElementById('result').innerHTML = html;

  
  const lazyImages = document.querySelectorAll('.lazy-img');
  lazyImages.forEach(img => {
    const spinner = img.previousElementSibling;
    const src = img.dataset.src;
    const tempImg = new Image();

    console.log(`DEBUG: Loading -> ${src}`);

    tempImg.onload = () => {
      img.src = src;
      spinner.style.display = 'none';
      console.log(`✅ Loaded: ${src}`);
    };

    tempImg.onerror = () => {
      img.src = 'icons/unknown.png';
      spinner.style.display = 'none';
      console.error(`❌ Failed: ${src}`);
    };

    tempImg.src = src;
  });
});




document.addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;

  
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');

  const filter = e.target.dataset.filter;

  
  document.querySelectorAll('.loot-item').forEach(item => {
    if (filter === 'all') {
      item.classList.remove('hidden');
    } else if (item.classList.contains(filter)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
});
