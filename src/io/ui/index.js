import React from 'react';
import App from 'io/ui/components/App';

import shell from 'shell';

// Opens links in an external browser window
document.addEventListener('click', (e) => {
  if(e.target.tagName !== 'A') {
    return;
  }

  e.preventDefault();
  e.stopPropagation();

  shell.openExternal(e.target.href);
});

export default function init(state$) {
  state$.onValue((state) => {
    React.render(<App {...state} />, document.body);
  });
}
