// Declaration de variable //
let modal = null
let target2 = null
let search = null


// Fenêtre //
// Ouverture de fenêtre //
function openModal (e) {
    // Vérifie si l'ID de l'élément cliqué n'est pas 'adminEdit'
    if (e.id !== 'adminEdit') {
      e.preventDefault() // Empêche le comportement par défaut du lien cliqué
      modal = document.querySelector(e.target.getAttribute('href'))
    } else {
      modal = document.querySelector(e.getAttribute('href'))
      console.log(modal)
    }
      // Affiche la fenêtre modale en la rendant visible
    modal.style.display = null
      // Configure les attributs aria pour l'accessibilité
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
      // Ajoute des écouteurs d'événements pour la fermeture de la fenêtre modale
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
      // Ajoute un écouteur d'événement pour ouvrir une nouvelle fenêtre modale
    modal.querySelector('.ButtonModal').addEventListener('click', openNewModal)
      // Ajoute un écouteur d'événement pour arrêter la propagation des événements
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
      // Charge le contenu de la fenêtre modale
    LoadModal()
  }

// Fermeture de fenêtre //
function closeModal (e) {
    if (modal === null) return // Si modal est null, il n'y a rien à fermer
    if (e) {
      e.preventDefault() // Empêche le comportement par défaut de l'événement (généralement un clic)
    }
    // Cache la fenêtre modale et met à jour les attributs aria pour l'accessibilité
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal = null // Réinitialise la variable modal pour indiquer qu'aucune fenêtre modale n'est ouverte
  }

// Fenêtre édition mode //
  function returnModal (e) {
    closeModal2(e) // Ferme toute fenêtre modale existante (target2)
    // Sélectionne l'élément cible de retour (probablement un lien ou un bouton)
    const ReturnTarget = document.querySelector('#adminEdit')
    // Ouvre la fenêtre modale en utilisant la fonction openModal avec l'élément cible
    openModal(ReturnTarget)
  }
  
  function closeModal2 (e) {
    if (target2 === null) return // S'il n'y a pas de target2, il n'y a rien à fermer
    e.preventDefault() // Empêche le comportement par défaut de l'événement (généralement un clic)
    // Cache la fenêtre modale (target2) et met à jour les attributs aria pour l'accessibilité
    target2.style.display = 'none'
    target2.setAttribute('aria-hidden', 'true')
    target2.removeAttribute('aria-modal')
    target2 = null // Réinitialise la variable target2 pour indiquer qu'aucune fenêtre modale n'est ouverte
  }


  function openNewModal (e) {
    closeModal() // Ferme toute fenêtre modale existante (modal)
   // Sélectionne l'élément cible de la nouvelle fenêtre modale (#modal2)
    target2 = document.querySelector('#modal2')
      // Rend la nouvelle fenêtre modale visible
    target2.style.display = null
    // Configure les attributs aria pour l'accessibilité
    target2.removeAttribute('aria-hidden')
    target2.setAttribute('aria-modal', 'true')
    // Ajoute des écouteurs d'événements pour la nouvelle fenêtre modale
    target2.addEventListener('click', closeModal2)
    target2.querySelector('.js-modal-return').addEventListener('click', returnModal)
    target2.querySelector('.js-modal-close2').addEventListener('click', closeModal2)
    target2.querySelector('.js-modal-stop2').addEventListener('click', stopPropagation)
    // Sélectionne un élément parent (#categories) et un élément enfant (#Childrenforadd)
    const categoriesteset = document.querySelector('#Objets')
      // Si l'élément parent n'existe pas (categoriesteset est null)
    if (categoriesteset == null) {
      const selectqueryParent = document.querySelector('#categories')
      const selectqueryChildren = document.querySelector('#Childrenforadd')
  // Parcours les données de catégories (window.categories.data)
      for (let i = window.categories.data.length - 1; i >= 0; i--) {
        const NewOption = document.createElement('option')
        NewOption.value = window.categories.data[i].id
        NewOption.id = window.categories.data[i].name
        const textOption = document.createTextNode(window.categories.data[i].name)
        NewOption.appendChild(textOption)
        // Insère le nouvel élément option juste après l'élément #Childrenforadd
        selectqueryParent.insertBefore(NewOption, selectqueryChildren.nextSibling)
      }
    }
  }

  // Gestion connexion utlisateur/API //
