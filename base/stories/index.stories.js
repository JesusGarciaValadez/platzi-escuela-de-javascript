import { document, console } from 'global';
import { storiesOf } from '@storybook/html';

storiesOf('Demo', module)
  .add('heading', () => '<h1>Hello World</h1>')
  .add('button', () => {
      const button = document.createElement ('button');
      button.type = 'button';
      button.innerText = 'Hello Button';
      button.addEventListener ('click', e => console.log (e));
      return button;
  });

storiesOf('Button', module)
    .add('with text', () => '<button class="btn">Hello World</button>')
    .add('with emoji', () => {
        const button = document.createElement('button');
        button.innerText = '😀 😎 👍 💯';
        return button;
    });