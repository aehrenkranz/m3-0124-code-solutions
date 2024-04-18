# react-context-quiz-notes

## Quiz Questions

Answer the following questions in the provided markdown file before turning in this exercise:

- What is the purpose of React "context"?
  to allow the same data to be shared by multiple components throughout the hierarchy
- What values can be stored in context?
  any values
- How do you create context and make it available to the components?
  import useContext, then createContext(value) assigned to a variable. Wrap components in the variable.provider with the desired values assigned to the "value" property
- How do you access the context values?
  useContext(values)
- When would you use context? (in addition to the best answer: "rarely")
  Themes, or current account info

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
