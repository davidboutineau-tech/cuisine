// ========================================
// CONNEXION SUPABASE
// ========================================

const SUPABASE_URL = "https://ffhaeyaguvyjhxmnginc.supabase.co";

const SUPABASE_KEY = "sb_publishable_wQkHwu_t087F_GCMc8bTKA_AT7ubyt-";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
// ========================================
// RECETTES DE DEPART
// ========================================

let recettes = [
    {
        nom: "🥞 Crêpes",
        ingredients: [
            { nom: "farine", quantite: 250, unite: "g" },
            { nom: "lait", quantite: 500, unite: "ml" },
            { nom: "œufs", quantite: 3, unite: "pièce" },
            { nom: "sucre", quantite: 30, unite: "g" },
            { nom: "beurre", quantite: 30, unite: "g" }
        ]
    },

    {
        nom: "🍝 Carbonara",
        ingredients: [
            { nom: "pâtes", quantite: 200, unite: "g" },
            { nom: "œufs", quantite: 2, unite: "pièce" },
            { nom: "parmesan", quantite: 50, unite: "g" },
            { nom: "lardons", quantite: 150, unite: "g" }
        ]
    },

    {
        nom: "🍎 Gâteau aux pommes",
        ingredients: [
            { nom: "farine", quantite: 250, unite: "g" },
            { nom: "pommes", quantite: 3, unite: "pièce" },
            { nom: "œufs", quantite: 3, unite: "pièce" },
            { nom: "sucre", quantite: 150, unite: "g" },
            { nom: "beurre", quantite: 100, unite: "g" }
        ]
    }
];


// ========================================
// STOCK DE DEPART
// ========================================

let stock = [
    { nom: "farine", quantite: 500, unite: "g" },
    { nom: "lait", quantite: 750, unite: "ml" },
    { nom: "œufs", quantite: 4, unite: "pièce" },
    { nom: "sucre", quantite: 500, unite: "g" },
    { nom: "beurre", quantite: 200, unite: "g" },
    { nom: "pommes", quantite: 5, unite: "pièce" },
    { nom: "pâtes", quantite: 500, unite: "g" }
];


// ========================================
// VARIABLES
// ========================================

let ingredientsNouvelleRecette = [];

let listeCourses = [];

/*
    Exemple :

    {
        recetteIndex: 1,
        ingredients: [
            {
                nom: "pâtes",
                quantite: 200,
                unite: "g"
            },
            {
                nom: "œufs",
                quantite: 2,
                unite: "pièce"
            }
        ]
    }
*/

let recettesEnPreparation = [];


// ========================================
// CHARGER LES DONNEES
// ========================================

const recettesSauvegardees =
    localStorage.getItem("recettes");

const stockSauvegarde =
    localStorage.getItem("stock");

const listeCoursesSauvegardee =
    localStorage.getItem("listeCourses");

const recettesEnPreparationSauvegardees =
    localStorage.getItem("recettesEnPreparation");


// RECETTES

if (recettesSauvegardees) {

    try {

        const donnees =
            JSON.parse(recettesSauvegardees);

        if (Array.isArray(donnees)) {
            recettes = donnees;
        }

    } catch (erreur) {

        localStorage.removeItem("recettes");

    }

}


// STOCK

if (stockSauvegarde) {

    try {

        const donnees =
            JSON.parse(stockSauvegarde);

        if (Array.isArray(donnees)) {
            stock = donnees;
        }

    } catch (erreur) {

        localStorage.removeItem("stock");

    }

}


// LISTE DE COURSES

if (listeCoursesSauvegardee) {

    try {

        const donnees =
            JSON.parse(listeCoursesSauvegardee);

        if (Array.isArray(donnees)) {
            listeCourses = donnees;
        }

    } catch (erreur) {

        localStorage.removeItem("listeCourses");

    }

}


// RECETTES EN PREPARATION

if (recettesEnPreparationSauvegardees) {

    try {

        const donnees =
            JSON.parse(
                recettesEnPreparationSauvegardees
            );

        if (Array.isArray(donnees)) {
            recettesEnPreparation = donnees;
        }

    } catch (erreur) {

        localStorage.removeItem(
            "recettesEnPreparation"
        );

    }

}


