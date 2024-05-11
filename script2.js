// Inisialisasi objek untuk menyimpan jumlah tombol yang telah diklik
var clickedCounts = {
    sanguinis: 0,
    melankolis: 0,
    koleris: 0,
    phlegmatis: 0
};
var containerStatus = {
    sanguinis: true,
    melankolis: true,
    koleris: true,
    phlegmatis: true
};

// Batasan maksimum jumlah klik yang diizinkan
var maxClicks = 10;

// Dapatkan tombol-tombol yang bisa diklik
var clickableButtons = document.querySelectorAll('.clickable');

// Tambahkan event listener untuk tombol-tombol yang bisa diklik
clickableButtons.forEach(function(clickableButton) {
    var icon = clickableButton.querySelector('i.far.fa-square');

    clickableButton.addEventListener('click', function() {
        var isChecked = icon.classList.contains('fas', 'fa-check-square');
        var container = clickableButton.closest('.box1');
        var containerId = container.querySelector('h2').textContent.toLowerCase();

        // Periksa apakah tombol pada kontainer ini sebelumnya telah dinonaktifkan
        if (containerStatus[containerId]) {
            if (clickedCounts[containerId] < maxClicks || isChecked) {
                if (!isChecked) {
                    clickedCounts[containerId]++;
                } else {
                    clickedCounts[containerId]--;
                }

                icon.classList.toggle('checked');

                if (isChecked) {
                    icon.classList.remove('fas', 'fa-check-square');
                    icon.classList.add('far', 'fa-square');
                } else {
                    icon.classList.remove('far', 'fa-square');
                    icon.classList.add('fas', 'fa-check-square');
                }

                updateClickedCount(containerId);
            }
        }
    });
});


// Fungsi untuk mengupdate tampilan jumlah tombol yang sudah diklik di setiap kontainer
function updateClickedCount(containerId) {
    var countDisplay = document.getElementById('clicked-count-' + containerId);
    countDisplay.textContent = 'Tombol yang sudah diklik: ' + clickedCounts[containerId];

    // Cek apakah jumlah total klik sudah mencapai batasan maksimum
    var totalClicks = Object.values(clickedCounts).reduce((total, count) => total + count, 0);

    // Tampilkan notifikasi konfirmasi jika jumlah total klik mencapai batasan maksimum
    if (totalClicks >= maxClicks) {
        var confirmation = confirm('Total semua pilihan sudah mencapai 10. tekan Oke untuk tetap di halaman, Batal untuk memilih kembali');

        if (confirmation) {
            // Jika pengguna memilih "OK," reset semua pilihan
            //      resetAllSelections();
            disableAllButtons();
        }
    } else {
        // Aktifkan kembali semua tombol jika jumlah total klik belum mencapai batasan maksimum
        //    enableAllButtons();
    }
}
// Fungsi untuk mengupdate tampilan jumlah tombol yang sudah diklik di setiap kontainer
function updateClickedCount(containerId) {
    var countDisplay = document.getElementById('clicked-count-' + containerId);
    countDisplay.textContent = 'Tombol yang sudah diklik: ' + clickedCounts[containerId];

    // Cek apakah jumlah total klik sudah mencapai batasan maksimum
    var totalClicks = Object.values(clickedCounts).reduce((total, count) => total + count, 0);

    // Tampilkan notifikasi konfirmasi jika jumlah total klik mencapai batasan maksimum
    if (totalClicks >= maxClicks) {
        var confirmation = confirm('Total semua pilihan sudah mencapai 10. tekan Oke untuk tetap di halaman, Batal untuk memilih kembali');

        if (confirmation) {
            // Jika pengguna memilih "OK," reset semua pilihan
            //      resetAllSelections();
            disableAllButtons();
        }
    } else {
        // Aktifkan kembali semua tombol jika jumlah total klik belum mencapai batasan maksimum
        //    enableAllButtons();
    }
}

// Tambahkan event listener untuk tombol "save"
var saveButton = document.querySelector('.save-buttons');
saveButton.addEventListener('click', function() {
    // Lakukan sesuatu ketika tombol "save" diklik, misalnya, menyimpan data angket atau operasi lainnya
    alert('TERIMA KASIH TELAH MENGISI ANGKET PERTANYAAN');
});


// Fungsi untuk menonaktifkan semua tombol
function disableAllButtons() {
    clickableButtons.forEach(function(clickableButton) {
        clickableButton.disabled = true;
    });
}

// Fungsi untuk mengaktifkan kembali semua tombol
function enableAllButtons() {
    clickableButtons.forEach(function(clickableButton) {
        clickableButton.disabled = false;
    });
}

