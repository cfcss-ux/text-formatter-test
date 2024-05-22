document.getElementById('cleanButton').addEventListener('click', function() {
    var inputText = document.getElementById('inputText').value;
    var cleanedText = cleanMultipleTextBlocks(inputText);
    document.getElementById('outputText').value = cleanedText;
});

function cleanMultipleTextBlocks(text) {
    // Optional
    text = text.replace(/\n   /g, '');
    text = text.replace(/ {9}/g, ' ');

    let cleanedText = '';
    let lastIndex = 0;

    while (true) {
      let methodStart = text.indexOf('METHOD:', lastIndex);
      let statusStart = text.indexOf('STATUS :', methodStart);
      
      if (methodStart === -1) {
        cleanedText += text.substring(lastIndex); // Append any remaining text
        break;
      }
      
      // Add text up to 'METHOD:' as is
      cleanedText += text.substring(lastIndex, methodStart);
      
      if (statusStart !== -1) {
        // Process the text between 'METHOD:' and 'STATUS :'
        let relevantText = text.substring(methodStart + 'METHOD:'.length, statusStart);
        relevantText = cleanText(relevantText);
        
        // Append processed text and include 'METHOD:' and 'STATUS :' as is
        cleanedText += 'METHOD:' + relevantText + '\\n\\nSTATUS :';
        
        // Update lastIndex for the next iteration
        lastIndex = statusStart + 'STATUS :'.length;
      } else {
        // If 'STATUS :' is not found, append the remaining text and break the loop
        cleanedText += text.substring(methodStart);
        break;
      }
    }

    return cleanedText;
}

function cleanText(text) {
    // Clean text as needed
    text = text.replace(/\n/g, '');
    text = text.replace(/ {6}/g, '');
    return text;
}

document.getElementById('cleanButton').addEventListener('click', function() {
    var inputText = document.getElementById('inputText').value;
    var cleanedText = cleanMultipleTextBlocks(inputText);
    document.getElementById('outputText').value = cleanedText;
});

document.getElementById('copyButton').addEventListener('click', function() {
    var outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
});

// clear button
document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
});

// light/dark mode switcher
document.getElementById('toggleModeButton').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});


// charcounter

function updateCharacterCounts() {
    var inputText = document.getElementById('inputText').value;
    var outputText = document.getElementById('outputText').value;

    // Count characters excluding whitespace, newlines, and tabs
    var inputCount = inputText.replace(/\s/g, '').length;
    var outputCount = outputText.replace(/\s/g, '').length;
    var discrepancy = Math.abs(inputCount - outputCount);

    // Update UI with the new counts
    document.getElementById('inputCount').textContent = `Characters: ${inputCount}`;
    document.getElementById('outputCount').textContent = `Characters: ${outputCount}`;
    var discrepancyElement = document.getElementById('discrepancyCount');
    discrepancyElement.textContent = `Character count discrepancy: ${discrepancy}`;

    if (discrepancy !== 0) {
        discrepancyElement.classList.add('bold-red');
    } else {
        discrepancyElement.classList.remove('bold-red');
    }
}

// Call updateCharacterCounts every 500 milliseconds
setInterval(updateCharacterCounts, 500);