async function LoginUser (e) {
  e.preventDefault() // Empêche le comportement par défaut du formulaire (rechargement de page)
    // Crée un objet JSON avec les informations de connexion de l'utilisateur
  const user = JSON.stringify({
    email: this.email.value, // Récupère la valeur du champ email du formulaire
    password: this.password.value // Récupère la valeur du champ mot de passe du formulaire
  })
    // Envoie une requête POST à l'API pour se connecter
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: user
  })
  // Attend la réponse de l'API et la traite comme JSON
  const result = await response.json()
   // Si la réponse de l'API est un succès (status 200)
  if (response.status === 200) {
// Connecté //
    const token = result.token
    document.cookie = 'token=' + token
    document.cookie = 'admin=' + 'true'
    document.location.href = 'index.html'
  } else if (response.status === 401 || response.status === 404) {
// Email ou mtp incorrect //
    const remoteRongElement = document.querySelector('#rong')
    remoteRongElement.textContent = 'Erreur dans l\'identifiant ou le mot de passe'
  }
}

// Récupération de cookie //
function RecoverCookie (nom) {
  nom = nom + '='
  const liste = document.cookie.split(';')
  for (let i = 0; i < liste.length; i++) {
    let c = liste[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nom) === 0) return c.substring(nom.length, c.length)
  }
  return null
}

  // Fin propagation d'évènement //
  function stopPropagation (e) {
    e.stopPropagation()
  }

// Verification d'étapes //
  function verif () {
    const t = document.querySelector('#TitleModalSub')
    const c = document.querySelector('#categories').value
    const i = document.querySelector('#NewPictureID')
    const b = document.querySelector('#buttonModalDisabled')
    if (i !== null) {
      if (i.src !== '' && t.value !== '' && c !== 'error') {
        b.disabled = false
      } else {
        b.disabled = true
      }
    }
  }

// Sélectionne tous les éléments avec la classe 'js-modal' et ajoute un écouteur d'événement au clic
  document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
  })
  // Sélectionne tous les éléments avec l'ID 'TitleModalSub' et ajoute un écouteur d'événement au changement
  document.querySelectorAll('#TitleModalSub').forEach(a => {
    a.addEventListener('change', verif)
  })
  // Sélectionne tous les éléments avec l'ID 'categories' et ajoute un écouteur d'événement au changement
  document.querySelectorAll('#categories').forEach(a => {
    a.addEventListener('change', verif)
  })

// Nettoyage d'éléments sous conditions //
  function LoadModal () {
// Intégration des éléments //
    const child = document.querySelector('#figchildModal')
    const parent = document.querySelector('#content')

// Remove de l'élément child //
    if (child !== null) {
      parent.removeChild(child)
    }

// Creation de la galerie //
    const newDivModal = document.createElement('div')
    newDivModal.id = 'figchildModal'
    newDivModal.className = 'galleryModal'
    // Parcours des données d'œuvres (window.works.data)
    for (const work of window.works.data) {
        // Création d'une nouvelle balise figure pour chaque œuvre
      const newFigureModal = document.createElement('figure')
      newFigureModal.className = ('figureModal')
      newFigureModal.id = ('Modal' + work.id)
      newDivModal.appendChild(newFigureModal)
        // Création d'une balise div avec la classe 'abso'
      const divAbsolute = document.createElement('div')
      divAbsolute.className = ('abso')
        // Création d'une balise img pour afficher l'image
      const newImageModal = document.createElement('img')
      newImageModal.crossOrigin = 'anonymous'
      newImageModal.src = work.imageUrl
      newImageModal.alt = work.title
      divAbsolute.appendChild(newImageModal)
      newFigureModal.appendChild(divAbsolute)
        // Création d'un bouton de suppression lié à chaque œuvre
      const newDeleteButtonModal = document.createElement('button')
      newDeleteButtonModal.className = ('DeleteButton')
      newDeleteButtonModal.onclick = function () {
        RemoveWork(work.id)
      }
      const ImgDelete = document.createElement('i')
      ImgDelete.className = ('fa-solid fa-trash-can fa-sm colorModal')
      newDeleteButtonModal.appendChild(ImgDelete)
      divAbsolute.appendChild(newDeleteButtonModal)
        // Création d'un lien de légende pour chaque œuvre
      const newfigcaptionModal = document.createElement('a')
      newfigcaptionModal.className = 'textModal'
      const textModal = document.createTextNode('éditer')
      newFigureModal.appendChild(newfigcaptionModal)
      newfigcaptionModal.appendChild(textModal)
    }
    // Insertion de la galerie dans le DOM
    const remoteParentElementModal = document.querySelector('#content')
    const originalDivModal = document.querySelector('#border')
    remoteParentElementModal.insertBefore(newDivModal, originalDivModal)
  }

