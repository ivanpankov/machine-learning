import React, { Component } from 'react';
import NavBar from './Components/NavBar';
import Main from './Components/Main';
import Sidebar from './Components/Sidebar';
import Toast from './Components/Toast';
import { MessagesProvider } from './providers/Messages';

const links = [
  {
    name: 'Supervised learning',
    link: '/supervised',
    subLinks: [
      {
        name: 'Regression problem',
        link: '/supervised/regression',
        subLinks: [
          {
            name:
              'Linear regression with one variable (Univariate linear regression)',
            link: '/supervised/regression/linear-uni'
          },
          {
            name: 'Linear regression with multiple variables',
            link: '/supervised/regression/linear-multi'
          }
        ]
      },
      { name: 'Classification problem', link: '/supervised/classification' }
    ]
  },
  { name: 'Unsupervised learning', link: '/unsupervised' },
  { name: 'Reinforcement learning', link: '/reinforcement' },
  { name: 'Recommender system', link: '/recommender' }
];

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <MessagesProvider>
          <div className="d-flex flex-grow-1 flex-column flex-lg-row">
            <Sidebar links={links} className="p-3 border-right" />
            <Main className="p-3 flex-grow-1" />
          </div>
          <Toast />
        </MessagesProvider>
      </>
    );
  }
}

export default App;
