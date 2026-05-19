"use strict";

document.addEventListener('DOMContentLoaded', function() {
    chargerStages();
    burgerMenu();
    faqAccordion();
});

async function chargerStages() {
    const reponse = await fetch('https://api.github.com/repos/natha-der/auto-ecole-joblet-vincent/contents/_stages');
    const fichiers = await reponse.json();
    
    let stages = [];
    
    for (const fichier of fichiers) {
        const contenu = await fetch(fichier.download_url);
        const texte = await contenu.text();
        
        const dateDebut = texte.match(/date_debut:\s*(.+)/)?.[1]?.trim();
        const dateFin = texte.match(/date_fin:\s*(.+)/)?.[1]?.trim();
        const places = texte.match(/places:\s*(.+)/)?.[1]?.trim();
        const heure = texte.match(/heure:\s*(.+)/)?.[1]?.trim();
        
        stages.push({ dateDebut, dateFin, places, heure });
    }
    
    let html = '';
    for (const stage of stages) {
        const placesNum = parseInt(stage.places);
        const badgeClass = placesNum === 0 ? 'stage-complet' : 'stage-places';
        const badgeTexte = placesNum === 0 ? 'Complet' : `${placesNum} places disponibles`;
        
        html += `
        <div class="stage-card">
            <div class="stage-info">
                <div class="stage-date">📅 ${stage.dateDebut} - ${stage.dateFin}</div>
                <div class="stage-heure">🕐 ${stage.heure}</div>
            </div>
            <span class="${badgeClass}">${badgeTexte}</span>
        </div>`;
    }
    
    document.getElementById('liste-stages').innerHTML = html;
}

function burgerMenu() {
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
    }
}

function faqAccordion() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const arrow = this.querySelector('.faq-arrow');
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                arrow.textContent = '+';
            } else {
                answer.style.display = 'block';
                arrow.textContent = '-';
            }
        });
    });
}