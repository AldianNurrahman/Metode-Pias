let kaidah = "";

function showExplanation(pilihan) {
    kaidah = pilihan;
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
    const judul = pilihan === 'segiempat' ? "Kaidah Segiempat" : "Kaidah Titik Tengah";
    const penjelasan = pilihan === 'segiempat' ? 
        "Langkah Kaidah Segiempat:
1. Tentukan fungsi, batas a dan b, serta jumlah pias n.
2. Hitung lebar pias h = (b-a)/n
3. Hitung f(x) di tiap batas pias dan jumlahkan sesuai rumus segiempat.
4. Hasilnya adalah integral hampiran." :
        "Langkah Kaidah Titik Tengah:
1. Tentukan fungsi, batas a dan b, serta jumlah pias n.
2. Hitung lebar pias h = (b-a)/n
3. Hitung titik tengah tiap pias dan nilai f(x) di titik tersebut.
4. Jumlahkan semua f(x) dan kalikan dengan h untuk hasil integral.";

    document.getElementById("judulKaidah").innerText = judul;
    document.getElementById("penjelasanKaidah").innerText = penjelasan;
}

function showCalculator() {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
}

function hitung() {
    const fungsi = document.getElementById("fungsi").value;
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const n = parseInt(document.getElementById("n").value);
    const h = (b - a) / n;
    let total = 0;

    try {
        const f = new Function("x", "return " + fungsi);

        if (kaidah === "segiempat") {
            for (let i = 0; i < n; i++) {
                let xi = a + i * h;
                total += f(xi);
            }
        } else {
            for (let i = 0; i < n; i++) {
                let xi = a + (i + 0.5) * h;
                total += f(xi);
            }
        }

        const hasil = total * h;
        document.getElementById("hasil").innerText = "Hasil hampiran integral: " + hasil.toFixed(6);
    } catch (error) {
        document.getElementById("hasil").innerText = "Terjadi kesalahan pada input fungsi.";
    }
}

function reset() {
    document.getElementById("fungsi").value = "";
    document.getElementById("a").value = "";
    document.getElementById("b").value = "";
    document.getElementById("n").value = "10";
    document.getElementById("hasil").innerText = "";
}
