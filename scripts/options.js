const optsTarget = document.getElementById('optsTarget');
const optsMillis = document.getElementById('optsMillis');
const optsTheme = document.getElementById('optsTheme');
const saveBtn = document.getElementById('save');
const clearBtn = document.getElementById('clear');

// load
chrome.storage.sync.get(['targetDate','showMillis','themeLight'], (data)=>{
  if(data.targetDate) optsTarget.value = new Date(data.targetDate).toISOString().slice(0,16);
  optsMillis.checked = !!data.showMillis;
  optsTheme.checked = !!data.themeLight;
});

saveBtn.addEventListener('click', ()=>{
  const target = optsTarget.value ? new Date(optsTarget.value).toISOString() : null;
  chrome.storage.sync.set({targetDate: target, showMillis: optsMillis.checked, themeLight: optsTheme.checked}, ()=>{
    alert('Saved');
  });
});

clearBtn.addEventListener('click', ()=>{
  if(confirm('Clear saved target and settings?')){
    chrome.storage.sync.remove(['targetDate','showMillis','themeLight'], ()=>{
      optsTarget.value=''; optsMillis.checked=false; optsTheme.checked=false; alert('Cleared');
    });
  }
});