// ========================================
// SAUVEGARDER
// ========================================

function sauvegarder() {

    localStorage.setItem(
        "recettes",
        JSON.stringify(recettes)
    );

    localStorage.setItem(
        "stock",
        JSON.stringify(stock)
    );

    localStorage.setItem(
        "listeCourses",
        JSON.stringify(listeCourses)
    );

    localStorage.setItem(
        "recettesEnPreparation",
        JSON.stringify(
            recettesEnPreparation
        )
    );

}


// ========================================
// TROUVER DANS LE STOCK
// ========================================

function trouverDansStock(nom) {

    return stock.find(
        function (ingredient) {

            return ingredient.nom === nom;

        }
    );

}


// ========================================
// CONVERSION DES UNITES
// ========================================

function convertirEnUniteDeBase(
    quantite,
    unite
) {

    if (unite === "kg") {

        return {
            quantite: quantite * 1000,
            unite: "g"
        };

    }

    if (unite === "g") {

        return {
            quantite: quantite,
            unite: "g"
        };

    }

    if (unite === "l") {

        return {
            quantite: quantite * 1000,
            unite: "ml"
        };

    }

    if (unite === "cl") {

        return {
            quantite: quantite * 10,
            unite: "ml"
        };

    }

    if (unite === "ml") {

        return {
            quantite: quantite,
            unite: "ml"
        };

    }

    if (unite === "pièce") {

        return {
            quantite: quantite,
            unite: "pièce"
        };

    }

    return {
        quantite: quantite,
        unite: unite
    };

}


// ========================================
// AFFICHER LE STOCK
// ========================================

function afficherStock() {

    const zone =
        document.getElementById("stock");

    zone.innerHTML = "";

    stock.forEach(
        function (ingredient, index) {

            const element =
                document.createElement("div");

            element.className =
                "ingredient";

            element.innerHTML =
                "<strong>" +
                ingredient.nom +
                "</strong> : " +
                ingredient.quantite +
                " " +
                ingredient.unite +

                ' <button onclick="supprimerIngredient(' +
                index +
                ')">×</button>';

            zone.appendChild(element);

        }
    );

}


// ========================================
// AJOUTER UN INGREDIENT AU STOCK
// ========================================

function ajouterIngredient() {

    const nom =
        document
            .getElementById("nouvelIngredient")
            .value
            .trim()
            .toLowerCase();

    const quantite =
        Number(
            document.getElementById(
                "quantiteIngredient"
            ).value
        );

    const unite =
        document.getElementById(
            "uniteIngredient"
        ).value;


    if (nom === "") {

        alert(
            "Indique un ingrédient."
        );

        return;

    }


    if (
        isNaN(quantite) ||
        quantite <= 0
    ) {

        alert(
            "Indique une quantité valide."
        );

        return;

    }


    const nouvelIngredient =
        convertirEnUniteDeBase(
            quantite,
            unite
        );


    const existant =
        trouverDansStock(nom);


    if (existant) {

        const existantBase =
            convertirEnUniteDeBase(
                existant.quantite,
                existant.unite
            );


        if (
            existantBase.unite !==
            nouvelIngredient.unite
        ) {

            alert(
                "Cet ingrédient existe déjà avec une unité incompatible."
            );

            return;

        }


        existant.quantite =
            existantBase.quantite +
            nouvelIngredient.quantite;

        existant.unite =
            existantBase.unite;

    } else {

        stock.push({

            nom: nom,

            quantite:
                nouvelIngredient.quantite,

            unite:
                nouvelIngredient.unite

        });

    }


    sauvegarder();


    document.getElementById(
        "nouvelIngredient"
    ).value = "";

    document.getElementById(
        "quantiteIngredient"
    ).value = "";


    actualiser();

}


// ========================================
// SUPPRIMER UN INGREDIENT DU STOCK
// ========================================

function supprimerIngredient(index) {

    stock.splice(
        index,
        1
    );

    sauvegarder();

    actualiser();

}


