const Days = {
    d1: () =>{window.open("1.html", "_self")},
    d2: () =>{window.open("2.html", "_self")},
    d3: () =>{window.open("3.html", "_self")},
    d4: () =>{window.open("4.html", "_self")},
    d5: () =>{window.open("5.html", "_self")},
    d6: () =>{window.open("6.html", "_self")},
    d7: () =>{window.open("7.html", "_self")},
}

const Autor = {
    Name: "KoroZZIa",
    AltName: "AZtec",
    School: "8v/gym2",
    print: function(){alert(`${this.Name}, alt. ${this.AltName}\n${this.School}`)}
}

const u = {
    rus: () =>{alert("dans cette leçon, nous apprenons le russe")},
    eng: () =>{alert("dans cette leçon, nous apprenons l'anglais")},
    ROV: () =>{alert("Parlons de l'important")},
    bio: () =>{alert("Dans cette leçon, nous étudions les objets vivants")},
    obz: () =>{alert("On nous apprend à survivre dans certaines situations")},
    horeo: () => {alert("dans cette leçon, nous apprenons à danser")},
    phi: () => {alert("dans cette leçon, nous enseignons la physique")},
    geo: () => {alert("domaine de la science consacré à l'étude des terres, des caractéristiques, des habitants et des phénomènes de la Terre et des planètes.")},
    che: () => {alert("science des produits chimiques et de leurs réactions")},
    alg: () => {alert("une section de Mathématiques qui peut être décrite comme une généralisation et une extension de l'arithmétique; dans cette section, les nombres et autres objets Mathématiques...")},
    geom: () => {alert("une section de Mathématiques qui étudie les structures spatiales et les relations, ainsi que leurs généralisations.")},
    inf: () => {alert("la science des méthodes et des processus de collecte, de stockage, de traitement, de transmission, d'analyse et d'évaluation de l'information à l'aide de la technologie informatique...")},
    his: () => {alert("la science qui étudie le passé, les faits réels et les modèles de changement des événements historiques, l'évolution de la société et des relations à l'intérieur de celle-ci...")},
    fra: () => {alert("langue française (langue officielle de la France). L'une des langues officielles de la population francophone est la Belgique, la Suisse (principalement en Romandie)...")},
    izo: () => {alert("Une classe d'arts spatiaux combinant peinture, sculpture, graphisme, art monumental et art photographique. Le critère de leur Union au niveau sémiotique de la classification «est la volumétrie, la tridimensionnalité ou la planéité, la bidimensionnalité")},
    lit: () => {alert("au sens large, tout texte écrit. Le plus souvent, la littérature comprend la fiction, c'est-à-dire la littérature comme une forme d'art.")},
    obs: () => {alert("un ensemble de disciplines, dont l'objet d'étude sont les différents aspects de la vie de la société")},
    fizra: () => {alert("domaine d'activité sociale visant à préserver et à promouvoir la santé humaine dans le processus d'activité motrice consciente.")},
    muz: () =>{alert("Il n'y aura pas de description, j'en ai marre de les écrire :(")},
    tecno: () =>{alert("Assemblage d'hélicoptères d'attaque Ka-52")}
}

function BackToProj(TwoBack = true){
    if (TwoBack == true){window.open('../../proj.html', '_self')}
    if (TwoBack == false){window.open('../proj.hmtl', '_self')}
}