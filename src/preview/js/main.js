var ws = new WebSocket('ws://###WEBSOCKET_HOST###:###WEBSOCKET_PORT###');
var content = document.getElementById('preview');
var smartScrollButton = document.getElementById('smart-scroll');
var pinDownButton = document.getElementById('pin-down');
var pinNoneButton = document.getElementById('pin-none');
var scrolling = 'smart';

var updateButtons = function() {
  if (scrolling === 'none') {
    smartScrollButton.className = 'action-button latent';
    pinDownButton.className = 'action-button latent';
    pinNoneButton.className = 'action-button active';
  }
  else if (scrolling === 'pin-down') {
    smartScrollButton.className = 'action-button latent';
    pinDownButton.className = 'action-button active';
    pinNoneButton.className = 'action-button latent';
  }
  else if (scrolling === 'smart') {
    smartScrollButton.className = 'action-button active';
    pinDownButton.className = 'action-button latent';
    pinNoneButton.className = 'action-button latent';
  }
}

var pinDown = function() {
  scrolling = 'pin-down';
  updateButtons();
};

var pinNone = function() {
  scrolling = 'none';
  updateButtons();
};

var smartScroll = function() {
  scrolling = 'smart';
  updateButtons();
};

var oldContent = document.createElement('div');

var updateScroll = function() {
  if (scrolling === 'pin-down') {
    smoothScroll(document.body.scrollHeight);
  }
  else if (scrolling === 'smart') {
    scrollDiff(oldContent, content);
  }
};

ws.onopen = function(event) {
  console.log('Connected', event);
};

ws.onerror = function(error) {
  console.log('Error', error);
};

var justOpened = true;
ws.onmessage = function(msg) {
  if (msg.data === ':set:smart-scroll') {
    scrolling = 'smart';
    updateButtons();
    return;
  }
  else if (msg.data === ':set:fixed-scroll'){
    scrolling = 'none';
    updateButtons();
    return;
  }
  else if (msg.data === ':set:pin-down'){
    scrolling = 'pin-down';
    updateButtons();
    return;
  }
  oldContent.innerHTML = content.innerHTML;
  content.innerHTML = msg.data;
  if (!justOpened) {
    updateScroll();
  }
  else {
    justOpened = false;
  }
};