// ========================================
// AJOUTER UN INGREDIENT
// A UNE NOUVELLE RECETTE
// ========================================

function ajouterIngredientRecette() {

    const nom =
        document
            .getElementById(
                "nomIngredientRecette"
            )
            .value
            .trim()
            .toLowerCase();

    const quantite =
        Number(
            document.getElementById(
                "quantiteIngredientRecette"
            ).value
        );

    const unite =
        document.getElementById(
            "uniteIngredientRecette"
        ).value;


    if (nom === "") {

        alert(
            "Indique un ingrédient."
        );

        return;

    }


    if (
        isNaN(quantite) ||
        quantite <= 0
    ) {

        alert(
            "Indique une quantité valide."
        );

        return;

    }


    ingredientsNouvelleRecette.push({

        nom: nom,

        quantite: quantite,

        unite: unite

    });


    afficherIngredientsNouvelleRecette();


    document.getElementById(
        "nomIngredientRecette"
    ).value = "";

    document.getElementById(
        "quantiteIngredientRecette"
    ).value = "";

    document.getElementById(
        "nomIngredientRecette"
    ).focus();

}


// ========================================
// AFFICHER LES INGREDIENTS
// DE LA NOUVELLE RECETTE
// ========================================

function afficherIngredientsNouvelleRecette() {

    const zone =
        document.getElementById(
            "listeIngredientsRecette"
        );

    zone.innerHTML = "";


    ingredientsNouvelleRecette.forEach(
        function (ingredient, index) {

            const element =
                document.createElement("div");

            element.className =
                "ingredient-recette";


            element.innerHTML =

                "<span>" +

                "<strong>" +
                ingredient.nom +
                "</strong>" +

                " : " +

                ingredient.quantite +
                " " +
                ingredient.unite +

                "</span>" +

                '<button onclick="supprimerIngredientRecette(' +
                index +
                ')">' +

                "×" +

                "</button>";


            zone.appendChild(element);

        }
    );

}


// ========================================
// SUPPRIMER UN INGREDIENT
// DE LA NOUVELLE RECETTE
// ========================================

function supprimerIngredientRecette(index) {

    ingredientsNouvelleRecette.splice(
        index,
        1
    );

    afficherIngredientsNouvelleRecette();

}


// ========================================
// AJOUTER LA NOUVELLE RECETTE
// ========================================

function ajouterRecette() {

    const nom =
        document
            .getElementById(
                "nomRecette"
            )
            .value
            .trim();


    if (nom === "") {

        alert(
            "Indique le nom de la recette."
        );

        return;

    }


    if (
        ingredientsNouvelleRecette.length === 0
    ) {

        alert(
            "Ajoute au moins un ingrédient."
        );

        return;

    }


    recettes.push({

        nom: nom,

        ingredients:
            [...ingredientsNouvelleRecette]

    });


    sauvegarder();


    document.getElementById(
        "nomRecette"
    ).value = "";


    ingredientsNouvelleRecette = [];


    afficherIngredientsNouvelleRecette();

    actualiser();

}


// ========================================
// ANALYSER UNE RECETTE
// ========================================

function analyserRecette(recette) {

    let disponibles = 0;

    let manquants = [];


    recette.ingredients.forEach(
        function (ingredient) {

            const disponible =
                trouverDansStock(
                    ingredient.nom
                );


            if (!disponible) {

                manquants.push({

                    nom:
                        ingredient.nom,

                    quantite:
                        ingredient.quantite,

                    unite:
                        ingredient.unite

                });

                return;

            }


            const besoin =
                convertirEnUniteDeBase(
                    ingredient.quantite,
                    ingredient.unite
                );


            const stockDisponible =
                convertirEnUniteDeBase(
                    disponible.quantite,
                    disponible.unite
                );


            if (
                besoin.unite !==
                stockDisponible.unite
            ) {

                manquants.push({

                    nom:
                        ingredient.nom,

                    quantite:
                        ingredient.quantite,

                    unite:
                        ingredient.unite

                });

                return;

            }


            if (
                stockDisponible.quantite >=
                besoin.quantite
            ) {

                disponibles++;

                return;

            }


            const difference =
                besoin.quantite -
                stockDisponible.quantite;


            let quantiteManquante =
                difference;

            let uniteManquante =
                besoin.unite;


            if (
                besoin.unite === "g" &&
                difference >= 1000
            ) {

                quantiteManquante =
                    difference / 1000;

                uniteManquante =
                    "kg";

            }


            if (
                besoin.unite === "ml" &&
                difference >= 1000
            ) {

                quantiteManquante =
                    difference / 1000;

                uniteManquante =
                    "l";

            }


            manquants.push({

                nom:
                    ingredient.nom,

                quantite:
                    quantiteManquante,

                unite:
                    uniteManquante

            });

        }
    );


    const total =
        recette.ingredients.length;


    let pourcentage = 0;


    if (total > 0) {

        pourcentage =
            Math.round(
                (disponibles / total) * 100
            );

    }


    return {

        disponibles:
            disponibles,

        total:
            total,

        pourcentage:
            pourcentage,

        manquants:
            manquants

    };

}


