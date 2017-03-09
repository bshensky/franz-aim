const path = require('path');

module.exports = (Franz, options) => {
  var lastMessages = 0;

  const getMessages = () => {
    const directMessages = parseInt(document.querySelector('.client-sidebar-item-count').innerText, 10);
    const indirectMessages = 0;

    Franz.setBadge(directMessages, indirectMessages);

    if ((directMessages > 0) && (directMessages !== lastMessages)) {
      let mesg = document.querySelector('.chat-item .aimlist-item-message');
      let sender = document.querySelector('.chat-item .aimlist-item-name');
      let ico = document.querySelector('.chat-item .aimlist-item-buddyicon');
      let options = {
        body: mesg.innerText,
        tag: 'AIMNotification',
        icon: ico.getAttribute('src'),
        requireInteraction: true
      }			
      var n = new Notification(sender.innerText, options);
    }
    lastMessages = directMessages;
  }

  // inject franz.css stylesheet
  Franz.injectCSS(path.join(__dirname, 'css', 'franz.css'));  

  Franz.loop(getMessages);
}
