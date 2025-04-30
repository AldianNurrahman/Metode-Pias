
function hitung() {
  const params = new URLSearchParams(window.location.search);
  const metode = params.get('metode');
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const n = parseInt(document.getElementById('n').value);
  if (isNaN(a) || isNaN(b) || isNaN(n) || n <= 0) {
    document.getElementById('output').innerText = "Input tidak valid!";
    return;
  }
  const h = (b - a) / n;
  let table = "<table border='1'><tr><th>i</th><th>xi</th><th>f(xi)</th><th>Luas</th></tr>";
  let total = 0;

  for (let i = 0; i < n; i++) {
    let xi = (metode === 'segiempat') ? a + i * h : a + (i + 0.5) * h;
    let fx = xi * xi; // Contoh fungsi: f(x) = x^2
    let luas = fx * h;
    total += luas;
    table += `<tr><td>${i + 1}</td><td>${xi.toFixed(4)}</td><td>${fx.toFixed(4)}</td><td>${luas.toFixed(4)}</td></tr>`;
  }

  table += `<tr><td colspan="3"><b>Total</b></td><td><b>${total.toFixed(4)}</b></td></tr></table>`;
  document.getElementById('output').innerHTML = table;
}

function reset() {
  document.getElementById('a').value = "";
  document.getElementById('b').value = "";
  document.getElementById('n').value = "";
  document.getElementById('output').innerHTML = "";
}
