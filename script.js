let totalPembayaran = 0;

// Fungsi untuk menambahkan pemisah ribuan 
function formatRupiah(angka) { 
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); 
} 

// Event listener pada form submit
document.getElementById('inputForm').addEventListener('submit', function(event) { 
    event.preventDefault(); // Mencegah pengiriman form 

    // Cek jumlah baris dalam tabel
    const tableBody = document.getElementById('dataTable').querySelector('tbody');
    const rowCount = tableBody.getElementsByTagName('tr').length;
    
    if (rowCount >= 5) {
        alert("Maksimal hanya bisa mengisi 5 baris di tabel.");
        return; // Hentikan jika sudah mencapai 5 baris
    }

    // Mengambil nilai dari input 
    const namaProduk = document.getElementById('namaProduk').value;
    const hargaSatuan = parseFloat(document.getElementById('hargaSatuan').value); 
    const jumlah = parseInt(document.getElementById('jumlah').value); 

// Validasi input
if (isNaN(hargaSatuan) || isNaN(jumlah) || !namaProduk) {
    Swal.fire({
        icon: "error",
        title: "Wrong",
        text: "Tidak boleh melebihi 5 baris!",
        footer: '<a href="#">Data Terbatas</a>'
        });
    return; // Hentikan jika input tidak valid
}

// Cek jumlah baris dalam tabel
if (rowCount >= 5) {
    Swal.fire({
        icon: 'warning',
        title: 'Maksimal 5 Baris',
        text: 'Maksimal hanya bisa mengisi 5 baris di tabel.',
    });
    return; // Hentikan jika sudah mencapai 5 baris
}

    // Menghitung Jumlah Harga 
    const jumlahHarga = hargaSatuan * jumlah; 

    // Membuat baris baru untuk tabel 
    const newRow = document.createElement('tr'); 

    // Menambahkan data ke baris 
    newRow.innerHTML = ` 
        <td>${namaProduk}</td> 
        <td>${formatRupiah(hargaSatuan.toFixed(0))}</td> 
        <td>${jumlah}</td> 
        <td>${formatRupiah(jumlahHarga.toFixed(0))}</td> 
    `; 

    // Menambahkan baris ke tabel 
    tableBody.appendChild(newRow); 

    // Menambahkan Jumlah Harga ke total 
    totalPembayaran += jumlahHarga; 
    document.getElementById('totalHarga').innerText = `Total Pembayaran:
    Rp ${formatRupiah(totalPembayaran.toFixed(0))}`; 

    // Reset form setelah input 
    document.getElementById('inputForm').reset(); 
});

// Tampilkan tabel ketika tombol diklik
document.getElementById("showTableButton").addEventListener("click", function() {
    const hiddenContent = document.getElementById("dataTable");
    if (hiddenContent.classList.contains("hidden")) {
        hiddenContent.classList.remove("hidden");
    }
});

// Mengatur zoom ke 90% saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    document.body.style.zoom = "0.9";
});
