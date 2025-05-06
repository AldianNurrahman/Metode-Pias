document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const metodeParam = params.get('metode') || 'segiempat';
  document.getElementById('metode').value = metodeParam;
  const titles = {
    segiempat: 'Menggunakan Metode Segi Empat',
    titik_tengah: 'Menggunakan Metode Titik Tengah'
  };
  document.getElementById('subjudul').innerText = titles[metodeParam];

  document.getElementById('hitungBtn').addEventListener('click', hitung);
  document.getElementById('resetBtn').addEventListener('click', reset);

  function hitung() {
    const fxInput = document.getElementById('fx').value.trim();
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const n = parseInt(document.getElementById('n').value);
    const metode = document.getElementById('metode').value;

    if (!fxInput || isNaN(a) || isNaN(b) || isNaN(n) || n <= 0) {
      document.getElementById('output').innerHTML = `<p class="error">Input tidak valid!</p>`;
      return;
    }

    let f;
    try {
      f = new Function('x', 'return ' + fxInput);
      f(a);
    } catch {
      document.getElementById('output').innerHTML = `<p class="error">Fungsi f(x) tidak valid!</p>`;
      return;
    }

    const h = (b - a) / n;
    let total = 0;
    let table = `<table><thead><tr><th>i</th><th>xi</th><th>f(xi)</th><th>Luas</th></tr></thead><tbody>`;

    for (let i = 0; i < n; i++) {
      const xi = metode === 'segiempat' ? a + i * h : a + (i + 0.5) * h;
      const fx = f(xi);
      const luas = fx * h;
      total += luas;

      table += `<tr><td>${i + 1}</td><td>${xi.toFixed(4)}</td><td>${fx.toFixed(4)}</td><td>${luas.toFixed(4)}</td></tr>`;
    }

    table += `</tbody><tfoot><tr><td colspan="3"><strong>Total</strong></td><td><strong>${total.toFixed(4)}</strong></td></tr></tfoot></table>`;
    document.getElementById('output').innerHTML = table;
  }

  function reset() {
    ['fx', 'a', 'b', 'n'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('output').innerHTML = '';
  }
});