// ========================================
// AJOUTER UNE RECETTE
// A LA LISTE DE COURSES
// ========================================

function ajouterAListeCourses(index) {

    const recette =
        recettes[index];


    // Vérifier si elle est déjà préparée

    const dejaEnPreparation =
        recettesEnPreparation.find(
            function (preparation) {

                return (
                    preparation.recetteIndex ===
                    index
                );

            }
        );


    if (dejaEnPreparation) {

        alert(
            "Cette recette est déjà en préparation."
        );

        return;

    }


    let ingredientsRetires = [];

    let ingredientsManquants = [];


    recette.ingredients.forEach(
        function (ingredient) {

            const besoin =
                convertirEnUniteDeBase(
                    ingredient.quantite,
                    ingredient.unite
                );


            const disponible =
                trouverDansStock(
                    ingredient.nom
                );


            // Aucun stock

            if (!disponible) {

                ingredientsManquants.push({

                    nom:
                        ingredient.nom,

                    quantite:
                        ingredient.quantite,

                    unite:
                        ingredient.unite

                });

                return;

            }


            const stockBase =
                convertirEnUniteDeBase(
                    disponible.quantite,
                    disponible.unite
                );


            // Unités incompatibles

            if (
                besoin.unite !==
                stockBase.unite
            ) {

                ingredientsManquants.push({

                    nom:
                        ingredient.nom,

                    quantite:
                        ingredient.quantite,

                    unite:
                        ingredient.unite

                });

                return;

            }


            // Tout est disponible

            if (
                stockBase.quantite >=
                besoin.quantite
            ) {

                disponible.quantite =
                    stockBase.quantite -
                    besoin.quantite;

                disponible.unite =
                    stockBase.unite;


                ingredientsRetires.push({

                    nom:
                        ingredient.nom,

                    quantite:
                        besoin.quantite,

                    unite:
                        besoin.unite

                });


                return;

            }


            // Une partie est disponible

            const quantiteDisponible =
                stockBase.quantite;


            const quantiteManquante =
                besoin.quantite -
                quantiteDisponible;


            // Retirer la partie disponible

            disponible.quantite = 0;

            disponible.unite =
                stockBase.unite;


            if (
                quantiteDisponible > 0
            ) {

                ingredientsRetires.push({

                    nom:
                        ingredient.nom,

                    quantite:
                        quantiteDisponible,

                    unite:
                        stockBase.unite

                });

            }


            // Ajouter la partie manquante

            let quantiteAffichee =
                quantiteManquante;

            let uniteAffichee =
                besoin.unite;


            if (
                besoin.unite === "g" &&
                quantiteManquante >= 1000
            ) {

                quantiteAffichee =
                    quantiteManquante / 1000;

                uniteAffichee =
                    "kg";

            }


            if (
                besoin.unite === "ml" &&
                quantiteManquante >= 1000
            ) {

                quantiteAffichee =
                    quantiteManquante / 1000;

                uniteAffichee =
                    "l";

            }


            ingredientsManquants.push({

                nom:
                    ingredient.nom,

                quantite:
                    quantiteAffichee,

                unite:
                    uniteAffichee

            });

        }
    );


    // Ajouter les ingrédients manquants
    // à la liste de courses

    ingredientsManquants.forEach(
        function (ingredient) {

            const ingredientBase =
                convertirEnUniteDeBase(
                    ingredient.quantite,
                    ingredient.unite
                );


            const existant =
                listeCourses.find(
                    function (article) {

                        return (
                            article.nom ===
                            ingredient.nom
                        );

                    }
                );


            if (existant) {

                const existantBase =
                    convertirEnUniteDeBase(
                        existant.quantite,
                        existant.unite
                    );


                if (
                    existantBase.unite ===
                    ingredientBase.unite
                ) {

                    existant.quantite =
                        existantBase.quantite +
                        ingredientBase.quantite;

                    existant.unite =
                        existantBase.unite;

                }

            } else {

                listeCourses.push({

                    nom:
                        ingredient.nom,

                    quantite:
                        ingredientBase.quantite,

                    unite:
                        ingredientBase.unite

                });

            }

        }
    );


    // Enregistrer exactement ce qui
    // a déjà été retiré du stock

    recettesEnPreparation.push({

        recetteIndex:
            index,

        ingredientsRetires:
            ingredientsRetires

    });


    sauvegarder();

    actualiser();


    if (
        ingredientsManquants.length > 0
    ) {

        alert(
            "Les ingrédients disponibles ont été retirés du stock.\n\n" +
            "Les ingrédients manquants sont dans ta liste de courses."
        );

    } else {

        alert(
            "Tous les ingrédients ont été retirés du stock.\n\n" +
            "La recette est prête à être cuisinée."
        );

    }

}


