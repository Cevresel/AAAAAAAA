// Firebase Authentication ve Firestore işlevleri
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Kayıt Olma
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("Kayıt başarılı!");
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block"; // Kayıt sonrası giriş formunu göster
    } catch (error) {
        alert(error.message);
    }
});

// Giriş Yapma
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Giriş başarılı!");
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("dataForm").style.display = "block"; // Giriş sonrası veri giriş formunu göster
    } catch (error) {
        alert(error.message);
    }
});

// Veri Girişi
document.getElementById("dataEntry").addEventListener("submit", async (e) => {
    e.preventDefault();
    const wasteType = document.getElementById("wasteType").value;
    const wasteAmount = document.getElementById("wasteAmount").value;
    
    try {
        const docRef = await addDoc(collection(db, "wastes"), {
            wasteType: wasteType,
            wasteAmount: wasteAmount,
            timestamp: new Date(),
        });
        alert("Veri başarıyla kaydedildi!");
        document.getElementById("dataForm").reset(); // Formu sıfırla
    } catch (error) {
        alert("Veri kaydetme hatası: " + error.message);
    }
});

// Formları Gizleme ve Gösterme
document.getElementById("registerBtn").addEventListener("click", () => {
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("dataForm").style.display = "none";
});

document.getElementById("loginBtn").addEventListener("click", () => {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("dataForm").style.display = "none";
});

document.getElementById("dataBtn").addEventListener("click", () => {
    document.getElementById("dataForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
});
