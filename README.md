# POLYGLOTAI

---
## 📑 Daftar Isi

1. [✨ Preview](#-preview)
2. [🚀 Tujuan Proyek](#-tujuan-proyek)
3. [🛠️ Fitur Utama](#️-fitur-utama)
4. [🧪 Teknologi yang Digunakan](#-teknologi-yang-digunakan)
5. [📚 Pembelajaran Utama](#-pembelajaran-utama)
6. [🡩‍💻 Author](#author)
7. [🖼️ Cuplikan Layar](#cuplikan-layar_25-5-2025_191335_mich-translateapp-solo-project-polyglot-pages-dev)
8. [📄 Dokumentasi Kode JavaScript: `index.js`](#dokumentasi-kode-javascript-indexjs-polyglotai)
    - [Ringkasan Fungsi](#ringkasan-fungsi)
    - [Alur Kerja Utama](#alur-kerja-utama)
    - [Penjelasan Kode Tiap Bagian](#penjelasan-kode-tiap-bagian)
        - [Inisialisasi Komponen DOM](#1-inisialisasi-komponen-dom)
        - [Event Listener untuk Tombol Translate](#2-event-listener-untuk-tombol-translate)
        - [Mengambil Input User dan Validasi](#3-mengambil-input-user-dan-validasi)
        - [Mengirim Permintaan ke Backend](#4-mengirim-permintaan-ke-backend)
        - [Penanganan Response & Error Handling](#5-penanganan-response--error-handling)
9. [🔒 Catatan Keamanan](#catatan-keamanan)
10. [✅ Kesimpulan](#kesimpulan)
---

---

project ini berfokus pada **penggunaan dan deployment API secara aman** dan beberapa bagian yang aman di backend **cloudflare workers**s erta **pemahaman mendalam terhadap arsitektur request API**.

---
"The project looks simple, but the tricky part was hiding the API and keeping the prompt secret on the backend."

---
## ✨ Preview

🔗 [Live Demo](https://mich-translateapp-solo-project-polyglot.pages.dev/)
📦 [GitHub Repo](https://github.com/mekel16/polyglotAI-solo-Project)

---

## 🚀 Tujuan Proyek

* Mempelajari dan mempraktikkan **cara mengkonsumsi API (khususnya OpenAI API)** secara aman di sisi frontend maupun backend.
* Menjaga **keamanan informasi sensitif seperti API Key** saat aplikasi di-*deploy*.
* Menerapkan berbagai konsep teknikal dari sisi API seperti: *dependencies*, *requests*, *models*, *messages array*, dan *tokens*.
* Menerapkan teknik **Prompt Engineering** yang efektif untuk meningkatkan kualitas output dari model AI.

---

## 🛠️ Fitur Utama

* 🔐 **Secure Deployment**
  Menggunakan teknik environment variables & server-side logic untuk menjaga kerahasiaan API Key.

* 🧠 **Structured OpenAI API Usage**

  * **Dependencies**: Instalasi library yang dibutuhkan
  * **Request Structure**: Cara menyusun permintaan ke model
  * **Models**: Penggunaan model `gpt-4o-mini`
  * **Messages Array**: Format dialog yang dipakai (`system`, `user`, `assistant`)
  * **Token Handling**: Mengelola batas token dalam permintaan

* 🎯 **Prompt Engineering Implementation**

  * **Temperature**: Mengontrol kreativitas output model
  * **Few-shot Approach**: Memberikan contoh pada prompt untuk hasil lebih relevan
  * **Stop Sequences**: Menghentikan output di titik tertentu
  * **Presence & Frequency Penalty**: Mengatur keragaman dan pengulangan dalam hasil

---

## 🧪 Teknologi yang Digunakan

* **Frontend**: HTML, CSS, JavaScript
* **Backend**: .js file yang berjalan di Cloudflare (Cloudflare Workers)
* **API**: [OpenAI GPT API](https://platform.openai.com/docs)

---


## 📚 Pembelajaran Utama

✅ Best practice dalam penggunaan API secara **aman dan efisien**
✅ Meningkatkan kemampuan dalam **Prompt Engineering**
✅ Memahami **struktur komunikasi dengan LLM** (Large Language Models)
✅ Membuat aplikasi AI yang siap *production*

---
## 🡩‍💻 Author

**Michael Pallea**

🔗 [Portfolio](https://mekel16.github.io/michael_portofolio_website/)
📧 Email: [mekelpallea@gmail.com](mailto:mekelpallea@gmail.com)

---

![Cuplikan layar_25-5-2025_191335_mich-translateapp-solo-project-polyglot pages dev](https://github.com/user-attachments/assets/48817964-555a-456e-a284-bb93ec5edf14)

---
# Dokumentasi Kode JavaScript: `script.js` PolyglotAI

Dokumentasi ini menjelaskan fungsi, alur kerja, dan penjelasan kode JavaScript utama pada aplikasi PolyglotAI.

---

## Ringkasan Fungsi

Script ini bertugas mengelola interaksi pengguna pada halaman web, melakukan validasi input, mengirim permintaan ke backend untuk proses terjemahan, dan menampilkan hasil terjemahan ke pengguna.

---

## Alur Kerja Utama

1. **Menunggu Halaman Siap**
   - Kode dijalankan setelah seluruh dokumen HTML ter-load penuh (`DOMContentLoaded`).
2. **Event Listener Tombol**
   - Mendengarkan klik pada tombol "Translate".
3. **Validasi Input**
   - Mengecek apakah teks sudah diisi dan bahasa target sudah dipilih.
   - Hanya mengizinkan bahasa: `japan`, `french`, `spain`.
4. **Kirim Request ke Backend**
   - Mengirim data teks dan bahasa target menggunakan metode `POST` ke endpoint backend (Cloudflare Worker).
5. **Tampilkan Hasil**
   - Jika sukses, menampilkan hasil terjemahan.
   - Jika gagal, menampilkan pesan error.

---

## Penjelasan Kode Tiap Bagian

### 1. Inisialisasi Komponen DOM

```javascript
const translateBtn = document.getElementById("translateBtn");
const resultBox = document.getElementById("resultBox");
```
- Mengambil elemen tombol translate dan kotak hasil dari halaman HTML.

---

### 2. Event Listener untuk Tombol Translate

```javascript
translateBtn.addEventListener("click", async () => {
  // Proses terjemahan berjalan di sini
});
```
- Ketika user menekan tombol "Translate", fungsi asinkron dijalankan.

---

### 3. Mengambil Input User dan Validasi

```javascript
const textInput = document.getElementById("text");
const text = textInput ? textInput.value : "";
const languageRadios = document.getElementsByName("language");
let selectedLanguage = null;

// Validasi apakah teks sudah diisi
if (typeof text !== "string" || !text.trim()) {
  alert("Please enter some text.");
  return;
}

// Mencari bahasa yang dipilih
for (let radio of languageRadios) {
  if (radio.checked) {
    selectedLanguage = radio.value;
    break;
  }
}
if (!selectedLanguage) {
  alert("Please select a language.");
  return;
}

const allowedTargets = ['japan', 'french', 'spain'];
if (!allowedTargets.includes(selectedLanguage)) {
  alert("Invalid language selected.");
  return;
}
```
- Mengecek input teks dan pilihan bahasa.
- Jika tidak valid, akan mengeluarkan alert dan menghentikan proses.

---

### 4. Mengirim Permintaan ke Backend

```javascript
try {
  const url = "https://my-openai-api-worker.michp.workers.dev/";

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      target: selectedLanguage
    })
  });

  const data = await response.json();
  // Penanganan hasil response di bawah
```
- Mengirim request POST ke backend dengan payload berisi teks dan target bahasa.

---

### 5. Penanganan Response & Error Handling

```javascript
  if (data.error) {
    resultBox.innerText = "Error: " + data.error;
  } else if (data.choices && data.choices[0]?.message?.content) {
    const translatedText = data.choices[0].message.content;
    resultBox.innerText = translatedText;
  } else {
    resultBox.innerText = "Unexpected response format.";
  }
  resultBox.style.display = "block";
} catch (error) {
  console.error("Translation failed:", error);
  resultBox.innerText = "Something went wrong during translation.";
  resultBox.style.display = "block";
}
```
- Jika response backend berisi error, tampilkan error.
- Jika ada hasil terjemahan, tampilkan hasil.
- Jika format response tidak sesuai, tampilkan pesan error.
- Jika terjadi error pada proses fetch, tampilkan pesan error umum.

---

## Catatan Keamanan

- API key tidak pernah ada di frontend; permintaan dari frontend ke backend saja.
- Backend bertanggung jawab penuh untuk menyimpan rahasia dan memanggil OpenAI API.

---

## Kesimpulan

Kode JavaScript ini merupakan client-side logic untuk aplikasi terjemahan berbasis AI yang aman, memastikan interaksi pengguna berjalan mulus, validasi input, dan komunikasi yang aman dengan backend serverless.

---