// ========================================
// AFFICHER LA LISTE DE COURSES
// ========================================

function afficherListeCourses() {

    const zone =
        document.getElementById(
            "listeCourses"
        );


    if (!zone) {
        return;
    }


    zone.innerHTML = "";


    if (
        listeCourses.length === 0
    ) {

        zone.innerHTML =
            "<p>Ta liste de courses est vide.</p>";

        return;

    }


    listeCourses.forEach(
        function (article, index) {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "ingredient-recette";


            element.innerHTML =

                "<span>" +

                "<strong>" +
                article.nom +
                "</strong>" +

                " : " +

                article.quantite +
                " " +
                article.unite +

                "</span>" +

                '<button onclick="supprimerDeListeCourses(' +
                index +
                ')">' +

                "×" +

                "</button>";


            zone.appendChild(element);

        }
    );

}


// ========================================
// SUPPRIMER DE LA LISTE DE COURSES
// ========================================

function supprimerDeListeCourses(index) {

    listeCourses.splice(
        index,
        1
    );

    sauvegarder();

    afficherListeCourses();

}


// ========================================
// VIDER LA LISTE DE COURSES
// ========================================

function viderListeCourses() {

    if (
        listeCourses.length === 0
    ) {

        return;

    }


    const confirmation =
        confirm(
            "Vider toute la liste de courses ?"
        );


    if (!confirmation) {

        return;

    }


    listeCourses = [];


    sauvegarder();

    afficherListeCourses();

}

// ========================================
// ENVOYER LA LISTE DE COURSES PAR MAIL
// ========================================

function envoyerListeParMail() {

    if (listeCourses.length === 0) {

        alert(
            "Ta liste de courses est vide."
        );

        return;

    }


    let message =
        "Ma liste de courses :\n\n";


    listeCourses.forEach(
        function (article) {

            message +=
                "- " +
                article.nom +
                " : " +
                article.quantite +
                " " +
                article.unite +
                "\n";

        }
    );


    const sujet =
        "Ma liste de courses";


    const lien =
        "mailto:" +
        "?subject=" +
        encodeURIComponent(sujet) +
        "&body=" +
        encodeURIComponent(message);


    window.location.href =
        lien;

}

// ========================================
// J'AI FAIT LES COURSES
// ========================================