// Sélectionne tous les éléments avec l'ID 'NewWorks' et ajoute un écouteur d'événement à la soumission (submit) du formulaire
  document.querySelectorAll('#NewWorks').forEach(a => {
    a.addEventListener('submit', CreateWork)
  })

// Création d'un travaux //
  async function CreateWork (e) {
    e.preventDefault() // Empêche le comportement par défaut du formulaire (rechargement de page)
      // Crée un nouvel objet FormData pour envoyer les données du formulaire
    const formData = new FormData()
      // Récupère le token de l'utilisateur à partir du cookie
    const token = RecoverCookie('token')
      // Récupère les informations du formulaire
    const photo = this.pict.files[0]
    const title = this.titleModalMenu.value
    const categorie = this.categories.value
      // Crée un objet Blob à partir de l'image pour l'envoi
    const blob = new Blob([photo], { type: 'image/jpeg' })
    formData.append('image', blob)
    formData.append('title', title)
    formData.append('category', categorie)
      // Envoie une requête POST à l'API pour créer un nouveau travail
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: formData
    })
      // Attend la réponse de l'API et la traite comme JSON
    const result = await response.json()
  // Ajoute les informations du nouveau travail (œuvre) aux données existantes dans window.works.data
    window.works.data.push({
      id: result.id,
      title: result.title,
      imageUrl: result.imageUrl,
      categoryId: result.categoryId,
      userId: result.userId
    })

// Affiche les données de 'works.data' dans la console
console.log(works.data)
// Charge le contenu de la modal (génération de la galerie)
LoadModal()
// Affiche la liste des travaux (œuvres)
ListingWorks()

// Sélection de l'élément enfant #pictureModal2 et de l'élément parent #NewWorks, puis suppression de l'élément enfant
const child = document.querySelector('#pictureModal2')
const parent = document.querySelector('#NewWorks')
parent.removeChild(child)
// Réinitialisation de l'affichage de l'élément #pictureModal
const PictureModal = document.querySelector('#pictureModal')
PictureModal.style.display = null
// Réinitialisation du contenu de l'élément #pictureModalInport
const Picture = document.querySelector('#pictureModalInport')
Picture.content = null
// Réinitialisation de la valeur de l'élément #TitleModalSub
const TextModal = document.querySelector('#TitleModalSub')
TextModal.value = null
// Réinitialisation de la valeur de l'élément #categories
const CatModal = document.querySelector('#categories')
CatModal.value = 'error'
}
// Sélectionne tous les éléments avec l'ID #pictureModalInport et ajoute un écouteur d'événement au changement
document.querySelectorAll('#pictureModalInport').forEach(a => {
  a.addEventListener('change', fileChanged)
})

