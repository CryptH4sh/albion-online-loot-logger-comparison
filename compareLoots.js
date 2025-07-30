const fs = require('fs');
const stringSimilarity = require('string-similarity');

function normalize(str) {
  return str?.toLowerCase().replace(/['`"]/g, '').trim();
}

function safeIcon(itemId) {
  if (!itemId) return 'icons/unknown.png';
  return `https://render.albiononline.com/v1/item/${itemId.split('@')[0]}.png`;
}

function compareLoots(chestFile, lootFile) {
  
  const chestLines = fs.readFileSync(chestFile, 'utf8')
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('"Date"'));

  const chestData = chestLines.map(line => {
    const cols = line.split('\t').map(c => c.replace(/"/g, '').trim());
    return {
      player: cols[1],
      item: normalize(cols[2]),
      rawItem: cols[2],
      amount: cols[5]
    };
  });

  
  const lootLines = fs.readFileSync(lootFile, 'utf8')
    .split('\n')
    .filter(l => l.trim() && !l.startsWith('timestamp_utc'));

  const lootData = lootLines.map(line => {
    const cols = line.split(';');
    return {
      timestamp: cols[0],
      player: cols[3],
      itemId: cols[4],
      itemName: cols[5],
      quantity: cols[6],
      lootedFrom: cols[9],
      normalizedItem: normalize(cols[5])
    };
  });

  const resultByPlayer = {};

  lootData.forEach(ld => {
    const player = ld.player;
    if (!resultByPlayer[player]) resultByPlayer[player] = [];

    
    const inChest = chestData.some(cd =>
      cd.player.toLowerCase() === player.toLowerCase() &&
      stringSimilarity.compareTwoStrings(ld.normalizedItem, cd.item) > 0.8
    );

    resultByPlayer[player].push({
      item: ld.itemName,
      amount: ld.quantity,
      timestamp: ld.timestamp,
      source: ld.lootedFrom,
      status: inChest ? 'found' : 'missing',
      icon: safeIcon(ld.itemId)
    });
  });

  return resultByPlayer;
}

module.exports = { compareLoots };
