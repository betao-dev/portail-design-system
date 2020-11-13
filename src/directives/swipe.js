export default {
  inserted: function(el, binding) {
    const targetClassElement = binding.arg;
    el.addEventListener('touchstart', handleTouchStart, false);
    el.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;
    let yDown = null;

    function getTouches(evt) {
      return evt.touches;
    }

    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      if (binding.modifiers.single) {
        let parent = el.parentElement;

        for (let i = 0; i < parent.children.length; i++) {
          parent.children[i].classList.remove('ds-swipe');

          let swipeElement = getSwipeElement(parent.children[i]);
          swipeElement.classList.remove(
            'ds-left-swipe',
            'ds-right-swipe',
            'ds-up-swipe',
            'ds-down-swipe'
          );
        }
      }

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;

      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;

      let swipeElement = getSwipeElement(el);

      if (swipeElement) {
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0 && binding.modifiers.left) {
            addClasses(el, swipeElement, 'ds-swipe', 'ds-left-swipe');
          } else if (xDiff < 0 && binding.modifiers.right) {
            addClasses(el, swipeElement, 'ds-swipe', 'ds-right-swipe');
          }
        } else {
          if (yDiff > 0 && binding.modifiers.top) {
            addClasses(el, swipeElement, 'ds-swipe', 'ds-up-swipe');
          } else if (yDiff < 0 && binding.modifiers.down) {
            addClasses(el, swipeElement, 'ds-swipe', 'ds-down-swipe');
          }
        }
      }

      xDown = null;
      yDown = null;
    }

    function getSwipeElement(el) {
      return el.getElementsByClassName(targetClassElement)[0];
    }

    function addClasses(el, swipeElement, elClass, swipeElementClass) {
      el.classList.add(elClass);
      swipeElement.classList.add(swipeElementClass);
    }
  }
};
