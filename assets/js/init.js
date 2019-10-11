window.addEventListener('load', function () {
  document.body.classList.add('all-loaded');
}, false);
window.addEventListener('unload', function () {
  document.body.classList.remove('smooth-transitions');
}, false);
document.addEventListener('DOMContentLoaded', function(){  
  var options = {
    position: 'absolute',
    buttonColorLight: '#adadad',
    buttonColorDark: '#616161',
    bottom: 'unset',
    right: '8%',
    label: '💡',
    saveInCookies: true,
  }
  const darkmode = new Darkmode(options);
  darkmode.showWidget();
  if(!document.referrer
	  || document.referrer.split('/')[2].split(':')[0]!=location.hostname
	  || performance.navigation.type == performance.navigation.TYPE_RELOAD
	  || performance.navigation.type == performance.navigation.TYPE_BACK_FORWARD) {
    document.body.classList.add('all-loaded');
  }
  if (!window.AnimationEvent) { return; }
  document.body.classList.add('smooth-transitions');
  var anchors = document.getElementsByTagName('a');
  for (var idx=0; idx<anchors.length; idx+=1) {
    if (anchors[idx].hostname !== window.location.hostname) {
      anchors[idx].addEventListener('click', function(event) {
        document.body.setAttribute("style", "filter: blur(5px);");
      });
      continue;
    }
    anchors[idx].addEventListener('click', function(event) {
      event.preventDefault();
      var anchor = event.currentTarget;
      document.body.classList.remove('all-loaded');
      setTimeout(function() {
        window.location = anchor.href;
      }, 300);
    });
  }
}, false);

