import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './aws-exports';
import ScenarioBuilder from './components/ScenarioBuilder';

Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-purple-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Healthcare Blueprint Generator</h1>
          <div>
            <span className="mr-4">Hello, {user.username}</span>
            <button onClick={signOut} className="bg-white text-purple-800 px-4 py-2 rounded">
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <ScenarioBuilder user={user} />
      </main>
    </div>
  );
}

export default withAuthenticator(App);
