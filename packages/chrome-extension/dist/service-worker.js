chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.status === 'complete') {
    await addCore(tab)
    addFlexerWidget(tab)

    // if (tab.url.includes('flex.team/time-tracking/work-record/my')) {
      // addFlexerDashboard(tab)
    // }
  }
})

chrome.runtime.onMessage.addListener((request, sender, onSuccess) => {
  switch (request.type) {
    case 'API':
      callApi(request.data).then((result) => onSuccess(result))
      break
    case 'STORE':
      store(request.data).then((result) => onSuccess(result))
      break
    default:
      break
  }

  // [주의] chrome message interface의 async 수행 시 반드시 true를 return해야 함!
  return true
})

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  console.log('tab', new URL(tab.url).origin)
  if (!tab.url) return;
  const url = new URL(tab.url);
  // Enables the side panel on google.com
  if (url.origin === 'https://flex.team') {
    console.log('trueture')
    await chrome.sidePanel.setOptions({
      tabId,
      path: '/dist/sidepanel.html',
      enabled: true
    });
  } else {
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});

async function store(data) {
  switch (data.type.toUpperCase()) {
    case 'GET':
      return await new Promise((resolve, reject) => {
        try {
          const key = data.data['key']
          chrome.storage.local.get([key], (value) => {
            resolve(value[key]);
          });
        } catch (error) {
          reject(error);
        }
      })
      break
    case 'SET':
      return await new Promise((resolve, reject) => {
        try {
          const key = data.data['key']
          const value = data.data['value']
          const setObj = {}
          setObj[key] = value
          chrome.storage.local.set(setObj, () => {
            resolve(null);
          });
        } catch (error) {
          reject(error);
        }
      });
      break
    default:
      break
  }
}

async function callApi(data) {
  const type = data.type.toUpperCase()

  const response = await fetch(data.url, {
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
    },
    method: type,
    body: type === 'POST' ? JSON.stringify({ ...data.data }) : undefined,
  })

  return await response.text()
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['/dist/popup.js']
  });
});

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//     let url = tabs[0].url;
//     if (!url.includes('flex.team')) {
//       return;
//     }

//     setStorageKey('lastShownDate', `${Date.now()}`);
//   });
// });

// chrome.windows.onFocusChanged.addListener(handleFocusChanged)

// async function handleFocusChanged(tabId) {
//   if (tabId < 0) {
//     return
//   }

//   let lastShownDate = null

//   try {
//     lastShownDate = await getStorageKeyValue('lastShownDate')
//   } catch (e) {
//   }
//   const showToday = !lastShownDate || (new Date(parseInt(lastShownDate)).getDate() !== new Date().getDate())

//   // console.log(lastShownDate, new Date(parseInt(lastShownDate)).getDate(), showToday);

//   if (showToday) {
//     const id = Math.floor(Math.random() * 1000000)
//     chrome.notifications.create(
//       `${id}`,
//       { title: 'FLEXER', message: '오늘 FLEX 찍으셨나요?', type: 'basic', iconUrl: '../flxr.png' },
//       () => {
//         setTimeout(() => {
//           chrome.notifications.getAll((e) => {
//             chrome.notifications.clear(
//               `${id}`
//             )
//           })
//         }, 10000)
//       },
//     )
//   }
// }
//
// async function handleNotificationClicked(id) {
//   chrome.notifications.clear(id)
//   chrome.tabs.create({ url: 'https://flex.team/' });
// }

// chrome.notifications.onClicked.addListener(handleNotificationClicked)

function addCore(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/dist/core.js'],
  })
}

function addFlexerWidget(tab) {
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ['/dist/widget.css'],
  })
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/dist/widget.js'],
  })
}

function addFlexerDashboard(tab) {
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ['/dist/dashboard.css'],
  })

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/dist/dashboard.js'],
  })
}
