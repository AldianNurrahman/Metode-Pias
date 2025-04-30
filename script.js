
function goToExplanation(kaidah) {
  document.getElementById("page-choose").classList.remove("active");
  document.getElementById("page-explanation").classList.add("active");
  if (kaidah === 'segiempat') {
    document.getElementById("judul-kaidah").innerText = "Kaidah Segiempat";
    document.getElementById("penjelasan-kaidah").innerText = "Kaidah segiempat menggunakan pendekatan jumlah luas persegi panjang pada setiap segmen.";
  } else {
    document.getElementById("judul-kaidah").innerText = "Kaidah Titik Tengah";
    document.getElementById("penjelasan-kaidah").innerText = "Kaidah titik tengah menggunakan titik tengah dari setiap subinterval sebagai pendekatan integral.";
  }
}

function goToCalculator() {
  document.getElementById("page-explanation").classList.remove("active");
  document.getElementById("page-calculator").classList.add("active");
}

function hitung() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const n = parseInt(document.getElementById("n").value);
  if (isNaN(a) || isNaN(b) || isNaN(n) || n <= 0) {
    document.getElementById("hasil").innerText = "Input tidak valid!";
    return;
  }
  const h = (b - a) / n;
  let total = 0;
  for (let i = 0; i < n; i++) {
    const xi = a + (i + 0.5) * h;
    const fx = Math.pow(xi, 2);  // Contoh fungsi: f(x) = x^2
    total += fx;
  }
  const integral = total * h;
  document.getElementById("hasil").innerText = "Hasil integral: " + integral.toFixed(4);
}
