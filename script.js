// Ambil parameter 'metode' dari URL atau set default ke 'segiempat'
const params = new URLSearchParams(window.location.search);
const metodeParam = params.get('metode') || 'segiempat';
document.getElementById('metode').value = metodeParam;

// Tentukan judul berdasarkan metode
const titles = {
  segiempat: 'Menggunakan Metode Segi Empat',
  titik_tengah: 'Menggunakan Metode Titik Tengah'
};
document.getElementById('subjudul').innerText = titles[metodeParam];

// Event listener untuk tombol hitung dan reset
document.getElementById('hitungBtn').addEventListener('click', hitung);
document.getElementById('resetBtn').addEventListener('click', reset);

// Fungsi untuk melakukan perhitungan
function hitung() {
  const fxInput = document.getElementById('fx').value.trim(); // Ambil input fungsi
  const a = parseFloat(document.getElementById('a').value);  // Ambil nilai a
  const b = parseFloat(document.getElementById('b').value);  // Ambil nilai b
  const n = parseInt(document.getElementById('n').value);    // Ambil nilai n (jumlah interval)
  const metode = document.getElementById('metode').value;    // Ambil metode yang dipilih

  // Validasi input
  if (!fxInput || isNaN(a) || isNaN(b) || isNaN(n) || n <= 0) {
    document.getElementById('output').innerHTML = `<p class="error">Input tidak valid! Pastikan semua kolom diisi dengan benar.</p>`;
    return;
  }

  let f;
  try {
    // Membuat fungsi dari input
    f = new Function('x', 'return ' + fxInput);
    f(a); // Tes fungsi untuk validasi
  } catch {
    document.getElementById('output').innerHTML = `<p class="error">Fungsi f(x) tidak valid! Pastikan fungsi yang dimasukkan benar.</p>`;
    return;
  }

  // Hitung langkah (h) untuk integral
  const h = (b - a) / n;
  let total = 0; // Total luas integral
  let table = `
    <table>
      <thead>
        <tr><th>i</th><th>xi</th><th>f(xi)</th><th>Luas</th></tr>
      </thead>
      <tbody>
  `;

  // Loop untuk menghitung nilai f(xi) dan luas tiap interval
  for (let i = 0; i < n; i++) {
    const xi = metode === 'segiempat' 
      ? a + i * h 
      : a + (i + 0.5) * h; // Menghitung xi berdasarkan metode
    const fx = f(xi); // Menghitung f(xi)
    const luas = fx * h; // Menghitung luas area
    total += luas; // Menambahkan luas ke total

    // Membuat baris tabel untuk setiap langkah
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${xi.toFixed(4)}</td>
        <td>${fx.toFixed(4)}</td>
        <td>${luas.toFixed(4)}</td>
      </tr>
    `;
  }

  // Menambahkan total di bagian bawah tabel
  table += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3"><strong>Total</strong></td>
          <td><strong>${total.toFixed(4)}</strong></td>
        </tr>
      </tfoot>
    </table>
  `;
  
  // Menampilkan tabel hasil perhitungan
  document.getElementById('output').innerHTML = table;
}

// Fungsi untuk mereset form
function reset() {
  ['fx', 'a', 'b', 'n'].forEach(id => {
    document.getElementById(id).value = ''; // Mengosongkan input
  });
  document.getElementById('output').innerHTML = ''; // Mengosongkan output
}
