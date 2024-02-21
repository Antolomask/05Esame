// Classe per la validazione del form
var FormValidator = /** @class */ (function () {
    function FormValidator() {
    }
    // Visualizza Password
    FormValidator.prototype.togglePasswordVisibility = function () {
        var showPasswordToggles = document.querySelectorAll(".show-password-toggle");
        showPasswordToggles.forEach(function (toggle) {
            toggle.addEventListener("click", function () {
                var passwordInput = toggle.previousElementSibling;
                var type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
                passwordInput.setAttribute("type", type);
            });
        });
    };
    // Nome-Cognome
    FormValidator.prototype.isValidName = function (name) {
        return name.trim() !== "";
    };
    // Validazione della Mail
    FormValidator.prototype.isValidEmail = function (email) {
        if (email.trim() === "") {
            console.log("Inserisci una mail, per favore");
            alert("Inserisci una mail, per favore");
            return false;
        }
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log("Inserisci una mail valida, per favore");
            alert("Inserisci una mail valida, per favore");
            return false;
        }
        return true;
    };
    // Password
    FormValidator.prototype.isValidPassword = function (password) {
        if (password.length < 8) {
            console.log("La password deve contenere almeno 8 caratteri");
            alert("La password deve contenere almeno 8 caratteri");
            return false;
        }
        // Deve contenere almeno una lettera maiuscola
        if (!/[A-Z]/.test(password)) {
            console.log("La password deve contenere almeno una lettera maiuscola");
            alert("La password deve contenere almeno una lettera maiuscola");
            return false;
        }
        // Deve contenere almeno un numero
        if (!/\d/.test(password)) {
            console.log("La password deve contenere almeno un numero");
            alert("La password deve contenere almeno un numero");
            return false;
        }
        // Deve contenere almeno un carattere speciale
        if (!/[!@#$%^&*]/.test(password)) {
            console.log("La password deve contenere almeno un carattere speciale");
            alert("La password deve contenere almeno un carattere speciale");
            return false;
        }
        return true;
    };
    // Conferma Password
    FormValidator.prototype.isValidPasswordConfirmation = function (password, confirmPassword) {
        if (password !== confirmPassword) {
            console.log("La password di conferma non corrisponde alla password");
            alert("La password di conferma non corrisponde alla password");
            return false;
        }
        return true;
    };
    // Provincia
    FormValidator.prototype.isValidProvincia = function (provincia) {
        if (provincia.trim().length !== 2) {
            console.log("La provincia deve contenere esattamente 2 caratteri");
            alert("La provincia deve contenere esattamente 2 caratteri");
            return false;
        }
        return true;
    };
    // CAP
    FormValidator.prototype.isValidCAP = function (cap) {
        var capRegex = /^\d{5}$/;
        if (!capRegex.test(cap)) {
            console.log("Il CAP deve contenere esattamente 5 cifre");
            alert("Il CAP deve contenere esattamente 5 cifre");
            return false;
        }
        return true;
    };
    // Termini e condizioni
    FormValidator.prototype.validateCheckbox = function (checkbox) {
        if (!checkbox.checked) {
            console.log("Devi spuntare il checkbox per procedere.");
            alert("Devi spuntare il checkbox per procedere.");
            return false;
        }
        return true;
    };
    // VALIDAZIONE
    FormValidator.prototype.validate = function (formDati) {
        // Validazione Nome
        if (!this.isValidName(formDati.nome)) {
            console.log("Inserisci il tuo nome, per favore");
            alert("Inserisci il tuo nome, per favore");
            return false;
        }
        // Validazione Cognome
        if (!this.isValidName(formDati.cognome)) {
            console.log("Inserisci il tuo cognome, per favore");
            alert("Inserisci il tuo cognome, per favore");
            return false;
        }
        // Validazione Email
        if (!this.isValidEmail(formDati.email)) {
            return false;
        }
        // Validazione Password
        if (!this.isValidPassword(formDati.password)) {
            console.log("La password non rispetta i criteri di sicurezza");
            return false;
        }
        // Validazione Conferma Password
        if (!this.isValidPasswordConfirmation(formDati.password, formDati.password2)) {
            console.log("La password di conferma non corrisponde con la password");
            return false;
        }
        // Validazione Indirizzo
        if (!this.isValidName(formDati.indirizzo)) {
            alert("Inserisci il tuo indirizzo, per favore");
            console.log("Inserisci il tuo indirizzo, per favore");
            return false;
        }
        // Validazione Citta
        if (!this.isValidName(formDati.citta)) {
            alert("Inserisci la tua città, per favore");
            console.log("Inserisci la tua città, per favore");
            return false;
        }
        // Validazione Provincia
        if (!this.isValidProvincia(formDati.provincia)) {
            alert("Inserisci la tua provincia, per favore");
            console.log("Inserisci la tua provincia, per favore");
            return false;
        }
        // Validazione CAP
        if (!this.isValidCAP(formDati.cap)) {
            console.log("Inserisci il tuo CAP, per favore");
            alert("Inserisci il tuo CAP, per favore");
            return false;
        }
        return true;
    };
    // Se tutto è ok, valida la registrazione
    FormValidator.prototype.logFormData = function (formDati) {
        console.log("Dati del form inviati:");
        console.log(formDati);
        alert("Registrazione avvenuta con successo!");
    };
    return FormValidator;
}());
// Recupero i dati dal form
function handleSubmit(event) {
    event.preventDefault();
    var nome = document.getElementById("nome").value;
    var cognome = document.getElementById("cognome").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("confermapsw").value;
    var indirizzo = document.getElementById("indirizzo").value;
    var citta = document.getElementById("citta").value;
    var provincia = document.getElementById("provincia").value;
    var cap = document.getElementById("cap").value;
    var checkbox = document.getElementById("invalidCheck");
    // Creo un oggetto con i dati del form
    var formDati = {
        nome: nome,
        cognome: cognome,
        email: email,
        password: password,
        password2: password2,
        indirizzo: indirizzo,
        citta: citta,
        provincia: provincia,
        cap: cap,
    };
    var validator = new FormValidator();
    if (!validator.validate(formDati)) {
        return; // Non procedere con l'invio del modulo se la validazione non ha successo
    }
    // Controllo del checkbox
    if (!validator.validateCheckbox(checkbox)) {
        return; // Non procedere con l'invio del modulo se il checkbox non è spuntato
    }
    // Se tutte le validazioni sono passate, procedi con l'invio del modulo
    validator.logFormData(formDati);
}
document.addEventListener("DOMContentLoaded", function () {
    var validator = new FormValidator();
    validator.togglePasswordVisibility();
    var form = document.getElementById("registrazioneForm");
    form.addEventListener("submit", handleSubmit);
});
