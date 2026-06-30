const API = (document.querySelector('meta[name="sinaw-api"]')?.content || '').replace(/\/+$/, '');
const $ = (id) => document.getElementById(id);
function msg(text, ok) { const m = $('msg'); m.textContent = text; m.className = 'msg ' + (ok ? 'ok' : 'err'); }

$('go').onclick = async () => {
  const tok = $('tok').value.trim();
  const pw = $('pw').value, pw2 = $('pw2').value;
  if (!tok) return msg('Enter the setup token.');
  if (pw.length < 10) return msg('Password must be at least 10 characters.');
  if (pw !== pw2) return msg('The two passwords do not match.');
  $('go').disabled = true; msg('Working…', true);
  try {
    const res = await fetch(API + '/api/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Setup-Token': tok },
      body: JSON.stringify({ password: pw }),
    });
    const d = await res.json().catch(() => ({}));
    if (res.ok) { msg('✓ Done! Go to the site → Dispensary → sign in with your new password.', true); }
    else if (res.status === 409) { msg('Already set up — the password is already configured.'); }
    else if (res.status === 403) { msg('Setup token is wrong.'); }
    else { msg(d.error || ('Error ' + res.status)); $('go').disabled = false; }
  } catch (e) {
    msg('Could not reach the API. Check the Worker URL in this page and that the site origin is allowed (ALLOWED_ORIGIN).');
    $('go').disabled = false;
  }
};
