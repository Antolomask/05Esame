// Definizione dell'interfaccia per i dati del form
interface FormDati {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  password2: string;
  indirizzo: string;
  citta: string;
  provincia: string;
  cap: string;
}

// Classe per la validazione del form
class FormValidator {
  // Visualizza Password
  togglePasswordVisibility() {
    const showPasswordToggles = document.querySelectorAll(".show-password-toggle");

    showPasswordToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const passwordInput = toggle.previousElementSibling as HTMLInputElement;
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
      });
    });
  }

  // Nome-Cognome
  isValidName(name: string): boolean {
    return name.trim() !== "";
  }

  // Validazione della Mail
  isValidEmail(email: string): boolean {
    if (email.trim() === "") {
      console.log("Inserisci una mail, per favore");
      alert("Inserisci una mail, per favore");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Inserisci una mail valida, per favore");
      alert("Inserisci una mail valida, per favore");
      return false;
    }

    return true;
  }

  // Password
  isValidPassword(password: string): boolean {
    // Deve contenere almeno otto caratteri
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
  }

  // Conferma Password
  isValidPasswordConfirmation(password: string, confirmPassword: string): boolean {
    if (password !== confirmPassword) {
      console.log("La password di conferma non corrisponde alla password");
      alert("La password di conferma non corrisponde alla password");
      return false;
    }
    return true;
  }

  // Termini e condizioni
  validateCheckbox(checkbox: HTMLInputElement): boolean {
    if (!checkbox.checked) {
      console.log("Devi spuntare il checkbox per procedere.");
      alert("Devi spuntare il checkbox per procedere.");
      return false;
    }
    return true;
  }

  // VALIDAZIONE
  validate(formDati: FormDati): boolean {
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
    if (!this.isValidName(formDati.provincia)) {
      alert("Inserisci la tua provincia, per favore");
      console.log("Inserisci la tua provincia, per favore");
      return false;
    }
    // Validazione CAP
    if (!this.isValidName(formDati.cap)) {
      console.log("Inserisci il tuo CAP, per favore");
      alert("Inserisci il tuo CAP, per favore");
      return false;
    }
    return true;
  }

  // Se tutto è ok, convalido la registrazione
  logFormData(formDati: FormDati) {
    console.log("Dati del form inviati:");
    console.log(formDati);
    alert("Registrazione avvenuta con successo!");
  }
}

// Recupero i dati dal form
function handleSubmit(event: Event) {
  event.preventDefault();

  const nome = (<HTMLInputElement>document.getElementById("nome")).value;
  const cognome = (<HTMLInputElement>document.getElementById("cognome")).value;
  const email = (<HTMLInputElement>document.getElementById("email")).value;
  const password = (<HTMLInputElement>document.getElementById("password")).value;
  const password2 = (<HTMLInputElement>document.getElementById("confermapsw")).value;
  const indirizzo = (<HTMLInputElement>document.getElementById("indirizzo")).value;
  const citta = (<HTMLInputElement>document.getElementById("citta")).value;
  const provincia = (<HTMLInputElement>document.getElementById("provincia")).value;
  const cap = (<HTMLInputElement>document.getElementById("cap")).value;
  const checkbox = document.getElementById("invalidCheck") as HTMLInputElement;

  // Creo un oggetto con i dati del form
  const formDati: FormDati = {
    nome,
    cognome,
    email,
    password,
    password2,
    indirizzo,
    citta,
    provincia,
    cap,
  };

  const validator = new FormValidator();

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

document.addEventListener("DOMContentLoaded", () => {
  const validator = new FormValidator();
  validator.togglePasswordVisibility();

  const form = document.getElementById("registrazioneForm");
  form.addEventListener("submit", handleSubmit);
});
