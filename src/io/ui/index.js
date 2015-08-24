import React from 'react';
import App from 'io/ui/components/App';

export default function init(state$) {
  state$.onValue((state) => {
    React.render(<App {...state} />, document.body);
  });
}
