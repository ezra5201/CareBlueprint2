import React from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import ScenarioBuilder from './components/ScenarioBuilder';

// Check if aws-exports exists and handle gracefully if it doesn't
let config = {};
try {
  config = require('./aws-exports').default;
} catch (e) {
  console.warn('No aws-exports.js file found. Continuing without Amplify configuration.');
}

// Configure Amplify only if we have a valid config
if (Object.keys(config).length > 0) {
  Amplify.configure(config);
}

function App({ signOut, user }) {
  // If there's no auth setup, create a default user
  const currentUser = user || { username: 'Guest User' };
  
  // Function to handle sign out that works whether or not auth is enabled
  const handleSignOut = () => {
    if (signOut) {
      signOut();
    } else {
      console.log('Sign out function not available in development mode');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-purple-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Healthcare Blueprint Generator</h1>
          <div>
            <span className="mr-4">Hello, {currentUser.username}</span>
            {signOut && (
              <button onClick={handleSignOut} className="bg-white text-purple-800 px-4 py-2 rounded">
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <ScenarioBuilder user={currentUser} />
      </main>
    </div>
  );
}

// Use withAuthenticator if we have a valid config, otherwise export the basic component
export default Object.keys(config).length > 0 ? withAuthenticator(App) : App;
