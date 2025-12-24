// Dev-only page: runs auth tests and shows a simple summary
import React from 'react';
import { runAuthTests } from '../utils/AuthTestHelpers';

export default function DevAuthTest() {
  const [running, setRunning] = React.useState(false);
  const [results, setResults] = React.useState(null);
  const [emails] = React.useState(() => {
    const ts = Date.now();
    return {
      farmerEmail: `farmer.${ts}@example.com`,
      buyerEmail: `buyer.${ts}@example.com`,
      password: 'Test1234!',
    };
  });

  const run = async () => {
    setRunning(true);
    const r = await runAuthTests(emails);
    setResults(r);
    setRunning(false);
  };

  React.useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Dev Auth Test</h2>
      <p>Emails used:</p>
      <ul>
        <li>Farmer: {emails.farmerEmail}</li>
        <li>Buyer: {emails.buyerEmail}</li>
        <li>Password: {emails.password}</li>
      </ul>
      {running && <div>Running tests...</div>}
      {!running && results && (
        <div style={{ marginTop: 16 }}>
          <h3>Summary</h3>
          <div>signup farmer: {results.signupFarmer ? 'pass' : 'fail'}</div>
          <div>signup buyer: {results.signupBuyer ? 'pass' : 'fail'}</div>
          <div>login: {results.login ? 'pass' : 'fail'}</div>
          <div>protected routes: manual</div>
          <div>logout: {results.logout ? 'pass' : 'fail'}</div>
          <button className="btn-primary" style={{ marginTop: 12 }} onClick={run}>Run Again</button>
        </div>
      )}
    </div>
  );
}