// Changement de photos //
function fileChanged (picture) {
  const file = picture.target.files[0] // Récupère le fichier sélectionné par l'utilisateur
    // Vérifie si le fichier est une image en vérifiant son type MIME
  if (file.type.indexOf('image/') !== 0) {
    console.warn('not an image') // Affiche un message d'avertissement si le fichier n'est pas une image
  } else {
    const NewPicture = URL.createObjectURL(file) // Crée une URL pour le fichier image
    const Picture = document.querySelector('#pictureModal')
    Picture.style.display = 'none' // Masque l'élément #pictureModal
        // Crée un nouvel élément div pour afficher la nouvelle image
    const newDivModal2 = document.createElement('div')
    newDivModal2.id = 'pictureModal2'
    newDivModal2.className = 'pictureModal'
        // Crée une nouvelle balise <img> pour afficher la nouvelle image
    const newPictureInModal = document.createElement('img')
    newPictureInModal.src = NewPicture
    newPictureInModal.className = 'PictureResult'
    newPictureInModal.alt = 'Your works Pictures'
    newPictureInModal.id = 'NewPictureID'
    newDivModal2.appendChild(newPictureInModal)
        // Insère le nouvel élément div avec la nouvelle image avant l'élément #TitleModal2
    const remoteParentElementModal2 = document.querySelector('#NewWorks')
    const originalDivModal2 = document.querySelector('#TitleModal2')
    remoteParentElementModal2.insertBefore(newDivModal2, originalDivModal2)
    verif() // Appelle la fonction de vérification
  }
}

// Supprimer un travail //
function RemoveWork (id) {
  const token = RecoverCookie('token') // Récupère le token de l'utilisateur à partir du cookie
    // Envoie une requête DELETE à l'API pour supprimer le travail (œuvre) avec l'ID spécifié
  fetch('http://localhost:5678/api/works/' + id, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      Authorization: 'Bearer ' + token
    }
  })
    .then(response => {
      return response
    })
    .then((data) => {
      if (data.status === 200 || data.status === 204) {
// Suppression d'un travail dans la fenêtre //
        const WorkId = document.querySelector('#Modal' + id)
        const WorkParent = document.querySelector('#figchildModal')
        WorkParent.removeChild(WorkId)
// Suppression d'un travail sur la page principal//
        const WorkMainId = document.querySelector('#Main' + id)
        const WorkMainParent = document.querySelector('#figchild')
        WorkMainParent.removeChild(WorkMainId)
              // Recherche et suppression de l'élément correspondant dans window.works.data
        search = id
        const RemoveJson = window.works.data.findIndex(seeIndex)
        window.works.data.splice(RemoveJson, 1)
      } else if (data.status === 401) {
// Pas d'autorisation
      } else if (data.status === 500) {
        // Unexpected Behaviour
      }
    }
    )
}

// Ajout d'écouteurs d'événements sur le chargement de la page pour le corps du document
document.querySelectorAll('body').forEach(a => {
  a.addEventListener('load', onload())
})

// Récupération des travaux via API //
function onload () {
  if (window.fetch) {
        // Récupération des travaux via l'API
    fetch('http://localhost:5678/api/works').then(response =>
      response.json().then(dataLoadWorks => ({
        data: dataLoadWorks,
        status: response.status
      })
      ).then(res => {
        window.works = res // Stockage des données des travaux dans la variable window.works
        ListingWorks() // Appel de la fonction pour afficher la liste des travaux
        loadAdminPage(true) // Appel de la fonction pour charger la page d'administration
      }))
// Récupération des catégories via API //
    fetch('http://localhost:5678/api/categories').then(response =>
      response.json().then(dataLoadCategories => ({
        data: dataLoadCategories,
        status: response.status
      })
      ).then(res => { // Stockage des données des catégories dans la variable window.categories
        window.categories = res
      }))
  } else {
     // Si l'API fetch n'est pas prise en charge
  }
}

// Listing des travaux //
function ListingWorks (e) {
  RemovePage() // Appelle la fonction pour supprimer la page (peut-être pour la réinitialiser)
  // Récupère l'URL courante
  const urlCourante = document.location.href
  const queueUrl = urlCourante.substring(urlCourante.lastIndexOf('/') + 1)
  // Vérifie si l'URL courante n'est pas 'login.html'
  if (queueUrl !== 'login.html') {
    if (e) {
      e.preventDefault() // Empêche le comportement par défaut de l'événement (souvent un clic)
      ShowWorkMenu(e.target.id) // Affiche le menu de travail en fonction de l'ID cible
      UpdatePage(e.target.id) // Met à jour la page en fonction de l'ID cible
      console.log(works.data) // Affiche les données des travaux dans la console
    } else {
      UpdatePage() // Met à jour la page (peut-être sans cible spécifique)
      ShowWorkMenu() // Affiche le menu de travail (peut-être sans cible spécifique)
    }
  }
}