// Fungsi untuk mereset semua pilihan
function resetAllSelections() {
    // Reset jumlah klik di setiap kontainer menjadi 0
    clickedCounts.sanguinis = 0;
    clickedCounts.melankolis = 0;
    clickedCounts.koleris = 0;
    clickedCounts.phlegmatis = 0;

    // Reset tampilan jumlah klik
    updateClickedCount('sanguinis');
    updateClickedCount('melankolis');
    updateClickedCount('koleris');
    updateClickedCount('phlegmatis');

    // Aktifkan kembali semua tombol
    enableAllButtons();
}

// Tambahkan event listener untuk tombol "save"
var saveButton = document.querySelector('.save-buttons');
saveButton.addEventListener('click', function() {
    // Dapatkan nilai pilihan dari setiap kategori
    var sanguinis = clickedCounts.sanguinis;
    var melankolis = clickedCounts.melankolis;
    var koleris = clickedCounts.koleris;
    var phlegmatis = clickedCounts.phlegmatis;

    // Panggil fungsi untuk menentukan halaman yang sesuai berdasarkan pola pilihan
    determinePage(sanguinis, melankolis, koleris, phlegmatis);
});

// Ambil semua elemen tombol yang memiliki class "clickable" pada setiap container vertikal
var containerVerticals = document.querySelectorAll('.container-vertikal');

// Tambahkan event listener untuk setiap container vertikal
containerVerticals.forEach(function(container) {
    // Ambil semua elemen tombol pada container vertikal tersebut
    var clickableButtons = container.querySelectorAll('.clickable');

    clickableButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Cek apakah tombol sedang aktif atau tidak
            var isActive = button.classList.contains('active');

            // Jika tombol sedang aktif (diklik lagi untuk membatalkan pilihan), aktifkan kembali semua tombol di dalam kontainer vertikal
            if (isActive) {
                clickableButtons.forEach(function(verticalButton) {
                    verticalButton.disabled = false; // Mengaktifkan kembali tombol
                });
            } else {
                // Nonaktifkan tombol-tombol pada container vertikal kecuali tombol yang diklik
                clickableButtons.forEach(function(verticalButton) {
                    if (verticalButton !== button) {
                        verticalButton.disabled = true; // Menonaktifkan tombol
                    }
                });
            }

            // Panggil fungsi untuk menandai tombol yang dipilih
            selectButton(button);
        });
    });
});



