# react-effects-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- When is a component "mounted" to the DOM?
  -after rendering the first time
- What is a React Effect?
  -code that is executed after a component renders
- When should you use an Effect and when should you not use an Effect?
  -when something needs to happen after a component renders, rather than relying on user input
- When do Effects run?
  -after component renders
- What function is used to declare an Effect?
  useEffect
- What are Effect dependencies and how do you declare them?
  -conditions for the effect to run, declared by the second argument to the useEffect call
- Why would you want to clean up from an Effect?
  -to ensure component works correctly after unrendering
- How do you clean up from an Effect?
  -add return statement to useEffect function
- When does the cleanup function run?
  -before the effect runs again

## Notes

All student notes should be written here.

How to write `Code Examples` in markdown

for JS:

```javascript
const data = 'Howdy';
```

for HTML:

```html
<div>
  <p>This is text content</p>
</div>
```

for CSS:

```css
div {
  width: 100%;
}
```
