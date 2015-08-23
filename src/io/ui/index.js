import React from 'react';
import App from 'io/ui/components/App';

export default function create(state$) {
  state$.onValue((state) => {
    React.render(<App {...state} />, document.body);
  });
}