// Fungsi untuk menentukan halaman berdasarkan pola pilihan dan menyimpan ke backend
function determinePage(sanguinis, melankolis, koleris, phlegmatis) {

    var pattern = {
        // sanguinis
        '10-0-0-0': 'kuning.html',
        '9-1-0-0': 'kuning.html',
        '9-0-1-0': 'kuning.html',
        '9-0-0-1': 'kuning.html',
        '8-2-0-0': 'kuning.html',
        '8-0-2-0': 'kuning.html',
        '8-0-0-2': 'kuning.html',
        '8-1-1-0': 'kuning.html',
        '8-1-0-1': 'kuning.html',
        '8-0-1-1': 'kuning.html',
        '7-3-0-0': 'kuning.html',
        '7-0-3-0': 'kuning.html',
        '7-0-0-3': 'kuning.html',
        '7-1-2-0': 'kuning.html',
        '7-2-1-0': 'kuning.html',
        '7-0-1-2': 'kuning.html',
        '7-0-2-1': 'kuning.html',
        '7-1-1-1': 'kuning.html',
        // melankolis
        '0-10-0-0': 'biru.html',
        '0-9-1-0': 'biru.html',
        '0-9-0-1': 'biru.html',
        '1-9-0-0': 'biru.html',
        '0-8-2-0': 'biru.html',
        '0-8-1-1': 'biru.html',
        '1-8-1-0': 'biru.html',
        '1-8-0-1': 'biru.html',
        '0-7-3-0': 'biru.html',
        '0-7-2-1': 'biru.html',
        '0-7-1-2': 'biru.html',
        '1-7-2-0': 'biru.html',
        '2-7-1-0': 'biru.html',
        '1-7-1-1': 'biru.html',
        // koleris
        '0-0-10-0': 'merah.html',
        '1-0-9-0': 'merah.html',
        '0-1-9-0': 'merah.html',
        '0-0-8-2': 'merah.html',
        '2-0-8-0': 'merah.html',
        '0-2-8-0': 'merah.html',
        '1-1-8-0': 'merah.html',
        '1-0-8-1': 'merah.html',
        '0-1-8-1': 'merah.html',
        '0-0-7-3': 'merah.html',
        '3-0-7-0': 'merah.html',
        '0-3-7-0': 'merah.html',
        '2-1-7-0': 'merah.html',
        '2-0-7-1': 'merah.html',
        '1-2-7-0': 'merah.html',
        '1-0-7-2': 'merah.html',
        '1-1-7-1': 'merah.html',
        // phlegmatis
        '0-0-0-10': 'aqua.html',
        '0-0-1-9': 'aqua.html',
        '0-1-0-9': 'aqua.html',
        '1-0-0-9': 'aqua.html',
        '0-0-2-8': 'aqua.html',
        '0-2-0-8': 'aqua.html',
        '2-0-0-8': 'aqua.html',
        '1-1-0-8': 'aqua.html',
        '1-0-1-8': 'aqua.html',
        '0-0-3-7': 'aqua.html',
        '0-3-0-7': 'aqua.html',
        '3-0-0-7': 'aqua.html',
        '1-1-1-7': 'aqua.html',
        // Sanguinis_Melankolis
        '5-5-0-0': 'hijau.html',
        '6-4-0-0': 'hijau.html',
        '4-6-0-0': 'hijau.html',

        // Sanguinis_Koleris
        '5-0-5-0': 'oranye.html',
        '6-0-4-0': 'oranye.html',
        '4-0-6-0': 'oranye.html',

        // Sanguinis_Phlegmatis
        '5-0-0-5': 'hijau_muda.html',
        '6-0-0-4': 'hijau_muda.html',
        '4-0-0-6': 'hijau_muda.html',

        // Melankolis_Koleris
        '0-5-5-0': 'ungu.html',
        '0-6-4-0': 'ungu.html',
        '0-4-6-0': 'ungu.html',

        // melankolis_Phlegmatis
        '0-5-0-5': 'coklat.html',
        '0-6-0-4': 'coklat.html',
        '0-4-0-6': 'coklat.html',

        // Koleris_Phlegmatis
        '0-0-5-5': 'ungugelap.html',
        '0-0-6-4': 'ungugelap.html',
        '0-0-4-6': 'ungugelap.html',

        // tambahkan pola-pola lainnya sesuai kebutuhan
    };

    var patternKey = `${sanguinis}-${melankolis}-${koleris}-${phlegmatis}`;
    var frontendPage = pattern[patternKey];

    if (frontendPage) {
        // Membuat pemetaan antara halaman frontend dan backend
        var backendPage = mapFrontendToBackend(frontendPage);

        // Kirim permintaan POST ke backend untuk menyimpan warna
        saveWarnaToBackend(backendPage);



        // Redirect ke halaman yang sesuai di frontend
        window.location.href = frontendPage;
    } else {
        // Jika pola tidak sesuai, lakukan tindakan lain atau arahkan ke halaman default
        var customAlert = document.getElementById('customAlert');
        var alertMessage = document.getElementById('alertMessage');
        var okButton = document.getElementById('okButton');

        // Set pesan alert
        alertMessage.innerHTML = 'Peringatan';
        alertMessage2.innerHTML = 'Jawaban anda tidak dapat diproses karena terlarang. Tolong isi kembali kuesioner anda dengan lebih memperhatikan kepribadian anda. Klik isi kembali kuesioner untuk mencoba lagi';

        // Tampilkan elemen custom-alert
        customAlert.style.display = 'block';

        // Tambahkan event listener pada tombol 'OK'
        okButton.addEventListener('click', function() {
            window.location.href = 'angketpertanyaan2.html';
        });
    }
}

// Fungsi untuk membuat pemetaan antara halaman frontend dan backend
function mapFrontendToBackend(frontendPage) {
    // Misalnya, jika halaman frontend adalah 'sanguinis.html', maka disimpan sebagai 'kuning.html'
    var backendMapping = {
        'kuning.html': 'kuning.html',
        'biru.html' : 'biru.html',
        'merah.html' : 'merah.html',
        'aqua.html' : 'aqua.html',
        'hijau.html' : 'hijau.html',
        'oranye.html' : 'oranye.html',
        'hijau_muda' : 'hijau_muda.html',
        'ungu.html' : 'ungu.html',
        'coklat.html' : 'coklat.html',
        'ungugelap.html': 'ungugelap.html',
        // tambahkan pemetaan lainnya sesuai kebutuhan
    };

    return backendMapping[frontendPage] || frontendPage;
}

// Fungsi untuk menyimpan warna ke backend tanpa JSON.stringify
function saveWarnaToBackend(warna) {
    var nim = sessionStorage.getItem('nim');  // Mengambil NIM dari sessionStorage

    fetch(`http://simft.umpo.ac.id/kansei/api/save-warna/${nim}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: warna,  // Mengirim warna langsung tanpa JSON.stringify
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


