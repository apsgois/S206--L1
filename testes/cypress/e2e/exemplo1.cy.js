/// <reference types="cypress" /> 

describe('Criando cenario de teste para o site globalsqa', () =>{
  it.skip('Caso de teste: Registrando um usuario no site com sucesso',()=>{
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('inatel')
    cy.get('#Text1').type('inatel')
    cy.get('#username').type('inatel')
    cy.get('#password').type('inatel')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful')
  })

  it.skip('Resgistrando o usuario com falha (faltando senha)',()=>{
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/register')
    cy.get('#firstName').type('inatel')
    cy.get('#Text1').type('inatel')
    cy.get('#username').type('inatel')
    cy.get('#password').type('inatel')
    cy.get('#password').clear()
    cy.get('.has-error > .help-block').should('have.text', 'Password is required')
    cy.get('.btn-primary').should('be.disabled')
  })


  it('Realizando login com sucesso',()=>{
    let info = criarUsuario()
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])
  })

  it('Deletando o uausrio logado',()=>{
    let info = criarUsuario()
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('ul.ng-scope > .ng-binding').should('contain.text', info[0])
    cy.get('.ng-binding > a').click()
    
  })




})

function criarUsuario(){

  let horas = new Date().getHours().toString()
  let minutos = new Date().getMinutes().toString()
  let segundos = new Date().getSeconds().toString()
  let usuario = 'inatel'+horas+minutos+segundos
  let senha = 'inatel'+horas+minutos+segundos + 'senha'


  let userInfo = [usuario, senha]
  cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type(usuario)
    cy.get('#Text1').type(usuario)
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha)
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful')

    return userInfo
}