// Fonction de vérification du token
function verifyToken() {
  const token = RecoverCookie('token');
  if (token) {
    console.log('Token de connexion valide :', token);
  } else {
    console.log('Aucun token de connexion trouvé. Vous n\'êtes pas connecté.');
  }
}

// Appeler la fonction de vérification du token lors du chargement de la page
document.addEventListener('DOMContentLoaded', verifyToken);


// Fonction filtre de tableau //
function seeIndex (value) {
  return value.id === search
}

// Chargement page admin //
function loadAdminPage (a) {
  if (a === true) {
    // Si la valeur de 'a' est vraie, c'est-à-dire si l'utilisateur est un administrateur connecté
    if (RecoverCookie('admin') === 'true') {
      // Affichage des éléments de la page d'administration
      const edition = document.querySelector('#edition')
      edition.style.display = 'contents'
      const menuIn = document.querySelector('#loginButton')
      const menuOut = document.querySelector('#logoutButton')
      menuIn.style.display = 'none'
      menuOut.style.display = 'contents'
      const ButtonEdit = document.querySelector('#adminedit')
      ButtonEdit.style.display = 'contents'
      const ButtonEdit2 = document.querySelector('#adminedit2')
      ButtonEdit2.style.display = 'contents'
      const ButtonEdit3 = document.querySelector('#adminedit3')
      ButtonEdit3.style.display = 'contents'
      hideFilterForm();
 }// Si la valeur de 'a' n'est pas vraie, c'est-à-dire si l'utilisateur n'est pas un administrateur connecté
  } else {
    const edition = document.querySelector('#edition')
    edition.style.display = 'none'
    const menuIn = document.querySelector('#loginButton')
    const menuOut = document.querySelector('#logoutButton')
    menuIn.style.display = 'contents'
    menuOut.style.display = 'none'
    const ButtonEdit = document.querySelector('#adminedit')
    ButtonEdit.style.display = 'none'
    const ButtonEdit2 = document.querySelector('#adminedit2')
    ButtonEdit2.style.display = 'none'
    const ButtonEdit3 = document.querySelector('#adminedit3')
    ButtonEdit3.style.display = 'none'
  }
}

// Bouton Logout //
document.querySelectorAll('#logoutButton').forEach(a => {
  a.addEventListener('click', Logout)
})

// Deconnexion //
function Logout (e) {
  e.preventDefault() // Empêche le comportement par défaut du clic sur le bouton
  document.cookie = 'admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
  loadAdminPage(false) // Appelle la fonction pour masquer les éléments d'administration
}

// Login Form //
document.querySelectorAll('#LoginForm').forEach(a => {
  a.addEventListener('submit', LoginUser)
})



// Ajout des gestionnaires d'évènements pour sélection des travaux spécifiques //
document.querySelectorAll('#all').forEach(a => {
  a.addEventListener('click', ListingWorks)
})

document.querySelectorAll('#obj').forEach(a => {
  a.addEventListener('click', ListingWorks)
})

document.querySelectorAll('#app').forEach(a => {
  a.addEventListener('click', ListingWorks)
})

document.querySelectorAll('#hotel').forEach(a => {
  a.addEventListener('click', ListingWorks)
})