function faireLesCourses() {

    if (
        listeCourses.length === 0
    ) {

        alert(
            "Ta liste de courses est vide."
        );

        return;

    }


    const confirmation =
        confirm(
            "Ajouter tous les articles de la liste de courses à ton stock ?"
        );


    if (!confirmation) {

        return;

    }


    listeCourses.forEach(
        function (article) {

            const articleBase =
                convertirEnUniteDeBase(
                    article.quantite,
                    article.unite
                );


            const existant =
                trouverDansStock(
                    article.nom
                );


            if (existant) {

                const existantBase =
                    convertirEnUniteDeBase(
                        existant.quantite,
                        existant.unite
                    );


                if (
                    existantBase.unite ===
                    articleBase.unite
                ) {

                    existant.quantite =
                        existantBase.quantite +
                        articleBase.quantite;

                    existant.unite =
                        existantBase.unite;

                }

            } else {

                stock.push({

                    nom:
                        article.nom,

                    quantite:
                        articleBase.quantite,

                    unite:
                        articleBase.unite

                });

            }

        }
    );


    listeCourses = [];


    sauvegarder();

    actualiser();


    alert(
        "Les courses ont été ajoutées à ton stock !"
    );

}


// ========================================
// CUISINER UNE RECETTE
// ========================================

function cuisinerRecette(index) {

    const recette =
        recettes[index];


    const preparation =
        recettesEnPreparation.find(
            function (element) {

                return (
                    element.recetteIndex ===
                    index
                );

            }
        );


    // ====================================
    // RECETTE EN PREPARATION
    // ====================================

    if (preparation) {

        /*
            Les ingrédients disponibles
            ont déjà été retirés du stock.

            Il faut maintenant vérifier que
            les ingrédients manquants ont été
            achetés.
        */

        const analyse =
            analyserRecette(
                recette
            );


        if (
            analyse.pourcentage !== 100
        ) {

            alert(
                "Il te manque encore des ingrédients.\n\n" +
                "Fais les courses avant de cuisiner cette recette."
            );

            return;

        }


        const confirmation =
            confirm(
                "Cuisiner " +
                recette.nom +
                " ?"
            );


        if (!confirmation) {
            return;
        }


        /*
            Les ingrédients déjà retirés
            ne sont PAS retirés une seconde fois.

            On retire uniquement les ingrédients
            qui ont été achetés depuis.
        */

        recette.ingredients.forEach(
            function (ingredient) {

                const retire =
                    preparation.ingredientsRetires.find(
                        function (element) {

                            return (
                                element.nom ===
                                ingredient.nom
                            );

                        }
                    );


                const besoin =
                    convertirEnUniteDeBase(
                        ingredient.quantite,
                        ingredient.unite
                    );


                let quantiteDejaRetiree = 0;


                if (retire) {

                    quantiteDejaRetiree =
                        convertirEnUniteDeBase(
                            retire.quantite,
                            retire.unite
                        ).quantite;

                }


                const quantiteARetirer =
                    besoin.quantite -
                    quantiteDejaRetiree;


                if (
                    quantiteARetirer <= 0
                ) {

                    return;

                }


                const disponible =
                    trouverDansStock(
                        ingredient.nom
                    );


                if (!disponible) {
                    return;
                }


                const stockBase =
                    convertirEnUniteDeBase(
                        disponible.quantite,
                        disponible.unite
                    );


                disponible.quantite =
                    stockBase.quantite -
                    quantiteARetirer;

                disponible.unite =
                    stockBase.unite;

            }
        );


        // Retirer la recette des préparations

        recettesEnPreparation =
            recettesEnPreparation.filter(
                function (element) {

                    return (
                        element.recetteIndex !==
                        index
                    );

                }
            );


        sauvegarder();

        actualiser();


        alert(
            recette.nom +
            " a été cuisinée !\n\n" +
            "Ton stock a été mis à jour."
        );


        return;

    }


    // ====================================
    // RECETTE NORMALE
    // ====================================

    const analyse =
        analyserRecette(
            recette
        );


    if (
        analyse.pourcentage !== 100
    ) {

        alert(
            "Tu n'as pas assez d'ingrédients pour cette recette."
        );

        return;

    }


    const confirmation =
        confirm(
            "Cuisiner " +
            recette.nom +
            " ?\n\n" +
            "Les quantités utilisées seront retirées de ton stock."
        );


    if (!confirmation) {
        return;
    }


    recette.ingredients.forEach(
        function (ingredient) {

            const disponible =
                trouverDansStock(
                    ingredient.nom
                );


            if (!disponible) {
                return;
            }


            const besoin =
                convertirEnUniteDeBase(
                    ingredient.quantite,
                    ingredient.unite
                );


            const stockBase =
                convertirEnUniteDeBase(
                    disponible.quantite,
                    disponible.unite
                );


            disponible.quantite =
                stockBase.quantite -
                besoin.quantite;

            disponible.unite =
                stockBase.unite;

        }
    );


    sauvegarder();

    actualiser();


    alert(
        recette.nom +
        " a été cuisinée !\n\n" +
        "Ton stock a été mis à jour."
    );

}


