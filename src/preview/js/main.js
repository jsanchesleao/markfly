var ws = new WebSocket('ws://###WEBSOCKET_HOST###:###WEBSOCKET_PORT###');
var content = document.getElementById('preview');
var pinDownButton = document.getElementById('pin-down');
var pinNoneButton = document.getElementById('pin-none');
var scrolling = 'none';

var updateButtons = function() {
  if (scrolling === 'none') {
    pinDownButton.className = 'action-button latent';
    pinNoneButton.className = 'action-button active';
  }
  if (scrolling === 'pin-down') {
    pinDownButton.className = 'action-button active';
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

var updateScroll = function() {
  if (scrolling === 'pin-down') {
    window.scrollTo(0,document.body.scrollHeight);
  }
};

ws.onopen = function(event) {
  console.log('Connected', event);
};

ws.onerror = function(error) {
  console.log('Error', error);
};

ws.onmessage = function(msg) {
  console.log(msg);
  content.innerHTML = msg.data;
  updateScroll();
};
