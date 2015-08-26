(function() {
  var _flatten = function(element, acc) {
    acc.push(element);

    if (element.tagName && element.childNodes.length > 0) {
      for(var _i = 0; _i < element.childNodes.length; _i++) {
        (function(i){
          _flatten(element.childNodes[i], acc);
        }(_i));
      } 
    } 
  };

  var flatten = function(element) {
    var acc = [];
    _flatten(element, acc);
    return acc;
  };

  var different = function(one, other) {
    return (!!one && !other) || (!one && !!other) ||
           one.tagName !== other.tagName ||
           one.className !== other.className ||
           one.nodeType  !== other.nodeType ||
           ((one.nodeType === document.TEXT_NODE) &&
            (one.textContent !== other.textContent))
  };

  var firstDiff = function(_old, _new) {
    var fOld = flatten(_old);
    var fNew = flatten(_new);
    var nLength = fNew.length;
    var i = 0;

    for(; i < nLength; i++) {
      if (!fOld[i]) {
        return 'OLD_OVER';
      }
      if (different(fOld[i], fNew[i])) {
        return fNew[i];
      } 
    } 
    if (fOld.length === fNew.length) {
      return 'NO_CHANGE';
    }
    else {
      return 'NEW_OVER';
    }
  };

  var maxScroll = Math.max(document.body.scrollHeight, document.body.offsetHeight, 
                   document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

  var scrollElem = function(elementNode) {
    var position = elementNode.getBoundingClientRect().top;
    if (position + 100 < window.innerHeight) {
      position -= 100;
    }
    position += window.pageYOffset;
    console.log('Scrolling to', position);
    smoothScroll(position);
  };
    
  var scrollText = function(textNode) {
    var parent = textNode.parentNode;
    var span = document.createElement('span');
    var data = {};
    parent.replaceChild(span, textNode);
    span.appendChild(textNode);
    scrollElem(span);

    parent.replaceChild(textNode, span);
  };

  var scrollNode = function(node) {
    if (!node) {
      smoothScroll(maxScroll + window.innerHeight);
    }
    else if (node === 'NO_CHANGE') {
      return;
    }
    else if (node === 'OLD_OVER') {
      smoothScroll(0);
    }
    else if (node === 'NEW_OVER') {
      smoothScroll(maxScroll + window.innerHeight);
    }
    else if (node.nodeType === 3) {
      scrollText(node);
    }
    else {
      scrollElem(node);
    }
  };

  window.scrollDiff = function(oldContent, newContent) {
    var diff = firstDiff(oldContent, newContent);
    console.log('DIFF: ', diff);
    scrollNode(diff);
  };
}());