// ========================================
// AFFICHER LES RECETTES
// ========================================

function afficherRecettes() {

    const zone =
        document.getElementById(
            "recettes"
        );


    zone.innerHTML = "";


    const resultats =
        recettes.map(
            function (recette, index) {

                const analyse =
                    analyserRecette(
                        recette
                    );


                const preparation =
                    recettesEnPreparation.find(
                        function (element) {

                            return (
                                element.recetteIndex ===
                                index
                            );

                        }
                    );


                return {

                    recette:
                        recette,

                    index:
                        index,

                    disponibles:
                        analyse.disponibles,

                    total:
                        analyse.total,

                    pourcentage:
                        analyse.pourcentage,

                    manquants:
                        analyse.manquants,

                    preparation:
                        preparation

                };

            }
        );


    // ====================================
    // TRI
    // ====================================

    resultats.sort(
        function (a, b) {

            if (
                a.pourcentage !==
                b.pourcentage
            ) {

                return (
                    b.pourcentage -
                    a.pourcentage
                );

            }


            return (
                b.disponibles -
                a.disponibles
            );

        }
    );


    // ====================================
    // COMPTEUR
    // ====================================

    const compteur =
        document.getElementById(
            "nombreRecettes"
        );


    compteur.textContent =
        recettes.length +
        (
            recettes.length > 1
                ? " recettes"
                : " recette"
        );


    // ====================================
    // AFFICHAGE
    // ====================================

    resultats.forEach(
        function (resultat) {

            const recette =
                resultat.recette;


            const carte =
                document.createElement(
                    "div"
                );


            carte.className =
                "recette";


            // ==================================
            // RECETTE EN PREPARATION
            // ==================================

            if (
                resultat.preparation
            ) {

                carte.classList.add(
                    "impossible"
                );


                let listeManquants =
                    "";


                resultat.manquants.forEach(
                    function (ingredient) {

                        listeManquants +=

                            "<strong>" +
                            ingredient.nom +
                            "</strong>" +

                            " : " +

                            ingredient.quantite +
                            " " +
                            ingredient.unite +

                            "<br>";

                    }
                );


                if (
                    resultat.pourcentage ===
                    100
                ) {

                    carte.innerHTML =

                        "<h3>" +
                        recette.nom +
                        "</h3>" +

                        "<p>" +
                        "🟢 " +

                        "<strong>" +
                        "Recette prête à cuisiner" +
                        "</strong>" +

                        "</p>" +

                        "<p>" +
                        "Les ingrédients disponibles ont déjà été retirés du stock." +
                        "</p>" +

                        '<button onclick="cuisinerRecette(' +
                        resultat.index +
                        ')">' +

                        "🍳 Cuisiner cette recette" +

                        "</button>";

                } else {

                    carte.innerHTML =

                        "<h3>" +
                        recette.nom +
                        "</h3>" +

                        "<p>" +
                        "🟠 " +

                        "<strong>" +
                        "En préparation" +
                        "</strong>" +

                        "</p>" +

                        "<p>" +
                        resultat.pourcentage +
                        " % des ingrédients disponibles." +
                        "</p>" +

                        '<div class="manquant">' +

                        "🛒 " +

                        "<strong>" +
                        "Il faut encore acheter :" +
                        "</strong>" +

                        "<br><br>" +

                        listeManquants +

                        "</div>";

                }


                zone.appendChild(carte);

                return;

            }


            // ==================================
            // RECETTE 100 %
            // ==================================

            if (
                resultat.pourcentage ===
                100
            ) {

                carte.classList.add(
                    "possible"
                );


                carte.innerHTML =

                    "<h3>" +
                    recette.nom +
                    "</h3>" +

                    "<p>" +
                    "🟢 " +

                    "<strong>" +
                    "100 % réalisable" +
                    "</strong>" +

                    "</p>" +

                    "<p>" +

                    resultat.disponibles +

                    " ingrédients sur " +

                    resultat.total +

                    " disponibles." +

                    "</p>" +

                    '<div class="progress-container">' +

                    '<div class="progress-bar" style="width: 100%"></div>' +

                    "</div>" +

                    '<button onclick="cuisinerRecette(' +
                    resultat.index +
                    ')">' +

                    "🍳 Cuisiner cette recette" +

                    "</button>" +

                    '<button class="supprimer" onclick="supprimerRecette(' +
                    resultat.index +
                    ')">' +

                    "Supprimer la recette" +

                    "</button>";

            }


            // ==================================
            // RECETTE INCOMPLETE
            // ==================================

            else {

                carte.classList.add(
                    "impossible"
                );


                let listeManquants =
                    "";


                resultat.manquants.forEach(
                    function (ingredient) {

                        listeManquants +=

                            "<strong>" +
                            ingredient.nom +
                            "</strong>" +

                            " : " +

                            ingredient.quantite +
                            " " +
                            ingredient.unite +

                            "<br>";

                    }
                );


                carte.innerHTML =

                    "<h3>" +
                    recette.nom +
                    "</h3>" +

                    "<p>" +
                    "🟠 " +

                    "<strong>" +
                    resultat.pourcentage +
                    " % réalisable" +
                    "</strong>" +

                    "</p>" +

                    "<p>" +

                    resultat.disponibles +

                    " ingrédients sur " +

                    resultat.total +

                    " disponibles." +

                    "</p>" +

                    '<div class="progress-container">' +

                    '<div class="progress-bar" style="width: ' +
                    resultat.pourcentage +
                    '%"></div>' +

                    "</div>" +

                    '<div class="manquant">' +

                    "❌ " +

                    "<strong>" +
                    "Il manque :" +
                    "</strong>" +

                    "<br><br>" +

                    listeManquants +

                    "</div>" +

                    '<button onclick="ajouterAListeCourses(' +
                    resultat.index +
                    ')">' +

                    "🛒 Préparer cette recette" +

                    "</button>" +

                    '<button class="supprimer" onclick="supprimerRecette(' +
                    resultat.index +
                    ')">' +

                    "Supprimer la recette" +

                    "</button>";

            }


            zone.appendChild(carte);

        }
    );

}


// ========================================
// SUPPRIMER UNE RECETTE
// ========================================

function supprimerRecette(index) {

    const confirmation =
        confirm(
            "Supprimer cette recette ?"
        );


    if (!confirmation) {
        return;
    }


    recettes.splice(
        index,
        1
    );


    recettesEnPreparation =
        recettesEnPreparation.filter(
            function (element) {

                return (
                    element.recetteIndex !==
                    index
                );

            }
        );


    sauvegarder();

    actualiser();

}


// ========================================
// ACTUALISER
// ========================================

function actualiser() {

    afficherStock();

    afficherRecettes();

    afficherListeCourses();

}


// ========================================
// DEMARRER
// ========================================

actualiser();

async function testerConnexionSupabase() {

    const { data, error } =
        await supabaseClient
            .from("stock")
            .select("*")
            .limit(1);

    if (error) {

        console.error(
            "Erreur Supabase :",
            error
        );

        alert(
            "❌ La connexion à Supabase ne fonctionne pas."
        );

        return;
    }

    console.log(
        "✅ Connexion Supabase réussie !",
        data
    );

    alert(
        "✅ Connexion à Supabase réussie !"
    );
}

testerConnexionSupabase();