// Changement d'apparence menu travaux//
function ShowWorkMenu (button) {
  const all = document.querySelector('#all')
  const obj = document.querySelector('#obj')
  const app = document.querySelector('#app')
  const hotel = document.querySelector('#hotel')
  if (button === 'obj') {
        // Si le bouton est 'obj', met en évidence le bouton 'obj' et désactive les autres
    obj.style.background = '#1D6154'
    obj.style.color = '#FFFFFF'
    all.style.background = '#FFFFFF'
    all.style.color = '#1D6154'
    app.style.background = '#FFFFFF'
    app.style.color = '#1D6154'
    hotel.style.background = '#FFFFFF'
    hotel.style.color = '#1D6154'
  } else if (button === 'app') {
        // Si le bouton est 'app', met en évidence le bouton 'app' et désactive les autres
    app.style.background = '#1D6154'
    app.style.color = '#FFFFFF'
    all.style.background = '#FFFFFF'
    all.style.color = '#1D6154'
    obj.style.background = '#FFFFFF'
    obj.style.color = '#1D6154'
    hotel.style.background = '#FFFFFF'
    hotel.style.color = '#1D6154'
  } else if (button === 'hotel') {
        // Si le bouton est 'hotel', met en évidence le bouton 'hotel' et désactive les autres
    hotel.style.background = '#1D6154'
    hotel.style.color = '#FFFFFF'
    all.style.background = '#FFFFFF'
    all.style.color = '#1D6154'
    obj.style.background = '#FFFFFF'
    obj.style.color = '#1D6154'
    app.style.background = '#FFFFFF'
    app.style.color = '#1D6154'
  } else {
        // Par défaut, met en évidence le bouton 'all' et désactive les autres
    all.style.background = '#1D6154'
    all.style.color = '#FFFFFF'
    hotel.style.background = '#FFFFFF'
    hotel.style.color = '#1D6154'
    obj.style.background = '#FFFFFF'
    obj.style.color = '#1D6154'
    app.style.background = '#FFFFFF'
    app.style.color = '#1D6154'
  }
}
// Mise à jour de la page en supprimant les éléments existants
function RemovePage () {
  // Obtenir une référence à l'élément enfant et au parent où les éléments sont intégrés
  const child = document.querySelector('#figchild')
  const parent = document.querySelector('#gallery')

  // Suppression de l'élément enfant s'il existe
  if (child !== null) {
    parent.removeChild(child)
  }
}

// Mise à jour de la page en ajoutant de nouveaux éléments en fonction d'un filtre
function UpdatePage (c) {
    // Crée un nouveau conteneur div pour les éléments à ajouter
  const newDiv = document.createElement('div')
  newDiv.id = 'figchild'
  newDiv.className = 'gallery'
    // Défini la catégorie en fonction du paramètre 'c' et si un filtre est actif
  if (c === 'obj') {
    category = 1
    filter = true
  } else if (c === 'app') {
    category = 2
    filter = true
  } else if (c === 'hotel') {
    category = 3
    filter = true
  } else {
    category = null
    filter = false
  }
  // Parcours les données des travaux et ajoute les éléments en fonction du filtre
  for (const work of window.works.data) {
    if (work.categoryId === category && filter) {
      const newFigure = document.createElement('figure')
      newFigure.id = ('Main' + work.id)
      newDiv.appendChild(newFigure)
      const newImage = document.createElement('img')
      newImage.crossOrigin = 'anonymous'
      newImage.src = work.imageUrl
      newImage.alt = work.title
      newFigure.appendChild(newImage)
      const newfigcaption = document.createElement('figcaption')
      const text = document.createTextNode(work.title)
      newFigure.appendChild(newfigcaption)
      newfigcaption.appendChild(text)
    } else if (filter === false) {
      const newFigure = document.createElement('figure')
      newFigure.id = ('Main' + work.id)
      newDiv.appendChild(newFigure)
      const newImage = document.createElement('img')
      newImage.crossOrigin = 'anonymous'
      newImage.src = work.imageUrl
      newImage.alt = work.title
      newFigure.appendChild(newImage)
      const newfigcaption = document.createElement('figcaption')
      const text = document.createTextNode(work.title)
      newFigure.appendChild(newfigcaption)
      newfigcaption.appendChild(text)
    }
  }
  // Insère les nouveaux éléments dans le DOM, avant l'élément originalDiv
  const remoteParentElement = document.querySelector('#gallery')
  const originalDiv = document.querySelector('#children')
  remoteParentElement.insertBefore(newDiv, originalDiv)
}


// Fonction pour masquer le formulaire de filtrage
function hideFilterForm() {
  const filterForm = document.querySelector('.filter');
  if (filterForm) {
    filterForm.style.display = 'none';
  }
}
