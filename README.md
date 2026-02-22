## Answers to Questions

#1. What is the difference between getElementById, getElementsByClassName, and querySelector /     querySelectorAll?
  Ans :
getElementById: only selects a single element by id. 
getElementsByClassName: Selects multiple elements by class
querySelector: Returns the first matching element using a CSS selector.
querySelectorAll: Returns all types of elements using CSS selectors.

#2. How do you create and insert a new element into the DOM?
  Ans : 
	To add a new element to the DOM, you need to do two things: use   document.createElement('tag_name')
and use dot .(innertext) with the variable name
and insert using appendChild() or prepend()

#3. What is Event Bubbling? And how does it work?
Ans:  Event bubbling is a mechanism in JavaScript where, when an event (such as a click) occurs on an element, that event is propagated step by step to its parent or higher-level elements.
How it works:
Suppose there is a <button> inside a <div>. If you click on the button, the event will first act on the button, then on its parent <div>, then on the <body>, and finally on the window object. Just like a bubble rising from underwater.
#4. What is Event Delegation in JavaScript? Why is it useful?
  Ans:  Event Delegation is a technique where we
do not place separate event listeners on child elements.
But place a single event listener on their parent element
and handle child elements using event bubbling.

#5. What is the difference between preventDefault() and stopPropagation() methods?
  Ans:  These two methods are used to control events, but their functions are completely different:
preventDefault(): This stops the default behavior of an element.
stopPropagation(): This stops the event from bubbling up.
