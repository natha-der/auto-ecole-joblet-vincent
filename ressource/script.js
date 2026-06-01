"use strict";

document.addEventListener('DOMContentLoaded', function() {
    burgerMenu();
    faqAccordion();
});

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